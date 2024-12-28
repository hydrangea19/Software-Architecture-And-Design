from django_filters import rest_framework as filters
from .models import Issuer

class IssuerFilter(filters.FilterSet):
    code = filters.CharFilter(field_name='code', lookup_expr='icontains')
    date = filters.DateFilter(field_name='date', lookup_expr='exact')
    min_price = filters.NumberFilter(field_name='min_price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='max_price', lookup_expr='lte')
    avg_price = filters.NumberFilter(field_name='avg_price', lookup_expr='exact')
    percentage_change = filters.NumberFilter(field_name='percentage_change', lookup_expr='exact')
    quantity = filters.NumberFilter(field_name='quantity', lookup_expr='exact')
    best_traded = filters.NumberFilter(field_name='best_traded', lookup_expr='exact')
    total_traded = filters.NumberFilter(field_name='total_traded', lookup_expr='exact')

    class Meta:
        model = Issuer
        fields = ['code', 'date', 'min_price', 'max_price']