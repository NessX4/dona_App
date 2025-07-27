from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador
from .serializers import (
    UsuarioSerializer, RolSerializer,
    DonadorSerializer, ReceptorSerializer,
    VoluntarioSerializer, AdministradorSerializer
)

from .serializers import LogSistemaSerializer

from .models import LogSistema

# CRUD General
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

# Registro por rol
class DonadorViewSet(viewsets.ModelViewSet):
    queryset = Donador.objects.all()
    serializer_class = DonadorSerializer

class ReceptorViewSet(viewsets.ModelViewSet):
    queryset = Receptor.objects.all()
    serializer_class = ReceptorSerializer

class VoluntarioViewSet(viewsets.ModelViewSet):
    queryset = Voluntario.objects.all()
    serializer_class = VoluntarioSerializer

class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer

# Login API
@api_view(['POST'])
def login_view(request):
    correo = request.data.get('correo')
    contraseña = request.data.get('contraseña')

    try:
        usuario = Usuario.objects.get(correo=correo)
        if usuario.check_password(contraseña):
            return Response({
                "message": "Login exitoso",
                "usuario_id": usuario.id,
                "rol": usuario.rol.nombre
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Contraseña incorrecta"}, status=status.HTTP_401_UNAUTHORIZED)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)




class LogSistemaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LogSistema.objects.all().order_by('-fecha')
    serializer_class = LogSistemaSerializer