from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from usuarios.models import Administrador, Donador, Voluntario, Receptor

from donaciones.models import Publicacion, Sucursal
from solicitudes.models import Solicitud



from django.db.models.signals import post_delete
from zonas.models import Zona
from usuarios.logs import registrar_log




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
            print(f"----------------------------------------------------------------")









@receiver(post_save, sender=Zona)
def log_creacion_o_edicion_zona(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',  
            accion='Creación de zona',
            detalle=f'Se creó la zona "{instance.nombre}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de zona',
            detalle=f'Se actualizó la zona "{instance.nombre}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Zona)
def log_eliminacion_zona(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema', #Esto luego checar para que agarre el ID del usuario logueado
        accion='Eliminación de zona',
        detalle=f'Se eliminó la zona "{instance.nombre}" (ID {instance.id}).'
    )





@receiver(post_save, sender=Donador)
def log_donador_creado_o_editado(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de donador',
            detalle=f'Se creó el donador "{instance.nombre_lugar}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de donador',
            detalle=f'Se actualizó el donador "{instance.nombre_lugar}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Donador)
def log_donador_eliminado(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema',
        accion='Eliminación de donador',
        detalle=f'Se eliminó el donador "{instance.nombre_lugar}" (ID {instance.id}).'
    )





@receiver(post_save, sender=Voluntario)
def log_voluntario_creado_o_editado(sender, instance, created, **kwargs):
    nombre = instance.usuario.nombre if instance.usuario else 'Sin nombre'
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de voluntario',
            detalle=f'Se creó el voluntario "{nombre}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de voluntario',
            detalle=f'Se actualizó el voluntario "{nombre}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Voluntario)
def log_voluntario_eliminado(sender, instance, **kwargs):
    nombre = instance.usuario.nombre if instance.usuario else 'Sin nombre'
    registrar_log(
        usuario='sistema',
        accion='Eliminación de voluntario',
        detalle=f'Se eliminó el voluntario "{nombre}" (ID {instance.id}).'
    )




@receiver(post_save, sender=Receptor)
def log_receptor_creado_o_editado(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de receptor',
            detalle=f'Se creó el receptor "{instance.nombre_lugar}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de receptor',
            detalle=f'Se actualizó el receptor "{instance.nombre_lugar}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Receptor)
def log_receptor_eliminado(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema',
        accion='Eliminación de receptor',
        detalle=f'Se eliminó el receptor "{instance.nombre_lugar}" (ID {instance.id}).'
    )



@receiver(post_save, sender=Publicacion)
def log_publicacion_creada_o_editada(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de publicación',
            detalle=f'Se creó la publicación "{instance.titulo}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de publicación',
            detalle=f'Se actualizó la publicación "{instance.titulo}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Publicacion)
def log_publicacion_eliminada(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema',
        accion='Eliminación de publicación',
        detalle=f'Se eliminó la publicación "{instance.titulo}" (ID {instance.id}).'
    )


@receiver(post_save, sender=Sucursal)
def log_sucursal_creada_o_editada(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de sucursal',
            detalle=f'Se creó la sucursal "{instance.nombre}" con ID {instance.id}.'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de sucursal',
            detalle=f'Se actualizó la sucursal "{instance.nombre}" (ID {instance.id}).'
        )

@receiver(post_delete, sender=Sucursal)
def log_sucursal_eliminada(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema',
        accion='Eliminación de sucursal',
        detalle=f'Se eliminó la sucursal "{instance.nombre}" (ID {instance.id}).'
    )



@receiver(post_save, sender=Solicitud)
def log_solicitud_creada_o_editada(sender, instance, created, **kwargs):
    if created:
        registrar_log(
            usuario='sistema',
            accion='Creación de solicitud',
            detalle=f'Se creó una solicitud asociada a publicación ID {instance.publicacion.id} (Solicitud ID {instance.id}).'
        )
    else:
        registrar_log(
            usuario='sistema',
            accion='Edición de solicitud',
            detalle=f'Se actualizó la solicitud ID {instance.id} asociada a publicación ID {instance.publicacion.id}.'
        )

@receiver(post_delete, sender=Solicitud)
def log_solicitud_eliminada(sender, instance, **kwargs):
    registrar_log(
        usuario='sistema',
        accion='Eliminación de solicitud',
        detalle=f'Se eliminó la solicitud ID {instance.id} asociada a publicación ID {instance.publicacion.id}.'
    )
