# Legal Case Management API

API REST para la gestión de **abogados** y **casos legales** en un bufete.
Incluye autenticación JWT, operaciones CRUD, validaciones, y transacciones atómicas.

## Tecnologías

- **Node.js** v18+
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos
- **Sequelize** - ORM
- **JWT** - Autenticación
- **Joi** - Validación de datos
- **bcrypt** - Hash de contraseñas
- **Docker & Docker Compose** - Contenedorización

## Instalación y Configuración

### Prerequisitos

- Node.js 18 o superior
- Docker y Docker Compose
- Git

### Pasos de instalación

**1. Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd legalsuite-test-backend
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Configurar variables de entorno**

Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

El archivo `.env` ya tiene los valores por defecto para desarrollo local.

**4. Levantar PostgreSQL con Docker**
```bash
docker-compose up -d
```

Verifica que esté corriendo:
```bash
docker-compose ps
```

**5. Ejecutar migraciones**
```bash
npm run db:migrate
```

**6. Cargar datos de prueba (seeders)**
```bash
npm run db:seed
```

## 🎮 Ejecución

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor estará disponible en: **http://localhost:3000**

**Health check:** http://localhost:3000/health

## 🔑 Usuarios de Prueba

Después de ejecutar los seeders, tendrás estos usuarios disponibles:

| Username | Password | Role |
|----------|----------|------|
| `admin` | `Admin123!` | admin |
| `operator` | `Oper123!` | operator |

**Datos de prueba incluidos:**
- ✅ 5 abogados (3 activos, 2 inactivos)
- ✅ 10 casos legales (con diferentes estados y tipos)
- ✅ 3 casos pendientes sin asignar
- ✅ 7 casos ya asignados a diferentes abogados

## Documentación de API

### Importar Colección de Postman

1. Abre **Postman**
2. **Import** → Selecciona el archivo `Legal_Case_Management_API.postman_collection.json`
3. (Opcional) Importa también el environment: `Legal_Cases_Local.postman_environment.json`

**Orden recomendado de pruebas:**
1. **Authentication** → Login (obtiene el token JWT)
2. **Lawyers** → Crear, listar, obtener por ID
3. **Legal Cases** → Crear, listar, asignar abogado, transferir
4. **Reports** → Generar reporte de casos por abogado

### Endpoints Principales

#### Autenticación

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin123!"
}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "username": "admin",
      "role": "admin"
    }
  }
}
```

####  Abogados

**Listar abogados** (con paginación y filtros)
```http
GET /api/lawyers?page=1&limit=10&status=active
Authorization: Bearer {token}
```

**Obtener abogado por ID** (incluye sus casos)
```http
GET /api/lawyers/:id
Authorization: Bearer {token}
```

**Crear abogado**
```http
POST /api/lawyers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Carlos Pérez García",
  "email": "carlos.perez@bufete.com",
  "phone": "+57 300 123 4567",
  "specialization": "Derecho Laboral",
  "status": "active"
}
```

#### Casos Legales

**Listar casos** (con paginación y filtros)
```http
GET /api/legal-cases?page=1&limit=10&status=pending&lawyer_id={uuid}
Authorization: Bearer {token}
```

**Obtener caso por ID** (incluye info del abogado)
```http
GET /api/legal-cases/:id
Authorization: Bearer {token}
```

**Crear caso legal**
```http
POST /api/legal-cases
Authorization: Bearer {token}
Content-Type: application/json

{
  "caseNumber": "CASE-2025-001",
  "plaintiff": "Empresa XYZ S.A.S.",
  "defendant": "Juan Pérez",
  "caseType": "labor",
  "status": "pending",
  "description": "Demanda por despido injustificado"
}
```

**Asignar abogado a caso**
```http
PUT /api/legal-cases/:id/assign
Authorization: Bearer {token}
Content-Type: application/json

{
  "lawyer_id": "uuid-del-abogado"
}
```

**Transferir caso** (operación con transacción)
```http
PUT /api/legal-cases/:id/transfer
Authorization: Bearer {token}
Content-Type: application/json

