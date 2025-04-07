from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.models.book import Book
from api.serializers.book import BookSerializer


class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.select_related("author").all()
        authors = self.request.query_params.getlist("authors[]")
        if authors:
            queryset = queryset.filter(author__id__in=authors)

        return queryset

    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        return [IsAuthenticated()]
