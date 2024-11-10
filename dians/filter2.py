from datetime import datetime, timedelta
import asyncio
import aiohttp
import requests
from selectolax.parser import HTMLParser
import re
import time
from dians.utilities import generate_date_ranges, safe_float, convert_date_format, get_last_saved_date_for_code, convert_to_date, update_database_with_new_data
from dians.models import Issuer

base_url = "https://www.mse.mk/en/stats/symbolhistory/kmb"
async def fetch_data_for_code(session, url, start_date, end_date, code):
    data = {
        'FromDate': start_date,
        'ToDate': end_date,
        'Code': code
    }

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': url,
        'Origin': 'https://www.mse.mk',
        'Cookie': 'ASP.NET_SessionId=xd0x2sqdjwngjodvvf3px1vj; CookiesConsent=Accepted; __utma=121194900.609089911.1731145723.1731145723.1731145723.1; __utmb=121194900.17.10.1731145723; __utmc=121194900; __utmz=121194900.1731145723.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmt=1'
    }

    async with session.post(url, data=data, headers=headers) as response:
        if response.status == 200:
            print(f"Data fetched successfully for {code}: {start_date} to {end_date}")

            page = await response.text()
            tree = HTMLParser(page)

            rows = tree.css('table tr')
            data = []

            for row in rows:
                cells = row.css('td')
                if len(cells) > 8:
                    date = convert_date_format(cells[0].text())
                    last_transaction_price = safe_float(cells[1].text())
                    max_price = safe_float(cells[2].text())
                    min_price = safe_float(cells[3].text())
                    avg_price = safe_float(cells[4].text())
                    percent_change = safe_float(cells[5].text().replace(',', '.'))
                    quantity = safe_float(cells[6].text())
                    best_traded = safe_float(cells[7].text())
                    total_traded = safe_float(cells[8].text())

                    if total_traded > 0 and quantity > 0:
                        data.append({
                            "code": code,
                            "date": date,
                            "last_transaction_price": last_transaction_price,
                            "max_price": max_price,
                            "min_price": min_price,
                            "avg_price": avg_price,
                            "percent_change": percent_change,
                            "quantity": quantity,
                            "best_traded": best_traded,
                            "total_traded": total_traded,

                        })
            return data
        else:
            print(f"Error fetching data for {start_date} to {end_date} and code {code}: {response.status}")
            return []


async def fetch_all_data(dropdown_values):
    date_ranges = generate_date_ranges(start_years_ago=10)

    async with aiohttp.ClientSession() as session:
        tasks = []

        for code in dropdown_values:

            last_saved_date = await get_last_saved_date_for_code(code)
            print(f"Last saved date for {code}: {last_saved_date}")
            print(f"Date ranges after filtering: {date_ranges}")
            if last_saved_date:
                date_ranges = [(start, end) for start, end in date_ranges if convert_to_date(start) > last_saved_date.date]

            for start_date, end_date in date_ranges:
                task = fetch_data_for_code(session, base_url, start_date, end_date, code)
                tasks.append(task)

        results = await asyncio.gather(*tasks)
        all_data = [item for sublist in results for item in sublist]

        await update_database_with_new_data(all_data)

        print(f"Fetched {len(all_data)} records")

        for record in all_data:
            print(record)

    return all_data

