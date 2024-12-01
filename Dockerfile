#Frontend
FROM node:18-alpine3.18 AS builder

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app/frontend

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

RUN yarn install &&\
    yarn build && rm -r node_modules/ && rm -r venv/ || true

#For Backend Container
FROM python:3.11

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN apt-get update && apt-get install -y -q --no-install-recommends \
        apt-transport-https \
        binutils \
        build-essential \
        ca-certificates \
        curl \
        gdal-bin \
        git \
        libproj-dev \
        libssl-dev \
        libpq-dev \
        libcurl4-openssl-dev \
        wget \
        gcc postgresql \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/app /app
RUN mkdir -p /app/logs && mkdir -p /media && mkdir -p /static
WORKDIR /app
RUN pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org --no-cache-dir -r requirements.txt \
    && pip install gunicorn --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host=files.pythonhosted.org
