from rest_framework import viewsets
from .models import (
    EstadoDonacion, CategoriaComida, ArchivoAdjunto,
    Comida, Sucursal, Publicacion
)
from .serializers import (
    EstadoDonacionSerializer, CategoriaComidaSerializer, ArchivoAdjuntoSerializer,
    ComidaSerializer, SucursalSerializer, PublicacionSerializer
)

class EstadoDonacionViewSet(viewsets.ModelViewSet):
    queryset = EstadoDonacion.objects.all()
    serializer_class = EstadoDonacionSerializer

class CategoriaComidaViewSet(viewsets.ModelViewSet):
    queryset = CategoriaComida.objects.all()
    serializer_class = CategoriaComidaSerializer

class ArchivoAdjuntoViewSet(viewsets.ModelViewSet):
    queryset = ArchivoAdjunto.objects.all()
    serializer_class = ArchivoAdjuntoSerializer

class ComidaViewSet(viewsets.ModelViewSet):
    queryset = Comida.objects.all()
    serializer_class = ComidaSerializer

class SucursalViewSet(viewsets.ModelViewSet):
    queryset = Sucursal.objects.all()
    serializer_class = SucursalSerializer

class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.all()
    serializer_class = PublicacionSerializer
