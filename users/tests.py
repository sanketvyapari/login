from django.urls import reverse
from rest_framework import status
from utils.base_test.base import BaseCase
from users.fixtures.meta import USER_PAYLOAD


class AUserTestCase(BaseCase):
    def test_get_user_list(self):
        url = reverse('users-list')
        response = self.client.get("{}?search={}".format(url, ''), headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_a_save_user(self):
        url = reverse("users-save-user")
        response = self.client.post(url, data=USER_PAYLOAD, headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user(self):
        url = reverse("users-save-user")
        USER_PAYLOAD["is_create"] = False
        response = self.client.post(url, data=USER_PAYLOAD, headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
