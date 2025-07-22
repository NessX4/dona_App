from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SolicitudViewSet, HistorialDonacionViewSet

router = DefaultRouter()
router.register(r'solicitudes', SolicitudViewSet)
router.register(r'historiales', HistorialDonacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
