from django.db import models
from django.contrib.auth.models import User

import uuid
import os
from django.utils import timezone


def product_image_file_path(instance, filename):
    """Generate file path for new product image."""
    ext = os.path.splitext(filename)[1]
    filename = f'{uuid.uuid4()}{ext}'

    return os.path.join('uploads', 'items', filename)


CATEGORY = (
    ('S', 'Shirt'),
    ('SP', 'Sport Wear'),
    ('OW', 'Out Wear')
)

LABEL = (
    ('NA', 'New Arrival'),
    ('BS', 'Best Seller'),
    ('TR', 'Top Rated')
)

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,  default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    # countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(default=timezone.now)
    uuid = models.UUIDField(primary_key=True, editable=False,  db_index=True, default=uuid.uuid4())

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(default=timezone.now)
    uuid = models.UUIDField(primary_key=True, editable=False,  db_index=True, default=uuid.uuid4())

    def __str__(self):
        return str(self.createdAt)

# class OrderItem(models.Model):
#     product = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     qty = models.IntegerField(null=True, blank=True, default=0)
#     price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
#     image = models.CharField(max_length=200, null=True, blank=True)
#     uuid = models.UUIDField(default=uuid.uuid4(), primary_key=True, db_index=True, editable=False)

#     def __str__(self):
#         return str(self.name)

# class Review(models.Model):
#     product = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     rating = models.IntegerField(null=True, blank=True, default=0)
#     comment = models.TextField(null=True, blank=True)
#     createdAt = models.DateTimeField(default=timezone.now)
#     uuid = models.UUIDField(default=uuid.uuid4(), primary_key=True, db_index=True, editable=False)

#     def __str__(self):
#         return str(self.rating)

# class ShippingAddress(models.Model):
#     order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
#     address = models.CharField(max_length=200, null=True, blank=True)
#     city = models.CharField(max_length=200, null=True, blank=True)
#     postalCode = models.CharField(max_length=200, null=True, blank=True)
#     country = models.CharField(max_length=200, null=True, blank=True)
#     shippingPrice = models.DecimalField(
#         max_digits=7, decimal_places=2, null=True, blank=True)
#     uuid = models.UUIDField(default=uuid.uuid4(), primary_key=True, db_index=True, editable=False)

#     def __str__(self):
#         return str(self.address)




# class BrandStore(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.CharField(max_length=255)
#     products = models.ForeignKey('Product', on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name



