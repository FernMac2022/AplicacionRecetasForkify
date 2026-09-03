# Forkify - Proyecto final de Programacion con JavaScript II

Aplicacion web frontend para buscar recetas en una API remota y mostrar resultados y detalle de receta. El proyecto sigue la arquitectura MVC solicitada en la guia del proyecto final.

## Funcionalidades implementadas

- Configuracion de Parcel y Sass mediante `package.json`.
- Consumo asincrono de la API de Forkify con `fetch`, `async/await`, promesas y timeout.
- Modelo central de estado para receta y resultados de busqueda.
- Vista de receta con ingredientes, tiempo, porciones, publicador y enlace de instrucciones.
- Busqueda por texto mediante evento `submit`.
- Resultados dinamicos en el DOM.
- Manejo visual de spinner y errores.
- Arquitectura MVC con clases y vistas reutilizables.
- Paginacion de 10 resultados por pagina.

## Estructura

```text
forkify/
|-- index.html
|-- package.json
|-- src/
|   |-- img/
|   |-- sass/
|   `-- js/
|       |-- config.js
|       |-- controller.js
|       |-- helpers.js
|       |-- model.js
|       `-- views/
|           |-- View.js
|           |-- recipeView.js
|           |-- searchView.js
|           |-- resultsView.js
|           `-- paginationView.js
```

## Ejecucion

1. Abre la carpeta en Visual Studio Code.
2. Ejecuta `npm install`.
3. Ejecuta `npm start`.
4. Abre la direccion que muestre Parcel (normalmente `http://localhost:1234`).
5. Prueba una busqueda como `pizza`.

## Publicacion

La guia solicita versionar el proyecto en GitHub y publicarlo en Netlify. Estos pasos requieren las credenciales/cuentas del alumno. Una vez publicados, coloca las URLs en `ENTREGA.txt`.

