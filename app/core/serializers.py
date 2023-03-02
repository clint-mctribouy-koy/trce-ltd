from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import Product, Order, UserAccount, Brand
from djoser.serializers import UserCreateSerializer


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

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'
