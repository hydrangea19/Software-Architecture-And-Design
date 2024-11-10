from utilities import get_missing_data_periods
from filter2 import fetch_data_for_code
from dians.models import Issuer
import asyncio
import aiohttp
from utilities import get_last_saved_date_for_code, update_database_with_new_data
from asgiref.sync import sync_to_async

base_url = "https://www.mse.mk/en/stats/symbolhistory/kmb"
async def fetch_missing_data_for_code(session, url, last_saved_date, code):
    missing_periods = get_missing_data_periods(last_saved_date)
    all_data = []

    for start_date, end_date in missing_periods:
        print(f"Fetching data for {code} from {start_date} to {end_date}")
        data = await fetch_data_for_code(session, url, start_date, end_date, code)
        all_data.extend(data)

    return all_data

async def process_missing_data(dropdown_values):
    async with aiohttp.ClientSession() as session:
        tasks = []

        for code in dropdown_values:
            last_saved_date = await get_last_saved_date_for_code(code)

            task = fetch_missing_data_for_code(session, base_url, last_saved_date, code)
            tasks.append(task)

        results = await asyncio.gather(*tasks)

        all_data = [item for sublist in results for item in sublist]

        await update_database_with_new_data(all_data)

    print("Missing data fetched and database updated.")