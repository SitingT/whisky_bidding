from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

from datetime import datetime
from django.utils import timezone
from rest_framework.decorators import api_view
from .models import WhiskyDetail
from .serializers import WhiskyDetailSerializer
from datetime import datetime
from dateutil.parser import parse as parse_datetime
from django.db.models import Q


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


@api_view(['GET'])
def active_whisky_list(request):
    # Get current time
    now = timezone.now()

    # Optional category parameter from the request
    category = request.query_params.get('category', None)

    # Start with all whiskies that have 'Active' status
    query = WhiskyDetail.objects.filter(AuctionStatus='Active')

    # If a category is specified, further filter the active whiskies by that category
    if category in ['Scotch', 'Bourbon', 'Japanese', 'Irish']:
        query = query.filter(Category=category)

    still_active_whiskies = []

    for whisky in query:
        # Check if the whisky's auction is still active based on the end time
        if whisky.EndTime >= now:
            still_active_whiskies.append(whisky)
        else:
            # If the end time is past, update the auction status to 'Inactive'
            whisky.AuctionStatus = 'Inactive'
            whisky.save()

    # Serialize the whiskies that are still active
    serializer = WhiskyDetailSerializer(still_active_whiskies, many=True)

    # Return the serialized data
    return Response(serializer.data, status=status.HTTP_200_OK)
