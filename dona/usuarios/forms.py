# usuarios/forms.py
from django import forms
from .models import Usuario, Donador, Rol, Receptor, Voluntario, Administrador

class UsuarioGenForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'rol', 'activo']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'correo': forms.EmailInput(attrs={'class': 'form-control'}),
            'rol': forms.Select(attrs={'class': 'form-control'}),
        }
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.pk:
            self.fields['correo'].disabled = True  # No cambiar email existente
            
# Formulario para el registro de un usuario donador
class UsuarioDonadorForm(forms.ModelForm):
    contraseña = forms.CharField(widget=forms.PasswordInput())  
    
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'contraseña']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'correo': forms.EmailInput(attrs={'class': 'form-control'}),
            'contraseña': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

# Formulario para el registro de un donador
class DonadorForm(forms.ModelForm):
    class Meta:
        model = Donador
        fields = ['nombre_lugar', 'representante', 'telefono', 'descripcion', 'horario_apertura', 'horario_cierre']
        widgets = {
            'horario_apertura': forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
            'horario_cierre': forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
        }
        labels = {
            'nombre_lugar': 'Nombre del Establecimiento',
            'representante': 'Nombre del Representante',
        }
        
# Formulario para el registro de un usuario receptor
class UsuarioReceptorForm(forms.ModelForm):
    contraseña = forms.CharField(widget=forms.PasswordInput())
    
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'contraseña']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'correo': forms.EmailInput(attrs={'class': 'form-control'}),
            'contraseña': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

# Formulario para el registro de un receptor
class ReceptorForm(forms.ModelForm):
    class Meta:
        model = Receptor
        fields = ['nombre_lugar', 'encargado', 'telefono', 'direccion', 'capacidad', 'horario_apertura', 'horario_cierre']
        widgets = {
            'horario_apertura': forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
            'horario_cierre': forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
            'capacidad': forms.NumberInput(attrs={'class': 'form-control'}),
            'direccion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }
        
 # Formulario para el registro de un usuario voluntario       
class UsuarioVoluntarioForm(forms.ModelForm):
    contraseña = forms.CharField(widget=forms.PasswordInput())
    
    class Meta:
        model = Usuario
        fields = ['nombre', 'correo', 'contraseña']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'correo': forms.EmailInput(attrs={'class': 'form-control'}),
            'contraseña': forms.PasswordInput(attrs={'class': 'form-control'}),
        }

# Formulario para el registro de un voluntario
class VoluntarioForm(forms.ModelForm):
    class Meta:
        model = Voluntario
        fields = ['telefono', 'zona']
        widgets = {
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'zona': forms.Select(attrs={'class': 'form-control'}),
        }