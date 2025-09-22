# 🌯🍝🍟 BeaucheFoods 🥗🍔🍕

Proyecto para el curso de Aplicaciones Web Reactivas (CC5003), semestre Primavera 2025.

## Descripción

BeaucheFoods es una aplicación web simple y reactiva desarrollada como SPA (Single Page Application) con React y Vite. Permite encontrar y explorar diferentes opciones de comida dentro o cerca de la facultad. Utiliza un backend mock con json-server para simular datos de tiendas y productos.

## Requisitos previos

- Node.js (versión 18 o superior) instalado en tu sistema.
- npm (viene incluido con Node.js).

## Instalación y ejecución

El proyecto está dividido en dos carpetas principales: `backend` (servidor mock con json-server) y `frontend` (aplicación React con TypeScript y Vite). Creamos un script simple para automatizar la instalación de dependencias y el inicio simultáneo de ambos servicios.

### Opción 1: Usar el script de inicio (recomendado)

1. **Abre una terminal en la raíz del proyecto (donde está este README.md).**
2. **Dale permisos de ejecución al script:**
   
   ```bash
   chmod +x start.sh
   ```
4. **Ejecuta el script:**
   
   ```bash
   ./start.sh
   ```

Esto hará lo siguiente automáticamente:

- Instalará las dependencias en `backend` y `frontend` (solo la primera vez o si cambian).
- Iniciará el servidor backend (json-server) en `http://localhost:3000`.
- Esperará unos segundos para que el backend esté listo corriendo.
- Iniciará el frontend en `http://localhost:5173` (puerto por defecto de Vite).

Abre tu navegador en `http://localhost:5173` para ver la aplicación. El backend se detendrá automáticamente cuando cierres el frontend (Ctrl+C).

**Nota:** Si ya instalaste las dependencias previamente, el script las omitirá en ejecuciones futuras, pero puedes forzar la reinstalación borrando `node_modules` y `package-lock.json` en cada carpeta.

### Opción 2: Ejecución manual (paso a paso)

Si prefieres no usar el script:

1. **Instalar dependencias del backend:**

   ```bash
   cd backend
   npm install
   ```

2. **Iniciar el servidor backend (en una terminal separada):**

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   Esto inicia el servidor mock en `http://localhost:3000`. Déjalo corriendo.

3. **Instalar dependencias del frontend (en otra terminal):**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Iniciar el frontend:**
   ```bash
   npm run dev
   ```
   Abre `http://localhost:5173` en tu navegador.

Para detener todo, usa Ctrl+C en cada terminal.

---
