from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ZonaViewSet, UbicacionViewSet

router = DefaultRouter()
router.register(r'zonas', ZonaViewSet)
router.register(r'ubicaciones', UbicacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
