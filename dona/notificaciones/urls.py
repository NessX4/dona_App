from django.urls import path
from .views import (
    NotificacionListView,
    NotificacionCreateView,
    NotificacionUpdateView,
    NotificacionDeleteView
)

app_name = 'notificaciones'

urlpatterns = [
    path('', NotificacionListView.as_view(), name='lista_notificaciones'),
    path('crear/', NotificacionCreateView.as_view(), name='crear_notificacion'),
    path('editar/<int:pk>/', NotificacionUpdateView.as_view(), name='editar_notificacion'),
    path('eliminar/<int:pk>/', NotificacionDeleteView.as_view(), name='eliminar_notificacion'),
]
