from django.urls import path
from .views import (
    ZonaListView, ZonaCreateView, ZonaUpdateView, ZonaDeleteView,
    UbicacionListView, UbicacionCreateView, UbicacionUpdateView, UbicacionDeleteView
)

app_name = 'zonas'

urlpatterns = [
    # Zonas
    path('zonas/', ZonaListView.as_view(), name='lista_zonas'),
    path('zonas/crear/', ZonaCreateView.as_view(), name='crear_zona'),
    path('zonas/editar/<int:pk>/', ZonaUpdateView.as_view(), name='editar_zona'),
    path('zonas/eliminar/<int:pk>/', ZonaDeleteView.as_view(), name='eliminar_zona'),

    # Ubicaciones
    path('ubicaciones/', UbicacionListView.as_view(), name='lista_ubicaciones'),
    path('ubicaciones/crear/', UbicacionCreateView.as_view(), name='crear_ubicacion'),
    path('ubicaciones/editar/<int:pk>/', UbicacionUpdateView.as_view(), name='editar_ubicacion'),
    path('ubicaciones/eliminar/<int:pk>/', UbicacionDeleteView.as_view(), name='eliminar_ubicacion'),
]
