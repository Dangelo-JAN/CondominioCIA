# Employees Management System (EMS) - Gestor CIA

> [!IMPORTANT]
> Note: This project is currently under development. All the relevant details will be updated as the project progresses.

## 🚀 Project Overview
The Employees Management System (EMS) is a robust, full-stack web application designed to streamline and optimize employee management processes for small- to medium-sized organizations. 
Built on the MERN stack (MongoDB, Express.js, React.js, Node.js), the EMS provides a seamless, user-friendly experience for employees and HR professionals alike.

## 🌐 Live Demo

**Frontend Deployment:** [https://condominio-cia.vercel.app/](https://condominio-cia.vercel.app/)

## 📱 Available Screenshots

### EMS Entry Page : 

![EMS Entry](https://github.com/user-attachments/assets/75dc7a8d-d816-4597-b89c-6ade8998afd9)

### EMS HR Sign Up : 

![EMS HR-Sign up](https://github.com/user-attachments/assets/3f576691-78fb-4e66-b409-bd9ed9a1eb2c)

### EMS HR Login : 

![EMS HR-login](https://github.com/user-attachments/assets/c9156026-cd16-4423-a7da-ddc2bdad053e)

### EMS HR Dashboard : 

![HR-Dashboard](https://github.com/user-attachments/assets/ca4c14e0-dcfd-41b2-83cd-1ad67a474142)

### EMS HR Employees Page : 

![Employees-Data](https://github.com/user-attachments/assets/b84d5027-1cc2-4083-aa89-770db32a2b39)

### EMS HR Departments Page : 

![Department-Data](https://github.com/user-attachments/assets/30606767-745a-4898-bb44-4dd453a5db24)

### EMS HR Departments Data : 

![Department-Data](https://github.com/user-attachments/assets/b21a4de2-1993-463f-99e2-c699ea07e0ec)


## ✅ Módulos Funcionales Actuales

### Autenticación y Gestión de Usuarios

| Módulo | Descripción |
|--------|-------------|
| **Autenticación HR** | Sistema completo de registro, login, verificación de email, recuperación de contraseña e invitación de nuevos usuarios RH |
| **Autenticación de Empleados** | Sistema de login, verificación de email, recuperación de contraseña y aceptación de invitación |
| **Control de Acceso Basado en Roles (RBAC)** | Permisos diferenciados entre empleados y RH para acceder a funcionalidades específicas |

### Gestión de Recursos Humanos (RH)

| Módulo | Descripción |
|--------|-------------|
| **Dashboard RH** | Panel principal con estadísticas y resumen de empleados |
| **Gestión de Empleados** | Alta, modificación y control de empleados |
| **Gestión de Departamentos** | Creación y administración de departamentos |
| **Gestión de Perfiles RH** | Administración de perfiles de personal RH |

### Gestión de Horarios

| Módulo | Descripción |
|--------|-------------|
| **Gestión de Horarios** | CRUD completo de horarios laborales, copia de horarios entre empleados, cierre automático de horarios vencidos y registro automático de ausencias |
| **Visualización de Horario (Empleado)** | Los empleados pueden ver su horario actual y registrado |

### Gestión de Permisos y Ausencias

| Módulo | Descripción |
|--------|-------------|
| **Solicitud de Permisos (Empleado)** | Los empleados pueden solicitar permisos/licencias desde su dashboard |
| **Aprobación de Permisos (RH)** | RH puede aprobar o rechazar solicitudes con justificaciones |
| **Registro de Ausencias** | Registro automático de ausencias cuando un empleado no registra entrada |

### Gestión de Photos de Trabajo

| Módulo | Descripción |
|--------|-------------|
| **Registro de Photos (Empleado)** | Los empleados pueden registrar photos de trabajo |
| **Gestión de Photos (RH)** | RH puede visualizar y gestionar las photos registradas |

### Sistema de Correo Electrónico

| Módulo | Descripción |
|--------|-------------|
| **Transacciones por Email** | Sistema automatizado para recuperación de contraseña, emails de bienvenida, notificaciones de permisos y más |

### Dashboard de Empleado

| Módulo | Descripción |
|--------|-------------|
| **Panel de Empleado** | Dashboard personalizado con información de perfil, horario, photos, solicitudes y ausencias |

## 🚧 Módulos en Desarrollo

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| **Asistencia y Attendance** | 🔄 Parcial | Backend implementado, integración con frontend en progreso |
| **Gestión de Salarios** | 🔄 Parcial | Backend implementado, integración con frontend en progreso |
| **Reclutamiento y Candidatos** | 🔄 Parcial | Backend parcialmente implementado, frontend en desarrollo |
| **Entrevistas y Perspectivas** | 🔄 Parcial | Backend parcialmente implementado, frontend en desarrollo |
| **Notificaciones y Avisos** | 🔄 Parcial | Backend parcialmente implementado, frontend en desarrollo |
| **Calendario Corporativo** | 🔄 Parcial | Backend parcialmente implementado, frontend en desarrollo |
| **Dashboard Analytics** | 🔄 Parcial | Backend implementado, mejoras y frontend en progreso |

## 📅 Roadmap de Desarrollo

### Fase 1: Módulos Core (Completado ✅)
- Dashboard de Empleado y RH
- Autenticación (Login, Registro, Verificación)
- Gestión de Empleados y Departamentos
- Gestión de Horarios y Permisos
- Sistema de Photos de Trabajo
- Sistema de Email Transaccional

### Fase 2: Módulos en Desarrollo (En Progreso 🔄)
- Asistencia y Attendance
- Gestión de Salarios
- Dashboard Analytics
- Notificaciones y Avisos

### Fase 3: Módulos Avanzados (Pendiente 📋)
- Reclutamiento y Gestión de Candidatos
- Entrevistas y Perspectivas
- Calendario Corporativo
- Dashboard Analytics Avanzado

### Fase 4: Producción y Escalabilidad (Pendiente 📋)
- Optimización de rendimiento
- Pruebas exhaustivas
- Despliegue a producción

## 💡 Problema que Resuelve

El sistema Gestor CIA aborda los principales desafíos de organizaciones pequeñas y medianas:

- **Gestión Ineficiente de Empleados**: Automatización de horarios, permisos y gestión de personal
- **Brechas de Comunicación**: Mediante notificaciones dinámicas y un calendario corporativo centralizado
- **Preocupaciones de Seguridad**: Implementación de RBAC robusto y sistemas de autenticación seguros
- **Cuellos de Botella en Reclutamiento**: Herramientas simplificadas para que RH gestione flujos de trabajo de reclutamiento

## 🔧 Tech Stack

* **Frontend:** React.js, Redux.js, Tailwind CSS, ShadCN UI Library

* **Backend:** Node.js, Express.js, RESTful APIs

* **Base de Datos:** MongoDB (NoSQL)

* **Autenticación:** JSON Web Tokens (JWT)

* **Control de Versiones:** Git, GitHub

* **Despliegue:** Vercel (Frontend)

## 📦 Installation & Setup

Follow these steps to set up the project locally:

### Prerequisites:

- Node.js
- MongoDB
- Git

> [!IMPORTANT]
> Note: This project is currently under development. Installation instructions will be updated as the project progresses.

### Steps: 

#### 1 Clone the repository:

```

https://github.com/Dangelo-JAN/CondominioCIA.git

```

#### 2 Navigate to the project directory:

```

cd CondominioCIA

```

#### 3 Install dependencies:

```

cd client
npm install

```

```

cd server
npm install

```

#### 4 Set up environment variables: 

Create a .env file in the server directory and configure the following:

```

MONGODB_URI = your mongoDB connection URI
appName = your app name
PORT = your port
MAILTRAP_TOKEN = your mailtrap token
JWT_SECRET = your jwt secret
CLIENT_URL = your client URL

```

Create a .env file in the client directory and configure the following:

```

VITE_BACKEND_API= your employee api (backend)

```

#### 5 Start the development server:

```

cd server
npm run server

```

#### 6 Navigate to the frontend:

```

cd client
npm run dev

```

## 🌟 Futuras Mejoras

* Dashboard Analytics: Análisis avanzado para RH y gestión
* Integraciones de Terceros: Integración con herramientas como Slack y Zoom

## 🙌 Contributing

¡Bienvenidas contribuciones para mejorar el EMS! Siéntete libre de bifurcar el repositorio y enviar pull requests.

## 🧑‍💻 Autores y Agradecimientos

**Darsh Jogi:** Líder del Proyecto e Ingeniero de Software

**Angelo JAN:** Desarrollador y Contribuidor Principal

Special Thanks: A todos los contribuyentes y testers que hicieron este proyecto posible.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

## 📬 Contacto

Para cualquier pregunta o soporte, no dudes en contactarnos:

Email: darshjogi001@gmail.com / dangelojan@outlook.com

LinkedIn: [Darsh Jogi](https://www.linkedin.com/in/darsh-jogi-info/)

---

¡Gracias por visitar el proyecto Employees Management System (EMS) - Gestor CIA! Esperamos que proporcione información valiosa sobre cómo la tecnología puede simplificar la gestión de empleados.
