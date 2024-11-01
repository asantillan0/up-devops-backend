# Etapa 1: Construcción
FROM python:3.10-slim AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo el archivo de requisitos primero para aprovechar la caché de Docker
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Etapa 2: Ejecución
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app /app

# Verificar que las dependencias estén instaladas
RUN pip list  # Esto te permitirá ver las librerías instaladas

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["python", "app.py"]