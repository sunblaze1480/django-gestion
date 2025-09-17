#!/bin/bash
set -e

cd /www/venta_django/django-gestion

git pull origin master

source venv/bin/activate

cd web_ventas 

python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py collectstatic --noinput

sudo systemctl restart nginx
sudo systemctl restart django_app

