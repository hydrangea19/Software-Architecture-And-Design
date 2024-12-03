from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Domashna1.dians.models import Issuer
from Domashna1.dians.serializers import IssuerSerialzer
from rest_framework.pagination import PageNumberPagination

class IssuerPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

#get issues

@api_view(['GET'])
def get_issuers(request):
    issuers = Issuer.objects.all()
    paginator = IssuerPagination()
    result_page = paginator.paginate_queryset(issuers, request)
    serializer = IssuerSerialzer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
def add_issuer(request):
    serializer = IssuerSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_issuer(request, id):
    try:
        issuer = Issuer.objects.get(id=id)
    except Issuer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = IssuerSerialzer(issuer)
    return Response(serializer.data)

@api_view(['PUT'])
def update_issuer(request, id):
    try:
        issuer = Issuer.objects.get(id=id);
    except Issuer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = IssuerSerialzer(issuer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_issuer(request, id):
    try:
        issuer = Issuer.objects.get(id=id);
        issuer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Issuer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)





