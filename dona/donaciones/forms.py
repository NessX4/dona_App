from django import forms
from .models import Sucursal, Publicacion, Comida, ArchivoAdjunto
from zonas.models import Ubicacion, Zona
from usuarios.models import Donador
from django.forms import inlineformset_factory


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
        
class PublicacionForm(forms.ModelForm):
    class Meta:
        model = Publicacion
        fields = '__all__'
        widgets = {
            'sucursal': forms.Select(attrs={'class': 'form-control'}),
            'titulo': forms.TextInput(attrs={'class': 'form-control'}),
            'descripcion': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'cantidad': forms.NumberInput(attrs={'class': 'form-control'}),
            'estado': forms.Select(attrs={'class': 'form-control'}),
            'ubicacion': forms.Select(attrs={'class': 'form-control'}),
            'zona': forms.Select(attrs={'class': 'form-control'}),
            'fecha_caducidad': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Puedes personalizar los querysets si es necesario
        self.fields['sucursal'].queryset = self.fields['sucursal'].queryset.select_related('donador')
        self.fields['estado'].queryset = self.fields['estado'].queryset.order_by('nombre')

# Formsets para los modelos relacionados
ComidaFormSet = inlineformset_factory(
    Publicacion, Comida, 
    fields=('nombre', 'cantidad', 'categoria', 'ingredientes'), 
    extra=1,
    widgets={
        'nombre': forms.TextInput(attrs={'class': 'form-control'}),
        'cantidad': forms.TextInput(attrs={'class': 'form-control'}),
        'categoria': forms.Select(attrs={'class': 'form-control'}),
        'ingredientes': forms.Textarea(attrs={'class': 'form-control', 'rows': 2}),
    }
)

ArchivoAdjuntoFormSet = inlineformset_factory(
    Publicacion, ArchivoAdjunto,
    fields=('url', 'tipo'),
    extra=1,
    widgets={
        'url': forms.URLInput(attrs={'class': 'form-control'}),
        'tipo': forms.Select(attrs={'class': 'form-control'}),
    }
)