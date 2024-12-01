import copy

from rest_framework import permissions, authentication, filters

from django.db.models import Q
from constants.site import PRODUCTION_DOMAIN, STAGE_DOMAIN
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.mixins import (
    CreateModelMixin, RetrieveModelMixin,
    DestroyModelMixin, ListModelMixin, UpdateModelMixin
)


class GenericBaseViewSet(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin,
                         DestroyModelMixin, ListModelMixin, GenericAPIView, ViewSet):
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
    )
    pagination_class = LimitOffsetPagination
    version_group_fields = []
    search_fields = []
    is_vehicle = False

    def get_make_details(self):
        make = ""
        http_host = self.request.META.get('HTTP_HOST', "")
        if PRODUCTION_DOMAIN in http_host:
            make = http_host.replace("{}".format(PRODUCTION_DOMAIN), "")
        elif STAGE_DOMAIN in http_host:
            make = http_host.replace("{}".format(STAGE_DOMAIN), "")
        make = make.replace(".", "")
        return make


    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset.filter()
        queryset = self.filter_queryset(self.get_queryset())
        if self.version_group_fields:
            queryset = queryset.order_by(*self.version_group_fields, "-id").distinct(*self.version_group_fields)
        elif self.search_fields:
            queryset = self.filter_queryset(queryset).order_by(*self.search_fields, "-id")
        else:
            queryset = self.filter_queryset(queryset).order_by("-id")

        query = Q()
        if self.search_fields:
            for field in self.search_fields:
                query |= Q(**{"{}__icontains".format(field): self.request.GET.get("search", "")})
            queryset = queryset.filter(query)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GenericTracerViewSet(GenericBaseViewSet):
    """ This can be used for secure Api"""

    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    search_fields = None

    def get_queryset(self):
        return self.queryset.filter()

    def get_search_queryset(self):
        query = Q()
        if self.search_fields:
            for field in self.search_fields:
                query |= Q(**{"{}__icontains".format(field): self.request.GET.get("search", "")})

        if self.request.GET.get("is_connector_search"):
            query |= Q(**{"subsystemconnectors__connector__name__icontains": self.request.GET.get("search")})
            query |= Q(**{"subsystemconnectors__connector__description__icontains": self.request.GET.get("search")})
        return self.get_queryset().filter(query)

    def add_vehicle_by_make_in_data(self, request):
        data = copy.deepcopy(request.data)
        data._mutable = True
        data["vehicle"] = self.get_vehicle_by_make_details(data.get("vehicle")).id
        data._mutable = False
        return data

    def get_paginated_queryset_data(self, queryset, serializer_class):
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = serializer_class(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)


class GenericTracerUnSecureViewSet(GenericBaseViewSet):
    """ This can be used for secure un Api"""

    permission_classes = ()
    pagination_class = LimitOffsetPagination
    authentication_classes = ()
