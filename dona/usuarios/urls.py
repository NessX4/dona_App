from django.urls import path
from .views import RolListView, login_view
from .views import (registro_donador, DonadorListView, 
                   DonadorUpdateView, DonadorDeleteView)

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
]