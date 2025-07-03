# solicitudes/models.py
from django.db import models

class Solicitud(models.Model):
    publicacion = models.ForeignKey('donaciones.Publicacion', on_delete=models.CASCADE)
    receptor = models.ForeignKey('usuarios.Receptor', on_delete=models.CASCADE)
    fecha_solicitud = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=50)
    comentarios = models.TextField(null=True, blank=True)

class HistorialDonacion(models.Model):
    publicacion = models.ForeignKey('donaciones.Publicacion', on_delete=models.CASCADE)
    donador = models.ForeignKey('usuarios.Donador', on_delete=models.CASCADE)
    receptor = models.ForeignKey('usuarios.Receptor', on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    tipo = models.CharField(max_length=20)