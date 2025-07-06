from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Sucursal, EstadoDonacion, Publicacion, Comida, ArchivoAdjunto, CategoriaComida
from .forms import SucursalForm, PublicacionForm, ComidaFormSet, ArchivoAdjuntoFormSet, ComidaForm
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
    
    
class EstadoDonacionListView(LoginRequiredMixin, ListView):
    model = EstadoDonacion
    template_name = 'donaciones/estado_donacion/list.html'
    context_object_name = 'estados'
    paginate_by = 10
    ordering = ['nombre']

class EstadoDonacionDetailView(LoginRequiredMixin, DetailView):
    model = EstadoDonacion
    template_name = 'donaciones/estado_donacion/detail.html'
    context_object_name = 'estado'
    
class PublicacionListView(LoginRequiredMixin, ListView):
    model = Publicacion
    template_name = 'donaciones/publicacion/list.html'
    context_object_name = 'publicaciones'
    paginate_by = 10
    ordering = ['-fecha_publicacion']

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filtros opcionales (puedes personalizar)
        if 'estado' in self.request.GET:
            queryset = queryset.filter(estado_id=self.request.GET['estado'])
        if 'zona' in self.request.GET:
            queryset = queryset.filter(zona_id=self.request.GET['zona'])
        return queryset.select_related('sucursal', 'estado', 'zona')

class PublicacionCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Publicacion
    form_class = PublicacionForm
    template_name = 'donaciones/publicacion/create.html'
    success_url = reverse_lazy('donaciones:publicacion_list')
    success_message = "Publicación creada exitosamente"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.POST:
            context['comida_formset'] = ComidaFormSet(self.request.POST, prefix='comida')
            context['archivo_formset'] = ArchivoAdjuntoFormSet(self.request.POST, self.request.FILES, prefix='archivo')
        else:
            context['comida_formset'] = ComidaFormSet(prefix='comida')
            context['archivo_formset'] = ArchivoAdjuntoFormSet(prefix='archivo')
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        comida_formset = context['comida_formset']
        archivo_formset = context['archivo_formset']
        
        if comida_formset.is_valid() and archivo_formset.is_valid():
            self.object = form.save()
            comida_formset.instance = self.object
            comida_formset.save()
            archivo_formset.instance = self.object
            archivo_formset.save()
            return super().form_valid(form)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class PublicacionDetailView(LoginRequiredMixin, DetailView):
    model = Publicacion
    template_name = 'donaciones/publicacion/detail.html'
    context_object_name = 'publicacion'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comidas'] = self.object.comida_set.all()
        context['archivos'] = self.object.archivoadjunto_set.all()
        return context

class PublicacionUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Publicacion
    form_class = PublicacionForm
    template_name = 'donaciones/publicacion/update.html'
    success_url = reverse_lazy('donaciones:publicacion_list')
    success_message = "Publicación actualizada exitosamente"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.POST:
            context['comida_formset'] = ComidaFormSet(self.request.POST, instance=self.object, prefix='comida')
            context['archivo_formset'] = ArchivoAdjuntoFormSet(self.request.POST, self.request.FILES, instance=self.object, prefix='archivo')
        else:
            context['comida_formset'] = ComidaFormSet(instance=self.object, prefix='comida')
            context['archivo_formset'] = ArchivoAdjuntoFormSet(instance=self.object, prefix='archivo')
        return context

    def form_valid(self, form):
        context = self.get_context_data()
        comida_formset = context['comida_formset']
        archivo_formset = context['archivo_formset']
        
        if comida_formset.is_valid() and archivo_formset.is_valid():
            self.object = form.save()
            comida_formset.instance = self.object
            comida_formset.save()
            archivo_formset.instance = self.object
            archivo_formset.save()
            return super().form_valid(form)
        else:
            return self.render_to_response(self.get_context_data(form=form))

class PublicacionDeleteView(LoginRequiredMixin, DeleteView):
    model = Publicacion
    template_name = 'donaciones/publicacion/delete.html'
    success_url = reverse_lazy('donaciones:publicacion_list')
    success_message = "Publicación eliminada exitosamente"

    def delete(self, request, *args, **kwargs):
        from django.contrib import messages
        messages.success(self.request, self.success_message)
        return super().delete(request, *args, **kwargs)
    
    
class CategoriaComidaListView(LoginRequiredMixin, ListView):
    model = CategoriaComida
    template_name = 'donaciones/categoria_comida/list.html'
    context_object_name = 'categorias'
    paginate_by = 10
    ordering = ['nombre']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Agregar estadísticas de uso si es necesario
        return context

class CategoriaComidaDetailView(LoginRequiredMixin, DetailView):
    model = CategoriaComida
    template_name = 'donaciones/categoria_comida/detail.html'
    context_object_name = 'categoria'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Agregar comidas relacionadas
        context['comidas'] = self.object.comida_set.all()[:10]  # Limitar a 10 resultados
        context['total_comidas'] = self.object.comida_set.count()
        return context
    
    
class ComidaListView(LoginRequiredMixin, ListView):
    model = Comida
    template_name = 'donaciones/comida/list.html'
    context_object_name = 'comidas'
    paginate_by = 10
    ordering = ['nombre']

    def get_queryset(self):
        queryset = super().get_queryset()
        # Filtros opcionales
        if 'publicacion' in self.request.GET:
            queryset = queryset.filter(publicacion_id=self.request.GET['publicacion'])
        if 'categoria' in self.request.GET:
            queryset = queryset.filter(categoria_id=self.request.GET['categoria'])
        return queryset.select_related('publicacion', 'categoria')

class ComidaCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Comida
    form_class = ComidaForm
    template_name = 'donaciones/comida/create.html'
    success_url = reverse_lazy('donaciones:comida_list')
    success_message = "Comida creada exitosamente"

class ComidaDetailView(LoginRequiredMixin, DetailView):
    model = Comida
    template_name = 'donaciones/comida/detail.html'
    context_object_name = 'comida'

class ComidaUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Comida
    form_class = ComidaForm
    template_name = 'donaciones/comida/update.html'
    success_url = reverse_lazy('donaciones:comida_list')
    success_message = "Comida actualizada exitosamente"

class ComidaDeleteView(LoginRequiredMixin, DeleteView):
    model = Comida
    template_name = 'donaciones/comida/delete.html'
    success_url = reverse_lazy('donaciones:comida_list')
    success_message = "Comida eliminada exitosamente"

    def delete(self, request, *args, **kwargs):
        from django.contrib import messages
        messages.success(self.request, self.success_message)
        return super().delete(request, *args, **kwargs)