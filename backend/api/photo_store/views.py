from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

class APIStatus(APIView):
    '''checks the status of the API'''
    def get(self, request):
        return Response({"status":"OK"}, status=status.HTTP_200_OK)


class UserViewSet(ModelViewSet):
    '''users viewset'''
    pass


class AlbumViewset(ModelViewSet):
    '''Album viewset'''
    pass


class PhotoViewSet(ModelViewSet):
    '''PhotoViewsets'''
    pass

