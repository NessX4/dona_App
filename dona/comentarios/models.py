# comentarios/models.py
from django.db import models

class Comentario(models.Model):
    publicacion = models.ForeignKey('donaciones.Publicacion', on_delete=models.CASCADE)
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)