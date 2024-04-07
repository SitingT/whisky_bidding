from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

from datetime import datetime
from django.utils import timezone
from rest_framework.decorators import api_view
from .models import WhiskyDetail, Bid
from .serializers import WhiskyDetailSerializer, BidSerializer
from datetime import datetime
from dateutil.parser import parse as parse_datetime
from django.db.models import Q, Max, F, Case, When, Value, CharField, DecimalField


class UserCreate(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Password should be hashed appropriately
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def whisky_create(request):
    data = request.data.copy()  # Make a mutable copy

    # Use dateutil's parse function, which can handle the 'Z' suffix.
    end_time_str = data.get('EndTime', '')
    if end_time_str:
        end_time_str = parse_datetime(end_time_str)
        if end_time_str >= timezone.now():
            data['AuctionStatus'] = 'Active'
        else:
            data['AuctionStatus'] = 'Inactive'

    serializer = WhiskyDetailSerializer(data=data)
    if serializer.is_valid():
        # Save the valid data to the database.
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # Return validation errors if the data is invalid.
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_bid(request):
    data = request.data.copy()
    data['BidTime'] = timezone.now().isoformat()

    serializer = BidSerializer(data=data)
    if serializer.is_valid():
        new_bid = serializer.save()

        # Fetch the associated whisky item using the ItemID from the bid
        whisky_item = WhiskyDetail.objects.get(
            ItemID=new_bid.ItemID.ItemID)  # Adjusted to use FK relation

        # If this bid is higher than the current highest bid, update the whisky detail
        if whisky_item.HighestBid is None or new_bid.BidAmount > whisky_item.HighestBid:
            whisky_item.HighestBid = new_bid.BidAmount
            whisky_item.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#############################


@api_view(['GET'])
def active_whisky_list(request):
    # Normalize the 'category' parameter to handle different capitalizations
    category_query = request.query_params.get('category', None)
    if category_query:
        category = category_query.capitalize()
    else:
        category = None  # Ensure category is None if not provided

    VALID_CATEGORIES = ['Scotch', 'Bourbon', 'Japanese', 'Irish']

    # Initialize the query with all objects, filtering out only those with EndTime greater than now
    query = WhiskyDetail.objects.filter(AuctionStatus='Active')
    query = query.annotate(
        Current_bid=Case(
            When(HighestBid__isnull=True, then=F('StartPrice')),
            default=F('HighestBid'),
            output_field=DecimalField(),
        )
    )

    # Update the AuctionStatus based on EndTime;
    for whisky in query:
        if whisky.EndTime >= timezone.now():
            whisky.AuctionStatus = 'Active'
        else:
            whisky.AuctionStatus = 'Inactive'
            whisky.save()

    # Apply category filtering if valid
    if category in VALID_CATEGORIES:
        query = query.filter(Category=category, AuctionStatus='Active')
    elif category is not None:
        # Return an error response if an invalid category is provided
        return JsonResponse({"error": "Invalid category provided. Please choose from Scotch, Bourbon, Japanese, Irish."},
                            status=status.HTTP_400_BAD_REQUEST)

    # Serialize and return the filtered queryset
    serializer = WhiskyDetailSerializer(query, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def whisky_highest_bid(request, item_id):
    try:
        # Try to fetch the whisky detail by ItemID
        whisky = WhiskyDetail.objects.get(ItemID=item_id)
    except WhiskyDetail.DoesNotExist:
        # Return an error response if the whisky does not exist
        return JsonResponse({"error": "Whisky not found."}, status=status.HTTP_404_NOT_FOUND)

    # Try to fetch the highest bid for the whisky
    highest_bid = Bid.objects.filter(ItemID=whisky).aggregate(Max('BidAmount'))

    # Check if there is at least one bid
    if highest_bid['BidAmount__max'] is not None:
        # Return the highest bid amount
        return JsonResponse({"highest_bid": highest_bid['BidAmount__max']}, status=status.HTTP_200_OK)
    else:
        # If there are no bids, return the StartPrice of the whisky
        return JsonResponse({"start_price": whisky.StartPrice}, status=status.HTTP_200_OK)


@api_view(['GET'])
def customer_bids_win_lose_status(request, customer_id):
    # Fetch all bids made by the customer
    bids = Bid.objects.filter(BidderID=customer_id).select_related('ItemID')
    bid_status_query = request.query_params.get('status')
    results = []
    won_items = set()

    # First pass to identify won items
    for bid in bids:
        whisky = bid.ItemID
        if whisky.EndTime < timezone.now() and whisky.HighestBid == bid.BidAmount:
            won_items.add(whisky.ItemID)

    # Second pass to build the response, considering won items
    for bid in bids:
        whisky = bid.ItemID

        # Determine if the auction is active or not
        auction_status = 'Active' if whisky.EndTime >= timezone.now() else 'Inactive'
        if auction_status == 'Inactive':
            whisky.AuctionStatus = 'Inactive'
            whisky.save()

            if whisky.ItemID in won_items and bid.BidAmount != whisky.HighestBid:
                # Skip losing bids on items the customer has won
                continue
            elif whisky.HighestBid == bid.BidAmount:
                bid_status = 'Win'
            else:
                bid_status = 'Lose'
        else:
            bid_status = 'Pending'

        if bid_status_query and bid_status_query.lower() != bid_status.lower():
            continue

        results.append({
            'BidID': bid.BidID,
            'ItemID': whisky.ItemID,
            'Category': whisky.Category,
            'EndTime': whisky.EndTime,
            'BidAmount': bid.BidAmount,
            'BidTime': bid.BidTime,
            'AuctionStatus': auction_status,
            'BidStatus': bid_status
        })

    return Response(results, status=status.HTTP_200_OK)
