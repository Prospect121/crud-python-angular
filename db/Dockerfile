# db/Dockerfile
FROM mysql:8.0.40

# Configurar variables de entorno
ENV MYSQL_DATABASE=project_crud
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_ROOT_PASSWORD=rootpassword

# Copiar archivo SQL de inicialización si tienes uno
COPY ./init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto de MySQL
EXPOSE 3306