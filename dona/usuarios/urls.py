from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, RolViewSet,
    DonadorViewSet, ReceptorViewSet,
    VoluntarioViewSet, AdministradorViewSet,
    login_jwt, usuario_logueado,
    cambiar_contrasena, reset_password_simple
)
from .views import LogSistemaViewSet

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'roles', RolViewSet)
router.register(r'donadores', DonadorViewSet)
router.register(r'receptores', ReceptorViewSet)
router.register(r'voluntarios', VoluntarioViewSet)
router.register(r'administradores', AdministradorViewSet)

router.register(r'logs', LogSistemaViewSet, basename='logs')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_jwt, name='login'),
    path('me/', usuario_logueado, name='usuario_logueado'),
    path('cambiar-contrasena/', cambiar_contrasena, name='cambiar_contrasena'),
    path('reset-password/', reset_password_simple, name='reset_password_simple'),

]
