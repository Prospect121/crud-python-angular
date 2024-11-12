# backend/Dockerfile
FROM python:3.9

# Crear y movernos al directorio de la app
WORKDIR /app

# Copiar archivos de la app
COPY . .

# Instalar dependencias
RUN pip install -r requirements.txt

# Exponer el puerto que usa el backend
EXPOSE 5000

# Ejecutar la app
CMD ["python", "app.py"]
