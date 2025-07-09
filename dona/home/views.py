from django.shortcuts import render

# Vista para la página principal
def landing_page(request):
    return render(request, 'home/index.html')

# Vista para logout
def logout_view(request):
    return render(request, 'home/Logout.html')

# Vista para login
def login_view(request):
    return render(request, 'home/Loggin.html')

# Vista para registro
def registro_view(request):
    return render(request, 'home/Registro.html')

# Vista para mis donaciones
def donaciones_view(request):
    return render(request, 'home/MisDonaciones.html')

# Vista para nueva contraseña
def NuevaContra_view(request):
    return render(request, 'home/NuevaContraseña.html')

# Vista para perfil
def perfil_view(request):
    return render(request, 'home/Perfil.html')

# Vista para notificaciones
def Notificaciones_view(request):
    return render(request, 'home/Notificaciones.html')

# Vista para publicar donación
def publicacdonacion_view(request):
    return render(request, 'home/PublicarDonacion.html')

def contrasena_view(request):
    return render(request, 'home/Contraseña.html')

# Nueva vista para página de "Nueva Contraseña"
def nueva_contrasena_view(request):
    return render(request, 'home/NuevaContraseña.html')