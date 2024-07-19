from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from rest_framework.response import Response

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken

from api.serializers import UserSerializer
from rest_framework import status


@api_view(['POST'])
def registerUser(request):

    data = request.data
    try:
        user = User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        if user:
            tokens = RefreshToken.for_user(user)

            return Response({
                'refresh': str(tokens),
                'access': str(tokens.access_token)
            })

    except:
        return Response({
            'detail': 'User with this email exists'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
