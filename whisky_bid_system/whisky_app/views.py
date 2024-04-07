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
    # Normalize the 'category' parameter to handle different capitalizations
    category_query = request.query_params.get('category', None)
    if category_query:
        category = category_query.capitalize()
    else:
        category = None  # Ensure category is None if not provided

    VALID_CATEGORIES = ['Scotch', 'Bourbon', 'Japanese', 'Irish']

    # Initialize the query with all objects, filtering out only those with EndTime greater than now
    query = WhiskyDetail.objects.filter(AuctionStatus='Active')

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
