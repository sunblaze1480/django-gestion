from .base import *

SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Force production DB (still from ENV)
DB_INSTANCE = os.environ.get("DB_INSTANCE", "db.sqlite3")
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / DB_INSTANCE,
    }
}

STATIC_FOLDER = os.environ.get('STATIC_FOLDER', 'staticfiles_prod')
STATIC_ROOT = os.path.join(BASE_DIR, STATIC_FOLDER)
MEDIA_ROOT = BASE_DIR / "media_prod"

log_path = os.environ.get("LOG_PATH") or os.path.join(BASE_DIR, "logs", "django.log")
log_level = os.environ.get("LOG_LEVEL")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": log_level,
            "class": "logging.handlers.RotatingFileHandler",
            "filename": log_path,
            "maxBytes": 5 * 1024 * 1024,
            "backupCount": 3,
            "formatter" : "verbose"
        },
        "console": {
            "level":log_level,
            "class":"logging.StreamHandler",
            "formatter":"verbose"
        }
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": log_level,
            "propagate": True,
        },
    },
    "formatters": {
        "simple" : {
            "format": "{levelname} {asctime}: {message}",
            "style" :"{"
            },
        "verbose":{
            "format": "{levelname} {asctime} - {name} {module}.py : {lineno:d} - {message}",
            "style": "{"
        }
    }
}