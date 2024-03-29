"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from core import views
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path,include               
from rest_framework import routers   
from django.views.generic import TemplateView              

router = routers.DefaultRouter()                   
router.register(r'products', views.ProductView, 'product')
router.register(r'orders', views.OrderView, 'order')







urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    path('api/users/', include('core.urls.user_urls')),
    path('api/brands/', views.BrandView.as_view(), name='brands' ),
    path('api/customers/', views.CustomerView.as_view(), name='customers' ),
    path('api/address/', views.ShippingAddressView.as_view(),  name='address' ),
    path('payments/', views.stripe_checkout, name='payments' ),
    # path('api/orders/', views.OrderView.as_view(), name='orders' ),
    path('api/<int:pk>/orders/', views.CustomerOrderView.as_view())

  
] 
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



