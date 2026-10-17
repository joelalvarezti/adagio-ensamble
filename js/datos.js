/* =========================================================
   ADAGIO ENSAMBLE — DATOS EDITABLES
   ---------------------------------------------------------
   Aquí se controla el contenido que cambia con frecuencia.
   Para añadir un video:
     1. Copia el .mp4 en /videos
     2. Copia su portada (.jpg) en /imagenes/videos
     3. Añade un bloque nuevo a la lista VIDEOS (copiando uno existente)
   categoria: "vivo" | "tv" | "historia"
   formato:   "vertical" (reel 9:16) | "horizontal" (16:9)
   ========================================================= */

const CONTACTO = {
  whatsapp: '584127596899',              // WhatsApp de contratación (Academia Adagio)
  whatsappVisible: '+58 412-7596899',
  instagram: 'https://www.instagram.com/adagioensamble_/',
  instagramAcademia: 'https://www.instagram.com/academiaadagio/',
  tiktok: 'https://www.tiktok.com/@adagioensamble_ff'
};

const CATEGORIAS = {
  vivo: 'En vivo',
  tv: 'Televisión',
  historia: 'Detrás del escenario'
};

const VIDEOS = [
  {
    id: 'Dcylr7QRA-J',
    titulo: 'Estilo Il Volo en La Tele Tuya',
    descripcion: 'Voces que cautivan, enamoran e impactan. Un estilo lírico-pop de la agrupación Il Volo, interpretado por el cuarteto el 20 de julio.',
    lugar: 'La Tele Tuya · Caracas',
    categoria: 'tv',
    formato: 'horizontal',
    duracion: '3:08',
    destacado: true
  },
  {
    id: 'DZaUn-IRfq9',
    titulo: '"Luna" — Alessandro Safina',
    descripcion: 'Enigmáticas. Una propuesta que nos traslada al lírico-pop italiano: fusión de grandes voces, interpretación y calidad musical.',
    lugar: 'La Tele Tuya',
    categoria: 'tv',
    formato: 'horizontal',
    duracion: '4:06'
  },
  {
    id: 'DeksDdppdn0',
    titulo: 'Resumen de presentaciones 2026',
    descripcion: 'Un pequeño resumen de algunas de nuestras presentaciones en lo que va de año.',
    lugar: 'Varios escenarios',
    categoria: 'vivo',
    formato: 'vertical',
    duracion: '1:30'
  },
  {
    id: 'DdjoDRDtibG',
    titulo: 'Iconos de México',
    descripcion: 'Una noche dedicada a los grandes clásicos mexicanos, con la elegancia del cuarteto.',
    lugar: 'Tardeo Terraza · Valencia',
    categoria: 'vivo',
    formato: 'horizontal',
    duracion: '2:14'
  },
  {
    id: 'DdjqRgSMmJr',
    titulo: 'Noche de palenque mexicano',
    descripcion: 'Un breve resumen de todo lo que vivimos en nuestra presentación en Tardeo Terraza: una noche al mejor estilo del palenque mexicano.',
    lugar: 'Tardeo Terraza · Hesperia WTC Valencia',
    categoria: 'vivo',
    formato: 'vertical',
    duracion: '1:51'
  },
  {
    id: 'DYeKxQDMNbT',
    titulo: 'Apertura de los Premios ON 2026',
    descripcion: 'El 30 de abril Adagio Ensamble fue la agrupación encargada de abrir la tercera edición de los Premios ON.',
    lugar: 'Premios ON 2026',
    categoria: 'vivo',
    formato: 'vertical',
    duracion: '2:59'
  },
  {
    id: 'DaihHY1p2rt',
    titulo: 'El Show del Mediodía',
    descripcion: 'Grandes temas hispanoamericanos que significan un gran reto vocal y musical para la agrupación.',
    lugar: 'La Tele Tuya',
    categoria: 'tv',
    formato: 'vertical',
    duracion: '2:16'
  },
  {
    id: 'DYkasmSvRq0',
    titulo: 'Demasiado talento en un solo lugar',
    descripcion: 'Conectando y creando dinámicas con Oriana, Karla, Bela y Paula en el set de La Tele Tuya.',
    lugar: 'La Tele Tuya',
    categoria: 'tv',
    formato: 'horizontal',
    duracion: '2:24'
  },
  {
    id: 'DdRmdYyM_Bz',
    titulo: '¿Cómo nace Adagio Ensamble?',
    descripcion: 'Las integrantes de la agrupación nos cuentan cómo empezó todo... y mucho más.',
    lugar: 'Entrevista',
    categoria: 'historia',
    formato: 'horizontal',
    duracion: '1:13'
  }
];
