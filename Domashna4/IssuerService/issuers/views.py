from django.shortcuts import render
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
import requests
from .filterset import IssuerFilter
from .models import Issuer
from .serializers import IssuerSerializer, CustomTokenObtainPairSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class IssuerPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

#get issuers

@api_view(['GET'])
def get_issuers(request):
    issuers = Issuer.objects.all()
    filterset = IssuerFilter(request.GET, queryset=issuers)
    if filterset.is_valid():
        issuers = filterset.qs
    else:
        return Response(filterset.errors, status=status.HTTP_400_BAD_REQUEST)

    search_query = request.GET.get('search', None)
    if search_query:
        issuers = issuers.filter(code__icontains=search_query)

    ordering = request.GET.get('ordering', None)
    if ordering:
        issuers = issuers.order_by(ordering)

    paginator = IssuerPagination()
    result_page = paginator.paginate_queryset(issuers, request)
    serializer = IssuerSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_issuer(request):
    if not request.user.is_staff:
        return JsonResponse({"error": "Only admins can add issuers"}, status=403)

    serializer = IssuerSerializer(data=request.data)
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
    serializer = IssuerSerializer(issuer)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_issuer(request, id):
    if not request.user.is_staff:
        return JsonResponse({"error": "Only admins can edit issuers"}, status=403)
    try:
        issuer = Issuer.objects.get(id=id);
    except Issuer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = IssuerSerializer(issuer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_issuer(request, id):
    if not request.user.is_staff:
        return JsonResponse({"error": "Only admins can delete issuers"}, status=403)
    try:
        issuer = Issuer.objects.get(id=id);
        issuer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Issuer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_issuer_data(request, code):

    field = request.query_params.get('field')
    if not field:
        return Response({"error": "Field parameter is required."}, status=400)


    valid_fields = [
        'last_transaction_price',
        'max_price',
        'min_price',
        'avg_price',
        'percentage_change',
        'quantity',
        'best_traded',
        'total_traded',
    ]
    if field not in valid_fields:
        return Response({"error": "Invalid field parameter."}, status=400)


    data = Issuer.objects.filter(code__iexact=code).order_by('date').values('date', field)

    if not data:
        raise Http404("No data found for the given code.")

    return Response(list(data), status=200)

@api_view(['GET'])
def get_unique_codes(request):
    try:
        unique_codes = Issuer.objects.values_list('code', flat=True).distinct()
        return JsonResponse(list(unique_codes), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
def trigger_data_fetch_from_issuer(request):
    datafetching_service_url = "http://localhost:8001/api/trigger-data-fetch/"

    try:
        response = requests.post(datafetching_service_url)

        if response.status_code == 200:
            return Response({"status": "Data fetching triggered successfully"}, status=200)
        else:
            return Response({"error": "Failed to trigger data fetching"}, status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=500)