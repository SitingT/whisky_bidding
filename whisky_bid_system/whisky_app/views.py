from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Count, Max
from django.db.models import Subquery, OuterRef
from django.db.models.functions import Coalesce
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
# from .serializers import UserSerializer
from .permissions import PostOnlyAuthenticated, IsAdminUser
from datetime import datetime
from django.utils import timezone
from rest_framework.decorators import api_view
from .models import WhiskyDetail, Bid,  User, Transaction
from .serializers import WhiskyDetailSerializer, BidSerializer, TransactionSerializer, UserSerializer
from datetime import datetime
from dateutil.parser import parse as parse_datetime
from django.db.models import Q, Max, F, Case, When, Value, CharField, DecimalField


@api_view(['POST'])
@permission_classes([PostOnlyAuthenticated])
def whisky_create(request):
    data = request.data.copy()  # Make a mutable copy
    data['SellerID'] = request.user.pk
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
@permission_classes([PostOnlyAuthenticated])
def create_bid(request):
    data = request.data.copy()
    data['BidTime'] = timezone.now().isoformat()
    data['BidderID'] = request.user.pk
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


@api_view(['POST'])
@permission_classes([PostOnlyAuthenticated])
def create_transaction(request):
    data = request.data.copy()
    data['TransactionDate'] = timezone.now().isoformat()
    data['BuyerID'] = request.user.pk
    item_id = request.data.get('ItemID')
    if Transaction.objects.filter(ItemID=item_id, TransactionStatus__in=['Initiated', 'Completed']).exists():
        return Response({'error': 'Item has already been purchased'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = TransactionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#############################


@api_view(['GET'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
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
@permission_classes([PostOnlyAuthenticated])
def customer_bids_win_lose_status(request):
    # Fetch all bids made by the customer
    customer_id = request.user.pk
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
        seller_id = whisky.SellerID_id
        results.append({
            'BidID': bid.BidID,
            'ItemID': whisky.ItemID,
            'Category': whisky.Category,
            'EndTime': whisky.EndTime,
            'BidAmount': bid.BidAmount,
            'BidTime': bid.BidTime,
            'AuctionStatus': auction_status,
            'BidStatus': bid_status,
            'SellerID': seller_id
        })

    return Response(results, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def whisky_report(request):
    # Count the number of active and inactive whiskies
    whisky_counts = WhiskyDetail.objects.values('AuctionStatus').annotate(
        total=Count('ItemID')).order_by('AuctionStatus')

    # Find the most popular whisky (the one with the most bids)
    most_popular_whisky = Bid.objects.values('ItemID').annotate(
        total_bids=Count('BidID')).order_by('-total_bids').first()
    if most_popular_whisky:
        most_popular_whisky_detail = WhiskyDetail.objects.get(
            ItemID=most_popular_whisky['ItemID'])
        most_popular_whisky_info = {
            'ItemID': most_popular_whisky_detail.ItemID,
            'Description': most_popular_whisky_detail.Description,
            'TotalBids': most_popular_whisky['total_bids']
        }
    else:
        most_popular_whisky_info = "No bids found."

    # Find the most active user (the user who has placed the most bids)
    most_active_user = Bid.objects.values('BidderID').annotate(
        total_bids=Count('BidID')).order_by('-total_bids').first()
    if most_active_user:
        most_active_user_detail = User.objects.get(
            id=most_active_user['BidderID'])
        most_active_user_info = {
            'UserID': most_active_user_detail.id,
            'Username': most_active_user_detail.name,
            'TotalBids': most_active_user['total_bids']
        }
    else:
        most_active_user_info = "No bids found."

    users_with_bids = Bid.objects.values('BidderID').distinct()
    users_never_bidded = User.objects.exclude(id__in=Subquery(users_with_bids)).exclude(
        is_superuser=True).exclude(is_staff=True).values('id', 'name')
    return JsonResponse({
        'whisky_counts': list(whisky_counts),
        'most_popular_whisky': most_popular_whisky_info,
        'most_active_user': most_active_user_info,
        'users_never_bidded': list(users_never_bidded)
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([PostOnlyAuthenticated])
def whisky_sell(request):
    query = WhiskyDetail.objects.filter(SellerID=request.user)
    response_data = query.values(
        'ItemID', 'AuctionStatus', 'EndTime', 'Description', 'HighestBid')
    return Response(list(response_data), status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([PostOnlyAuthenticated])
def get_user_details(request):
    try:
        user = User.objects.get(id=request.user.pk)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
