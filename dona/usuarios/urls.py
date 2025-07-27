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
    UsuarioViewSet, RolViewSet,
    DonadorViewSet, ReceptorViewSet,
    VoluntarioViewSet, AdministradorViewSet,
    login_jwt, usuario_logueado,
    cambiar_contrasena, reset_password_simple
)

app_name = 'usuarios'

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_jwt, name='login_jwt'),
    path('me/', usuario_logueado, name='usuario_logueado'),
    path('cambiar-contrasena/', cambiar_contrasena, name='cambiar_contrasena'),
    path('reset-password/', reset_password_simple, name='reset_password_simple'),
]
