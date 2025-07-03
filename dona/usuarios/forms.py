# usuarios/forms.py
from django import forms
from .models import Usuario, Donador, Rol, Receptor, Voluntario, Administrador

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