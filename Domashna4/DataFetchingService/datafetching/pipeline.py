import asyncio

import aiohttp

from .scraper import WebScrapingStrategy
from .datamanager import update_database_with_new_data
from .datamanager import get_last_saved_date_for_code_sync
from .utilities import generate_date_ranges, convert_to_date


async def fetch_all_data(strategy, dropdown_values):
    date_ranges = generate_date_ranges(start_years_ago=10)
    async with aiohttp.ClientSession() as session:
        tasks = []
        for code in dropdown_values:
            last_saved_date = await get_last_saved_date_for_code_sync(
                code)
            if last_saved_date:
                date_ranges = [
                    (start, end)
                    for start, end in date_ranges
                    if convert_to_date(start) > last_saved_date.date
                ]

            for start_date, end_date in date_ranges:
                task = strategy.fetch_data_for_code(
                    session, strategy.base_url,
                    start_date, end_date, code
                )
                tasks.append(task)

        results = await asyncio.gather(*tasks)
        all_data = [item for sublist in results for item in sublist]
        await update_database_with_new_data(all_data)
        return all_data


async def run_pipeline():
    url = "https://www.mse.mk/en/stats/symbolhistory/kmb"
    strategy = WebScrapingStrategy(base_url=url)
    dropdown_values = strategy.fetch_codes(url)
    await fetch_all_data(strategy, dropdown_values)
