from rest_framework import routers

from api.views.author import AuthorViewSet
from api.views.book import BookViewSet

router = routers.SimpleRouter()
router.register("author", AuthorViewSet, basename="author")
router.register("book", BookViewSet, basename="book")

urlpatterns = router.urls
