from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    EstadoDonacionViewSet, CategoriaComidaViewSet, ArchivoAdjuntoViewSet,
    ComidaViewSet, SucursalViewSet, PublicacionViewSet
)

router = DefaultRouter()
router.register(r'estados', EstadoDonacionViewSet)
router.register(r'categorias', CategoriaComidaViewSet)
router.register(r'archivos', ArchivoAdjuntoViewSet)
router.register(r'comidas', ComidaViewSet)
router.register(r'sucursales', SucursalViewSet)
router.register(r'publicaciones', PublicacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
