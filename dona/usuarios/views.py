from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador
from .serializers import (
    UsuarioSerializer, RolSerializer,
    DonadorSerializer, ReceptorSerializer,
    VoluntarioSerializer, AdministradorSerializer
)


class RolListView(ListView):
    model = Rol
    template_name = 'usuarios/lista_roles.html'
    context_object_name = 'roles'  # Nombre del objeto en el template
    
# Create (Registro)
def registro_donador(request):
    if request.method == 'POST':
        user_form = UsuarioDonadorForm(request.POST)
        donador_form = DonadorForm(request.POST)
        
        if user_form.is_valid() and donador_form.is_valid():
            # Crear usuario
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Donador')  # Asegúrate que exista este rol
            usuario.save()
            
            # Crear donador
            donador = donador_form.save(commit=False)
            donador.usuario = usuario
            donador.save()
            
            return redirect('usuarios:lista_donadores')
    else:
        user_form = UsuarioDonadorForm()
        donador_form = DonadorForm()

    return render(request, 'usuarios/registro_donador.html', {
        'user_form': user_form,
        'donador_form': donador_form
    })

# Read (Lista)
class DonadorListView(ListView):
    model = Donador
    template_name = 'usuarios/lista_donadores.html'
    context_object_name = 'donadores'
    paginate_by = 10

# Update
class DonadorUpdateView(UpdateView):
    model = Donador
    form_class = DonadorForm
    template_name = 'usuarios/editar_donador.html'
    success_url = reverse_lazy('usuarios:lista_donadores')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['usuario'] = self.object.usuario
        return context

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
