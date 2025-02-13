#!/bin/bash

# Run migrations
python manage.py migrate

# Run moch data in db
if [ "${ENVIRONMENT}" == "development" ]; then
  python manage.py shell < mockData.py
fi

exec gunicorn --bind 0.0.0.0:8000 my_project.wsgi:application
