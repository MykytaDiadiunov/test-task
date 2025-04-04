from rest_framework.serializers import *
from api.models.author import Author
from api.models.book import Book
from api.serializers.author import AuthorSerializer

class BookSerializer(ModelSerializer):
    name = CharField(max_length=255, required=True)
    description = CharField(required=True)
    image = ImageField(required=False)
    author = PrimaryKeyRelatedField(queryset=Author.objects.all())
    class Meta:
        model = Book
        fields = ['id', 'name', 'description', 'image', 'author']
        read_only_fields = ['id']

class BookResponseSerializer(ModelSerializer):
    author = AuthorSerializer()
    class Meta:
        model = Book
        fields = ['id', 'name', 'description', 'image', 'author']
        read_only_fields = ['id']
