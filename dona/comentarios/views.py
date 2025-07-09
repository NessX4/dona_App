from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Comentario
from .forms import ComentarioForm  # Lo vamos a crear también

class ComentarioListView(ListView):
    model = Comentario
    template_name = 'comentarios/lista_comentarios.html'
    context_object_name = 'comentarios'
    paginate_by = 20

class ComentarioCreateView(CreateView):
    model = Comentario
    form_class = ComentarioForm
    template_name = 'comentarios/form_comentario.html'
    success_url = reverse_lazy('comentarios:lista_comentarios')

class ComentarioUpdateView(UpdateView):
    model = Comentario
    form_class = ComentarioForm
    template_name = 'comentarios/form_comentario.html'
    success_url = reverse_lazy('comentarios:lista_comentarios')

class ComentarioDeleteView(DeleteView):
    model = Comentario
    template_name = 'comentarios/eliminar_comentario.html'
    success_url = reverse_lazy('comentarios:lista_comentarios')
