from datetime import datetime, timedelta
import asyncio
import aiohttp
import requests
from selectolax.parser import HTMLParser
import re
import time
from dians.utilities import generate_date_ranges

base_url = "https://www.mse.mk/en/stats/symbolhistory/kmb"


def fetch_codes(url):
    start_time = time.time()

    response = requests.get(url)
    if response.status_code == 200:

        tree = HTMLParser(response.text)

        dropdown = tree.css_first('select.form-control.dropdown')
        if dropdown:
            dropdown_values = [option.attributes['value'] for option in dropdown.css('option')
                               if 'value' in option.attributes and not any(char.isdigit() for char in option.attributes['value'])]
        else:
            print("Dropdown not found.")
            dropdown_values = []
    else:
        print(f"Error fetching dropdown values: {response.status_code}")
        dropdown_values = []

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Time taken to fetch dropdown values: {elapsed_time:.2f} seconds")
    print(dropdown_values)

    return dropdown_values


