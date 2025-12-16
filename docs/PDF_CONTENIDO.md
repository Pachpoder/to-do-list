# Contenido para PDF - To-Do List App

## a) URL del repositorio
- https://github.com/TU-USUARIO/todo-pwa

## b) Wireframe / Prototipo textual + UX
- Pantalla Inicio: AppBar con título, cards con conteo Pendientes/Completadas, botones “Ver tareas” y “Agregar tarea”. Acciones claras y accesos rápidos.  
- Pantalla Agregar: formulario con TextField de título y descripción multilinea, Select para tipo (trabajo/casa/negocios), validación de campos obligatorios y snackbar de feedback, botones Guardar/Cancelar.  
- Pantalla Lista: Tabs para filtrar (Pendientes/Completadas/Todas), lista con título, chips de tipo y estado, acciones de completar/pendiente y eliminar con diálogo, tap en item abre detalle, empty state con botón a “Agregar tarea”.  
- Pantalla Detalle: muestra título, descripción, chips de tipo y estado, fecha formateada, botones para cambiar estado, eliminar y volver.

## c) Flujo del usuario (5-8 pasos)
1) Entra al Inicio y revisa el resumen de pendientes/completadas.  
2) Toca “Agregar tarea” para crear una nueva.  
3) Completa título, descripción y tipo; guarda.  
4) Es redirigido a la Lista filtrada en Pendientes.  
5) Marca tareas como completadas o las elimina según necesite.  
6) Filtra por Completadas o Todas para revisar.  
7) Abre una tarea para ver detalle y fecha.  
8) Instala la PWA desde el navegador si desea acceso directo.

## d) Procedimiento / instrucciones para probar
- Opción local:  
  - `npm install`  
  - `npm run dev`  
  - Abrir http://localhost:5173 (o puerto que indique Vite).  
- Opción deploy: abrir https://TU-LINK-AQUI.vercel.app  
- Opción PWA: desde el navegador (Chrome/Edge) usar “Instalar app” o “Agregar a pantalla principal”.

## e) Ejecutable o equivalente
- La app se ejecuta desde el enlace HTTPS desplegado; la PWA instalable actúa como “equivalente a ejecutable” en móvil y desktop.

## f) Checklist de cumplimiento (✅)
- ✅ Modelo de datos con id/title/description/type/completed/createdAt.  
- ✅ Persistencia en `localStorage` (`todo_tasks_v1`).  
- ✅ Hook `useTasks` con add/toggle/delete/get y guardado automático.  
- ✅ Rutas: `/`, `/add`, `/tasks`, `/tasks/:id`.  
- ✅ UI completa en MUI: AppBar, Cards, Tabs, ListItemButton, Chips, Snackbar, Dialog.  
- ✅ Validaciones y diálogos de confirmación.  
- ✅ PWA configurada con `vite-plugin-pwa` e iconos `/public/pwa-192.png` y `/public/pwa-512.png`.  
- ✅ Mobile-first con `Container maxWidth="sm"`.

## g) Notas
- Datos solo en el cliente; no hay backend.  
- No se usa Redux ni TypeScript.  
- IDs vía `crypto.randomUUID()` con fallback.  
- Se pueden limpiar datos borrando la clave `todo_tasks_v1` en `localStorage`.
