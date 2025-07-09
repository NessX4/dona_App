from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from .models import Notificacion

class NotificacionListView(ListView):
    model = Notificacion
    template_name = 'notificaciones/lista_notificaciones.html'
    context_object_name = 'notificaciones'
    paginate_by = 20
    ordering = ['-fecha']

class NotificacionCreateView(CreateView):
    model = Notificacion
    fields = ['usuario', 'mensaje', 'leido']
    template_name = 'notificaciones/form_notificacion.html'
    success_url = reverse_lazy('notificaciones:lista_notificaciones')

class NotificacionUpdateView(UpdateView):
    model = Notificacion
    fields = ['usuario', 'mensaje', 'leido']
    template_name = 'notificaciones/form_notificacion.html'
    success_url = reverse_lazy('notificaciones:lista_notificaciones')

class NotificacionDeleteView(DeleteView):
    model = Notificacion
    template_name = 'notificaciones/eliminar_notificacion.html'
    success_url = reverse_lazy('notificaciones:lista_notificaciones')
