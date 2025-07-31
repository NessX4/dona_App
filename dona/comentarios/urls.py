# Vanessa Balderas Martinez
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ComentarioViewSet

# Se crea un router para las rutas automáticas de la API
router = DefaultRouter()
router.register(r'comentarios', ComentarioViewSet)  # Registra el ViewSet de Comentario

urlpatterns = [
    path('', include(router.urls)),  # Incluye todas las rutas generadas por el router
]