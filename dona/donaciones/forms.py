from django import forms
from .models import Sucursal
from zonas.models import Ubicacion, Zona
from usuarios.models import Donador

class SucursalForm(forms.ModelForm):
    class Meta:
        model = Sucursal
        fields = '__all__'
        widgets = {
            'donador': forms.Select(attrs={'class': 'form-control'}),
            'nombre': forms.TextInput(attrs={'class': 'form-control'}),
            'direccion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'telefono': forms.TextInput(attrs={'class': 'form-control'}),
            'horario_apertura': forms.TimeInput(attrs={'class': 'form-control', 'type': 'time'}),
            'horario_cierre': forms.TimeInput(attrs={'class': 'form-control', 'type': 'time'}),
            'ubicacion': forms.Select(attrs={'class': 'form-control'}),
            'zona': forms.Select(attrs={'class': 'form-control'}),
            'representante': forms.TextInput(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['ubicacion'].queryset = Ubicacion.objects.all()
        self.fields['zona'].queryset = Zona.objects.all()
        self.fields['donador'].queryset = Donador.objects.all()