{
  "new_lawyer_id": "uuid-del-nuevo-abogado"
}
```

#### Reportes

**Reporte de casos por abogado**
```http
GET /api/reports/lawyers/:id/cases
Authorization: Bearer {token}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "lawyer": {
      "id": "uuid",
      "name": "Carlos Pérez García",
      "specialization": "Derecho Laboral"
    },
    "statistics": {
      "total_cases": 8,
      "by_status": {
        "assigned": 2,
        "in_progress": 4,
        "resolved": 2
      },
      "by_type": {
        "civil": 1,
        "criminal": 0,
        "labor": 5,
        "commercial": 2
      }
    },
    "cases": [...]
  }
}
```

## Scripts Disponibles
```bash
npm start              # Iniciar servidor en producción
npm run dev            # Iniciar en desarrollo con nodemon
npm run db:migrate     # Ejecutar migraciones pendientes
npm run db:migrate:undo # Revertir última migración
npm run db:seed        # Ejecutar todos los seeders
npm run db:seed:undo   # Revertir todos los seeders
npm run db:reset       # Resetear BD completa (undo migrations + migrate + seed)
```

## Estructura del Proyecto
```
legalsuite-test-backend/
├── src/
│   ├── config/              # Configuraciones
│   │   ├── constants.js     # Constantes de la aplicación
│   │   └── config.js      # Configuración de Sequelize
│   ├── controllers/         # Controladores (lógica de endpoints)
│   │   ├── auth.controller.js
│   │   ├── lawyer.controller.js
│   │   ├── legalCase.controller.js
│   │   └── report.controller.js
│   ├── middlewares/         # Middlewares
│   │   ├── auth.middleware.js       # Verificación de JWT
│   │   ├── errorHandler.js          # Manejo centralizado de errores
│   │   └── validation.middleware.js # Validación con Joi
│   ├── migrations/          # Migraciones de base de datos
│   ├── models/              # Modelos de Sequelize
│   │   ├── user.js
│   │   ├── lawyer.js
│   │   └── legalcase.js
│   ├── routes/              # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── lawyer.routes.js
│   │   ├── legalCase.routes.js
│   │   └── report.routes.js
│   ├── seeders/             # Datos de prueba
│   │   ├── demo-users.js
│   │   ├── demo-lawyers.js
│   │   └── demo-legal-cases.js
│   ├── services/            # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── lawyer.service.js
│   │   ├── legalCase.service.js
│   │   └── report.service.js
│   ├── utils/               # Utilidades
│   │   ├── AppError.js      # Clase de errores personalizados
│   │   └── response.js      # Formateadores de respuestas
│   ├── validations/         # Esquemas de validación Joi
│   │   ├── lawyer.validation.js
│   │   └── legalCase.validation.js
│   ├── app.js               # Configuración de Express
│   └── server.js            # Punto de entrada
├── .env                     # Variables de entorno (no en git)
├
├── .gitignore
├── .sequelizerc             # Configuración de Sequelize CLI
├── docker-compose.yml       # Configuración de PostgreSQL
├── package.json
├── README.md
├── Legal_Case_Management_API.postman_collection.json
└── Legal_Cases_Local.postman_environment.json
```

##  Características 

### Arquitectura
- ✅ **Arquitectura en capas** - Separación clara de responsabilidades (routes → controllers → services → models)
- ✅ **Patrón MVC** adaptado para APIs REST
- ✅ **Código modular y reutilizable**

### Seguridad
- ✅ **Autenticación JWT** - Tokens firmados con expiración
- ✅ **Contraseñas hasheadas** con bcrypt (salt rounds: 10)
- ✅ **Validación de datos** en todos los endpoints con Joi
- ✅ **Protección de rutas** - Middleware de autenticación

###  Manejo de Errores
- ✅ **Middleware centralizado** - Captura todos los errores
- ✅ **Errores personalizados** con códigos HTTP apropiados
- ✅ **Validación de casos de borde**
- ✅ **Mensajes de error claros y consistentes**

###  Operaciones Transaccionales
- ✅ **Transferencia de casos** implementada con transacciones de Sequelize
- ✅ **ACID compliance** - Atomicidad garantizada
- ✅ **Row-level locking** para evitar race conditions
- ✅ **Rollback automático** en caso de error

###  Otras características
- ✅ **Paginación** en endpoints de listado
- ✅ **Filtros múltiples** (status, lawyer_id, etc.)
- ✅ **Relaciones de BD** bien definidas (Lawyer ↔ LegalCase)
- ✅ **UUIDs** como identificadores (más seguros que IDs incrementales)
- ✅ **Timestamps automáticos** (created_at, updated_at)
- ✅ **Seeders** con datos de prueba realistas

##  Docker

El proyecto usa Docker Compose para PostgreSQL.

**Comandos útiles:**
```bash
# Levantar contenedor
docker-compose up -d

# Ver logs
docker-compose logs -f postgres

# Detener contenedor
docker-compose down

# Detener y eliminar volúmenes ( borra datos)
docker-compose down -v

# Acceder a PostgreSQL directamente
docker-compose exec postgres psql -U postgres -d legal_cases_db
```

## Testing 
> Nota: No se incluyen pruebas automatizadas por limitación de tiempo, 
pero la arquitectura está preparada para integrarlas con Jest.


## Autor

Prueba técnica desarrollada por Mariana Hernández para posición de Backend Developer Node.js

**¡Gracias por revisar este proyecto!** 
```
