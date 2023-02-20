from django.urls import path
from .views import PostView, CreatePostView, GetPostsView, UpdatePostView, DeletePostView

urlpatterns = [
    path("post", PostView.as_view()),
    path("create-post", CreatePostView.as_view()),
    path("delete-post", DeletePostView.as_view()),
    path("get-posts", GetPostsView.as_view()),
    path("update-post", UpdatePostView.as_view())
]