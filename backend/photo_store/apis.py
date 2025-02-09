# from django.contrib.auth import login
from django.shortcuts import redirect
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import redirect, get_object_or_404
from django.conf import settings
import jwt

from .google_auth import GoogleSdkLoginFlowService
from .models import BaseUser


class PublicApi(APIView):
    authentication_classes = ()
    permission_classes =()

class GoogleLoginRedirectApi(PublicApi):
    def get(self, request, *args, **kwargs):
        google_login_flow =GoogleSdkLoginFlowService()

        authorization_url, state = google_login_flow.get_authorization_url()

        request.session["google_oauth2_state"] = state

        return redirect(authorization_url)


class GoogleLoginApi(PublicApi):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)
        state = serializers.CharField(required=False)
    
    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data
        
        code = validated_data.get("code")
        error = validated_data.get("error")
        state = validated_data.get("state")

        if error is not None:
            return Response({"error": error}, status=status.HTTP_400_BAD_REQUEST)

        if code is None or state is None:
            return Response({"error": "Code and state are required."}, status=status.HTTP_400_BAD_REQUEST)

        session_state = request.session.get("google_oauth2_state")

        if session_state is None:
            return Response({"error": "CSRF check failed."}, status=status.HTTP_400_BAD_REQUEST)

        del request.session["google_oauth2_state"]

        if state != session_state:
            return Response({"error": "CSRF check failed."}, status=status.HTTP_400_BAD_REQUEST)
        
        google_login_flow = GoogleSdkLoginFlowService()

        google_tokens = google_login_flow.get_tokens(code=code, state=state)

        id_token_decoded = google_tokens.decode_id_token()
        user_info = google_login_flow.get_user_info(google_tokens=google_tokens)

        user_email = id_token_decoded["email"]
        # Get user information
        # Get user if they do not exist then create them

        # &&&&
        user = BaseUser.objects.get_or_create(email=user_email)
        # &&&&&
        # user = get_object_or_404(BaseUser, email=user_email)
        # login(request, user)

        result = {
            "id_token_decoded": id_token_decoded,
            "user_info": user_info,
        }

        # return Response(result)
        return redirect(f'{settings.FRONTEND_URL}/auth/google-redirect?tkn={google_tokens.id_token}')


class ValidateGoogleToken(PublicApi):
    def post(self, request):
        if not request.data:
            return Response({"error": "bad request"}, status=status.HTTP_400_BAD_REQUEST)
        google_token = request.data.get("access_token")
        try:
            decoded_token = jwt.decode(jwt=google_token, options={"verify_signature": False})
        except:
            return Response({"error": "invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

        # confirm user exists
        user = get_object_or_404(BaseUser, email=decoded_token.get('email'))
        # login the user
        return Response({'detail': 'token verified successfully'}, status=status.HTTP_200_OK)