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

    # Fetch all active whisky details
    active_whiskies = WhiskyDetail.objects.filter(AuctionStatus='Active')

    # List to hold whiskies that are still active after checking end time
    still_active_whiskies = []

    for whisky in active_whiskies:
        if whisky.EndTime >= now:
            # Whisky auction is still active, add to list
            still_active_whiskies.append(whisky)
        else:
            # Update AuctionStatus to 'Inactive' if the end time is past
            whisky.AuctionStatus = 'Inactive'
            whisky.save()

    # Serialize the whiskies that are still active
    serializer = WhiskyDetailSerializer(still_active_whiskies, many=True)

    # Return the serialized data
    return Response(serializer.data, status=status.HTTP_200_OK)
