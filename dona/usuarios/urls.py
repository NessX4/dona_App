from django.urls import path
from .views import RolListView

app_name = 'usuarios'

urlpatterns = [
    path('roles/', RolListView.as_view(), name='lista_roles'),
]