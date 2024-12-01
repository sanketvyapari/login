from pathlib import Path
import os
import yaml

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'users',
    'storages',
    'celery',
]

MIDDLEWARE = [
    'authentication.middleware.HealthCheckMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'authentication.urls'

WSGI_APPLICATION = 'authentication.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.User'

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'staticfiles/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'frontend/build', BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'authentication.context_processors.dashboard',
                'django.template.context_processors.media'
            ],
        },
    },
]

STATICFILES_DIRS = [
    BASE_DIR / 'frontend/build/static'
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(lineno)s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(lineno)s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': 'logs/debug.logs'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        },
        'django.request': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.SearchFilter', 'rest_framework.filters.OrderingFilter'),
}


STATIC_ROOT = BASE_DIR / "staticfiles"

# aws settings
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

if os.environ.get("ENVIRONMENT") == "local":
    if not os.path.isfile(os.path.join(BASE_DIR, 'env.yaml')):
        raise Exception("Please Create env.yaml file in root folder")

    with open(os.path.join(BASE_DIR, 'env.yaml')) as f:
        local_settings = yaml.load(f, Loader=yaml.FullLoader)
    globals().update(local_settings)
else:
    if not os.environ.get("SECRET_KEY") or not os.environ.get("CELERY_BROKER_URL") \
            or not os.environ.get("ALLOWED_HOSTS") \
            or not os.environ.get("CORS_ALLOWED_ORIGINS") or not os.environ.get("DB_NAME") \
            or not os.environ.get("DB_USER") or not os.environ.get("DB_PASSWORD") or not os.environ.get("DB_HOST") or \
            not os.environ.get("DB_PORT"):
        raise Exception("Please set environment variables")

    DEBUG = os.environ.get("DEBUG")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SQS_ENDPOINT = os.environ.get("SQS_ENDPOINT")
    SQS_REGION = os.environ.get("AWS_REGION")
    SQS_QUEUE_NAME = os.environ.get("CELERY_TASK_DEFAULT_QUEUE", default="default")
    BROKER_URL = os.getenv("CELERY_BROKER_URL")
    ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS").split(",")
    CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS").split(",")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ.get("DB_NAME"),
            'USER': os.environ.get("DB_USER"),
            'PASSWORD': os.environ.get("DB_PASSWORD"),
            'HOST': os.environ.get("DB_HOST"),
            'PORT': os.environ.get("DB_PORT"),
        }
    }
    STATIC_URL = 'staticfiles/'
    STATIC_ROOT = '/efs/staticfiles/'
    ENVIRONMENT = os.environ.get("ENVIRONMENT")

USE_S3 = os.getenv('USE_S3') == 'TRUE'

if USE_S3:
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}

    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
else:
    MEDIA_DIR = BASE_DIR / 'media'
    MEDIA_ROOT = MEDIA_DIR
    MEDIA_URL = '/media/'

DATA_UPLOAD_MAX_NUMBER_FIELDS = None
