from django.shortcuts import render
from .models import Post
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PostSerializer, CreatePostSerializer, UpdatePostSerializer, DeletePostSerializer
from django.utils import timezone
# Create your views here.
class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CreatePostView(APIView):
    serializer_class = CreatePostSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"Error": "Invalid data form..."}, status=status.HTTP_400_BAD_REQUEST)
        
        owner = self.request.session.session_key
        queryset = Post.objects.filter(owner=owner)
        if queryset.count() >= 6:
            return Response({"Error": "Maximum posts reached"}, status=status.HTTP_403_FORBIDDEN)
        
        message = serializer.validated_data.get("message")
        new_post = Post(owner=owner, message = message)
        new_post.save()
        return Response(PostSerializer(new_post).data, status=status.HTTP_201_CREATED)
            

class GetPostsView(APIView):
    serializer_class = PostSerializer

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        owner = self.request.session.session_key
        
        queryset = Post.objects.filter(owner=owner)
        posts = []
        if queryset.exists():
            for post in queryset:
                data = PostSerializer(post).data
                posts.append(data)
            
        return Response({"posts": posts}, status=status.HTTP_200_OK)

class UpdatePostView(APIView):
    serializer_class = UpdatePostSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"Error": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)
        
        owner = self.request.session.session_key
        post_id = request.data.get("post_id")

        queryset = Post.objects.filter(post_id=post_id)
        if not queryset.exists():
            return Response({"Error": "Invalid Post id..."}, status=status.HTTP_400_BAD_REQUEST)
        
        post = queryset[0]
        if owner != post.owner:
            return Response({"Error": "You are not the owner of the post"}, status=status.HTTP_403_FORBIDDEN)
        
        post.message = serializer.validated_data.get("message")[:255]
        post.createdAt = timezone.now()
        post.save(update_fields=["message", "createdAt"])
        return Response(PostSerializer(post).data, status=status.HTTP_200_OK)
            
        
            


class DeletePostView(APIView):
    serializer_class = DeletePostSerializer

    def delete(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"Error": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)
        
        owner = self.request.session.session_key
        post_id = request.data.get("post_id")

        queryset = Post.objects.filter(post_id=post_id)
        if not queryset.exists():
            return Response({"Error": "Invalid Post id..."}, status=status.HTTP_400_BAD_REQUEST)
        
        post = queryset[0]
        if owner != post.owner:
            return Response({"Error": "You are not the owner of the post"}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response({"Success": "Post deleted"}, status=status.HTTP_204_NO_CONTENT)
            
        


