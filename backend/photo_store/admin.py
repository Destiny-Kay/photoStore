from django.contrib import admin
from .models import BaseUser, Album, Photo

admin.site.register(BaseUser)
admin.site.register(Album)
admin.site.register(Photo)
