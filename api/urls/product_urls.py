from django.urls import path
from api.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('featured/', views.getFeaturedProducts, name='featured-product'),
    path('create/', views.createProduct, name='create-product'),
    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),
    path('<str:pk>/upload/image/', views.uploadImage, name="image-upload"),
    path('<str:pk>/', views.getProduct, name='product'),
    path('update/<str:pk>/', views.updateProduct, name='update-product'),
    path('delete/<str:pk>/', views.deleteProduct, name='delete-product'),
]
