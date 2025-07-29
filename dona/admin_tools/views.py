# Vanessa Balderas Martinez
# Create your views here.
# admin_tools/views.py

from fileinput import filename
import os
import subprocess
from datetime import datetime

from django.conf import settings
from django.http import FileResponse, JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.apps import apps
from django.db import connection

def export_database(request):
    # Exporta la base de datos a un archivo .sql usando pg_dump
    # if not request.user.is_superuser:
    #     return HttpResponse(status=403)

    filename = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql"
    filepath = os.path.join(settings.BASE_DIR, filename)

    command = [
        "pg_dump",
        "-U", settings.DATABASES["default"]["USER"],  # Usuario de la base de datos
        "-h", settings.DATABASES["default"].get("HOST", "localhost"),  # Host de la base de datos
        "-p", str(settings.DATABASES["default"].get("PORT", 5432)),    # Puerto de la base de datos
        "-F", "p",  # formato texto plano
        "-f", filepath,  # Archivo de salida
        settings.DATABASES["default"]["NAME"]  # Nombre de la base de datos
    ]

    env = os.environ.copy()
    env["PGPASSWORD"] = settings.DATABASES["default"]["PASSWORD"]  # Contraseña de la base de datos

    subprocess.run(command, env=env, check=True)  # Ejecuta el comando de exportación

    response = FileResponse(open(filepath, "rb"), as_attachment=True, filename=filename)  # Devuelve el archivo como descarga
    return response

@csrf_exempt
def restore_database(request):
    # Restaura la base de datos desde un archivo .sql subido por el usuario
    # if request.method != "POST" or not request.user.is_superuser:
    #     return JsonResponse({"error": "Unauthorized or invalid method"}, status=403)
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=403)

    uploaded_file = request.FILES.get("file")
    if not uploaded_file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    # Guardar archivo temporalmente
    filepath = default_storage.save("tmp/restore_backup.sql", uploaded_file)
    full_path = os.path.join(settings.MEDIA_ROOT, filepath)

    # Ejecutar comando psql para restaurar la base
    command = [
        "psql",
        "-U", settings.DATABASES["default"]["USER"],
        "-h", settings.DATABASES["default"].get("HOST", "localhost"),
        "-p", str(settings.DATABASES["default"].get("PORT", 5432)),
        "-d", settings.DATABASES["default"]["NAME"],
        "-f", full_path
    ]

    env = os.environ.copy()
    env["PGPASSWORD"] = settings.DATABASES["default"]["PASSWORD"]

    try:
        subprocess.run(command, env=env, check=True)
    except subprocess.CalledProcessError as e:
        return JsonResponse({"error": f"Error al restaurar la base de datos: {str(e)}"}, status=500)

    return JsonResponse({"status": "Base de datos restaurada correctamente"})


def reset_database(request):
    # Resetea todas las tablas de la base de datos (elimina datos y reinicia IDs)
    # if not request.user.is_superuser:
    #     return JsonResponse({"error": "Unauthorized"}, status=403)

    with connection.cursor() as cursor:
        for model in apps.get_models():
            table = model._meta.db_table
            cursor.execute(f'TRUNCATE TABLE "{table}" RESTART IDENTITY CASCADE;')  # Vacía la tabla y reinicia los IDs

    return JsonResponse({"status": "database reset successfully"})
