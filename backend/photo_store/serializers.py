from rest_framework.serializers import ModelSerializer
from .models import BaseUser, Album, Photo


class UserSerializer(ModelSerializer):
    class Meta:
        model = BaseUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }


class AlbumSerializer(ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__'


class PhotoSerializer(ModelSerializer):
    class Meta:
        model = Photo
        fields = '__all__'
