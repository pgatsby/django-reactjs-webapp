from django.contrib import admin
from .models import Product, ProductReview, Order, OrderItem, ShippingAddress

# Register your models here.

admin.site.register(Product)
admin.site.register(ProductReview)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)