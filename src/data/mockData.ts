export const CONDITIONS = [
'Nuevo con etiqueta',
'Nuevo sin etiqueta',
'Como nuevo',
'Excelente',
'Bueno',
'Usado'] as
const;

export const PRODUCT_TYPES = [
'Remeras',
'Tops',
'Camisas',
'Buzos',
'Camperas',
'Sweaters',
'Jeans',
'Pantalones',
'Polleras',
'Vestidos',
'Shorts',
'Zapatillas',
'Botas',
'Carteras',
'Accesorios',
'Deportiva',
'Abrigos'];


export const STYLES = [
'Vintage',
'Y2K',
'Oversize',
'Streetwear',
'Minimalista',
'Coquette',
'Casual',
'Formal',
'Deportivo'];


export const productTypeImages: Record<string, string> = {
  Remeras:
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80',
  Tops: 'https://images.unsplash.com/photo-1551048632-24c5b9d6a01b?w=400&q=80',
  Camisas:
  'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=400&q=80',
  Buzos:
  'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=400&q=80',
  Camperas:
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
  Sweaters:
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80',
  Jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
  Pantalones:
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80',
  Polleras:
  'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80',
  Vestidos:
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
  Shorts:
  'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80',
  Zapatillas:
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80',
  Botas:
  'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80',
  Carteras:
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
  Accesorios:
  'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=400&q=80',
  Deportiva:
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  Abrigos:
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80'
};

export const users = [
{
  id: 'u1',
  username: 'martina.vintage',
  name: 'Martina G.',
  avatar:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  bio: 'Curando joyitas vintage en Tandil ✨',
  followers: 1240,
  following: 340,
  items: 45,
  rating: 4.9,
  neighborhood: 'Centro'
},
{
  id: 'u2',
  username: 'lucas_street',
  name: 'Lucas M.',
  avatar:
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  bio: 'Streetwear y zapas. Acepto canjes.',
  followers: 890,
  following: 120,
  items: 22,
  rating: 4.7,
  neighborhood: 'Villa Aguirre'
},
{
  id: 'u3',
  username: 'sofia.looks',
  name: 'Sofía R.',
  avatar:
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=80',
  bio: 'Moda circular siempre ♻️',
  followers: 3200,
  following: 500,
  items: 112,
  rating: 5.0,
  neighborhood: 'La Movediza'
},
{
  id: 'u4',
  username: 'valen_y2k',
  name: 'Valentina C.',
  avatar:
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=80',
  bio: '2000s vibes only 🦋',
  followers: 2100,
  following: 430,
  items: 67,
  rating: 4.8,
  neighborhood: 'Cerro Leones'
},
{
  id: 'u5',
  username: 'juan.thrift',
  name: 'Juan P.',
  avatar:
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80',
  bio: 'Ropa oversize y abrigos.',
  followers: 450,
  following: 89,
  items: 15,
  rating: 4.5,
  neighborhood: 'Las Tunitas'
}];


