from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador
from .serializers import (
    UsuarioSerializer, RolSerializer,
    DonadorSerializer, ReceptorSerializer,
    VoluntarioSerializer, AdministradorSerializer
)

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

# Login que devuelve JWT tokens
@api_view(['POST'])
@permission_classes([AllowAny])
def login_jwt(request):
    correo = request.data.get('correo')
    password = request.data.get('password')

    usuario = authenticate(request, username=correo, password=password)
    if usuario is not None:
        refresh = RefreshToken.for_user(usuario)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'usuario_id': usuario.id,
            'rol': usuario.rol.nombre
        })
    else:
        return Response({"error": "Correo o contraseña incorrectos"}, status=status.HTTP_401_UNAUTHORIZED)

# Obtener info del usuario logueado
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def usuario_logueado(request):
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)

# Cambiar contraseña
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cambiar_contrasena(request):
    usuario = request.user
    password_actual = request.data.get('password_actual')
    new_password = request.data.get('new_password')

    if not usuario.check_password(password_actual):
        return Response({"error": "Contraseña actual incorrecta"}, status=status.HTTP_400_BAD_REQUEST)

    if not new_password or len(new_password) < 6:
        return Response({"error": "Nueva contraseña inválida"}, status=status.HTTP_400_BAD_REQUEST)

    usuario.set_password(new_password)
    usuario.save()
    return Response({"message": "Contraseña cambiada correctamente"})

# Resetear contraseña simple sin email (solo con correo)
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password_simple(request):
    correo = request.data.get('correo')
    new_password = request.data.get('new_password')

    if not new_password or len(new_password) < 6:
        return Response({"error": "Nueva contraseña inválida"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(correo=correo)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    usuario.set_password(new_password)
    usuario.save()
    return Response({"message": "Contraseña restablecida correctamente"})
