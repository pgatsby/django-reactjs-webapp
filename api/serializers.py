from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from .models import Product


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'is_staff']


class UserSerializerWithToken(UserSerializer):
    tokens = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'is_staff', 'tokens']

    def get_tokens(self, obj):
        tokens = RefreshToken.for_user(obj)

        return {
            'refresh': str(tokens),
            'access': str(tokens.access_token)
        }


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
