# Vanessa Balderas Martinez
from rest_framework import serializers
from .models import Comentario

# Serializador para el modelo Comentario
class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario  # Modelo que se va a serializar
        fields = '__all__'  # Incluir todos los campos del modelo en el serializador