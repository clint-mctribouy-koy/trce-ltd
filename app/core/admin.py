"""
Django admin customization.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _


from core import models


admin.site.register(models.Product)
admin.site.register(models.UserAccount)
admin.site.register(models.Order)
# admin.site.register(models.Brand)
# admin.site.register(models.Customer)
# admin.site.register(models.ShippingAddress)



