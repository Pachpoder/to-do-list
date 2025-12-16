# To-Do List App (React + Vite + MUI + PWA)

Aplicación de lista de tareas mobile-first con React Router DOM y Material UI. Las tareas se guardan en `localStorage` y la app se puede instalar como PWA.

## Descripción del proyecto
- Pantallas: Inicio (resumen), Lista con filtros, Agregar tarea, Detalle.
- Acciones: crear, completar/pendiente, eliminar con confirmación, ver detalle.
- Datos persistidos en `localStorage` con clave `todo_tasks_v1`.
- PWA lista para instalar (vite-plugin-pwa) con iconos en `/public`.

## Tecnologías usadas
- React + Vite
- React Router DOM
- Material UI (MUI)
- LocalStorage (persistencia en cliente)
- vite-plugin-pwa (PWA)

## Requisitos previos
- Node.js 18+ y npm.
- Navegador moderno para probar PWA.

## Instalación y ejecución local
1) Clona el repo  
2) Instala dependencias: `npm install`  
3) Ejecuta en dev: `npm run dev`  
4) Abre el puerto que indique Vite (ej. http://localhost:5173).

## Estructura del proyecto
```
to-do-list/
├─ public/
│  ├─ pwa-192.png
│  ├─ pwa-512.png
│  └─ vite.svg
├─ src/
│  ├─ components/
│  │  ├─ AppHeader.jsx
│  │  └─ TaskItem.jsx
│  ├─ hooks/
│  │  └─ useTasks.js
│  ├─ pages/
│  │  ├─ AddTask.jsx
│  │  ├─ Home.jsx
│  │  ├─ TaskDetail.jsx
│  │  └─ TasksList.jsx
│  ├─ utils/
│  │  └─ storage.js
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ theme.js
├─ docs/
│  └─ PDF_CONTENIDO.md
├─ package.json
├─ vite.config.js
└─ eslint.config.js
```

## Cómo usar la aplicación
1) Inicio: ve resumen de pendientes/completadas y accesos directos.  
2) Agregar: completa título, descripción y tipo; valida campos obligatorios.  
3) Lista: filtra por Pendientes/Completadas/Todas, marca estado o elimina (con diálogo), toca una tarea para ver detalle.  
4) Detalle: consulta info, cambia estado, elimina o vuelve a la lista.

## Cómo se guardan los datos
- Hook `useTasks` lee/escribe en `localStorage` con clave `todo_tasks_v1`.
- Cada tarea incluye `id`, `title`, `description`, `type`, `completed`, `createdAt`.
- IDs con `crypto.randomUUID()` o fallback `Date.now()` + random.

## Cómo compilar (build) y previsualizar
- Build: `npm run build`
- Preview de build: `npm run preview`

## Deploy recomendado
1) Vercel  
   - Crea nuevo proyecto, importa el repo.  
   - Framework: Vite.  
   - Comando build: `npm run build`  
   - Directorio de salida: `dist`  
2) Netlify  
   - New site → Import existing project.  
   - Build command: `npm run build`  
   - Publish directory: `dist`

- Link de Deploy: https://TU-LINK-AQUI.vercel.app  
- Repositorio: https://github.com/TU-USUARIO/todo-pwa

## Cómo instalar la PWA
- Android/Chrome: abre el sitio → menú del navegador → “Agregar a pantalla principal”.  
- Desktop (Chrome/Edge): abre el sitio → icono de instalar en barra de direcciones → confirmar.  
- Una vez instalada, funciona en ventana standalone con iconos `/public/pwa-192.png` y `/public/pwa-512.png`.

## Capturas (placeholders)
- ![Home](docs/screenshots/home.png)
- ![Lista](docs/screenshots/tasks.png)
- ![Detalle](docs/screenshots/detail.png)
