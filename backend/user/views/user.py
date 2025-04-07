from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView, status
from rest_framework.viewsets import ModelViewSet

from user.permissions.self_or_admin import IsSelfOrAdmin
from user.serializers.user import RegisterSerializer, UserSerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.select_related("auth_token").all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrAdmin]

    @action(methods=["DELETE"], detail=False)
    def logout(self, request, *args, **kwargs):
        user = request.user
        try:
            Token.objects.get(user=user).delete()
            return Response(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response(
                {"error": "Token does not exists"},
                status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION,
            )

    @action(methods=["GET"], detail=False)
    def current(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        user_serializer = RegisterSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            Token.objects.get_or_create(user=user)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        if user is not None:
            Token.objects.get_or_create(user=user)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
