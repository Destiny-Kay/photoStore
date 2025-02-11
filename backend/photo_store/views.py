from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, AlbumSerializer, PhotoSerializer
from .models import Album, BaseUser, Photo
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

class Pagination(PageNumberPagination):
    '''custom pagination class'''
    page_size = 30
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 200


class AlbumViewSet(ModelViewSet):
    '''album viewset'''
    queryset = Album.objects.all().order_by('id')
    serializer_class = AlbumSerializer
    pagination_class = Pagination

    def initialize_request(self, request, *args, **kwargs):
        self.action = self.action_map.get(request.method.lower())
        return super().initialize_request(request, *args, **kwargs)


class UserAlbums(APIView):
    '''returns all albums for a specific user'''
    def get(self, request, user_id):
        queryset = Album.objects.filter(user=user_id)
        if not queryset.exists():
            return Response({"detail": "No albums found for this user"}, status=status.HTTP_404_NOT_FOUND)
        paginator = Pagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = AlbumSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


class NumUserAlbums(APIView):
    '''gets the number of albums a user  has'''
    def get(self, request, user_id):
        try:
            num_of_albums = Album.objects.filter(user=user_id).count()
        except Album.DoesNotExist:
            num_of_albums = 0
        return Response({"albums": num_of_albums}, status=status.HTTP_200_OK)

class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all().order_by('id')
    serializer_class = PhotoSerializer
    pagination_class = Pagination

    def initialize_request(self, request, *args, **kwargs):
        self.action = self.action_map.get(request.method.lower())
        return super().initialize_request(request, *args, **kwargs)


class GetUsersView(APIView):
    def get(self, request, user_id=None):
        '''This is a get request for users'''
        if user_id:
            user = get_object_or_404(BaseUser, id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        queryset = BaseUser.objects.all().order_by('id')
        paginator = Pagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = UserSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


class AlbumPhotosView(APIView):
    def get(self, request, album_id):
        queryset = Photo.objects.filter(album=album_id).order_by('id')
        paginator = Pagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = PhotoSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

