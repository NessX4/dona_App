# usuarios/models.py
from django.db import models

class Rol(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
    
class Donador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='donador')
    nombre_lugar = models.CharField(max_length=100)
    representante = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    descripcion = models.TextField()
    horario_apertura = models.TimeField()
    horario_cierre = models.TimeField()

class Receptor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='receptor')
    nombre_lugar = models.CharField(max_length=100)
    encargado = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    capacidad = models.IntegerField()
    horario_apertura = models.TimeField()
    horario_cierre = models.TimeField()

class Voluntario(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='voluntario')
    telefono = models.CharField(max_length=20)
    zona = models.ForeignKey('zonas.Zona', on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario.nombre

class Administrador(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=255)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre