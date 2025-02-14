from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from photo_store.models import Album, Photo
import uuid

class Command(BaseCommand):
    help = "Populates the database with mock data"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        # Create a superuser
        admin_user = User.objects.create_superuser(
            email="admin@example.com",
            password="adminpassword",
        )
        self.stdout.write(self.style.SUCCESS("Created admin user"))

        # Create a normal user
        normal_user = User.objects.create_user(
            email="user@example.com",
            name="John",
            password="userpassword",
        )
        normal_user2 = User.objects.create_user(
            email="user2@example.com",
            name="Matthew",
            password="userpassword",
        )
        no_album_normal_user = User.objects.create_user(
            email="user3@example.com",
            name="Victor",
            password="userpassword",
        )
        self.stdout.write(self.style.SUCCESS("Created normal user"))

        # Create albums for the normal user
        album1 = Album.objects.create(
            user=normal_user,
            title="Vacation Photos",
        )
        album2 = Album.objects.create(
            user=normal_user,
            title="Family Photos",
        )
        album3 = Album.objects.create(
            user=normal_user2,
            title="Personal photos"
        )
        self.stdout.write(self.style.SUCCESS("Created albums"))

        # Create photos for the albums
        for i in range(1,10):
            Photo.objects.create(
                album=album1,
                title=f"family-{i}",
                image=f"photos/family-{i}.jpg",
            )
        for i in range(1,8):
            Photo.objects.create(
                album=album2,
                title=f"vacation-{i}",
                image=f"photos/vacation-{i}.jpg",
            )
        for i in range(1,4):
            Photo.objects.create(
                album=album3,
                title=f"vacation-2-{i}",
                image=f"photos/vacation-{i}.jpg",
            )
        self.stdout.write(self.style.SUCCESS("Created photos"))

        self.stdout.write(self.style.SUCCESS("Database populated with mock data"))