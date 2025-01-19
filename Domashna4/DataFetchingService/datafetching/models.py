from django.db import models

# Create your models here.

class Issuer(models.Model):
    class Meta:
        db_table = 'issuers'

    code = models.CharField(max_length=15)
    date = models.DateField()
    last_transaction_price = models.DecimalField(max_digits=20, decimal_places=3)
    max_price = models.DecimalField(max_digits=20, decimal_places=3)
    min_price = models.DecimalField(max_digits=20, decimal_places=3)
    avg_price = models.DecimalField(max_digits=20, decimal_places=3)
    percentage_change = models.DecimalField(max_digits=20, decimal_places=3)
    quantity = models.DecimalField(max_digits=20, decimal_places=3)
    best_traded = models.DecimalField(max_digits=20, decimal_places=3)
    total_traded = models.DecimalField(max_digits=20, decimal_places=3)

    def __str__(self):
        return self.code
