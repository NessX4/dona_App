from rest_framework import viewsets
from .models import Zona, Ubicacion
from .serializers import ZonaSerializer, UbicacionSerializer

class ZonaViewSet(viewsets.ModelViewSet):
    queryset = Zona.objects.all()
    serializer_class = ZonaSerializer

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer
