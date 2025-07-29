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
    # if not request.user.is_superuser:
    #     return HttpResponse(status=403)

    filename = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql"
    filepath = os.path.join(settings.BASE_DIR, filename)

    command = [
        "pg_dump",
        "-U", settings.DATABASES["default"]["USER"],
        "-h", settings.DATABASES["default"].get("HOST", "localhost"),
        "-p", str(settings.DATABASES["default"].get("PORT", 5432)),
        "-F", "p",  # formato texto plano
        "-f", filepath,
        settings.DATABASES["default"]["NAME"]
    ]

    env = os.environ.copy()
    env["PGPASSWORD"] = settings.DATABASES["default"]["PASSWORD"]

    subprocess.run(command, env=env, check=True)

    response = FileResponse(open(filepath, "rb"), as_attachment=True, filename=filename)
    return response


@csrf_exempt
def restore_database(request):
    # if request.method != "POST" or not request.user.is_superuser:
    #     return JsonResponse({"error": "Unauthorized or invalid method"}, status=403)
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=403)

    uploaded_file = request.FILES.get("file")
    if not uploaded_file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    filepath = default_storage.save("tmp/restore_backup.sql", uploaded_file)
    full_path = os.path.join(settings.MEDIA_ROOT, filepath)

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
        return JsonResponse({"error": f"Error al exportar base de datos: {e}"}, status=500)

    response = FileResponse(open(filepath, "rb"), as_attachment=True, filename=filename)
    return response


def reset_database(request):
    # if not request.user.is_superuser:
    #     return JsonResponse({"error": "Unauthorized"}, status=403)

    with connection.cursor() as cursor:
        for model in apps.get_models():
            table = model._meta.db_table
            cursor.execute(f'TRUNCATE TABLE "{table}" RESTART IDENTITY CASCADE;')

    return JsonResponse({"status": "database reset successfully"})
