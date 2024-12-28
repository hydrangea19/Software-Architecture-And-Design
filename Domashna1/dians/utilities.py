from datetime import datetime, timedelta, date
from dateutil.relativedelta import relativedelta
from Domashna1.dians.models import Issuer
from asgiref.sync import sync_to_async

def generate_date_ranges(start_years_ago=10):
    end_date = datetime.now()
    start_date = end_date - relativedelta(years=start_years_ago)
    date_ranges = []

    current_start_date = start_date
    while current_start_date < end_date:
        current_end_date = current_start_date + relativedelta(years=1)
        if current_end_date > end_date:
            current_end_date = end_date

        date_ranges.append((
            current_start_date.strftime('%Y-%m-%d'),
            current_end_date.strftime('%Y-%m-%d')
        ))

        current_start_date = current_end_date

    return date_ranges

def safe_float(value, default_value=0.0):
    try:
        value = value.strip().replace(',', '')
        value = value.replace(',', '.')
        return float(value)
    except (ValueError, AttributeError):
        return 0.0

def convert_date_format(date):
    try:
        date_obj = datetime.strptime(date, '%m/%d/%Y')
        return date_obj.strftime('%Y-%m-%d')
    except ValueError as e:
        print(f"Error converting date: {date} - {e}")
        return None

@sync_to_async
def get_last_saved_date_for_code_sync(code):
    return Issuer.objects.filter(code=code).order_by('-date').first()

async def get_last_saved_date_for_code(code):
    last_saved = await get_last_saved_date_for_code_sync(code)
    return last_saved
def get_missing_data_periods(last_saved_date):
    today = datetime.now().date()

    if not last_saved_date:
        start_date = today - timedelta(days=365 * 10)
        return [(start_date, today)]

    missing_periods = []

    if isinstance(last_saved_date, Issuer):
        current_date = last_saved_date.date
    elif isinstance(last_saved_date, str):
        current_date = datetime.strptime(last_saved_date, "%Y-%m-%d").date()
    else:
        current_date = last_saved_date

    while current_date < today:
        next_date = current_date + timedelta(days=30)
        if next_date > today:
            next_date = today
        missing_periods.append((current_date, next_date))
        current_date = next_date

    return missing_periods


def convert_to_date(start):
    if isinstance(start, datetime):
        return start.date()
    if isinstance(start, str):
        for date_format in ['%Y-%m-%d', '%d.%m.%Y']:
            try:
                return datetime.strptime(start, date_format).date()
            except ValueError:
                continue
        raise ValueError(f"Invalid date string format: {start}")
    if isinstance(start, date):
        return start
    raise TypeError(f"Unsupported type for start: {type(start)}")
@sync_to_async
def get_existing_record(code, date):
    return Issuer.objects.filter(code=code, date=date).first()
@sync_to_async
def save_new_entry(entry):
    entry.save()
async def update_database_with_new_data(new_data):
    new_entries = []
    for record in new_data:
        print(f"Processing record: {record}")
        existing_record = await get_existing_record(record['code'], record['date'])

        if existing_record:
            print(f"Updating existing record for {record['code']} on {record['date']}")
            existing_record.code = record['code']
            existing_record.date = record['date']
            existing_record.last_transaction_price = record['last_transaction_price']
            existing_record.max_price = record['max_price']
            existing_record.min_price = record['min_price']
            existing_record.avg_price = record['avg_price']
            existing_record.percentage_change = record['percent_change']
            existing_record.quantity = record['quantity']
            existing_record.best_traded = record['best_traded']
            existing_record.total_traded = record['total_traded']
            await save_new_entry(existing_record)

        if not existing_record:
            print(f"Creating new record for {record['code']} on {record['date']}")
            new_entry = Issuer(
                code=record['code'],
                date=record['date'],
                last_transaction_price=record['last_transaction_price'],
                max_price=record['max_price'],
                min_price=record['min_price'],
                avg_price=record['avg_price'],
                percentage_change=record['percent_change'],
                quantity=record['quantity'],
                best_traded=record['best_traded'],
                total_traded=record['total_traded']
            )
            new_entries.append(new_entry)

        else:
            pass

    if new_entries:
        await sync_to_async(Issuer.objects.bulk_create)(new_entries, ignore_conflicts=True)