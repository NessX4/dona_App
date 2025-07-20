from rest_framework import serializers
from .models import Rol, Usuario, Donador, Receptor, Voluntario, Administrador

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class DonadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donador
        fields = '__all__'

class ReceptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptor
        fields = '__all__'

class VoluntarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voluntario
        fields = '__all__'

class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = '__all__'
