from rest_framework import serializers
from .models import Item

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('item_name', 'description', 'price')