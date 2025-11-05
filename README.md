# E-commerce Riwi SportsLine

Este proyecto consiste en la migración completa del e-commerce Riwi SportsLine a la arquitectura NestJS, un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

El objetivo principal de esta épica es modernizar y reestructurar la plataforma, adoptando las mejores prácticas de NestJS para garantizar la escalabilidad, mantenibilidad y robustez del backend

---

## Tecnologías utilizadas

El backend del e-commerce Riwi SportsLine ha sido migrado y desarrollado utilizando las siguientes tecnologías y herramientas clave:

* Framework Principal: NestJS
* Lenguaje de Programación: TypeScript
* Persistencia de Datos: TypeORM
* Base de Datos: Postgres
* Autenticación Avanzada: OAuth, x-api-key
* Control de Calidad: Jest
* Estructura de Datos: DTOs (Data Transfer Objects)

---

## Estructura del proyecto

El repositorio está organizado en dos directorios principales:

* **`e-commerce-sport-line/`**: Contiene toda la **documentación, planificación y archivos de configuración de ejemplo** utilizados durante el segundo *sprint* de desarrollo. 
* **`enunciado/`**: Contiene el **código fuente completo** del proyecto.

---

## Requisitos previos

Asegúrate de tener instalados:
* **Node.js** (versión 18 o superior)
* **npm o yarn** (gestor de paquetes)
* **PostgreSQL** (o la base de datos que configures)
* **Postman** (opcional, para probar los endpoints)

---

## Instalación y ejecución

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/DavidZapata1312/riwi-sportsline.git
    cd e-commerce-sport-line
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura el archivo `.env` en la raíz del proyecto (utiliza el archivo de ejemplo proporcionado en `Sprint-1/`):
    ```env
    PORT=3002
    JWT_SECRET=supersecretkey123
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=1234
    DB_NAME=e_commerce
    ```

4. Recuerda crear la base de datos por consola accediendo al motor de postgres o directamente con un gestor de base datos
    ```bash
    CREATE DATABASE e_commerce;
    ```

5.  Ejecuta la aplicación:
    ```bash
    npm run start:dev
    ```

---

