from django.urls import path
from .views import RolListView, login_view
from .views import (registro_donador, DonadorListView, 
                   DonadorUpdateView, DonadorDeleteView)
from .views import (registro_receptor, ReceptorListView, 
                   ReceptorUpdateView, ReceptorDeleteView)

app_name = 'usuarios'

urlpatterns = [
    # Roles 
    path('roles/', RolListView.as_view(), name='lista_roles'),
    # Donadores CRUD
    path('donadores/', DonadorListView.as_view(), name='lista_donadores'),
    path('donadores/registro/', registro_donador, name='registro_donador'),
    path('donadores/editar/<int:pk>/', DonadorUpdateView.as_view(), name='editar_donador'),
    path('donadores/eliminar/<int:pk>/', DonadorDeleteView.as_view(), name='eliminar_donador'),
    # Login
    path('login/', login_view, name='login'),
    # Receptores CRUD
    path('receptores/', ReceptorListView.as_view(), name='lista_receptores'),
    path('receptores/registro/', registro_receptor, name='registro_receptor'),
    path('receptores/editar/<int:pk>/', ReceptorUpdateView.as_view(), name='editar_receptor'),
    path('receptores/eliminar/<int:pk>/', ReceptorDeleteView.as_view(), name='eliminar_receptor'),
]