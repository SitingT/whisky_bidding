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
]
