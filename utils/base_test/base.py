import json
from django.urls import reverse
from users.models import User
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from vehicles.models import Vehicles
from users.fixtures.meta import USER_EMAIL, USER_PASSWORD
from rest_framework import status
from vehicles.fixtures.meta import MAKE_MODEL_KEY

VEHICLE_PAYLOAD = json.load(open('vehicles/fixtures/meta.json'))


class BaseCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(USER_EMAIL, USER_PASSWORD)
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.headers = {"Authorization": "Token {}".format(self.token)}

    @property
    def get_vehicle_details(self):
        return Vehicles.objects.all().first()

    def make_unique(self):
        return self.get_vehicle_details

    def Test_Create_Vehicle(self):
        url = reverse("vehicles-save-vehicle-details")
        response = self.client.post(url, data=VEHICLE_PAYLOAD, headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.make_unique().vehicle_id, MAKE_MODEL_KEY)
