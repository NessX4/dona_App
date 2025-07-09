from django.urls import path
from .views import RolListView, login_view
from .views import (registro_donador, DonadorListView, 
                   DonadorUpdateView, DonadorDeleteView)
from .views import (registro_receptor, ReceptorListView, 
                   ReceptorUpdateView, ReceptorDeleteView)
from .views import (registro_voluntario, VoluntarioListView, 
                   VoluntarioUpdateView, VoluntarioDeleteView)
from .views import (UsuarioListView, UsuarioCreateView, 
                   UsuarioUpdateView, UsuarioDeleteView)
from .views import (
    AdministradorListView,
    AdministradorCreateView,
    AdministradorUpdateView,
    AdministradorDeleteView,
)

app_name = 'usuarios'

urlpatterns = [
    # Login
    path('login/', login_view, name='login'),
    # Roles 
    path('roles/', RolListView.as_view(), name='lista_roles'),
    # CRUD Usuarios
    path('usuarios/', UsuarioListView.as_view(), name='lista_usuarios'),
    path('usuarios/crear/', UsuarioCreateView.as_view(), name='crear_usuario'),
    path('usuarios/editar/<int:pk>/', UsuarioUpdateView.as_view(), name='editar_usuario'),
    path('usuarios/eliminar/<int:pk>/', UsuarioDeleteView.as_view(), name='eliminar_usuario'),
    # Donadores CRUD
    path('donadores/', DonadorListView.as_view(), name='lista_donadores'),
    path('donadores/registro/', registro_donador, name='registro_donador'),
    path('donadores/editar/<int:pk>/', DonadorUpdateView.as_view(), name='editar_donador'),
    path('donadores/eliminar/<int:pk>/', DonadorDeleteView.as_view(), name='eliminar_donador'),
    # Receptores CRUD
    path('receptores/', ReceptorListView.as_view(), name='lista_receptores'),
    path('receptores/registro/', registro_receptor, name='registro_receptor'),
    path('receptores/editar/<int:pk>/', ReceptorUpdateView.as_view(), name='editar_receptor'),
    path('receptores/eliminar/<int:pk>/', ReceptorDeleteView.as_view(), name='eliminar_receptor'),
    # Voluntarios CRUD
    path('voluntarios/', VoluntarioListView.as_view(), name='lista_voluntarios'),
    path('voluntarios/registro/', registro_voluntario, name='registro_voluntario'),
    path('voluntarios/editar/<int:pk>/', VoluntarioUpdateView.as_view(), name='editar_voluntario'),
    path('voluntarios/eliminar/<int:pk>/', VoluntarioDeleteView.as_view(), name='eliminar_voluntario'),
    # Admin crud
    path('administradores/', AdministradorListView.as_view(), name='lista_administradores'),
    path('administradores/registro/', AdministradorCreateView.as_view(), name='registro_administrador'),
    path('administradores/editar/<int:pk>/', AdministradorUpdateView.as_view(), name='editar_administrador'),
    path('administradores/eliminar/<int:pk>/', AdministradorDeleteView.as_view(), name='eliminar_administrador'),

]