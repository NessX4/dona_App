# usuarios/backend.py
from django.contrib.auth.backends import ModelBackend
from usuarios.models import Usuario

class CorreoBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        correo = username or kwargs.get('correo')
        if correo is None or password is None:
            return None
        try:
            usuario = Usuario.objects.get(correo=correo)
            if usuario.check_password(password):
                return usuario
        except Usuario.DoesNotExist:
            return None
        return None
