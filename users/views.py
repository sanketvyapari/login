import logging
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import action
from rest_framework import status

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q

from utils.logs import LoggingHandler
from utils.custom_viewset import GenericTracerViewSet
from .models import User
from .serializers import UserSerializers


logger = logging.getLogger(__name__)

user_ui = TemplateView.as_view(template_name='index.html')


def submit_to_import_tracer_data(request):
    """Here we can perform action's"""
    return redirect('/admin/')


@api_view(['GET'])
def logout_from_apps(request):
    try:
        try:
            user = get_user_model().objects.get(email=request.user)
            Token.objects.filter(user=user).delete()
        except ObjectDoesNotExist:
            return JsonResponse(data={"msg": "Details not available"}, status=403)
    except Exception as e:
        logger.error("Error While Logout - {}".format(str(e)))
    return JsonResponse(data={"msg": "Successfully Logout"})


@api_view(['POST'])
@permission_classes([])
def generate_api_token(request):
    if request.POST.get("email") and request.POST.get("password"):
        try:
            user = get_user_model().objects.get(email=request.POST.get("email"), is_cognito=False)
            if not user.is_active:
                return JsonResponse(data={"msg": "User not active, please contact to Administrator"}, status=400)
            if user.check_password(request.POST.get("password")):
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse(data={"token": token.key}, status=200)
            return JsonResponse(data={"msg": "Credentials not matching"}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse(data={"msg": "User doesn't exists with email"}, status=400)
    return JsonResponse(data={"msg": "Please provide email and password"}, status=400)


class UserAPIView(LoggingHandler, GenericTracerViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializers
    search_fields = ('email', 'first_name', "last_name", "is_active")

    def filter_queryset(self, queryset):
        queryset = queryset.filter(
            Q(email__contains=self.request.GET.get("search")) |
            Q(first_name__contains=self.request.GET.get("search")) |
            Q(last_name__contains=self.request.GET.get("search"))
        )
        if self.request.GET.get("is_active"):
            queryset = queryset.filter(is_active=True if self.request.GET.get("is_active") == "true" else False)
        make = self.get_make_details()
        if make:
            queryset = queryset.filter(
                is_cognito=True, usercognitoclients__cognito_client__name=self.request.META['HTTP_HOST']
            )
        return queryset

    @action(methods=["POST"], detail=False, url_path=r'save_user')
    def save_user(self, request):
        try:
            if request.data.get("is_create") == "true":
                serializer = self.serializer_class(data=request.data)
                if serializer.is_valid():
                    instance = serializer.save()
                    instance.set_password(request.data.get("password"))
                    instance.save()
                else:
                    return Response(data={"errors": serializer.errors}, status=status.HTTP_404_NOT_FOUND)
            else:
                try:
                    user = self.queryset.get(email=request.data.get("email"))
                    serializer = self.serializer_class(instance=user, data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(data={"errors": serializer.errors}, status=status.HTTP_404_NOT_FOUND)
                except Exception as e:
                    raise Exception("User not found")
            return Response(data={"errors": {}})
        except Exception as e:
            return Response(data={"msg": str(e), "errors": {}}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["DELETE"], detail=False, url_path=r'delete/(?P<email>\w+|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,10})/(?P<active>[\w|\W]+)')
    def delete(self, request, email, active):
        try:
            try:
                user = self.queryset.get(email=email)
                user.is_active = False if active == "true" else True
                user.save()
            except Exception as e:
                raise Exception("User not found")
            return Response(data={"errors": {}})
        except Exception as e:
            return Response(data={"msg": str(e), "errors": {}}, status=status.HTTP_404_NOT_FOUND)
