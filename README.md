# Golf

Prototipo web para tarjeta de golf tipo Golf Directo centrado en campos de Canarias.

Estado actual:

- Pantalla inicial con jugadores preconfigurados y persistencia local.
- Validacion manual de handicap con acceso directo a la consulta de la RFEG.
- Calculo de handicap de juego y reparto de golpes por hoyo usando `stroke index` real del campo.
- Distancias a green (frente, centro, fondo) en pantalla de juego.
- Campos de Tenerife cargados con fuentes contrastadas (oficiales cuando estan disponibles y, en otros casos, scorecards publicos estructurados).
- Integracion preparada para una API externa de coordenadas de green con una unica carga antes de iniciar y cache local por campo.

Archivos principales:

- `index.html`
- `styles.css`
- `app.js`

Configuracion API GPS:

- Edita `COURSE_GPS_API` en `app.js`.
- Golf Course API usa autenticacion en cabecera con formato `Authorization: Key TU_API_KEY`.
- La app esta preparada para hacer una sola peticion por campo antes de comenzar el partido.
- El payload esperado admite `holes` con `number` y `greenCoordinates` (`lat`, `lng`) o variantes equivalentes.
- Tras cargarlo una vez, queda guardado en `localStorage` y no vuelve a pedirlo durante la partida.
