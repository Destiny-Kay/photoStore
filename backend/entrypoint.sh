#!/bin/bash

# Run migrations
python manage.py migrate

python manage.py collectstatic

python manage.py populate_db

# Run moch data in db
if [ "${ENVIRONMENT}" == "development" ]; then
  python manage.py shell < mockData.py
fi

# exec gunicorn --bind 0.0.0.0:8000 backend.wsgi:application
exec python manage.py runserver 0.0.0.0:8000

