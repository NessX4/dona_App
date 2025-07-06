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
    # URLs para EstadoDonacion
    path('estados-donacion/', EstadoDonacionListView.as_view(), name='estado_donacion_list'),
    path('estados-donacion/<int:pk>/', EstadoDonacionDetailView.as_view(), name='estado_donacion_detail'),
     # URLs para Publicacion
    path('publicaciones/', PublicacionListView.as_view(), name='publicacion_list'),
    path('publicaciones/crear/', PublicacionCreateView.as_view(), name='publicacion_create'),
    path('publicaciones/<int:pk>/', PublicacionDetailView.as_view(), name='publicacion_detail'),
    path('publicaciones/<int:pk>/editar/', PublicacionUpdateView.as_view(), name='publicacion_update'),
    path('publicaciones/<int:pk>/eliminar/', PublicacionDeleteView.as_view(), name='publicacion_delete'),
    # URLs para CategoriaComida
    path('categorias-comida/', CategoriaComidaListView.as_view(), name='categoria_comida_list'),
    path('categorias-comida/<int:pk>/', CategoriaComidaDetailView.as_view(), name='categoria_comida_detail'),
     # URLs para Comida
    path('comidas/', ComidaListView.as_view(), name='comida_list'),
    path('comidas/crear/', ComidaCreateView.as_view(), name='comida_create'),
    path('comidas/<int:pk>/', ComidaDetailView.as_view(), name='comida_detail'),
    path('comidas/<int:pk>/editar/', ComidaUpdateView.as_view(), name='comida_update'),
    path('comidas/<int:pk>/eliminar/', ComidaDeleteView.as_view(), name='comida_delete'),
]