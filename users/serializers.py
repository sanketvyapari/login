from rest_framework import serializers
from .models import User


class UserSerializers(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("email", "first_name", "last_name", "is_admin", "last_login", "id", "is_active")
