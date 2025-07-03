# 🥗 DONA_APP – Distribución Organizada de Nutrientes Alimenticios

**DONA_APP** es una plataforma que facilita la donación y distribución de alimentos entre restaurantes, refugios y voluntarios. El proyecto está desarrollado con Django, y este repositorio sirve como base colaborativa para todo el equipo de desarrollo.

## 🚀 Instrucciones para clonar y comenzar

```bash
git clone https://github.com/NessX4/dona_App.git
cd dona_app
```

### Crea y activa un entorno virtual:
```bash
python -m venv env
env\Scripts\activate   # En Windows
source env/bin/activate  # En Linux/Mac

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass  # Ejecutar ese comando si tienen errores al activar el entorno virtual
```

### Instala las dependencias:
```bash
pip install -r requirements.txt
```

### Crea las migraciones iniciales:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Corre el servidor 
```bash
python manage.py runserver
```


## 🧑‍💻 Flujo de trabajo con Git y ramas

⚠️ La rama `main` está protegida. NO hagas push directo a `main`. Usa ramas y Pull Requests.

### Flujo de trabajo para el equipo:
1. **Crear una nueva rama desde `develop-owner`:**
   ```bash
   git checkout develop-owner
   git pull origin develop-owner
   git checkout -b user/app-o-crud-realizado
   ```

2. **Hacer commits:**
   ```bash
   git add .
   git commit -m "Descripción clara del cambio"
   ```

3. **Subir la rama al repositorio remoto:**
   - Sube tu rama al repositorio remoto:
     ```bash
     git push origin user/app-o-crud-realizado (nombre de tu rama creada)
     ```

4. **Crear un Pull Request hacia `develop`:**
   - Ve a [GitHub](https://github.com/NessX4/dona_App/pulls).
   - Crea un Pull Request
   - Base: develop  |  compare: Tu rama de trabajo (por ejemplo, user/app-o-crud-realizado)
   - Escribe un título y descripción claros para el Pull Request.
   - Solicita la revisión del owner y espera su aprobación.

---
### Flujo de trabajo para el owner:
1. **Subir cambios directamente a `develop-owner`:**
   ```bash
   git checkout develop-owner
   git fetch origin
   git pull origin develop
   git merge develop

   git add .
   git commit -m "Descripción clara del cambio"
   git push origin develop-owner
   ```

2. **Fusionar cambios de `develop-owner` a `develop`:**
     ```bash
     git checkout develop
     git pull origin develop
     git merge develop-owner
     git push origin develop
     ```

### Resumen:
- El equipo sube cambios a `develop` mediante Pull Requests que owner aprueba.
- Owner puede subir cambios directamente a `develop-owner` y luego decidir si fusionarlos en `develop` mediante Pull Requests o directamente.
