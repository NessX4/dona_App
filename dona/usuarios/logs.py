from .models import LogSistema
from django.utils.timezone import now

def registrar_log(usuario, accion, detalle):
    LogSistema.objects.create(
        fecha=now(),
        usuario=usuario,
        accion=accion,
        detalle=detalle
    )
