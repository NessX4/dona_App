from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RolViewSet, UsuarioViewSet, DonadorViewSet, ReceptorViewSet,
    VoluntarioViewSet, AdministradorViewSet
)

router = DefaultRouter()
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'donadores', DonadorViewSet)
router.register(r'receptores', ReceptorViewSet)
router.register(r'voluntarios', VoluntarioViewSet)
router.register(r'administradores', AdministradorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
