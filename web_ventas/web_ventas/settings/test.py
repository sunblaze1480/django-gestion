from .base import *

# Testing overrides
DEBUG = True
#If not found enforce test database
DB_INSTANCE = os.environ.get("DB_INSTANCE", "db_test.sqlite3")
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / DB_INSTANCE,
    }
}

STATIC_FOLDER = os.environ.get('STATIC_FOLDER', 'staticfiles_test')
STATIC_ROOT = os.path.join(BASE_DIR, STATIC_FOLDER)
MEDIA_ROOT = BASE_DIR / "media_test"


log_path = os.environ.get("LOG_PATH") or os.path.join(BASE_DIR, "logs", "django.log")
log_level = os.environ.get("LOG_LEVEL")
