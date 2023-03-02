from django.shortcuts import render

from .serializers import ProductSerializer, OrderSerializer, BrandSerializer
from rest_framework import viewsets, generics      
from .models import Product, Order, Brand     
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS



class ProductView(viewsets.ModelViewSet):
    # edit permissions depending on customer or brand  
    # add, put, patch is brand permisson
    # get is for everybody

    permission_classes = ()
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 

class OrderView(viewsets.ModelViewSet): 
    permission_classes = () 
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 

class BrandView(generics.ListAPIView): 
    # add permissions to access this only for TRCE ADMINS
    permission_classes = ()
    serializer_class = BrandSerializer
    queryset = Brand.objects.all() 

class CustomerView(generics.ListAPIView): 
    # add permissions to access this only for TRCE ADMINS
    permission_classes = ()
    serializer_class = BrandSerializer
    queryset = Brand.objects.all() 