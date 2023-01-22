from django.db import models
import random
import string

def generate_post_id():
    length = 6

    while True:
        id = "".join(random.choices(string.ascii_uppercase + string.digits, k=length))
        # ensure the code is unique
        if not Post.objects.filter(post_id=id).exists():
            break
    return id

# Create your models here.
class Post(models.Model):
    owner = models.CharField(max_length=50, null=True)
    post_id = models.CharField(max_length=8, default=generate_post_id, editable=False, unique=True)
    message = models.CharField(max_length=128, default="")
    createdAt = models.DateTimeField(auto_now_add=True)