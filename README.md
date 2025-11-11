# E-commerce Riwi SportsLine

Este proyecto consiste en la migración completa del e-commerce Riwi SportsLine a la arquitectura NestJS, un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

El objetivo principal de esta épica es modernizar y reestructurar la plataforma, adoptando las mejores prácticas de NestJS para garantizar la escalabilidad, mantenibilidad y robustez del backend

---

## Estructura del proyecto

El repositorio está organizado en dos directorios principales:

* **`e-commerce-sport-line/`**: Contiene toda la **documentación, planificación y archivos de configuración de ejemplo** utilizados durante el segundo *sprint* de desarrollo. 
* **`enunciado/`**: Contiene el **código fuente completo** del proyecto.

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

5. Ejecutar las migraciones para crear las tablas base en la base de datos:

    ```bash
    npm run migration:run
    ```
    Si realizas cambios en las entidades, puedes generar nuevas migraciones con:
    ```bash
    npm run migration:generate
    ```

6. Ejecutar los seeders para insertar datos iniciales en la base de datos:

    ```bash
    npm run seed
    ```

7.  Para levantar el servidor en modo desarrollo:
    ```bash
    npm run start:dev
    ```
---

## Estructura del proyecto

```
src/
├── config/
│ └── database.config.ts
├── migrations/
│ └── 1762397913828-InitSchema.ts
├── seeders/
│ ├── user.seeder.ts
│ ├── client.seeder.ts
│ ├── product.seeder.ts
│ ├── order.seeder.ts
│ ├── order-detail.seeder.ts
│ └── index.ts
├── repositories/
│ └── user.repository.ts
├── user/
│ └── entities/user.entity.ts
├── client/
│ └── entities/client.entity.ts
├── product/
│ └── entities/product.entity.ts
├── order/
│ └── entities/order.entity.ts
├── app.module.ts
└── main.ts
```

---

## Descripción de la historia de usuario

HU-1: Fundamentos de NestJS y migración del setup base

### Criterios de aceptación

* Proyecto creado con Nest CLI e inicializado desde el fork de GitHub.

* Integración de TypeScript, ESLint, Prettier y configuración de entorno (.env) bajo buenas prácticas.

* Migración del setup de conexión a PostgreSQL con TypeORM (sin necesidad de entidades aún).

* Validación del arranque del servidor con variables de entorno administradas mediante el ConfigModule.

---

## Descripci+on de la historia de usuario

HU-2:  Historia de Usuario: Integración de ORM y persistencia con TypeORM

### Criterios de aceptación

* Migrar modelos de Sequelize a entidades de TypeORM. 
* Configurar las relaciones entre entidades. 
* Implementar migraciones y seeds iniciales. 
* Validar consultas básicas desde los servicios.



---

## 🧠 Notas técnicas

- Se configuró `TypeORM` con `ConfigModule` para manejar variables de entorno.
- Las migraciones se generan con `ts-node` y se ejecutan sin necesidad de compilar el proyecto.
- Los seeders utilizan `@faker-js/faker` para generar datos aleatorios.
- Los repositorios personalizados encapsulan la lógica de acceso a datos y facilitan su uso futuro en los servicios NestJS.

---

## Comandos útiles

| Comando             | Descripción                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run start`     | Inicia el servidor NestJS                            |
| `npm run start:dev` | Inicia el servidor en modo desarrollo con hot-reload |
| `npm run lint`      | Analiza y corrige errores de estilo                  |
| `npm run format`    | Aplica formato Prettier a todo el proyecto           |
| `npm run build`     | Compila el proyecto para producción                  |
| `npm run m*:g*`     | Generar esquema de migración                         |
| `npm run m*:r*`     | Crear tablas en la base de datos segun el esquema    |
| `npm run seed`      | Alimentar tabla con datos aleatorios                 |

---

