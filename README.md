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
⚠️ La rama main está protegida. NO hagas push directo a main. Usa ramas y Pull Requests.

### Crear una nueva rama
```bash
git checkout -b nombre-de-tu-rama
```

### text
```bash
text
```

### Guardar tus cambios y subirlos
```bash
git add .
git commit -m "Descripción clara del cambio"
git push origin nombre-de-tu-rama
```


