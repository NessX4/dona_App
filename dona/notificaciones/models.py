# notificaciones/models.py
from django.db import models

class Notificacion(models.Model):
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, default='sistema')
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    leido = models.BooleanField(default=False)