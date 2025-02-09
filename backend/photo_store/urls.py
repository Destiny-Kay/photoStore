from django.urls import path
from .apis import GoogleLoginApi, GoogleLoginRedirectApi, ValidateGoogleToken

urlpatterns = [
    path("login/callback/", GoogleLoginApi.as_view(), name="callback"),
    path("login/redirect/", GoogleLoginRedirectApi.as_view(), name="redirect"),
    path("google-validate/", ValidateGoogleToken.as_view(), name="validate-google-token")
]
