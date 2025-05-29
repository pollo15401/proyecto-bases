# Aplicación de Gestión Académica

Esta es una aplicación web completa para la gestión académica, que incluye funciones para administrar asignaturas, asistencias, docentes, estudiantes, evaluaciones y grupos. La aplicación está construida con un backend en Node.js y un frontend en React

## Características

*   **Asignaturas:** Gestión de asignaturas, incluyendo la creación, actualización y eliminación de asignaturas.
*   **Asistencias:** Registro y seguimiento de la asistencia de los estudiantes.
*   **Docentes:** Gestión de la información de los docentes.
*   **Estudiantes:** Gestión de la información de los estudiantes.
*   **Evaluaciones:** Registro y seguimiento de las evaluaciones de los estudiantes.
*   **Grupos:** Gestión de grupos de estudiantes.
*   **Autenticación:** Funciones de registro e inicio de sesión para usuarios.

## Configuración

### Backend

1.  Navega al directorio `backend`: `cd backend`
2.  Instala las dependencias: `npm install`
3.  Configura la base de datos:
    *   Asegúrate de tener un servidor de MongoDB en ejecución.
    *   Modifica el archivo [`backend/db.js`](backend/db.js) con la URL de tu base de datos.
4.  Ejecuta el backend: `npm start`

### Frontend

1.  Navega al directorio `frontend`: `cd frontend`
2.  Instala las dependencias: `npm install`
3.  Ejecuta el frontend: `npm run dev`

## Tecnologías Utilizadas

*   **Frontend:**
    *   React
    *   Formik
    *   Yup
    *   CSS
*   **Backend:**
    *   Node.js
    *   Express
    *   MongoDB
    *   Mongoose
    *   JSON Web Tokens (JWT)

## Estructura del Proyecto

```
.
├── backend/        # Código del backend
├── frontend/       # Código del frontend
├── README.md       # Este archivo
```

## Rutas de la API

El backend proporciona las siguientes rutas de la API:

*   `/api/auth`: Rutas de autenticación (registro, inicio de sesión).
*   `/api/asignaturas`: Rutas para la gestión de asignaturas.
*   `/api/asistencias`: Rutas para la gestión de asistencias.
*   `/api/docentes`: Rutas para la gestión de docentes.
*   `/api/estudiantes`: Rutas para la gestión de estudiantes.
*   `/api/evaluaciones`: Rutas para la gestión de evaluaciones.
*   `/api/grupos`: Rutas para la gestión de grupos.

## Créditos

Esta aplicación fue desarrollada por [Daniel Mata Lerma].
Matricula: 362040

## Licencia

[Licencia]