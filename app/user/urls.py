"""
URL mappings for the user API.
"""
from django.urls import path

from user import views


app_name = 'user'

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),

    # path('create/', views.CreateUserView.as_view(), name='create'),
    # path('token/', views.CreateTokenView.as_view(), name='token'),
    # path('me/', views.ManageUserView.as_view(), name='me'),
]