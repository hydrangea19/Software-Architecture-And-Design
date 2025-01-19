from django.shortcuts import render

# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .pipeline import run_pipeline
from asgiref.sync import sync_to_async
from django.http import JsonResponse


@api_view(['POST'])
async def trigger_data_fetch(request):
    try:
        await run_pipeline()
        return Response({"status": "Data fetching completed successfully"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)