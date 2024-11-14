import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'DIANSProject.settings')
django.setup()

from filter1 import *
from filter2 import *
from filter3 import *

async def run_pipeline(url):
    dropdown_values = fetch_codes(url)

    await fetch_all_data(dropdown_values)

    await process_missing_data(dropdown_values)

start_time = time.time()
base_url = "https://www.mse.mk/en/stats/symbolhistory/kmb"
asyncio.run(run_pipeline(base_url))
end_time = time.time()
elapsed_time = end_time - start_time
print(f"Time taken to fetch dropdown values and save to database: {elapsed_time:.2f} seconds")