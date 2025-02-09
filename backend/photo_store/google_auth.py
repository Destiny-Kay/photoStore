from typing import Any, Dict

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured, ValidationError
from attrs import define
from django.urls import reverse_lazy
import requests
import google_auth_oauthlib.flow
from .exceptions import ApplicationError
import jwt

@define
class GoogleSdkLoginCredentials:
    client_id: str
    client_secret: str
    project_id: str


@define
class GoogleAccessTokens:
    id_token: str
    access_token: str

    def decode_id_token(self) -> Dict[str, Any]:
        id_token = self.id_token
        decoded_token = jwt.decode(jwt=id_token, options={"verify_signature": False})
        return decoded_token

class GoogleSdkLoginFlowService:
    # API_URL = reverse_lazy("login:callback")
    API_URL = "login/callback"

    GOOGLE_CLIENT_TYPE = "web"

    GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/auth"
    GOOGLE_ACCESS_TOKEN_OBTAIN_URL = "https://oauth2.googleapis.com/token"
    GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

    # ADd googel certs if needed
    GOOGLE_AUTH_PROVIDER_CERT_URL = ""

    SCOPES = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
    ]

    def __init__(self):
        self._credentials = google_sdk_login_get_credentials()

    def _get_redirect_url(self):
        domain = settings.BASE_BACKEND_URL
        api_uri = self.API_URL
        redirect_uri = f"{domain}{api_uri}"
        return redirect_uri

    def _generate_client_config(self):
        client_config = {
            self.GOOGLE_CLIENT_TYPE: {
                "client_id": self._credentials.client_id,
                "project_id": self._credentials.project_id,
                "auth_uri": self.GOOGLE_AUTH_URL,
                "token_uri": self.GOOGLE_ACCESS_TOKEN_OBTAIN_URL,
                "auth_provider_x509_cert_url": self.GOOGLE_AUTH_PROVIDER_CERT_URL,
                "client_secret": self._credentials.client_secret,
                "redirect_uris": [self._get_redirect_url()],
                # set the origins below from google api console and here too
                "javascript_origins": []
            }
        }

        return client_config

    def get_authorization_url(self):
        redirect_uri =self._get_redirect_url()
        client_config = self._generate_client_config()

        google_oath_flow = google_auth_oauthlib.flow.Flow.from_client_config(
            client_config=client_config, scopes=self.SCOPES
        )
        google_oath_flow.redirect_uri = redirect_uri

        authorization_url, state = google_oath_flow.authorization_url(
            access_type="offline",
            include_granted_scopes="true",
            prompt="select_account",
        )
        return authorization_url, state

    def get_tokens(self, *, code: str, state: str) -> GoogleAccessTokens:
        redirect_uri = self._get_redirect_url()
        client_config = self._generate_client_config()

        flow = google_auth_oauthlib.flow.Flow.from_client_config(
            client_config=client_config, scopes=self.SCOPES, state=state
        )
        flow.redirect_uri = redirect_uri
        access_credentials_payload =flow.fetch_token(code=code)
        if not access_credentials_payload:
            raise ValidationError("Failed to obtain credentials from Google")
        
        google_token = GoogleAccessTokens(
            id_token=access_credentials_payload['id_token'], access_token=access_credentials_payload['access_token']
        )
        return google_token

    def get_user_info(self, *, google_tokens: GoogleAccessTokens) -> Dict[str, Any]:
        access_token = google_tokens.access_token

        response = requests.get(self.GOOGLE_USER_INFO_URL, params={"access_token": access_token})
        if not response.ok:
            raise ApplicationError("Failed to obtain user info from Googe")
        
        return response.json()

def google_sdk_login_get_credentials() -> GoogleSdkLoginCredentials:
    client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
    client_secret = settings.GOOGLE_OAUTH2_CLIENT_SECRET
    project_id = settings.GOOGLE_OAUTH2_PROJECT_ID

    if not client_id:
        raise ImproperlyConfigured("GOOGLE_OAUTH2_CLIENT_ID missing in env.")

    if not client_secret:
        raise ImproperlyConfigured("GOOGLE_OAUTH2_CLIENT_SECRET missing in env.")

    if not project_id:
        raise ImproperlyConfigured("GOOGLE_OAUTH2_PROJECT_ID mmissing in env.")

    credentials = GoogleSdkLoginCredentials(
        client_id=client_id,
        client_secret=client_secret,
        project_id=project_id
    )

    return credentials
