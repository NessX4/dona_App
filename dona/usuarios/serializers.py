from rest_framework import serializers
from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador
from notificaciones.models import Notificacion
from .models import LogSistema

# -------------------- Usuario y Rol --------------------

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(raw_password)
        usuario.save()

        # Verifica si es administrador
        if usuario.rol.nombre != 'Administrador':
            mensaje = f" Nuevo {usuario.rol.nombre} registrado: {usuario.nombre}"

            for admin in Usuario.objects.filter(rol__nombre='Administrador'):
                #  Solo crear si NO existe una notificación igual
                ya_existe = Notificacion.objects.filter(
                    usuario=admin,
                    mensaje=mensaje
                ).exists()

                if not ya_existe:
                    Notificacion.objects.create(usuario=admin, mensaje=mensaje)

        return usuario

class ReceptorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Receptor
        fields = [
            'id',
            'usuario',
            'nombre_lugar',
            'encargado',
            'telefono',
            'direccion',
            'capacidad',
            'horario_apertura',
            'horario_cierre',
        ]

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        # Crear usuario primero
        usuario_serializer = UsuarioSerializer(data=usuario_data)
        usuario_serializer.is_valid(raise_exception=True)
        usuario = usuario_serializer.save()

        # Crear receptor con el usuario creado
        receptor = Receptor.objects.create(usuario=usuario, **validated_data)
        return receptor

    def update(self, instance, validated_data):
        usuario_data = validated_data.pop('usuario', None)

        if usuario_data:
            usuario_serializer = UsuarioSerializer(instance=instance.usuario, data=usuario_data, partial=True)
            usuario_serializer.is_valid(raise_exception=True)
            usuario_serializer.save()

        return super().update(instance, validated_data)


class LogSistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogSistema
        fields = '__all__'






class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

# -------------------- Donador --------------------

class DonadorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Donador
        fields = '__all__'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario_data['rol'] = Rol.objects.get(nombre='Donador')
        usuario = UsuarioSerializer().create(usuario_data)
        donador = Donador.objects.create(usuario=usuario, **validated_data)

        #  Notificación para administradores
        for admin in Usuario.objects.filter(rol__nombre='Administrador'):
            Notificacion.objects.create(
                usuario=admin,
                mensaje=f" Nuevo Donador registrado: {usuario.nombre}"
            )

        return donador

# -------------------- Receptor --------------------

class ReceptorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Receptor
        fields = '__all__'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario_data['rol'] = Rol.objects.get(nombre='Receptor')
        usuario = UsuarioSerializer().create(usuario_data)
        receptor = Receptor.objects.create(usuario=usuario, **validated_data)

        for admin in Usuario.objects.filter(rol__nombre='Administrador'):
            Notificacion.objects.create(
                usuario=admin,
                mensaje=f" Nuevo Receptor registrado: {usuario.nombre}"
            )

        return receptor

# -------------------- Voluntario --------------------

class VoluntarioSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Voluntario
        fields = '__all__'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario_data['rol'] = Rol.objects.get(nombre='Voluntario')
        usuario = UsuarioSerializer().create(usuario_data)
        voluntario = Voluntario.objects.create(usuario=usuario, **validated_data)

        for admin in Usuario.objects.filter(rol__nombre='Administrador'):
            Notificacion.objects.create(
                usuario=admin,
                mensaje=f" Nuevo Voluntario registrado: {usuario.nombre}"
            )

        return voluntario

# -------------------- Administrador --------------------

class AdministradorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Administrador
        fields = '__all__'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario_data['rol'] = Rol.objects.get(nombre='Administrador')
        usuario = UsuarioSerializer().create(usuario_data)
        administrador = Administrador.objects.create(usuario=usuario)

        for admin in Usuario.objects.filter(rol__nombre='Administrador'):
            Notificacion.objects.create(
                usuario=admin,
                mensaje=f" Nuevo Administrador registrado: {usuario.nombre}"
            )

        return administrador

# checar que hacer con admin