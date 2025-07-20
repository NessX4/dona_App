from rest_framework import serializers
from .models import Solicitud, HistorialDonacion

class SolicitudSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitud
        fields = '__all__'

class HistorialDonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialDonacion
        fields = '__all__'
