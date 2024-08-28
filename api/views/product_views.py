from django.db.models import Avg
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.models import Product, Review
from api.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword') or ''
    page = request.query_params.get('page') or 1

    products = Product.objects.filter(name__icontains=query)

    paginator = Paginator(products, 2)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getFeaturedProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    
    serializer = ProductSerializer(products, many=True)
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)

    data = request.data

    exists = product.review_set.filter(user=user).exists()
    if exists:
        return Response({'detail': f'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        return Response({'detail': f'Please select a rating'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        Review.objects.create(
            user=user,
            product=product,
            username=user.username,
            rating=data['rating'],
            comment=data['comment']

        )

        product.numReviews = product.review_set.count()
        product.rating = product.review_set.aggregate(
            average=Avg('rating'))['average'] or 0

        product.save()

        return Response({'detail': f'Product[{pk}] review created'})
