"""
WSGI config for authentication project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'authentication.settings')

application = get_wsgi_application()

""" Create Super User and User if not exists """
from users.models import User
from django.conf import settings


if settings.ENVIRONMENT == 'local':
    users = User.objects.all()
    if not users:
        User.objects.create_superuser(email="admin@example.com", password="password")
        User.objects.create_user(email="user@example.com", password="password")
