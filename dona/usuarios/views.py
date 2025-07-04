from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, UpdateView, DeleteView
from django.urls import reverse_lazy
from .models import Donador, Usuario, Rol, Receptor, Voluntario, Administrador
from .forms import UsuarioDonadorForm, DonadorForm, UsuarioReceptorForm, ReceptorForm, UsuarioVoluntarioForm, VoluntarioForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


class RolListView(ListView):
    model = Rol
    template_name = 'usuarios/lista_roles.html'
    context_object_name = 'roles'  # Nombre del objeto en el template
    
# Create (Registro)
def registro_donador(request):
    if request.method == 'POST':
        user_form = UsuarioDonadorForm(request.POST)
        donador_form = DonadorForm(request.POST)
        
        if user_form.is_valid() and donador_form.is_valid():
            # Crear usuario
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Donador')  # Asegúrate que exista este rol
            usuario.save()
            
            # Crear donador
            donador = donador_form.save(commit=False)
            donador.usuario = usuario
            donador.save()
            
            return redirect('usuarios:lista_donadores')
    else:
        user_form = UsuarioDonadorForm()
        donador_form = DonadorForm()

    return render(request, 'usuarios/registro_donador.html', {
        'user_form': user_form,
        'donador_form': donador_form
    })

# Read (Lista)
class DonadorListView(ListView):
    model = Donador
    template_name = 'usuarios/lista_donadores.html'
    context_object_name = 'donadores'
    paginate_by = 10

# Update
class DonadorUpdateView(UpdateView):
    model = Donador
    form_class = DonadorForm
    template_name = 'usuarios/editar_donador.html'
    success_url = reverse_lazy('usuarios:lista_donadores')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['usuario'] = self.object.usuario
        return context

# Delete
class DonadorDeleteView(DeleteView):
    model = Donador
    template_name = 'usuarios/eliminar_donador.html'
    success_url = reverse_lazy('usuarios:lista_donadores')
  
# Login View  
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('email')  # Usamos email como username
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')  # Cambia 'home' por tu URL de inicio
        else:
            messages.error(request, 'Correo o contraseña incorrectos')
    
    return render(request, 'usuarios/login.html')

# Registro
def registro_receptor(request):
    if request.method == 'POST':
        user_form = UsuarioReceptorForm(request.POST)
        receptor_form = ReceptorForm(request.POST)
        
        if user_form.is_valid() and receptor_form.is_valid():
            # Crear usuario
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Receptor')  # Asegúrate que exista
            usuario.save()
            
            # Crear receptor
            receptor = receptor_form.save(commit=False)
            receptor.usuario = usuario
            receptor.save()
            
            return redirect('usuarios:lista_receptores')
    else:
        user_form = UsuarioReceptorForm()
        receptor_form = ReceptorForm()

    return render(request, 'usuarios/registro_receptor.html', {
        'user_form': user_form,
        'receptor_form': receptor_form
    })

# Lista
class ReceptorListView(ListView):
    model = Receptor
    template_name = 'usuarios/lista_receptores.html'
    context_object_name = 'receptores'
    paginate_by = 10

# Edición
class ReceptorUpdateView(UpdateView):
    model = Receptor
    form_class = ReceptorForm
    template_name = 'usuarios/editar_receptor.html'
    success_url = reverse_lazy('usuarios:lista_receptores')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['usuario'] = self.object.usuario
        return context

# Eliminación
class ReceptorDeleteView(DeleteView):
    model = Receptor
    template_name = 'usuarios/eliminar_receptor.html'
    success_url = reverse_lazy('usuarios:lista_receptores')
    

# Registro
def registro_voluntario(request):
    if request.method == 'POST':
        user_form = UsuarioVoluntarioForm(request.POST)
        voluntario_form = VoluntarioForm(request.POST)
        
        if user_form.is_valid() and voluntario_form.is_valid():
            # Crear usuario
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Voluntario')  # Asegúrate que exista
            usuario.save()
            
            # Crear voluntario
            voluntario = voluntario_form.save(commit=False)
            voluntario.usuario = usuario
            voluntario.save()
            
            return redirect('usuarios:lista_voluntarios')
    else:
        user_form = UsuarioVoluntarioForm()
        voluntario_form = VoluntarioForm()

    return render(request, 'usuarios/registro_voluntario.html', {
        'user_form': user_form,
        'voluntario_form': voluntario_form
    })

# Lista
class VoluntarioListView(ListView):
    model = Voluntario
    template_name = 'usuarios/lista_voluntarios.html'
    context_object_name = 'voluntarios'
    paginate_by = 10

    def get_queryset(self):
        return Voluntario.objects.select_related('usuario', 'zona').all()

# Edición
class VoluntarioUpdateView(UpdateView):
    model = Voluntario
    form_class = VoluntarioForm
    template_name = 'usuarios/editar_voluntario.html'
    success_url = reverse_lazy('usuarios:lista_voluntarios')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['usuario'] = self.object.usuario
        return context

# Eliminación
class VoluntarioDeleteView(DeleteView):
    model = Voluntario
    template_name = 'usuarios/eliminar_voluntario.html'
    success_url = reverse_lazy('usuarios:lista_voluntarios')