FROM python:3.12

ARG APP_PORT
ARG POETRY_VERSION

ARG LOAD_INITIAL_DATA

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

ENV POETRY_NO_INTERACTION=1
ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

COPY . .
RUN pip install poetry==${POETRY_VERSION}
RUN poetry install

EXPOSE ${BACKEND_PORT}