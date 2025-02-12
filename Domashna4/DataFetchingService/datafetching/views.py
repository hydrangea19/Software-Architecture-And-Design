
# Create your views here.

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .pipeline import run_pipeline


@api_view(['POST'])
async def trigger_data_fetch(request):
    try:
        await run_pipeline()
        return Response(
            {"status": "Data fetching completed successfully"}, status=200
        )
    except Exception as e:
        return Response({"error": str(e)}, status=500)
