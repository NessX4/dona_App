from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from usuarios.models import Usuario, Administrador  # Ajusta el import según tu estructura

@receiver(post_save, sender=User)
def crear_administrador_superusuario(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        # Verifica si ya existe el Usuario
        if not Usuario.objects.filter(correo=instance.email).exists():
            usuario = Usuario.objects.create(
                nombre=instance.username,
                correo=instance.email,
                contraseña='',
                rol_id=4,  # Ajusta al ID correcto del rol "Administrador"
                activo=True
            )

            # Crea el administrador vinculado al nuevo Usuario
            Administrador.objects.create(
                usuario=usuario,
                nombre=instance.username,
                correo=instance.email,
                contraseña='',
                activo=True
            )
