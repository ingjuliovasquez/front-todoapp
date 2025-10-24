# 🧪 Prueba Técnica — Aplicación Node.js

## 📦 Versión de Node.js
**v20.0.0**

---

#  To-Do App — Frontend (Angular 20 + Tailwind + NGRX Signals)

---

## Tecnologías principales

| Tecnología | Descripción |
|-------------|-------------|
| [Angular 20](https://angular.dev/) | Framework principal para la construcción del frontend. |
| [TailwindCSS](https://tailwindcss.com/) | Framework utilitario de estilos. |
| [Lucide Icons](https://lucide.dev/) | Librería de íconos SVG ligera y moderna. |
| [NGRX Signals](https://ngrx.io/guide/signals) | Gestión reactiva del estado global. |

---

## Instalación y configuración

### Clonar el repositorio

```bash
git clone https://github.com/ingjuliovasquez/front-todoapp.git
cd front-todoapp
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno
El proyecto utiliza una carpeta para los environments en los que se definen las variables necesarias.

Agrega el archivo environment.ts y environment.development.ts, copia el archivo de ejemplo:

```bash
.environment-example.ts
```

Y coloca el valor real de la apiUrl

```bash
http://localhost:3000
```

O la ruta que apunta al backend

---

## Scripts disponibles

| Comando         | Descripción                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `npm start`     | Levanta el servidor de desarrollo (`ng serve`). |
| `npm run build` | Genera el archivo de entorno y compila el proyecto para producción.                  |

Una vez iniciado `npm start`, abre el navegador en:

```bash
 http://localhost:4200S
```

O el que indique la consola

---
