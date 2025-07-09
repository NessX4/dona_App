from django.urls import path
from .views import (
    SolicitudListView,
    SolicitudCreateView,
    SolicitudUpdateView,
    SolicitudDeleteView,
)

app_name = 'solicitudes'

urlpatterns = [
    path('', SolicitudListView.as_view(), name='lista_solicitudes'),
    path('crear/', SolicitudCreateView.as_view(), name='crear_solicitud'),
    path('editar/<int:pk>/', SolicitudUpdateView.as_view(), name='editar_solicitud'),
    path('eliminar/<int:pk>/', SolicitudDeleteView.as_view(), name='eliminar_solicitud'),
]
