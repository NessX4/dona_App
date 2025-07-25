from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from usuarios.models import Administrador
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = "Copia todos los superusuarios de auth_user a usuarios_administrador"

    def handle(self, *args, **kwargs):
        superusers = User.objects.filter(is_superuser=True)

        if not superusers.exists():
            self.stdout.write(self.style.WARNING("⚠️ No hay superusuarios para copiar."))
            return

        for user in superusers:
            correo = user.email if user.email else f"{user.username}@auto.local"

            if not Administrador.objects.filter(correo=correo).exists():
                admin = Administrador.objects.create(
                    nombre=user.username,
                    correo=correo,
                    contraseña=make_password("importado"),  # puedes cambiar esto por algo personalizado
                    activo=True
                )
                self.stdout.write(self.style.SUCCESS(f"✅ Copiado: {admin.nombre} ({correo})"))
            else:
                self.stdout.write(self.style.NOTICE(f"↪ Ya existe: {correo}"))
