from django.urls import include, path
from api.views.author import AuthorViewSet
from api.views.book import BookViewSet

urlpatterns = [
    path('user/', include('user.urls')),
    path('author/', AuthorViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('author/<int:pk>/', AuthorViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'})),
    path('book/', BookViewSet.as_view({'get': 'list', 'post': 'create_book'})),
    path('book/<int:pk>/', BookViewSet.as_view({'get': 'get_book', 'patch': 'update_book', 'delete': 'destroy'}))
]