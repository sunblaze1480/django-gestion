#!/bin/bash
set -e

#Set variables

APP_DIR="/var/www/web-ventas-test/django-gestion"
ENV_PATH="$APP_DIR/venv/bin/activate"
BRANCH="dev"

echo " Location -> $APP_DIR"
echo " Env File -> $ENV_PATH"
echo " Branch -> $BRANCH"

export DJANGO_SETTINGS_MODULE=web_ventas.settings.test
export DOTENV_PATH="$APP_DIR/.env"

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
sudo systemctl restart django_app_test

echo "Complete"
