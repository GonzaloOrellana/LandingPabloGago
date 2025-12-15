# Proyecto: Pablo Andrés Gago - Kinesiología Avanzada

Este proyecto es una landing page con diseño **Neumorfista** (Soft UI).

## Estructura de Archivos
- `index.html`: Estructura semántica del sitio.
- `style.css`: Estilos, variables CSS y utilidades neumórficas.
- `script.js`: Lógica para el menú móvil, navbar sticky y formulario.
- `img/`: Carpeta para imágenes.

## Instrucciones de Despliegue

1. **Imágenes**:
   - Reemplaza los placeholders en `index.html` con tus imágenes reales.
   - Guarda las imágenes en la carpeta `img/`.

2. **Google Maps**:
   - En `index.html` (sección `#ubicacion`), actualiza el `src` del iframe con la ubicación real.

3. **Formulario de Contacto**:
   - Para hacerlo funcional sin backend, cambia la etiqueta `<form>` en `index.html`:
     ```html
     <form action="https://formspree.io/f/TU_CODIGO" method="POST">
     ```
   - O usa el script actual que simula el envío localmente.

## Personalización
- Los colores principales están definidos en `style.css` bajo `:root`.
- `--primary-blue`: Color de acento.
- `--bg-color`: Color de fondo (base del neumorfismo).
