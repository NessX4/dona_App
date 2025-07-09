from django.urls import path
from .views import (
    ComentarioListView, ComentarioCreateView, 
    ComentarioUpdateView, ComentarioDeleteView
)

app_name = 'comentarios'

urlpatterns = [
    path('', ComentarioListView.as_view(), name='lista_comentarios'),
    path('crear/', ComentarioCreateView.as_view(), name='crear_comentario'),
    path('editar/<int:pk>/', ComentarioUpdateView.as_view(), name='editar_comentario'),
    path('eliminar/<int:pk>/', ComentarioDeleteView.as_view(), name='eliminar_comentario'),
]
