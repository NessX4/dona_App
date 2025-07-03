# usuarios/forms.py
from django import forms
from .models import Usuario, Donador, Rol

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