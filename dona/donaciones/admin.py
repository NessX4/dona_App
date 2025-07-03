from django.contrib import admin
from .models import EstadoDonacion, CategoriaComida, ArchivoAdjunto, Comida, Sucursal, Publicacion

# Register your models here.


admin.site.register(EstadoDonacion)
admin.site.register(CategoriaComida)
admin.site.register(ArchivoAdjunto)
admin.site.register(Comida)
admin.site.register(Sucursal)
admin.site.register(Publicacion)