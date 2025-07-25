from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import NotificacionViewSet

router = DefaultRouter()
router.register(r'notifiaciones', NotificacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
