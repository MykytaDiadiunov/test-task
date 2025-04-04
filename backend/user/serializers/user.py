from rest_framework.serializers import *
from django.contrib.auth.models import User

class RegisterSerializer(Serializer):
    username = CharField(max_length=100)
    email = EmailField()
    password = CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserLoginSerializer(Serializer):
    username = CharField(required=True)
    password = CharField(required=True)
        

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']