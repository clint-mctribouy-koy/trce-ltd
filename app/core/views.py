from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status



from .serializers import ProductSerializer, OrderSerializer, BrandSerializer, ShippingAddressSerializer
from rest_framework import viewsets, generics      
from .models import Product, Order, Brand, ShippingAddress    
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

import stripe
stripe.api_key = 'sk_test_51MHt3GADbUssSGYMy4pzviM8j0wdMQ3Gb0ThNnTnvfo8iX7PC7i2kfbr6woEq0yfbv4ws4XVGzxuTUXqnbtkX94e00WCFZEphm'

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

class ShippingAddressView(generics.ListAPIView): 
    # add permissions to access this only for TRCE ADMINS
    permission_classes = ()
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddress.objects.all() 

class CustomerView(generics.ListAPIView): 
    # add permissions to access this only for TRCE ADMINS
    permission_classes = ()
    serializer_class = BrandSerializer
    queryset = Brand.objects.all() 


@api_view(['POST'])
def save_stripe_info(request):
  data = request.data
  email = data['email']
  payment_method_id = data['payment_method_id']
  extra_msg = '' # add new variable to response message
  # checking if customer with provided email already exists
  customer_data = stripe.Customer.list(email=email).data   
 
  # if the array is empty it means the email has not been used yet  
  if len(customer_data) == 0:
    # creating customer
    customer = stripe.Customer.create(
    email=email, payment_method=payment_method_id)
  else:
    customer = customer_data[0]
    extra_msg = "Customer already exists."
  
  stripe.PaymentIntent.create(
    customer=customer, 
    payment_method=payment_method_id,  
    currency='gbp', 
    amount=1200,
    confirm=True
) 

  
  return Response(status=status.HTTP_200_OK, 
    data={'message': 'Success', 'data': {
      'customer_id': customer.id, 'extra_msg': extra_msg, }
   })