from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
   class Meta:
      model = Post
      fields = ['owner', 'post_id','message', 'createdAt']

class CreatePostSerializer(serializers.ModelSerializer):
   class Meta:
      model = Post
      fields = ['message']

class UpdatePostSerializer(serializers.ModelSerializer):
   class Meta:
      model = Post
      fields = ['post_id', "message"]

class DeletePostSerializer(serializers.ModelSerializer):
   class Meta:
      model = Post
      fields = ['post_id']