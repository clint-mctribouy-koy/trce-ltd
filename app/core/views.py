from django.shortcuts import render

from .serializers import ProductSerializer, OrderSerializer
from rest_framework import viewsets      
from .models import Product, Order     


class ProductView(viewsets.ModelViewSet): 
    permission_classes = ()
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 

class OrderView(viewsets.ModelViewSet): 
    permission_classes = () 
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 
