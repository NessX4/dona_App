from django.db import models
from django.contrib.auth.hashers import make_password, check_password

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

    def set_password(self, raw_password):
        self.contraseña = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.contraseña)

    def save(self, *args, **kwargs):
        # Hash de la contraseña si no está encriptada
        if not self.contraseña.startswith('pbkdf2_'):
            self.contraseña = make_password(self.contraseña)
        super().save(*args, **kwargs)

class Donador(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='donador')
    nombre_lugar = models.CharField(max_length=100)
    representante = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    descripcion = models.TextField()
    horario_apertura = models.TimeField()
    horario_cierre = models.TimeField()

    def __str__(self):
        return self.nombre_lugar

class Receptor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='receptor')
    nombre_lugar = models.CharField(max_length=100)
    encargado = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    capacidad = models.IntegerField()
    horario_apertura = models.TimeField()
    horario_cierre = models.TimeField()

    def __str__(self):
        return self.nombre_lugar

class Voluntario(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='voluntario')
    telefono = models.CharField(max_length=20)
    zona = models.ForeignKey('zonas.Zona', on_delete=models.CASCADE)

    def __str__(self):
        return self.usuario.nombre



class Administrador(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=128)  # Puedes usar hashed si quieres
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre
