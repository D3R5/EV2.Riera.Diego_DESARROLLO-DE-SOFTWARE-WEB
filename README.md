# Evaluación Sumativa Unidad N2

**Nombre:** Diego Esteban Rivera Spröhnle
**Asignatura:** T2-26-(51) - DESARROLLO DE SOFTWARE WEB I - IF204IINF – 10975

### Next.js + Prisma + JWT + MySQL + Tailwind.css

---

## 🧾 Descripción

Aplicación web desarrollada con **Next.js (App Router)** que permite la gestión de usuarios y proyectos de manera segura.

El sistema incluye autenticación mediante **JWT**, control de acceso por usuario y un panel donde cada usuario puede administrar sus propios proyectos.

---

## 🛠️ Tecnologías utilizadas

* **Next.js (App Router)**
* **React**
* **Prisma ORM**
* **MySQL**
* **JWT (jsonwebtoken)**
* **bcryptjs**

---

## ⚙️ Configuración del entorno

### 📄 Archivo `.env`

```env
DATABASE_URL="mysql://root:desarrollo_software_1@localhost:3306/desarrollo_software_1"
JWT_SECRET="desarrollo_software_1"
```

---

## 🧬 Modelos de Base de Datos

### 👤 Usuario

* id (Int)
* nombre (String)
* correo (String, único)
* clave (String cifrada)

### 📦 Proyecto

* id (Int)
* nombre (String)
* fechaInicio (DateTime)
* estado (String)
* responsable (String)
* monto (Float)
* created_by (Int → relación con Usuario)

---

## 🚀 Instalación y ejecución

```bash
npm install
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Aplicación disponible en:

```
http://localhost:3000
```

---

## 🌐 Navegación (Navbar)

La aplicación incorpora un **Navbar** que permite acceder fácilmente a las distintas secciones:

* Login
* Registro
* Dashboard

Esto mejora la experiencia de usuario y facilita la navegación entre vistas.

---

## 🌐 Rutas del Frontend

| Ruta         | Descripción         |
| ------------ | ------------------- |
| `/login`     | Inicio de sesión    |
| `/register`  | Registro de usuario |
| `/dashboard` | Panel de proyectos  |

---

## 🔌 API Endpoints

### 🔐 Autenticación

#### Registro

```
POST /api/auth/register
```

#### Login

```
POST /api/auth/login
```

Respuesta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### 📦 Proyectos (requieren autenticación)

Todas las solicitudes requieren el header:

```
Authorization: Bearer TOKEN
```

| Método | Endpoint            | Descripción                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/projects`     | Obtener proyectos del usuario |
| POST   | `/api/projects`     | Crear proyecto                |
| PUT    | `/api/projects/:id` | Actualizar proyecto           |
| DELETE | `/api/projects/:id` | Eliminar proyecto             |

---

## 🔐 Seguridad

* Contraseñas cifradas utilizando **bcrypt**
* Autenticación mediante **JWT**
* Validación de acceso en cada solicitud
* Restricción de datos por usuario mediante el campo `created_by`

---

## 🔑 Validación de contraseña

El sistema implementa validaciones de seguridad para las contraseñas:

* Mínimo 8 caracteres
* Al menos una letra mayúscula
* Al menos un número
* Al menos un símbolo

Además, la contraseña puede visualizarse mientras el usuario la escribe tanto en el formulario de registro como en el login, mejorando la usabilidad.

---

## 🧠 Flujo de la aplicación

1. El usuario se registra en el sistema
2. Inicia sesión con sus credenciales
3. Se genera un token JWT
4. El token se almacena en el navegador
5. El usuario accede al dashboard
6. Puede crear, visualizar, editar y eliminar sus proyectos

---

## 📊 Funcionalidades implementadas

* Registro de usuario con cifrado de contraseña
* Inicio de sesión con generación de JWT
* Validación segura de contraseñas
* Navbar para navegación entre secciones
* CRUD completo de proyectos
* Dashboard con gestión de proyectos por usuario
* Control de acceso basado en autenticación

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de una evaluación práctica utilizando tecnologías modernas de desarrollo web.

---

## 📌 Estado

Aplicación funcional y lista para su uso.

---

## 🤖 Uso de Inteligencia Artificial

Durante el desarrollo de esta evaluación se utilizó **Inteligencia Artificial** como herramienta de apoyo para acelerar el proceso de construcción del sistema. Su uso se enfocó en:

* Generación de estructuras base del proyecto
* Apoyo en la implementación de funcionalidades (autenticación, API, CRUD)
* Resolución de problemas técnicos y optimización de código
* Buenas prácticas en el desarrollo con Next.js, Prisma y JWT

La IA fue utilizada como una herramienta complementaria, manteniendo siempre la comprensión y validación del funcionamiento del código por parte del desarrollador.

**Fin del README**
