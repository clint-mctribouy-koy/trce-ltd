from django.urls import path, include, re_path

from user import views


app_name = 'user'

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),

    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),

    # path('create/', views.CreateUserView.as_view(), name='create'),
    # path('token/', views.CreateTokenView.as_view(), name='token'),
    # path('me/', views.ManageUserView.as_view(), name='me'),
]