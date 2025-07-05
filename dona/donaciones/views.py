from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Sucursal
from .forms import SucursalForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin

class SucursalListView(LoginRequiredMixin, ListView):
    model = Sucursal
    template_name = 'donaciones/sucursal/list.html'
    context_object_name = 'sucursales'
    paginate_by = 10

class SucursalCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Sucursal
    form_class = SucursalForm
    template_name = 'donaciones/sucursal/create.html'
    success_url = reverse_lazy('donaciones:sucursal_list')
    success_message = "Sucursal creada exitosamente"

class SucursalDetailView(LoginRequiredMixin, DetailView):
    model = Sucursal
    template_name = 'donaciones/sucursal/detail.html'
    context_object_name = 'sucursal'

class SucursalUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Sucursal
    form_class = SucursalForm
    template_name = 'donaciones/sucursal/update.html'
    success_url = reverse_lazy('donaciones:sucursal_list')
    success_message = "Sucursal actualizada exitosamente"

class SucursalDeleteView(LoginRequiredMixin, DeleteView):
    model = Sucursal
    template_name = 'donaciones/sucursal/delete.html'
    success_url = reverse_lazy('donaciones:sucursal_list')
    success_message = "Sucursal eliminada exitosamente"

    def delete(self, request, *args, **kwargs):
        from django.contrib import messages
        messages.success(self.request, self.success_message)
        return super().delete(request, *args, **kwargs)