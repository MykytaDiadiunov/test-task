from django.db.models import *

class Author(Model):
    name = CharField(max_length=255)
    birthday = DateField()