from django.urls import path
from .apis import GoogleLoginApi, GoogleLoginRedirectApi, ValidateGoogleToken
from .views import GetUsersView, AlbumViewSet, AlbumPhotosView, PhotoViewSet, NumUserAlbums,UserAlbums
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("login/callback/", GoogleLoginApi.as_view(), name="callback"),
    path("login/redirect/", GoogleLoginRedirectApi.as_view(), name="redirect"),
    path("google-validate/", ValidateGoogleToken.as_view(), name="validate-google-token"),
    path("users/", GetUsersView.as_view()),
    path("users/<int:user_id>", GetUsersView.as_view()),
    path("num-albums/<int:user_id>", NumUserAlbums.as_view()),
    path("albums/", AlbumViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path("albums/<int:pk>", AlbumViewSet.as_view({
        'get': 'retrieve',
    })),
    path("user-albums/<int:user_id>", UserAlbums.as_view()),
    path("photos/", PhotoViewSet.as_view({
        'get': 'list',
        'delete': 'destroy'
    })),
    path("photos/<uuid:pk>", PhotoViewSet.as_view({
        'get': 'retrieve',
        'patch' : 'partial_update'
    })),
    path("albums/<uuid:pk>", AlbumViewSet.as_view({
        'get': 'retrieve',
        'delete': 'destroy'
    })),
    path("albums/<uuid:album_id>/photos", AlbumPhotosView.as_view())
]

# serve media files in dev
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)