from django.urls import path
from api.views import user_views as views

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('update/', views.updateUser, name='update-user'),
    path('update/<str:pk>/', views.updateUserById, name='admin-update-user'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('delete/<str:pk>/', views.deleteUser, name='admin-delete-user'),
    path('<str:pk>/', views.getUserById, name='user'),
    path('', views.getUsers, name='users'),
]
