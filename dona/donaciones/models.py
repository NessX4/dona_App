# donaciones/models.py
from django.db import models


class EstadoDonacion(models.Model):
    nombre = models.CharField(max_length=50)

class CategoriaComida(models.Model):
    nombre = models.CharField(max_length=50)

class ArchivoAdjunto(models.Model):
    publicacion = models.ForeignKey('Publicacion', on_delete=models.CASCADE)
    url = models.URLField()
    tipo = models.CharField(max_length=50)

class Comida(models.Model):
    publicacion = models.ForeignKey('Publicacion', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    cantidad = models.CharField(max_length=50)
    categoria = models.ForeignKey(CategoriaComida, on_delete=models.CASCADE)
    ingredientes = models.TextField()

class Sucursal(models.Model):
    donador = models.ForeignKey('usuarios.Donador', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    direccion = models.TextField()
    telefono = models.CharField(max_length=20)
    horario_apertura = models.TimeField()
    horario_cierre = models.TimeField()
    ubicacion = models.ForeignKey('zonas.Ubicacion', on_delete=models.CASCADE)
    zona = models.ForeignKey('zonas.Zona', on_delete=models.CASCADE)
    representante = models.CharField(max_length=100)

class Publicacion(models.Model):
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=150)
    descripcion = models.TextField()
    cantidad = models.IntegerField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    estado = models.ForeignKey(EstadoDonacion, on_delete=models.CASCADE)
    ubicacion = models.ForeignKey('zonas.Ubicacion', on_delete=models.CASCADE)
    zona = models.ForeignKey('zonas.Zona', on_delete=models.CASCADE)
    fecha_caducidad = models.DateField()