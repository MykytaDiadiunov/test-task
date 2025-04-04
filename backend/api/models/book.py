from django.db.models import *
from api.models.author import Author


class Book(Model):
    name = CharField(max_length=255)
    description = TextField()
    image = ImageField(upload_to='book_images/', blank=True, null=True)
    author = ForeignKey(Author, on_delete=CASCADE)