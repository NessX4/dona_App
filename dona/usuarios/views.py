from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, UpdateView, DeleteView, CreateView
from django.urls import reverse_lazy
from .models import Donador, Usuario, Rol, Receptor, Voluntario, Administrador
from .forms import UsuarioDonadorForm, DonadorForm, UsuarioReceptorForm, ReceptorForm, UsuarioVoluntarioForm, VoluntarioForm, UsuarioGenForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .forms import AdministradorForm
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password


class RolListView(ListView):
    model = Rol
    template_name = 'usuarios/lista_roles.html'
    context_object_name = 'roles'  # Nombre del objeto en el template
 
def login_view(request):
    if request.method == 'POST':
        correo = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            # Buscar usuario por correo
            usuario = Usuario.objects.get(correo=correo)
            
            # Verificar contraseña y estado activo
            if check_password(password, usuario.contraseña) and usuario.activo:
                # Autenticación exitosa
                request.session['usuario_id'] = usuario.id
                request.session['usuario_nombre'] = usuario.nombre
                request.session['usuario_rol'] = usuario.rol.nombre
                # Redirigir a landing después de login exitoso
                return redirect('home')
                
                # # Redirigir según el rol
                # if usuario.rol.nombre == 'Donador':
                #     return redirect('pagina_donador')
                # elif usuario.rol.nombre == 'Receptor':
                #     return redirect('pagina_receptor')
                # elif usuario.rol.nombre == 'Voluntario':
                #     return redirect('pagina_voluntario')
                # elif usuario.rol.nombre == 'Administrador':
                #     return redirect('panel_administrador')
                # else:
                #     return redirect('home')
            
            elif not usuario.activo:
                messages.error(request, 'Tu cuenta está desactivada. Contacta al administrador.')
            else:
                messages.error(request, 'Contraseña incorrecta')
                
        except Usuario.DoesNotExist:
            messages.error(request, 'No existe un usuario con este correo electrónico')
    
    return render(request, 'usuarios/login.html')
   
# Create (Registro)
def registro_donador(request):
    if request.method == 'POST':
        user_form = UsuarioDonadorForm(request.POST)
        donador_form = DonadorForm(request.POST)
        
        if user_form.is_valid() and donador_form.is_valid():
            # Crear usuario con contraseña hasheada
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Donador')
            usuario.contraseña = make_password(usuario.contraseña)  # Hashear aquí
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
  

# Registro
def registro_receptor(request):
    if request.method == 'POST':
        user_form = UsuarioReceptorForm(request.POST)
        receptor_form = ReceptorForm(request.POST)
        
        if user_form.is_valid() and receptor_form.is_valid():
            # Crear usuario con contraseña hasheada
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Receptor')
            usuario.contraseña = make_password(usuario.contraseña)  # Hashear aquí
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
            # Crear usuario con contraseña hasheada
            usuario = user_form.save(commit=False)
            usuario.rol = Rol.objects.get(nombre='Voluntario')
            usuario.contraseña = make_password(usuario.contraseña)  # Hashear aquí
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
    

class UsuarioListView(ListView):
    model = Usuario
    template_name = 'usuarios/lista_usuarios.html'
    context_object_name = 'usuarios'
    paginate_by = 20
    
    def get_queryset(self):
        return Usuario.objects.select_related('rol').all()

class UsuarioCreateView(CreateView):
    model = Usuario
    form_class = UsuarioGenForm
    template_name = 'usuarios/form_usuario.html'
    success_url = reverse_lazy('usuarios:lista_usuarios')
    
    def form_valid(self, form):
        usuario = form.save(commit=False)
        # Hashear la contraseña antes de guardar
        usuario.contraseña = make_password("passwordtemporal")
        usuario.save()
        return super().form_valid(form)

class UsuarioUpdateView(UpdateView):
    model = Usuario
    form_class = UsuarioGenForm
    template_name = 'usuarios/form_usuario.html'
    success_url = reverse_lazy('usuarios:lista_usuarios')
    
    def form_valid(self, form):
        usuario = form.save(commit=False)
        # Si la contraseña fue modificada, hashearla
        if 'contraseña' in form.changed_data:
            usuario.contraseña = make_password(usuario.contraseña)
        usuario.save()
        return super().form_valid(form)

class UsuarioDeleteView(DeleteView):
    model = Usuario
    template_name = 'usuarios/eliminar_usuario.html'
    success_url = reverse_lazy('usuarios:lista_usuarios')
    
    def post(self, request, *args, **kwargs):
        # Desactivar en lugar de borrar
        usuario = self.get_object()
        usuario.activo = False
        usuario.save()
        return redirect(self.success_url)
    

# Lista de administradores
class AdministradorListView(ListView):
    model = Administrador
    template_name = 'usuarios/lista_administradores.html'
    context_object_name = 'administradores'
    paginate_by = 10

# Crear administrador
class AdministradorCreateView(CreateView):
    model = Administrador
    form_class = AdministradorForm
    template_name = 'usuarios/registro_administrador.html'
    success_url = reverse_lazy('home:landing') 

    def form_valid(self, form):
        password = form.cleaned_data.get('contraseña')
        confirm_password = self.request.POST.get('confirm_password')
        
        if password != confirm_password:
            form.add_error('contraseña', 'Las contraseñas no coinciden')
            return self.form_invalid(form)
        
        # Crear el administrador con contraseña hasheada
        administrador = form.save(commit=False)
        administrador.contraseña = make_password(password)
        
        if Usuario.objects.filter(correo=administrador.correo).exists():
            form.add_error('correo', 'Este correo ya está registrado')
            return self.form_invalid(form)
        
        # Crear el usuario asociado con contraseña hasheada
        usuario = Usuario.objects.create(
            nombre=administrador.nombre,
            correo=administrador.correo,
            contraseña=make_password(password),  # Hashear aquí también
            rol=Rol.objects.get(nombre='Administrador'),
            activo=True
        )
        
        administrador.usuario = usuario
        administrador.save()
        
        messages.success(self.request, 'Administrador creado exitosamente')
        return super().form_valid(form)
    

# Editar administrador
class AdministradorUpdateView(UpdateView):
    model = Administrador
    form_class = AdministradorForm
    template_name = 'usuarios/editar_administrador.html'
    success_url = reverse_lazy('usuarios:lista_administradores')

# "Eliminar" administrador - desactivar
class AdministradorDeleteView(DeleteView):
    model = Administrador
    template_name = 'usuarios/eliminar_administrador.html'
    success_url = reverse_lazy('usuarios:lista_administradores')

    def post(self, request, *args, **kwargs):
        administrador = self.get_object()
        administrador.activo = False
        administrador.save()
        return redirect(self.success_url)
