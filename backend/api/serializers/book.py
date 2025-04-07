from rest_framework import serializers

from api.models.book import Book
from api.serializers.author import AuthorSerializer


class BookSerializer(serializers.ModelSerializer):
    author_object = AuthorSerializer(read_only=True, source="author")

    class Meta:
        model = Book
        fields = "__all__"
