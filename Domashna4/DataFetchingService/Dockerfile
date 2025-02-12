FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8001/health || exit 1

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8001"]