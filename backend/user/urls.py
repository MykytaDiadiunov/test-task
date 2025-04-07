from django.urls import path
from rest_framework import routers

from user.views.user import LoginView, RegisterView, UserViewSet

router = routers.SimpleRouter()
router.register("", UserViewSet, basename="user")

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
]

urlpatterns += router.urls
