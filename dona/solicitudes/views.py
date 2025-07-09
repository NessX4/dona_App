from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Solicitud

class SolicitudListView(ListView):
    model = Solicitud
    template_name = 'solicitudes/lista_solicitudes.html'
    context_object_name = 'solicitudes'

class SolicitudCreateView(CreateView):
    model = Solicitud
    fields = ['publicacion', 'receptor', 'estado', 'comentarios']
    template_name = 'solicitudes/form_solicitud.html'  # Aquí el nombre que tienes
    success_url = reverse_lazy('solicitudes:lista_solicitudes')

class SolicitudUpdateView(UpdateView):
    model = Solicitud
    fields = ['publicacion', 'receptor', 'estado', 'comentarios']
    template_name = 'solicitudes/form_solicitud.html'  # Igual que crear
    success_url = reverse_lazy('solicitudes:lista_solicitudes')

class SolicitudDeleteView(DeleteView):
    model = Solicitud
    template_name = 'solicitudes/eliminar_solicitud.html'  # Tu nombre para eliminar
    success_url = reverse_lazy('solicitudes:lista_solicitudes')