export const products = [
{
  id: 'p1',
  title: 'Campera de Cuero Vintage',
  type: 'Camperas',
  price: 45000,
  originalPrice: 60000,
  size: 'M',
  condition: 'Excelente',
  style: 'Vintage',
  images: [
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
  'https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80'],

  sellerId: 'u1',
  likes: 124,
  distanceKm: 0.8,
  postedDaysAgo: 2,
  description:
  'Campera de cuero genuino de los 90s. Impecable estado, súper abrigada.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p2',
  title: 'Remera Oversize Graphic',
  type: 'Remeras',
  price: 12000,
  size: 'L',
  condition: 'Como nuevo',
  style: 'Streetwear',
  images: [
  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'],

  sellerId: 'u2',
  likes: 89,
  distanceKm: 1.4,
  postedDaysAgo: 1,
  description: 'Remera de algodón pesado, estampa intacta.',
  aspect: 'aspect-square'
},
{
  id: 'p3',
  title: 'Vestido Y2K Floral',
  type: 'Vestidos',
  price: 18000,
  size: 'S',
  condition: 'Bueno',
  style: 'Y2K',
  images: [
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80'],

  sellerId: 'u4',
  likes: 256,
  distanceKm: 3.2,
  postedDaysAgo: 5,
  description:
  'Vestido cortito ideal para el verano. Tiene un pequeño detalle en la costura pero no se nota.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p4',
  title: 'Jeans Baggy 90s',
  type: 'Jeans',
  price: 25000,
  size: '42',
  condition: 'Excelente',
  style: 'Vintage',
  images: [
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'],

  sellerId: 'u1',
  likes: 312,
  distanceKm: 0.8,
  postedDaysAgo: 7,
  description: 'Denim rígido, tiro alto. Calce perfecto.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p5',
  title: 'Zapatillas Chunky',
  type: 'Zapatillas',
  price: 55000,
  size: '39',
  condition: 'Usado',
  style: 'Streetwear',
  images: [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80'],

  sellerId: 'u2',
  likes: 145,
  distanceKm: 1.4,
  postedDaysAgo: 12,
  description: 'Con caja original. Tienen uso pero mucha vida por delante.',
  aspect: 'aspect-square'
},
{
  id: 'p6',
  title: 'Top Corset Lila',
  type: 'Tops',
  price: 15000,
  size: 'XS',
  condition: 'Nuevo sin etiqueta',
  style: 'Y2K',
  images: [
  'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&q=80'],

  sellerId: 'u3',
  likes: 420,
  distanceKm: 2.6,
  postedDaysAgo: 0,
  description: 'Me quedó chico, nunca lo usé. Color lila pastel hermoso.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p7',
  title: 'Buzo Canguro Oversize',
  type: 'Buzos',
  price: 22000,
  size: 'XL',
  condition: 'Excelente',
  style: 'Oversize',
  images: [
  'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=800&q=80'],

  sellerId: 'u5',
  likes: 78,
  distanceKm: 4.5,
  postedDaysAgo: 3,
  description: 'Súper calentito y cómodo.',
  aspect: 'aspect-square'
},
{
  id: 'p8',
  title: 'Lentes de Sol Retro',
  type: 'Accesorios',
  price: 8000,
  size: 'Único',
  condition: 'Excelente',
  style: 'Vintage',
  images: [
  'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&q=80'],

  sellerId: 'u4',
  likes: 190,
  distanceKm: 3.2,
  postedDaysAgo: 4,
  description: 'Estilo 90s, marco carey.',
  aspect: 'aspect-[3/2]'
},
{
  id: 'p9',
  title: 'Pollera Midi Denim',
  type: 'Polleras',
  price: 19000,
  size: '38',
  condition: 'Como nuevo',
  style: 'Casual',
  images: [
  'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80'],

  sellerId: 'u3',
  likes: 210,
  distanceKm: 2.6,
  postedDaysAgo: 1,
  description: 'Tajo en la parte de atrás, denim elastizado.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p10',
  title: 'Camisa de Lino',
  type: 'Camisas',
  price: 21000,
  size: 'M',
  condition: 'Excelente',
  style: 'Minimalista',
  images: [
  'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80'],

  sellerId: 'u5',
  likes: 85,
  distanceKm: 4.5,
  postedDaysAgo: 6,
  description: 'Ideal para media estación.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p11',
  title: 'Sweater Tejido Crema',
  type: 'Sweaters',
  price: 16500,
  size: 'M',
  condition: 'Como nuevo',
  style: 'Coquette',
  images: [
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'],

  sellerId: 'u3',
  likes: 167,
  distanceKm: 2.6,
  postedDaysAgo: 2,
  description: 'Tejido suave, color crema. Va con todo.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p12',
  title: 'Cartera Mini de Cuero',
  type: 'Carteras',
  price: 9500,
  size: 'Único',
  condition: 'Bueno',
  style: 'Minimalista',
  images: [
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80'],

  sellerId: 'u2',
  likes: 92,
  distanceKm: 1.4,
  postedDaysAgo: 8,
  description: 'Cuero genuino, marrón oscuro.',
  aspect: 'aspect-square'
},
{
  id: 'p13',
  title: 'Trench Coat Beige',
  type: 'Camperas',
  price: 38000,
  size: 'S',
  condition: 'Excelente',
  style: 'Formal',
  images: [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'],

  sellerId: 'u1',
  likes: 245,
  distanceKm: 0.8,
  postedDaysAgo: 4,
  description: 'Clásico trench, talle chico. Súper elegante.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p14',
  title: 'Cartera Charol Negra',
  type: 'Carteras',
  price: 11000,
  size: 'Único',
  condition: 'Nuevo con etiqueta',
  style: 'Formal',
  images: [
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'],

  sellerId: 'u4',
  likes: 178,
  distanceKm: 3.2,
  postedDaysAgo: 0,
  description: 'Bolso mini de charol, nunca usado.',
  aspect: 'aspect-square'
},
{
  id: 'p15',
  title: 'Top de Encaje Negro',
  type: 'Tops',
  price: 13000,
  size: 'S',
  condition: 'Como nuevo',
  style: 'Y2K',
  images: [
  'https://images.unsplash.com/photo-1551048632-24c5b9d6a01b?w=800&q=80'],

  sellerId: 'u3',
  likes: 134,
  distanceKm: 2.6,
  postedDaysAgo: 1,
  description: 'Top de encaje negro, sexy y elegante.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p16',
  title: 'Joggers Cargo Verde',
  type: 'Pantalones',
  price: 17500,
  size: 'M',
  condition: 'Excelente',
  style: 'Streetwear',
  images: [
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],

  sellerId: 'u2',
  likes: 56,
  distanceKm: 1.4,
  postedDaysAgo: 3,
  description: 'Cargo verde militar, muy cómodo.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p17',
  title: 'Campera de Jean Oversize',
  type: 'Camperas',
  price: 28000,
  size: 'L',
  condition: 'Bueno',
  style: 'Vintage',
  images: [
  'https://images.unsplash.com/photo-1591047139756-eced95397d62?w=800&q=80'],

  sellerId: 'u5',
  likes: 198,
  distanceKm: 4.5,
  postedDaysAgo: 10,
  description: 'Jean clarito, oversize. Perfecta.',
  aspect: 'aspect-square'
},
{
  id: 'p18',
  title: 'Vestido Slip Satinado',
  type: 'Vestidos',
  price: 24000,
  size: 'S',
  condition: 'Nuevo sin etiqueta',
  style: 'Minimalista',
  images: [
  'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'],

  sellerId: 'u4',
  likes: 387,
  distanceKm: 3.2,
  postedDaysAgo: 0,
  description: 'Vestido satinado color champagne, nunca usado.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p19',
  title: 'Short de Jean Tiro Alto',
  type: 'Shorts',
  price: 14000,
  size: '38',
  condition: 'Excelente',
  style: 'Casual',
  images: [
  'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'],

  sellerId: 'u3',
  likes: 142,
  distanceKm: 2.6,
  postedDaysAgo: 2,
  description: 'Short denim claro, perfecto para verano.',
  aspect: 'aspect-[3/4]'
},
{
  id: 'p20',
  title: 'Botas Texanas Marrón',
  type: 'Botas',
  price: 32000,
  size: '37',
  condition: 'Bueno',
  style: 'Vintage',
  images: [
  'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80'],

  sellerId: 'u1',
  likes: 220,
  distanceKm: 0.8,
  postedDaysAgo: 5,
  description: 'Cuero genuino, estilo cowboy.',
  aspect: 'aspect-[4/5]'
},
{
  id: 'p21',
  title: 'Conjunto Deportivo Lila',
  type: 'Deportiva',
  price: 19500,
  size: 'M',
  condition: 'Nuevo sin etiqueta',
  style: 'Deportivo',
  images: [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'],

  sellerId: 'u5',
  likes: 98,
  distanceKm: 4.5,
  postedDaysAgo: 1,
  description: 'Top + calza, lila pastel. Ideal para gym.',
  aspect: 'aspect-[3/4]'
}];


export const messages = [
{
  id: 'm1',
  chatId: 'c1',
  senderId: 'u1',
  receiverId: 'me',
  text: 'Hola! Sigue disponible la campera?',
  timestamp: 'Ayer 10:30',
  isRead: true
},
{
  id: 'm2',
  chatId: 'c1',
  senderId: 'me',
  receiverId: 'u1',
  text: 'Hola! Sí, la tengo. Hacés envíos?',
  timestamp: 'Ayer 10:35',
  isRead: true
},
{
  id: 'm3',
  chatId: 'c1',
  senderId: 'u1',
  receiverId: 'me',
  text: 'Sí, podemos coordinar por el centro de Tandil.',
  timestamp: 'Ayer 10:40',
  isRead: true
},
{
  id: 'm4',
  chatId: 'c1',
  senderId: 'u1',
  receiverId: 'me',
  type: 'offer',
  offerPrice: 40000,
  timestamp: 'Hoy 09:15',
  isRead: false
}];


export const chats = [
{
  id: 'c1',
  withUser: users[0],
  lastMessage: 'Oferta recibida: $40.000',
  timestamp: '09:15',
  unread: 1,
  product: products[0]
},
{
  id: 'c2',
  withUser: users[1],
  lastMessage: 'Te ofrezco 40k, te sirve?',
  timestamp: 'Ayer',
  unread: 0,
  product: products[4]
}];