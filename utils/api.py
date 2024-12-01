import requests

from django.core.exceptions import ObjectDoesNotExist

from utils.logs import LoggingHandler
from utils.exceptions import BaseAPIException
from vehicles.utils import VehicleDataManager
from tracer_api.models import TracerAuthConfig
from constants.api_constants import TRACER_AUTH_URL, TOKEN_TYPE


class BaseAPIClass:
    def __init__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs

    @staticmethod
    def format_response(response):
        try:
            data = response.json()
            if response.status_code == 200:
                return {"data": data, "status": True}
            return {"data": data, "status": False}
        except:
            raise Exception('Please check API call or Service not available')

    def get_access_token(self):
        url = self.kwargs.get('auth_url')
        payload = self.kwargs.get('auth_payload')
        response = self.post_request(url, payload, is_auth=False)
        if response['status']:
            return response.get('data', {}).get('access_token')
        raise Exception('{}'.format(response.get('data')))

    def auth_header(self):
        try:
            return {'Authorization': '{} {}'.format(self.kwargs.get('token_type'), self.get_access_token())}
        except Exception as e:
            raise BaseAPIException(str(e))

    def get_request(self, url, params=None, is_auth=True):
        response = requests.get(
            '{}{}'.format(self.kwargs.get('base_url'), url),
            params=params,
            headers=self.auth_header() if is_auth else None
        )
        return self.format_response(response)

    def post_request(self, url, data, is_auth=True):
        response = requests.post(
            '{}{}'.format(self.kwargs.get('base_url'), url),
            data=data,
            headers=self.auth_header() if is_auth else None
        )
        return self.format_response(response)


class TracerAPIClass(BaseAPIClass, VehicleDataManager, LoggingHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @staticmethod
    def auth_payload(tracer_auth_conf):
        try:
            return {
                "client_id": tracer_auth_conf.client_id,
                "client_secret": tracer_auth_conf.client_secret,
                "grant_type": "client_credentials"
            }
        except Exception as e:
            raise Exception('Tracer API Config not available')

    def run(self, vehicle):
        try:
            vehicle_obj = self.get_vehicle_by_make_details(vehicle)
            if vehicle_obj:
                make = vehicle_obj.make
                try:
                    tracer_auth_conf = TracerAuthConfig.objects.get(make=make)
                except ObjectDoesNotExist:
                    raise Exception('Tracer Auth Config not found for - {}'.format(make))

                base_api_class = BaseAPIClass(
                    auth_url=TRACER_AUTH_URL, auth_payload=self.auth_payload(tracer_auth_conf),
                    token_type=TOKEN_TYPE, base_url=tracer_auth_conf.base_url
                )
                return base_api_class, vehicle_obj
            else:
                raise Exception('Invalid vehicle given - {}'.format(vehicle))
        except Exception as e:
            raise Exception(e)
