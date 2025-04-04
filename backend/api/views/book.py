from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status

from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models.book import Book
from api.serializers.book import BookSerializer, BookResponseSerializer

class BookViewSet(ModelViewSet):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()
        authors = self.request.query_params.get('authors')
        if authors:
            author_ids = [int(i) for i in authors.split(',') if i.isdigit()]
            queryset = queryset.filter(author__id__in=author_ids)
        return queryset

    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]
        return [IsAuthenticated()]
    


    def get_books(self, request, *args, **kwargs):
        pass


    def get_book(self, request, *args, **kwargs):
        book_id = self.kwargs.get('pk')
        try:
            book = Book.objects.get(id=book_id)
            serialized_book_response = BookResponseSerializer(book)
            return Response(serialized_book_response.data, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({"error": "Book does not exist"}, status=status.HTTP_404_NOT_FOUND)


    def create_book(self, request, *args, **kwargs):
        book_serialzier = BookSerializer(data=request.data)
        if book_serialzier.is_valid():
            saved_book = book_serialzier.save()
            serialized_book = BookResponseSerializer(saved_book)
            return Response(serialized_book.data, status=status.HTTP_201_CREATED)
            
        return Response({"error": book_serialzier.errors}, status=status.HTTP_400_BAD_REQUEST)


    def update_book(self, request, *args, **kwargs):
        book_id = self.kwargs.get('pk')
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        
        book_serializer = BookSerializer(book, data=request.data, partial=True)

        if book_serializer.is_valid():
            saved_book = book_serializer.save() 
            serialized_book = BookResponseSerializer(saved_book) 
            return Response(serialized_book.data, status=status.HTTP_200_OK)
        
        return Response({"error": book_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)