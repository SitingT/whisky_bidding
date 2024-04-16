"""
URL configuration for whisky_bid_system project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from whisky_app import views


urlpatterns = [
    # path('create_user/', views.UserCreate.as_view(), name='create_user'),
    path('whisky/create/', views.whisky_create, name='whisky-create'),
    path('whisky/active/', views.active_whisky_list, name='active_whisky_list'),
    path('whisky/<int:item_id>/highest_bid/',
         views.whisky_highest_bid, name='whisky_highest_bid'),
    path('bid/create/', views.create_bid, name='create-bid'),
    path('customer/bids_status/',
         views.customer_bids_win_lose_status, name='customer_bids_status'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('whisky/report/', views.whisky_report, name='whisky_report'),
    path('whisky/sell/',  views.whisky_sell, name='whisky_sell'),
    path('whisky/transaction/create/',
         views.create_transaction, name='create_transaction'),
    path('user/details/', views.get_user_details, name='user-details'),
    path('user/transactions/buyer/', views.buyer_transactions,
         name='buyer_transactions'),
    path('user/transactions/seller/', views.seller_transactions,
         name='seller_transactions'),
    path('reviews/create', views.create_review, name='create_review'),
    path('api/reviews/reviewee/', views.get_reviews_by_reviewee,
         name='get_reviews_by_reviewee'),
    path('api/reviews/auth-user/', views.get_auth_user_reviews,
         name='get_auth_user_reviews'),
    path('api/reviews/delete/<int:review_id>/',
         views.soft_delete_review, name='soft_delete_review'),
]
