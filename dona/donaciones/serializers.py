from rest_framework import serializers
from .models import (
    EstadoDonacion, CategoriaComida, ArchivoAdjunto,
    Comida, Sucursal, Publicacion
)

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

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

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
