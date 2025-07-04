# zonas/forms.py
from django import forms
from .models import Zona, Ubicacion

class ZonaForm(forms.ModelForm):
    class Meta:
        model = Zona
        fields = ['nombre', 'codigo_postal', 'ciudad', 'estado']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'codigo_postal': forms.TextInput(attrs={'class': 'form-control'}),
            'ciudad': forms.TextInput(attrs={'class': 'form-control'}),
            'estado': forms.TextInput(attrs={'class': 'form-control'}),
        }

class UbicacionForm(forms.ModelForm):
    class Meta:
        model = Ubicacion
        fields = ['direccion', 'latitud', 'longitud', 'zona']
        widgets = {
            'direccion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'latitud': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.000001'}),
            'longitud': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.000001'}),
            'zona': forms.Select(attrs={'class': 'form-control'}),
        }