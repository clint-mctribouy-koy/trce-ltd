from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from .serializers import ProductSerializer 
from rest_framework import viewsets      
from .models import Product             

class ProductView(viewsets.ModelViewSet):  
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 