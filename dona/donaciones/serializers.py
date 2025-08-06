from rest_framework import serializers
from .models import (
    EstadoDonacion, CategoriaComida, ArchivoAdjunto,
    Comida, Sucursal, Publicacion
)

from usuarios.models import Donador
from usuarios.serializers import UsuarioSerializer


# --- SERIALIZADORES BÁSICOS ---
class EstadoDonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoDonacion
        fields = '__all__'


class CategoriaComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriaComida
        fields = '__all__'


class ArchivoAdjuntoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivoAdjunto
        fields = '__all__'


class ComidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comida
        fields = '__all__'


# --- DONADOR ANIDADO PARA SUCURSAL ---
class DonadorSucursalSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = Donador
        fields = ['id', 'nombre_lugar', 'usuario']

# --- SUCURSAL SERIALIZER plano ---
class SucursalWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

# --- SUCURSAL SERIALIZER MODIFICADO ---
class SucursalSerializer(serializers.ModelSerializer):
    donador = DonadorSucursalSerializer()

    class Meta:
        model = Sucursal
        fields = '__all__'


# --- PUBLICACION CON DONADOR EXTRA ---
class PublicacionSerializer(serializers.ModelSerializer):
    donador_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Publicacion
        fields = '__all__'
        extra_fields = ['donador_nombre']

    def get_donador_nombre(self, obj):
        return (
            obj.sucursal.donador.nombre_lugar
            if obj.sucursal and obj.sucursal.donador
            else "Anónimo"
        )
