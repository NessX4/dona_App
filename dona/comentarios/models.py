# Vanessa Balderas Martinez
# comentarios/models.py
from django.db import models

class Comentario(models.Model):
    publicacion = models.ForeignKey('donaciones.Publicacion', on_delete=models.CASCADE)  # Relación con la publicación
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)  # Relación con el usuario que comenta
    comentario = models.TextField()  # Texto del comentario
    fecha = models.DateTimeField(auto_now_add=True)  # Fecha y hora en que se creó el comentario (se asigna automáticamente)