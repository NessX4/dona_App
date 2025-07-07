# zonas/views.py
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Zona, Ubicacion
from .forms import ZonaForm, UbicacionForm

# Vistas para Zonas
class ZonaListView(ListView):
    model = Zona
    template_name = 'zonas/lista_zonas.html'
    context_object_name = 'zonas'
    paginate_by = 10

class ZonaCreateView(CreateView):
    model = Zona
    form_class = ZonaForm
    template_name = 'zonas/form_zona.html'
    success_url = reverse_lazy('zonas:lista_zonas')

class ZonaUpdateView(UpdateView):
    model = Zona
    form_class = ZonaForm
    template_name = 'zonas/form_zona.html'
    success_url = reverse_lazy('zonas:lista_zonas')

class ZonaDeleteView(DeleteView):
    model = Zona
    template_name = 'zonas/confirmar_eliminar.html'
    success_url = reverse_lazy('zonas:lista_zonas')

# Vistas para Ubicaciones
class UbicacionListView(ListView):
    model = Ubicacion
    template_name = 'zonas/lista_ubicaciones.html'
    context_object_name = 'ubicaciones'
    paginate_by = 10

class UbicacionCreateView(CreateView):
    model = Ubicacion
    form_class = UbicacionForm
    template_name = 'zonas/form_ubicacion.html'
    success_url = reverse_lazy('zonas:lista_ubicaciones')

class UbicacionUpdateView(UpdateView):
    model = Ubicacion
    form_class = UbicacionForm
    template_name = 'zonas/form_ubicacion.html'
    success_url = reverse_lazy('zonas:lista_ubicaciones')

class UbicacionDeleteView(DeleteView):
    model = Ubicacion
    template_name = 'zonas/confirmar_eliminar.html'
    success_url = reverse_lazy('zonas:lista_ubicaciones')