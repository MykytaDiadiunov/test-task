from rest_framework.serializers import *
from api.models.author import Author

class AuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'birthday']
        read_only_fields = ['id']


class CreateAuthorSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = ['name', 'birthday']

    def create(self, validated_data):
        return super().create(validated_data)