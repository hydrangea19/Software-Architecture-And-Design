"""
URL configuration for IssuerService project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from issuers.views import get_issuers, \
    get_issuer, add_issuer, update_issuer, \
    delete_issuer, get_issuer_data, get_unique_codes, \
    CustomTokenObtainPairView, trigger_data_fetch_from_issuer


urlpatterns = [
    path(
        'admin/', admin.site.urls
    ),
    path(
        'issuers/', get_issuers, name="get-issuers"
    ),
    path(
        'issuers/<int:id>/', get_issuer, name='get-issuer'
    ),
    path(
        'issuers/add/', add_issuer, name='add-issuer'
    ),
    path(
        'issuers/update/<int:id>/', update_issuer, name='update-issuer'
    ),
    path(
        'issuers/delete/<int:id>/', delete_issuer, name='delete-issuer'
    ),
    path(
        'api/issuers/<str:code>/data/', get_issuer_data, name='get_issuer_data'
    ),
    path(
        'api/issuers/codes/', get_unique_codes, name='get_unique_codes'
    ),
    path(
        'api/token/',
        CustomTokenObtainPairView.as_view(), name='token_obtain_pair'
    ),
    path(
        'api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'
    ),
    path(
        'api/fetch-data/', trigger_data_fetch_from_issuer, name="fetch_data"
    ),
]
