from django.contrib import admin

from api.models.author import Author
from api.models.book import Book

admin.site.register(Book)
admin.site.register(Author)
