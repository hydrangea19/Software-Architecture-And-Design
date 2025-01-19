from asgiref.sync import sync_to_async
from .models import Issuer
from .utilities import get_existing_record

@sync_to_async
def get_last_saved_date_for_code_sync(code):
    return Issuer.objects.filter(code=code).order_by('-date').first()

@sync_to_async
def save_new_entry(entry):
    entry.save()

async def update_database_with_new_data(new_data):
    new_entries = []
    for record in new_data:
        existing_record = await get_existing_record(record['code'], record['date'])

        if existing_record:
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
        else:
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

    if new_entries:
        await sync_to_async(Issuer.objects.bulk_create)(new_entries, ignore_conflicts=True)