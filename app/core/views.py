from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes 
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required

from rest_framework.views import APIView

from .serializers import ProductSerializer, OrderSerializer, BrandSerializer, ShippingAddressSerializer, UserSerializer, UserSerializerWithToken
from rest_framework import viewsets, generics      
from .models import Product, Order, Brand, ShippingAddress, UserAccount  
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
import stripe
stripe.api_key = 'sk_test_51MHt3GADbUssSGYMy4pzviM8j0wdMQ3Gb0ThNnTnvfo8iX7PC7i2kfbr6woEq0yfbv4ws4XVGzxuTUXqnbtkX94e00WCFZEphm'

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = UserAccount.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        print('SHECK WES', request.data)
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

   
class ProductView(viewsets.ModelViewSet):
    # edit permissions depending on customer or brand  
    # add, put, patch is brand permisson
    # get is for everybody

    permission_classes = ([ IsAuthenticatedOrReadOnly])
    serializer_class = ProductSerializer   
    queryset = Product.objects.all() 

class OrderView(viewsets.ModelViewSet): 
    permission_classes = () 
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 

class CustomerOrderView(generics.ListAPIView): 
    permission_classes = ([AllowAny]) 
    serializer_class = OrderSerializer   
    queryset = Order.objects.all() 

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(user= customer_id)
        return qs

    

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
@permission_classes([AllowAny])
def stripe_checkout(request):

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
      
      order = Order.objects.get(customer=email, is_ordered=False)
      try:
        user = UserAccount.objects.get(email=email)
      except:
         return None
      
     
      try: 
        stripe.PaymentIntent.create(
          customer=customer, 
          payment_method=payment_method_id,  
          currency='gbp', 
          amount=int(order.total_price * 100),
          confirm=True
      ) 
        order.user = user if user else None # if they arent a registered user than they are a guest and we will just use email
        order.is_ordered = True
        order.save()

      except:
        print('SOME ERROR WITH FINDING THIS ')

      return Response(status=status.HTTP_200_OK, 
        data={'message': 'Success', 'data': {
          'customer_id': customer.id, 'extra_msg': extra_msg, }
      })