from rest_framework import viewsets
from .models import (
    EstadoDonacion, CategoriaComida, ArchivoAdjunto,
    Comida, Sucursal, Publicacion
)
from .serializers import (
    EstadoDonacionSerializer, CategoriaComidaSerializer, ArchivoAdjuntoSerializer,
    ComidaSerializer, SucursalSerializer, SucursalWriteSerializer, PublicacionSerializer
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

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SucursalWriteSerializer
        return SucursalSerializer
        
class PublicacionViewSet(viewsets.ModelViewSet):
    queryset = Publicacion.objects.select_related('sucursal__donador').all()
    serializer_class = PublicacionSerializer
