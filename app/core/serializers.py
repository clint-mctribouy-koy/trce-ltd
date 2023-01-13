from rest_framework import serializers
from .models import Item

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('uuid','item_name', 'description', 'price', 'image')