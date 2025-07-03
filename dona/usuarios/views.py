from django.views.generic import ListView
from .models import Rol

class RolListView(ListView):
    model = Rol
    template_name = 'usuarios/lista_roles.html'
    context_object_name = 'roles'  # Nombre del objeto en el template