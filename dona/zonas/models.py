# zonas/models.py
from django.db import models

class Zona(models.Model):
    nombre = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=10)
    ciudad = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):
    direccion = models.TextField()
    latitud = models.FloatField()
    longitud = models.FloatField()
    zona = models.ForeignKey(Zona, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.direccion