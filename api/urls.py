from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path('user/login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('users/profile', views.getUserProfile, name='user-profile'),
    path('users/', views.getUsers, name='users'),
    path('products/', views.getProducts, name='products'),
    path('products/<str:pk>/', views.getProduct, name='product')
]
