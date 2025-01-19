import requests
from selectolax.parser import HTMLParser
from .utilities import safe_float, convert_date_format


class DataFetchingStrategy:
    def fetch_codes(self, url):
        raise NotImplementedError

    def fetch_data_for_code(self, session, url, start_date, end_date, code):
        raise NotImplementedError


class WebScrapingStrategy(DataFetchingStrategy):
    def __init__(self, base_url):
        self.base_url = base_url

    def fetch_codes(self, url):
        response = requests.get(url)
        dropdown_values = []
        if response.status_code == 200:
            tree = HTMLParser(response.text)
            dropdown = tree.css_first('select.form-control.dropdown')
            if dropdown:
                dropdown_values = [option.attributes['value'] for option in dropdown.css('option') if 'value' in option.attributes]
        return dropdown_values

    async def fetch_data_for_code(self, session, url, start_date, end_date, code):
        data = {
            'FromDate': start_date,
            'ToDate': end_date,
            'Code': code
        }

        headers = {
            'User-Agent': 'Mozilla/5.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': url,
            'Origin': 'https://www.mse.mk',
        }

        async with session.post(url, data=data, headers=headers) as response:
            if response.status == 200:
                page = await response.text()
                tree = HTMLParser(page)
                rows = tree.css('table tr')
                data = []
                for row in rows:
                    cells = row.css('td')
                    if len(cells) > 8:
                        data.append({
                            "code": code,
                            "date": convert_date_format(cells[0].text()),
                            "last_transaction_price": safe_float(cells[1].text()),
                            "max_price": safe_float(cells[2].text()),
                            "min_price": safe_float(cells[3].text()),
                            "avg_price": safe_float(cells[4].text()),
                            "percent_change": safe_float(cells[5].text().replace(',', '.')),
                            "quantity": safe_float(cells[6].text()),
                            "best_traded": safe_float(cells[7].text()),
                            "total_traded": safe_float(cells[8].text()),
                        })
                return data
            return []