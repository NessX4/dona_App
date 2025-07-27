# usuarios/models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class Rol(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre


class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, rol, contraseña=None, **extra_fields):
        if not correo:
            raise ValueError("El correo debe ser proporcionado")
        correo = self.normalize_email(correo)
        usuario = self.model(correo=correo, nombre=nombre, rol=rol, **extra_fields)
        usuario.set_password(contraseña)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, correo, nombre, rol, contraseña=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('activo', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True')

        return self.create_user(correo, nombre, rol, contraseña, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    fecha_registro = models.DateTimeField(default=timezone.now)
    activo = models.BooleanField(default=True)

    # Campos obligatorios para Django admin y permisos
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # controla si el usuario está activo (puedes sincronizar con `activo`)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'rol_id']  # campos obligatorios aparte del correo para crear usuario

    def __str__(self):
        return self.nombre

    def get_full_name(self):
        return self.nombre

    def get_short_name(self):
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