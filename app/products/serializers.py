"""
Serializers for product APIs
"""
from core.models import Product
from rest_framework import serializers



class ProductSerializer(serializers.ModelSerializer):
    """Serializer for recipes."""
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'link']
        read_only_fields = ['id']

class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to products."""
    class Meta:
        model = Product
        fields = ['id', 'image']
        read_only_fields = ['id']
        extra_kwargs = {'image': {'required': 'True'}}