# Proyecto de Hamburguesas

Este proyecto es una aplicación web para explorar restaurantes y hamburguesas, desarrollada con `Node.js` y `Express`.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

## Ejecución del proyecto

Inicia el servidor en modo de desarrollo:

```bash
npm run dev
```

O en modo de producción:

```bash
npm start
```

Luego abre tu navegador y accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

- `npm run dev`: Inicia el servidor en modo de desarrollo con recarga automática.
- `npm start`: Inicia el servidor en modo de producción.

## Estructura del proyecto

- `routes/`: Contiene las rutas de la aplicación.
- `controllers/`: Contiene la lógica de los controladores.
- `views/`: Contiene las vistas en EJS.
- `public/`: Contiene archivos estáticos como imágenes, CSS y JavaScript.

## Funcionalidades principales

- Página principal con una sección destacada de hamburguesas y restaurantes.
- Detalles de cada restaurante con hamburguesas asociadas.
- Calificación de hamburguesas con puntuación y opción para marcar como "ya probada".

## Contribución

Si deseas contribuir, por favor abre un issue o envía un pull request con tus mejoras o correcciones.

## Licencia

Este proyecto está bajo la licencia MIT.
