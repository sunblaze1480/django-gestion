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