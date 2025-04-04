from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView, status

from user.serializers.user import *

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        user_serializer = RegisterSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            user_data = UserSerializer(user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'user': user_data.data, 'token': token.key}, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        if user is not None:
            user_data = UserSerializer(user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'user': user_data.data, 'token': token.key})
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    

class LogoutView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def logout(self, request, *args, **kwargs):
        user = request.user
        try:
            Token.objects.get(user=user).delete()
        except Token.DoesNotExist:
            return Response({'error': 'Token does not exists'}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
        else:
            return Response(status=status.HTTP_200_OK)



class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        token, _ = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({'user': serializer.data, 'token': token.key})