from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ComentarioViewSet

router = DefaultRouter()
router.register(r'comentarios', ComentarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
