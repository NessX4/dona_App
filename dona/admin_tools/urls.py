# Vanessa Balderas Martinez
# admin_tools/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # Ruta para exportar la base de datos (descargar backup)
    path('export-db/', views.export_database, name='export_database'),
    # Ruta para restaurar la base de datos desde un archivo subido
    path('restore-db/', views.restore_database, name='restore_database'),
    # Ruta para resetear (vaciar) todas las tablas de la base de datos
    path('reset-db/', views.reset_database, name='reset_database'),
]