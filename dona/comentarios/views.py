# Vanessa Balderas Martinez
from rest_framework import viewsets
from .models import Comentario
from .serializers import ComentarioSerializer

# ViewSet para manejar las operaciones CRUD de Comentario a través de la API
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()  # Consulta todos los comentarios
    serializer_class = ComentarioSerializer  # Usa el serializador de Comentario