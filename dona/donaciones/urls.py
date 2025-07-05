from django.urls import path
from .views import *

app_name = 'donaciones'

urlpatterns = [
    # URLs para Sucursal
    path('sucursales/', SucursalListView.as_view(), name='sucursal_list'),
    path('sucursales/crear/', SucursalCreateView.as_view(), name='sucursal_create'),
    path('sucursales/<int:pk>/', SucursalDetailView.as_view(), name='sucursal_detail'),
    path('sucursales/<int:pk>/editar/', SucursalUpdateView.as_view(), name='sucursal_update'),
    path('sucursales/<int:pk>/eliminar/', SucursalDeleteView.as_view(), name='sucursal_delete'),
]