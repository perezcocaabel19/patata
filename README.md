# Sistema de Ventas - Mapa 2D

Sistema de ventas interactivo con mapa 2D estilo Pokémon.

## Estructura

- `js/mapa/` : modelado y movimiento del mapa 2D
- `js/ventas/` : clientes, productos y carrito
- `assets/` : sprites, tiles e imágenes

## Cómo ejecutar

1. Doble clic en `servidor.bat` (necesita Python instalado).
2. Se abre el navegador en `http://localhost:8000/index.html`.
3. Cerrar la ventana negra del servidor cuando termines.

> No abras `index.html` con doble clic: el editor de zonas necesita el servidor
> para poder leer los píxeles del mapa.

## Controles

| Tecla | Acción |
| --- | --- |
| `WASD` o flechas | Mover al personaje |
| `1` `2` `3` o botones | Cambiar de personaje |
| `E` | Entrar a la tienda si estás cerca |
| `G` | Ver la zona caminable (verde = se puede caminar) |

## Archivos del mapa 2D

- `js/mapa/datos.js` : personajes, tiendas, velocidad y tamaño del sprite.
- `js/mapa/juego.js` : motor de movimiento, animación y colisiones.
- `js/mapa/zonas.js` : zona caminable del mapa (lo genera el editor).
- `js/mapa/editor-zonas.html` : editor visual de la zona caminable.
- `assets/PERSONAJE/frames/` : los 3 fotogramas de cada personaje, recortados.

## Zona caminable

El personaje no se sale del mapa, pero por defecto puede caminar sobre todo el
dibujo (edificios incluidos). Para limitarlo a calles y veredas:

1. Abrir `http://localhost:8000/js/mapa/editor-zonas.html`.
2. Elegir **Varita**, hacer clic sobre una calle/vereda y repetir en cada zona.
3. Ajustar **Tolerancia** si se pinta de más o de menos (38 funciona bien).
4. Pulsar **Descargar zonas.js** y reemplazar `js/mapa/zonas.js`.
5. Recargar el juego y comprobar con `G`.

## Flujo de ramas

- `main` : producción
- `develop` : integración
- `feature/*` : cada funcionalidad nueva

## Integrantes

- Pacheco Manrique, Lazlo, Abel Perez

