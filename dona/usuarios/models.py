from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from django.apps import AppConfig
from django.db.models.signals import post_migrate


def crear_roles(sender, **kwargs):
    from .models import Rol
    for nombre in ['Admin', 'Donador', 'Refugio', 'Voluntario']:
        Rol.objects.get_or_create(nombre=nombre)

class UsuariosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'usuarios'

    def ready(self):
        post_migrate.connect(crear_roles, sender=self)
        
class Rol(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, rol, password=None, **extra_fields):
        if not correo:
            raise ValueError("El correo debe ser proporcionado")

        # Normalizar correo
        correo = self.normalize_email(correo)

        # Si el rol viene como un ID numérico, lo convertimos a instancia
        from .models import Rol
        if isinstance(rol, int):
            try:
                rol = Rol.objects.get(id=rol)
            except Rol.DoesNotExist:
                raise ValueError("El Rol proporcionado no existe")

        usuario = self.model(correo=correo, nombre=nombre, rol=rol, **extra_fields)

        if password:
            usuario.set_password(password)
        else:
            usuario.set_password(self.make_random_password())

        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, correo, nombre, rol, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('activo', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True')

        return self.create_user(correo, nombre, rol, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    fecha_registro = models.DateTimeField(default=timezone.now)
    activo = models.BooleanField(default=True)

    # Campos que Django usa para permisos y administración
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'rol']

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
    password = models.CharField(max_length=255)
    fecha_registro = models.DateTimeField(auto_now_add=True)
    activo = models.BooleanField(default=True)
 
    def __str__(self):

        return self.nombre



class LogSistema(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.CharField(max_length=100, blank=True, null=True)
    accion = models.CharField(max_length=100)
    detalle = models.TextField()

    def __str__(self):
        return f"{self.fecha} - {self.accion}"
