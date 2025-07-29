# Vanessa Balderas Martinez
from django import forms
from .models import Comentario

# Formulario para crear o editar comentarios
class ComentarioForm(forms.ModelForm):
    class Meta:
        model = Comentario  # Modelo asociado al formulario
        fields = ['publicacion', 'usuario', 'comentario']  # Campos que se mostrarán en el formulario
        widgets = {
            'comentario': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),  # Área de texto para el comentario
            'publicacion': forms.Select(attrs={'class': 'form-control'}),  # Selector para la publicación
            'usuario': forms.Select(attrs={'class': 'form-control'}),  # Selector para el usuario
        }
        