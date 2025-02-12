from rest_framework import serializers
from .models import Issuer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class IssuerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issuer
        fields = "__all__"


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser

        return token
