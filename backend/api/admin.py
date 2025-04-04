from django.contrib import admin
from api.models.book import Book
from api.models.author import Author

admin.site.register(Book)
admin.site.register(Author)

