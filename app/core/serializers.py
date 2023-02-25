from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import Product, Order, UserAccount
from djoser.serializers import UserCreateSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

