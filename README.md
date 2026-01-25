# APP-HOY-CIRCULA

## Creación de la base de datos
1. Se encuentra el archivo autoDB.bak que es un backup que es un respaldo de la base de datos, o a su vez existe el script de creación de las tablas con sus respectivos datos.
  ### Restaurar base de datos
1. Abrir SQL Server Management Studio
2. Restaurar base de datos desde el archivo `autoDB.bak`
3. Verificar que la base se llame `autoDB`


## Iniciar los servicios autos-backend
El backend esta realizo con Node.js y Moleculer con las siguientes versiones:
  .Node.js: 20.19.02
  -Moleculer: 0.14.26v
Iniciar el proyecto:
  1. Es necesario instalar las dependencias con el comando: npm install
  2. Iniciar el proyecto con el comando: npm run dev
  3. El archivo de conexión a la base de datos esta en el `.env` que contiene lo siguiente:
     
    db_server=servidor
    db_port=puerto
    db_user=usuario
    db_password=contraseña
    db_database=base_datos

## Iniciar el frontend APP-HOY-CIRCULA
El frontend esta realizo con el framework Angular con las siguiente version:
  - Angular: 20.3.16 (versión del framework/core)
  - Angular CLI: 20.3.15 (versión de la herramienta de línea de comandos)
  
Iniciar el proyecto:
  1. Es necesario instalar las dependencias con el comando: npm install
  2. Iniciar el proyecto con el comando: ng serve o npm start
  3. La tuta de conexion al backend esta en environments/environment.ts que contiene lo siguiente:
     
     export const environment = {
      apiUrl: 'http://localhost:3000/api',
     };

Para generar el compilado
  1. Generar el compilado del frontend: ng build 

