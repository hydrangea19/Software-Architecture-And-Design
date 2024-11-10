from django.contrib import admin
from django.utils.formats import localize

# Register your models here.

from .models import Issuer
class IssuerAdmin(admin.ModelAdmin):

    ordering = ['code', '-date']
    list_display = ['code', 'date', 'last_transaction_price', 'max_price', 'min_price', 'avg_price',
                    'percentage_change', 'quantity', 'best_traded', 'total_traded']

admin.site.register(Issuer, IssuerAdmin)




