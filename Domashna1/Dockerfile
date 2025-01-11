FROM python:3.10


WORKDIR /app

COPY Domashna1/requirements.txt /app/

RUN python -m venv /dians

RUN /dians/bin/pip install --upgrade pip

RUN /dians/bin/pip install -r /app/requirements.txt

COPY . /app/

EXPOSE 8000

ENV PYTHONUNBUFFERED 1

CMD ["dians/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
