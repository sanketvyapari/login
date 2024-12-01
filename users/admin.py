from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class TracerUserAdmin(UserAdmin):
    ordering = ('email', )
    list_display = ('email', )
    readonly_fields = ("email", )
    search_fields = ("email", "first_name", "last_name")
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_active', 'is_admin', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        ('User Details', {'fields': ('email', 'password')}),
        ('Permission', {'fields': ('is_active', 'is_admin')}),
    )
    list_filter = ("email",)

