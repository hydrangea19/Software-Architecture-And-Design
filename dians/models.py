from django.db import models

# Create your models here.

class Issuer(models.Model):

    code = models.CharField(max_length=15)
    date = models.DateField()
    last_price = models.DecimalField(max_digits=15,decimal_places=3)
    maximum = models.DecimalField(max_digits=15,decimal_places=3)
    minimum = models.DecimalField(max_digits=15, decimal_places=3)
    average_price = models.DecimalField(max_digits=15, decimal_places=3)
    percentage_change = models.DecimalField(max_digits=15, decimal_places=3)
    volume = models.IntegerField()
    turnover_best = models.IntegerField()
    total_turnover = models.IntegerField()

    def __str__(self):
        return self.code







