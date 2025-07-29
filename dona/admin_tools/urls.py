# admin_tools/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('export-db/', views.export_database, name='export_database'),
    path('restore-db/', views.restore_database, name='restore_database'),
    path('reset-db/', views.reset_database, name='reset_database'),
]
