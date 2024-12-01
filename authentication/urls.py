import os
from django.contrib import admin
from django.urls import path, re_path, include
from . import settings
from django.conf.urls.static import static

from users.views import submit_to_import_tracer_data, generate_api_token, logout_from_apps, user_ui

USE_S3 = os.getenv('USE_S3') == 'TRUE'


urlpatterns = [
    path('submit_to_import_tracer_data/', submit_to_import_tracer_data, name='submit_to_import_tracer_data'),
    path('api_auth/', generate_api_token, name='api_auth'),
    path('logout/', logout_from_apps, name='logout_from_apps'),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


if not USE_S3:
    from django.conf import settings
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'', user_ui)]
