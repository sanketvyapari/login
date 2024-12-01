from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = "Setup Default admin and user"

    def handle(self, *args, **options):
        ADMIN_EMAIL = "admin@example.com"
        USER_EMAIL = "user@example.com"
        PASSWORD = "password"
        if not User.objects.filter(email=ADMIN_EMAIL).exists():
            User.objects.create_superuser(email=ADMIN_EMAIL, password=PASSWORD)

            self.stdout.write(self.style.SUCCESS("Admin Created Successfully with email - {} and password - {}"\
                                                 .format(ADMIN_EMAIL, PASSWORD)))

        if not User.objects.filter(email=USER_EMAIL).exists():
            User.objects.create_superuser(email=USER_EMAIL, password=PASSWORD)

            self.stdout.write(self.style.SUCCESS("User Created Successfully with email - {} and password - {}"\
                                                 .format(USER_EMAIL, PASSWORD)))
