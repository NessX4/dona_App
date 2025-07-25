from rest_framework import viewsets
from .models import Solicitud, HistorialDonacion
from .serializers import SolicitudSerializer, HistorialDonacionSerializer

class SolicitudViewSet(viewsets.ModelViewSet):
    queryset = Solicitud.objects.all()
    serializer_class = SolicitudSerializer

class HistorialDonacionViewSet(viewsets.ModelViewSet):
    queryset = HistorialDonacion.objects.all()
    serializer_class = HistorialDonacionSerializer
