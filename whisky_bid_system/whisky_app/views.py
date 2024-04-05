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
    start_time_str = data.get('StartTime', '')
    if start_time_str:
        start_time = parse_datetime(start_time_str)
        if start_time <= timezone.now():
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
