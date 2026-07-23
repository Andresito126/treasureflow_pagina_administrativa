import type { AdminPost, PostStatus, PostType } from '@/features/posts/domain/entities/post';
import type { WasteCategory } from '@/shared/domain/wasteCategory';

const EMOJI: Record<WasteCategory, string> = {
  aluminum: '🥫',
  oil: '🛢️',
  paper: '📦',
  plastic: '🧴',
  metal: '🔩',
  battery: '🔋',
};

type Row = [
  title: string,
  category: WasteCategory,
  type: PostType,
  author: string,
  weight: number,
  createdAt: string,
  status: PostStatus,
  location: string,
];

const rows: Row[] = [
  ['5kg de botellas PET', 'plastic', 'waste', 'Juan Gómez', 5, '2026-07-20T10:00:00Z', 'active', 'Col. Roma Norte, CDMX'],
  ['Aceite de cocina usado', 'oil', 'waste', 'Restaurante El Sol', 10, '2026-07-19T09:30:00Z', 'completed', 'Guadalajara, JAL'],
  ['Cartón plegado', 'paper', 'waste', 'Oficina Central', 15, '2026-07-19T14:00:00Z', 'waiting', 'Col. Del Valle, CDMX'],
  ['Baterías AA usadas', 'battery', 'waste', 'María López', 0.5, '2026-07-05T11:20:00Z', 'expired', 'Monterrey, NL'],
  ['Latas de aluminio prensadas', 'aluminum', 'waste', 'María Aguilar', 3, '2026-07-21T08:15:00Z', 'active', 'Col. Condesa, CDMX'],
  ['Chatarra metálica variada', 'metal', 'waste', 'Taller Hernández', 40, '2026-07-18T16:40:00Z', 'active', 'Ecatepec, EDOMEX'],
  ['Botellas PET transparentes', 'plastic', 'waste', 'Sofía Vargas', 8, '2026-07-17T12:00:00Z', 'completed', 'Zapopan, JAL'],
  ['Periódico y revistas', 'paper', 'waste', 'Carlos Herrera', 12, '2026-07-16T10:30:00Z', 'active', 'Col. Narvarte, CDMX'],
  ['Garrafa de aceite vegetal', 'oil', 'waste', 'Cocina Doña Meche', 20, '2026-07-15T18:00:00Z', 'waiting', 'Puebla, PUE'],
  ['Pilas alcalinas surtidas', 'battery', 'waste', 'Andrés Jiménez', 1, '2026-07-06T09:00:00Z', 'expired', 'Toluca, EDOMEX'],
  ['Bote de aluminio grande', 'aluminum', 'waste', 'Fernanda Ríos', 6, '2026-07-20T15:20:00Z', 'active', 'Querétaro, QRO'],
  ['Tubos de cobre usados', 'metal', 'waste', 'Plomería García', 9, '2026-07-14T11:00:00Z', 'completed', 'León, GTO'],
  ['Cajas de cartón corrugado', 'paper', 'waste', 'Bodega Aurrera Sur', 55, '2026-07-13T07:45:00Z', 'active', 'Iztapalapa, CDMX'],
  ['Envases de plástico HDPE', 'plastic', 'waste', 'Valentina Cruz', 7, '2026-07-12T13:15:00Z', 'waiting', 'Tlaquepaque, JAL'],
  ['Aceite quemado de fritura', 'oil', 'waste', 'Taquería El Buen Sabor', 25, '2026-07-11T20:30:00Z', 'active', 'Col. Escandón, CDMX'],
  ['Baterías de laptop', 'battery', 'waste', 'Diego Morales', 2, '2026-07-04T10:10:00Z', 'expired', 'Naucalpan, EDOMEX'],
  ['Silla de madera restaurable', 'metal', 'object', 'Paola Mendoza', 6, '2026-07-19T17:00:00Z', 'active', 'Col. Coyoacán, CDMX'],
  ['Bicicleta usada rodada 26', 'metal', 'object', 'Miguel Ángel Torres', 12, '2026-07-18T09:20:00Z', 'waiting', 'Guadalajara, JAL'],
  ['Monitor LCD 19 pulgadas', 'plastic', 'object', 'Roberto Sánchez', 4, '2026-07-10T14:40:00Z', 'expired', 'Monterrey, NL'],
  ['Latas de refresco compactadas', 'aluminum', 'waste', 'Daniela Flores', 4, '2026-07-21T11:50:00Z', 'active', 'Col. Juárez, CDMX'],
  ['Cartón de empaques', 'paper', 'waste', 'Farmacia Guadalupana', 18, '2026-07-17T08:00:00Z', 'completed', 'Puebla, PUE'],
  ['Botellas PET de colores', 'plastic', 'waste', 'José Luis Ramírez', 6, '2026-07-09T16:00:00Z', 'active', 'Mérida, YUC'],
  ['Varilla metálica sobrante', 'metal', 'waste', 'Constructora Ríos', 60, '2026-07-16T13:30:00Z', 'active', 'Tlalnepantla, EDOMEX'],
  ['Aceite de motor usado', 'oil', 'waste', 'Taller Mecánico López', 15, '2026-07-08T10:00:00Z', 'waiting', 'Saltillo, COAH'],
  ['Pilas de reloj y control', 'battery', 'waste', 'Fernanda Ríos', 0.8, '2026-07-03T12:00:00Z', 'expired', 'Querétaro, QRO'],
  ['Aluminio de ventanas viejas', 'aluminum', 'waste', 'Vidrios y Aluminio SA', 30, '2026-07-15T09:15:00Z', 'active', 'Col. Anáhuac, CDMX'],
  ['Cartón de mudanza', 'paper', 'waste', 'Andrés Jiménez', 22, '2026-07-14T18:20:00Z', 'completed', 'Toluca, EDOMEX'],
  ['Botellón de plástico', 'plastic', 'waste', 'Purificadora El Manantial', 10, '2026-07-13T11:10:00Z', 'active', 'León, GTO'],
  ['Rejas de metal oxidadas', 'metal', 'waste', 'Herrería Moderna', 45, '2026-07-12T07:30:00Z', 'waiting', 'Iztacalco, CDMX'],
  ['Aceite vegetal de repostería', 'oil', 'waste', 'Pastelería Dulce Hogar', 8, '2026-07-07T15:45:00Z', 'active', 'Zapopan, JAL'],
  ['Baterías de auto usadas', 'battery', 'waste', 'Autopartes del Centro', 18, '2026-07-02T09:50:00Z', 'expired', 'Puebla, PUE'],
  ['Latas de conservas limpias', 'aluminum', 'waste', 'Valentina Cruz', 5, '2026-07-20T13:00:00Z', 'active', 'Tlaquepaque, JAL'],
  ['Libros y cuadernos viejos', 'paper', 'waste', 'Escuela Primaria Benito Juárez', 35, '2026-07-11T10:00:00Z', 'completed', 'Col. Doctores, CDMX'],
  ['Tapas de plástico surtidas', 'plastic', 'waste', 'Colecta Comunitaria', 3, '2026-07-19T12:30:00Z', 'active', 'Mérida, YUC'],
  ['Alambre de cobre', 'metal', 'waste', 'Electricista Pérez', 5, '2026-07-10T17:20:00Z', 'waiting', 'Guadalajara, JAL'],
  ['Mesa de metal plegable', 'metal', 'object', 'Daniela Flores', 9, '2026-07-18T14:00:00Z', 'active', 'Col. Portales, CDMX'],
  ['Aceite de cocina en cubeta', 'oil', 'waste', 'Fonda La Michoacana', 12, '2026-07-06T19:00:00Z', 'expired', 'Morelia, MICH'],
  ['Cartón de electrodomésticos', 'paper', 'waste', 'Tienda Elektra', 28, '2026-07-16T09:00:00Z', 'active', 'Ecatepec, EDOMEX'],
  ['Botellas PET grandes', 'plastic', 'waste', 'María Aguilar', 9, '2026-07-15T16:30:00Z', 'completed', 'Col. Roma Sur, CDMX'],
  ['Latas de aluminio surtidas', 'aluminum', 'waste', 'Diego Morales', 4, '2026-07-21T07:00:00Z', 'active', 'Naucalpan, EDOMEX'],
];

export const postsSeed: AdminPost[] = rows.map(
  ([title, category, type, author, weight, createdAt, status, location], i): AdminPost => ({
    id: `pub-${String(i + 1).padStart(3, '0')}`,
    title,
    category,
    type,
    authorName: author,
    estimatedWeightKg: weight,
    createdAt,
    status,
    photoEmoji: EMOJI[category],
    location,
    description:
      type === 'object'
        ? 'Objeto de segunda mano en buen estado, disponible para intercambio o recolección.'
        : 'Residuo reciclable listo para recolección. Peso estimado por el ciudadano; se confirma en el pesaje.',
  }),
);
