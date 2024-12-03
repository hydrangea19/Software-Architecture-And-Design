from rest_framework import serializers
from Domashna1.dians.models import Issuer

class IssuerSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Issuer
        fields =  "__all__"