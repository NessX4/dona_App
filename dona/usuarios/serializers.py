from rest_framework import serializers
from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador

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
        return usuario

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class DonadorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Donador
        fields = '__all__'

    def create(self, validated_data):
        usuario_data = validated_data.pop('usuario')
        usuario_data['rol'] = Rol.objects.get(nombre='Donador')  # Ajusta según datos reales
        usuario = UsuarioSerializer().create(usuario_data)
        donador = Donador.objects.create(usuario=usuario, **validated_data)
        return donador

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
        return receptor

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
        return voluntario

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
        return administrador
