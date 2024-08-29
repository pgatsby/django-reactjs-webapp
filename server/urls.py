"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

react_app = TemplateView.as_view(template_name='index.html')

urlpatterns = [
    path('', react_app),
    path('admin/', react_app),
    path('login', react_app),
    path('register', react_app),
    path('profile', react_app),
    path('shipping', react_app),
    path('payment', react_app),
    path('placeorder', react_app),
    path('order/<str:pk>', react_app),
    path('product/<str:pk>', react_app),
    path('cart/<str:pk>', react_app),
    path('cart', react_app),
    path('admin/users', react_app),
    path('admin/user/<str:pk>/edit',
         react_app),
    path('admin/products', react_app),
    path('admin/product/<str:pk>/edit',
         react_app),
    path('admin/orders', react_app),
    path('api/admin/', admin.site.urls),
    path('api/users/', include('api.urls.user_urls')),
    path('api/products/', include('api.urls.product_urls')),
    path('api/orders/', include('api.urls.order_urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
