from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from usuarios.models import Administrador

@receiver(post_save, sender=User)
def crear_administrador_si_superusuario(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        if not Administrador.objects.filter(correo=instance.email).exists():
            Administrador.objects.create(
                nombre=instance.username,
                correo=instance.email,
                contraseña='importado',
                activo=True
            )
            print(f"...........................................")
