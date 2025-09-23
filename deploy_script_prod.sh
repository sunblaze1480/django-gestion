#!/bin/bash
set -e

#Set variables

APP_DIR="/www/venta_django/django-gestion/"
ENV_PATH="$APP_DIR/venv/bin/activate"
BRANCH="master"

echo " Location -> $APP_DIR "
echo " Env File -> $ENV_PATH"
echo " Branch -> $BRANCH"

export DJANGO_SETTINGS_MODULE=web_ventas.settings.production
export DOTENV_PATH="$APP_DIR/.env"
export LOG_PATH="/opt/web_ventas/logs/log-prod.log"

# Process

cd "$APP_DIR"

git pull origin $BRANCH
echo "Pulled from $BRANCH branch"

source "$ENV_PATH"
echo "Activated virtual environment"

cd web_ventas 

echo "Django Tasks -> CollectStatic, Makemigrations, Migrate"
python manage.py collectstatic --noinput
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Restarting services..."
sudo systemctl restart nginx
sudo systemctl restart django_app

echo "Complete"
