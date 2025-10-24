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
git clone https://github.com/
cd front-todoapp
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno
El proyecto utiliza una carpeta para environments para definir las variables necesarias.
Primero, copia el archivo de ejemplo:

```bash
.environment-example.ts
```

Agrega o edita el archivo environment.ts y environment.development.ts, ahí se coloca los valores reales:

```bash
API_URL=http://localhost:3000
```

O el que apunta al backend

---

## Scripts disponibles

| Comando         | Descripción                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `npm start`     | Genera el archivo `environment.ts` y levanta el servidor de desarrollo (`ng serve`). |
| `npm run build` | Genera el archivo de entorno y compila el proyecto para producción.                  |

Una vez iniciado `npm start`, abre el navegador en:

```bash
 http://localhost:4200
```

O el que indique la consola

---
