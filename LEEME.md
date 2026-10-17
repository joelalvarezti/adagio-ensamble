# Página web — Adagio Ensamble

Abre `index.html` en el navegador para ver la web.

## Estructura

```
pagina adagio ensamble/
├── index.html            Página principal (hero, integrantes, videos, galería, eventos, contratación)
├── acerca-de.html        Historia, estilo, trayectoria y Academia Adagio
├── css/
│   └── styles.css        Todos los estilos (colores en :root al inicio del archivo)
├── js/
│   ├── datos.js          ← EDITAR AQUÍ: WhatsApp, redes y lista de videos
│   └── main.js           Interacciones (menú, reproductor, galería, formulario)
├── imagenes/
│   ├── marca/            Logo y foto de perfil de Instagram
│   ├── integrantes/      Retrato de cada integrante
│   ├── galeria/          Fotos grupales, sesión y afiche
│   ├── videos/           Portadas de cada video (mismo nombre que el .mp4)
│   ├── fondo-ensamble.jpg        Fondo de la página (escritorio)
│   └── fondo-ensamble-movil.jpg  Fondo de la página (celular)
└── videos/               Presentaciones en .mp4 (descargadas de @adagioensamble_)
```

## Cambios frecuentes

- **Número de WhatsApp:** `js/datos.js` → `CONTACTO.whatsapp`
- **Añadir un video:** copia el `.mp4` en `videos/`, su portada `.jpg` en `imagenes/videos/` con el mismo nombre y añade un bloque en `VIDEOS` dentro de `js/datos.js`.
- **Cambiar la foto o los datos de una integrante:** reemplaza la imagen en `imagenes/integrantes/` y edita su bloque en `index.html` (sección INTEGRANTES).
- **Añadir fotos a la galería:** copia la foto en `imagenes/galeria/` y añade una línea `<figure>` en la sección GALERÍA de `index.html`.
- **Colores:** variables `--gold`, `--bg`, etc. al inicio de `css/styles.css`.
