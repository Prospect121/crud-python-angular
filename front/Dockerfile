# frontend/Dockerfile
FROM node:20 AS build

# Crear y movernos al directorio de la app
WORKDIR /app


# Copiar el package.json
COPY package.json ./

# Instalar Angular CLI globalmente
RUN npm install --global @angular/cli

# Copiar el resto de la aplicación
COPY . .

# Instalar dependencias y construir la aplicación
RUN npm install
RUN npm run build --prod

# Usar Nginx para servir la aplicación
FROM nginx:alpine

# Remover la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos construidos desde la imagen de build
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copiar configuración nginx
COPY nginx-docker.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 para Nginx
EXPOSE 80

# Comando para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
