from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render

from user.serializers import UserSerializerWithToken
from .serializers import ProductSerializer, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import viewsets      
from .models import Product, Order     
from rest_framework_simplejwt.views import TokenObtainPairView


class ProductView(viewsets.ModelViewSet): 
    permission_classes = ()
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 

class OrderView(viewsets.ModelViewSet): 
    permission_classes = () 
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 
