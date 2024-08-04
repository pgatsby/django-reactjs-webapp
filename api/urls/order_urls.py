from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('create/', views.createOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderById, name='user-order')
]
