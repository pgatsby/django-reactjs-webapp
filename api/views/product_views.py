from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from api.models import Product
from api.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        brand='Sample Brand',
        category='Sample Category',
        description='',
        price=0,
        countInStock=0
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data['productName']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.price = data['price']
    product.countInStock = data['countInStock']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response({'detail': f'Product[{pk}] was deleted.'})


@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request, pk):
    files = request.FILES

    product = Product.objects.get(id=pk)

    product.image = files.get('image')
    product.save()

    return Response({'detail': f'Product[{pk}] image uploaded.'})
