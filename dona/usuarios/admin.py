from django.contrib import admin
from .models import Usuario, Rol, Donador, Receptor, Voluntario, Administrador

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Rol)
admin.site.register(Donador)
admin.site.register(Receptor)
admin.site.register(Voluntario)
admin.site.register(Administrador)
