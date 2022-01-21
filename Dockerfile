FROM python:3.10

ENV PYTHONUNBUFFERED 1

WORKDIR app/api

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . app/api