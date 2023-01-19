from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from .serializers import ProductSerializer, OrderSerializer
from rest_framework import viewsets      
from .models import Item, Order             

class ProductView(viewsets.ModelViewSet):  
    serializer_class = ProductSerializer   
    queryset = Item.objects.all() 

class OrderView(viewsets.ModelViewSet):  
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 