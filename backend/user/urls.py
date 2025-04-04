from django.urls import path

from user.views.user import *

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view({'delete': 'logout'})),
    path('me/', UserDetailView.as_view())
]