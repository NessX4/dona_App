from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name='landing'),
    path('logout/', views.logout_view, name='logout'),
    path('loggin/', views.login_view, name='loggin'),
    path('registro/', views.registro_view, name='registro'),
    path('MisDonaciones/', views.donaciones_view, name='Donaciones'),
    path('NuevaContraseña/', views.NuevaContra_view, name='Ncontra'),
    path('Perfil/', views.perfil_view, name='perfil'),
    path('Notificaciones/', views.Notificaciones_view, name='notificaciones'),
    path('PublicarDonacion/', views.publicacdonacion_view, name='publicardoonacion'),
    path('Contrasena/', views.contrasena_view, name='contrasena'),
    path('NuevaContrasena/', views.nueva_contrasena_view, name='nueva_contrasena'),
]