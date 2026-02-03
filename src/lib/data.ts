export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  event?: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  priceLabel?: string; // e.g. "Starting at" or "Contact for Quote"
  originalPrice?: number;
  image: string;
  images: string[];
  badge?: string;
  inStock: boolean;
  category: 'arches' | 'garlands' | 'columns' | 'bouquets' | 'custom' | 'packages' | 'services';
  type: 'product' | 'service';
  features: string[];
  reviews: Review[];
  addOns: AddOn[];
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price?: number;
  priceLabel: string;
  image: string;
  features: string[];
  reviews: Review[];
}

export const addOns: AddOn[] = [
  {
    id: 'ao1',
    name: 'Extra Latex Balloons (10 pack)',
    description: 'Add 10 extra high-quality latex balloons in matching colors',
    price: 12,
  },
  {
    id: 'ao2',
    name: 'Foil Number Balloons',
    description: 'Large 34" foil number balloons, perfect for birthdays and anniversaries',
    price: 8,
  },
  {
    id: 'ao3',
    name: 'LED Balloon Lights (5 pack)',
    description: 'Battery-powered LED lights inside balloons for a glowing effect',
    price: 15,
  },
  {
    id: 'ao4',
    name: 'Custom Banner Sign',
    description: 'Personalized vinyl banner up to 6ft with your message',
    price: 35,
  },
  {
    id: 'ao5',
    name: 'Table Centerpiece',
    description: 'Balloon centerpiece arrangement for one table',
    price: 25,
  },
  {
    id: 'ao6',
    name: 'Confetti Balloons (5 pack)',
    description: 'Clear balloons filled with metallic confetti',
    price: 10,
  },
  {
    id: 'ao7',
    name: 'Ribbon & Tassel Kit',
    description: 'Decorative ribbons and tassels to accent your balloon display',
    price: 18,
  },
  {
    id: 'ao8',
    name: 'Flower Accent Garland',
    description: 'Silk flower accents woven into your balloon display',
    price: 40,
  },
];

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Single Balloon Arch',
    description: 'Single arch balloon display, perfect for entrances or small events',
    longDescription: 'Our signature single balloon arch is the perfect statement piece for any entrance, stage, or photo area. Handcrafted with premium latex balloons in your choice of colors, this arch spans approximately 8-10 feet and creates a stunning focal point. Each arch is custom designed to match your event theme and color palette. We use a mix of balloon sizes (5", 11", and 16") to create an organic, flowing look that photographs beautifully.',
    price: 150,
    image: '/images/single-balloon-arch.webp',
    images: ['/images/single-balloon-arch.webp', '/images/single-balloon-arch-hero.webp'],
    badge: 'Popular',
    inStock: true,
    category: 'arches',
    type: 'product',
    features: [
      '8-10 ft span',
      'Custom color selection',
      'Mix of balloon sizes for organic look',
      'Indoor or outdoor use',
      'Setup and takedown included',
      'Lasts 12-18 hours',
    ],
    reviews: [
      {
        id: 'r1',
        name: 'Sarah M.',
        rating: 5,
        date: '2025-11-15',
        text: 'The arch was absolutely stunning at our wedding entrance! Everyone was taking photos in front of it. The colors matched our theme perfectly.',
        event: 'Wedding',
      },
      {
        id: 'r2',
        name: 'David K.',
        rating: 5,
        date: '2025-10-22',
        text: 'Used this for my daughter\'s sweet 16 and it was the highlight of the decor. Professional setup and it lasted the entire event.',
        event: 'Birthday Party',
      },
      {
        id: 'r3',
        name: 'Lisa P.',
        rating: 4,
        date: '2025-09-08',
        text: 'Beautiful arch, great quality balloons. The only thing is I wish it was slightly wider, but overall very happy with the result.',
        event: 'Baby Shower',
      },
    ],
    addOns: ['ao1', 'ao3', 'ao6', 'ao8'] as unknown as AddOn[],
  },
  {
    id: '2',
    name: 'Double Balloon Arch',
    description: 'Double-layer balloon arch, great for photo backdrops or larger events',
    longDescription: 'Make a grand statement with our double-layer balloon arch. Featuring two intertwining layers of balloons, this arch creates incredible depth and dimension that single arches simply cannot match. Spanning 10-14 feet, it\'s ideal for grand entrances, stage backdrops, and premium photo areas. The double-layer design uses over 200 balloons in complementary colors, creating a luxurious, full appearance that will leave your guests in awe.',
    price: 250,
    image: '/images/double-balloon-arch.webp',
    images: ['/images/double-balloon-arch.webp'],
    badge: 'New Display',
    inStock: true,
    category: 'arches',
    type: 'product',
    features: [
      '10-14 ft span',
      'Double-layer design with 200+ balloons',
      'Complementary color palette',
      'Premium photo backdrop',
      'Setup and takedown included',
      'Lasts 12-18 hours',
    ],
    reviews: [
      {
        id: 'r4',
        name: 'Michael T.',
        rating: 5,
        date: '2025-12-01',
        text: 'This was the centerpiece of our corporate gala. The double layer effect is truly impressive in person. Worth every penny.',
        event: 'Corporate Event',
      },
      {
        id: 'r5',
        name: 'Amanda R.',
        rating: 5,
        date: '2025-11-10',
        text: 'Absolutely breathtaking! Used it as the backdrop for our wedding ceremony. The photos turned out incredible.',
        event: 'Wedding',
      },
    ],
    addOns: ['ao1', 'ao3', 'ao4', 'ao8'] as unknown as AddOn[],
  },
  {
    id: '3',
    name: 'Balloon Garland',
    description: 'Balloon garland for tables, walls, or stages, 10-12 ft long',
    longDescription: 'Our organic balloon garlands bring effortless elegance to any space. At 10-12 feet long, these versatile installations can drape across tables, climb up walls, frame doorways, or accent stages. Each garland features a carefully curated mix of balloon sizes and shades that create a natural, flowing aesthetic. We use professional-grade attachment methods to ensure your garland stays perfectly in place throughout your event.',
    price: 120,
    image: '/images/balloon-garland.webp',
    images: ['/images/balloon-garland.webp'],
    badge: 'Popular',
    inStock: true,
    category: 'garlands',
    type: 'product',
    features: [
      '10-12 ft length',
      'Organic, flowing design',
      'Versatile mounting options',
      'Custom color palette',
      'Professional installation',
      'Perfect for tables, walls, or stages',
    ],
    reviews: [
      {
        id: 'r6',
        name: 'Emily R.',
        rating: 5,
        date: '2025-10-18',
        text: 'The garland was draped along our dessert table and it looked absolutely magical. The organic style was exactly what I wanted.',
        event: 'Birthday Party',
      },
      {
        id: 'r7',
        name: 'Jennifer W.',
        rating: 4,
        date: '2025-09-25',
        text: 'Beautiful work! Used it to frame our entrance and it set the tone for the whole event. Would love a longer option too.',
        event: 'Baby Shower',
      },
    ],
    addOns: ['ao1', 'ao6', 'ao7', 'ao8'] as unknown as AddOn[],
  },
  {
    id: '4',
    name: 'Balloon Column',
    description: 'Decorative balloon column, 6-8 ft tall, ideal for parties or weddings',
    longDescription: 'Our balloon columns are the perfect way to line walkways, frame entrances, or mark special areas at your event. Standing 6-8 feet tall, each column is built on a sturdy base and features a beautiful spiral or stacked design. These eye-catching vertical displays are incredibly versatile and can be customized with your event colors. They work wonderfully in pairs or as a series to create a dramatic pathway.',
    price: 80,
    image: '/images/balloon-column.webp',
    images: ['/images/balloon-column.webp'],
    inStock: true,
    category: 'columns',
    type: 'product',
    features: [
      '6-8 ft tall',
      'Sturdy weighted base',
      'Spiral or stacked design options',
      'Custom color matching',
      'Indoor or outdoor use',
      'Great in pairs for entrances',
    ],
    reviews: [
      {
        id: 'r8',
        name: 'Carlos D.',
        rating: 5,
        date: '2025-11-05',
        text: 'We ordered 4 columns to line the entrance of our event hall. They looked incredible and stayed perfect all night!',
        event: 'Corporate Event',
      },
    ],
    addOns: ['ao1', 'ao3', 'ao6'] as unknown as AddOn[],
  },
  {
    id: '5',
    name: 'Large Balloon Bouquet',
    description: 'Large bouquet of 12-15 latex and foil balloons, perfect for celebrations',
    longDescription: 'Our large balloon bouquets make the perfect centerpiece, gift, or accent for any celebration. Each bouquet includes 12-15 premium latex and foil balloons, carefully arranged at varying heights for maximum visual impact. Weighted with a decorative base, these bouquets can stand on their own as table centerpieces or be placed strategically around your venue. Each balloon is treated with Hi-Float for extended float time.',
    price: 50,
    image: '/images/large-balloon-bouquet.webp',
    images: ['/images/large-balloon-bouquet.webp'],
    badge: 'Popular',
    inStock: true,
    category: 'bouquets',
    type: 'product',
    features: [
      '12-15 balloons per bouquet',
      'Mix of latex and foil balloons',
      'Weighted decorative base',
      'Hi-Float treated for long life',
      'Custom color selection',
      'Delivery available',
    ],
    reviews: [
      {
        id: 'r9',
        name: 'Maria G.',
        rating: 5,
        date: '2025-12-10',
        text: 'Ordered 6 of these for our graduation party tables. They were gorgeous and lasted well into the next day!',
        event: 'Graduation',
      },
      {
        id: 'r10',
        name: 'Tom B.',
        rating: 5,
        date: '2025-11-20',
        text: 'Sent this as a birthday surprise and the recipient was thrilled. Beautiful arrangement and great quality.',
        event: 'Birthday Party',
      },
    ],
    addOns: ['ao1', 'ao2', 'ao3', 'ao6'] as unknown as AddOn[],
  },
  {
    id: '6',
    name: 'Custom Printed Balloon',
    description: 'Personalized latex balloon with text or logo, great for events',
    longDescription: 'Make your event truly unique with our custom printed balloons. Each high-quality 11" latex balloon features your personalized text, logo, or design printed in vibrant, long-lasting ink. Perfect for corporate branding, wedding favors, birthday parties, and promotional events. Minimum order of 25 balloons. We offer a range of balloon colors and ink colors to match your branding or event theme. Proof provided before printing.',
    price: 5,
    originalPrice: 8,
    image: '/images/custom-printed-balloon.webp',
    images: ['/images/custom-printed-balloon.webp'],
    badge: 'Sale',
    inStock: true,
    category: 'custom',
    type: 'product',
    features: [
      'Custom text or logo printing',
      'High-quality 11" latex balloons',
      'Wide range of balloon and ink colors',
      'Proof provided before printing',
      'Minimum order: 25 balloons',
      'Perfect for branding and events',
    ],
    reviews: [
      {
        id: 'r11',
        name: 'Jessica L.',
        rating: 5,
        date: '2025-10-30',
        text: 'Ordered 100 with our company logo for a trade show. Print quality was excellent and they really helped our booth stand out.',
        event: 'Corporate Event',
      },
      {
        id: 'r12',
        name: 'Priya K.',
        rating: 4,
        date: '2025-09-15',
        text: 'Great quality custom balloons for our wedding. The names and date printed beautifully. Wish the turnaround was a bit faster.',
        event: 'Wedding',
      },
    ],
    addOns: ['ao1', 'ao3', 'ao7'] as unknown as AddOn[],
  },
  {
    id: 's1',
    name: 'Event Balloon Package',
    description: 'Full event balloon decoration including arches, columns, and garlands',
    longDescription: 'Our comprehensive Event Balloon Package is the ultimate solution for transforming your venue into a celebration wonderland. This all-inclusive package includes a statement balloon arch for your entrance or stage, two balloon columns, a 10ft garland, and table centerpiece bouquets. Our team handles everything from design consultation to installation and cleanup. We work with you to create a cohesive color scheme and design that ties all elements together beautifully.',
    price: 350,
    image: '/images/event-balloon-package.webp',
    images: ['/images/event-balloon-package.webp'],
    badge: 'Popular',
    inStock: true,
    category: 'packages',
    type: 'service',
    features: [
      'Full venue balloon decoration',
      'Includes arch, 2 columns, garland, and centerpieces',
      'Free design consultation',
      'Custom color scheme',
      'Professional installation and cleanup',
      'Up to 4 hours of setup time',
    ],
    reviews: [
      {
        id: 'r13',
        name: 'Rachel & James',
        rating: 5,
        date: '2025-12-05',
        text: 'Our wedding venue was transformed beyond our dreams. Every detail was perfect and the team was so professional. Absolutely worth it!',
        event: 'Wedding',
      },
      {
        id: 'r14',
        name: 'Corporate Events Inc.',
        rating: 5,
        date: '2025-11-18',
        text: 'We\'ve used this package for 3 company events now and it never disappoints. The consistency and quality are outstanding.',
        event: 'Corporate Event',
      },
      {
        id: 'r15',
        name: 'Michelle S.',
        rating: 5,
        date: '2025-10-12',
        text: 'Best money we spent on the party! The full package made everything look coordinated and professional. So many compliments from guests.',
        event: 'Birthday Party',
      },
    ],
    addOns: ['ao2', 'ao3', 'ao4', 'ao5', 'ao8'] as unknown as AddOn[],
  },
];

// Dedicated services list
export const servicesList: ServiceItem[] = [
  {
    id: 'svc-birthday',
    name: 'Birthday Party Decorations',
    description: 'Complete balloon decoration service for birthday celebrations of all ages',
    longDescription: 'Make every birthday unforgettable with our full-service balloon decoration packages. From whimsical children\'s parties to elegant milestone celebrations, we design and install custom balloon displays tailored to your theme, color scheme, and venue. Our birthday packages include a combination of arches, garlands, bouquets, and accent pieces that transform any space into a celebration wonderland. We handle consultation, design, delivery, setup, and cleanup so you can focus on enjoying the party.',
    price: 350,
    priceLabel: 'Starting at $350',
    image: '/images/event-balloon-package.webp',
    features: [
      'Custom theme and color design',
      'Balloon arch or garland as centerpiece',
      'Table centerpiece bouquets',
      'Number or letter balloon displays',
      'Photo backdrop area',
      'Free setup and takedown',
      'Suitable for all ages and venues',
      'Add-ons available (banners, confetti, etc.)',
    ],
    reviews: [
      {
        id: 'sr1',
        name: 'Emily R.',
        rating: 5,
        date: '2025-12-01',
        text: 'My daughter was thrilled with the balloon decorations! The colors were perfect and the quality exceeded my expectations. The team set everything up while we were getting the cake ready.',
        event: 'Birthday Party',
      },
      {
        id: 'sr2',
        name: 'David K.',
        rating: 5,
        date: '2025-10-22',
        text: 'Used this for my daughter\'s sweet 16 and it was the highlight of the decor. Professional setup and it lasted the entire event.',
        event: 'Birthday Party',
      },
    ],
  },
  {
    id: 'svc-wedding',
    name: 'Wedding Balloon Decor',
    description: 'Elegant and romantic balloon installations for your special day',
    longDescription: 'Your wedding day deserves to be extraordinary. Our wedding balloon decoration service brings romance, elegance, and drama to your ceremony and reception. From grand entrance arches and aisle accents to stunning reception centerpieces and photo walls, we create cohesive balloon designs that complement your wedding theme and floral arrangements. We work closely with your wedding planner or venue coordinator to ensure seamless installation. Our premium balloon selections include pearlescent, chrome, and matte finishes in any color palette you envision.',
    priceLabel: 'Contact for Quote',
    image: '/images/double-balloon-arch.webp',
    features: [
      'Ceremony arch or backdrop',
      'Reception entrance display',
      'Table centerpiece arrangements',
      'Photo booth balloon wall',
      'Aisle accent columns',
      'Coordination with wedding planner',
      'Premium balloon finishes (pearl, chrome, matte)',
      'Setup before guests arrive, takedown after event',
    ],
    reviews: [
      {
        id: 'sr3',
        name: 'Rachel & James',
        rating: 5,
        date: '2025-12-05',
        text: 'Our wedding venue was transformed beyond our dreams. Every detail was perfect and the team was so professional. Absolutely worth it!',
        event: 'Wedding',
      },
      {
        id: 'sr4',
        name: 'Amanda R.',
        rating: 5,
        date: '2025-11-10',
        text: 'Absolutely breathtaking! Used it as the backdrop for our wedding ceremony. The photos turned out incredible.',
        event: 'Wedding',
      },
    ],
  },
  {
    id: 'svc-corporate',
    name: 'Corporate Event Decorations',
    description: 'Professional balloon displays for corporate events, galas, and conferences',
    longDescription: 'Elevate your corporate events with impactful balloon installations that reinforce your brand and create memorable experiences. Whether it\'s a product launch, company gala, trade show, holiday party, or team celebration, we design professional balloon displays that match your corporate identity. We can incorporate company colors, logos (via custom printed balloons), and branded elements into stunning installations. Our team is experienced with corporate timelines and venue requirements, ensuring efficient setup with minimal disruption.',
    priceLabel: 'Contact for Quote',
    image: '/images/balloon-garland.webp',
    features: [
      'Brand-aligned color schemes',
      'Custom printed balloons with logos',
      'Stage and entrance installations',
      'Photo opportunity areas',
      'Conference and trade show displays',
      'Flexible scheduling for corporate venues',
      'Bulk event pricing available',
      'Post-event cleanup included',
    ],
    reviews: [
      {
        id: 'sr5',
        name: 'Michael T.',
        rating: 5,
        date: '2025-12-01',
        text: 'Professional service from start to finish. The setup was quick and the display looked incredible. Will definitely book again for our next quarterly event.',
        event: 'Corporate Event',
      },
      {
        id: 'sr6',
        name: 'Corporate Events Inc.',
        rating: 5,
        date: '2025-11-18',
        text: 'We\'ve used this service for 3 company events now and it never disappoints. The consistency and quality are outstanding.',
        event: 'Corporate Event',
      },
    ],
  },
  {
    id: 'svc-babyshower',
    name: 'Baby Shower Decorations',
    description: 'Sweet and stylish balloon arrangements for welcoming a new arrival',
    longDescription: 'Celebrate the upcoming arrival with our charming baby shower balloon decoration service. We specialize in creating soft, dreamy balloon displays perfect for gender reveals, baby showers, and welcome-home celebrations. Our designs range from classic pastel palettes to modern neutral tones, and we can incorporate themed elements like "Oh Baby" letter balloons, stork displays, and balloon-filled gift boxes. Every detail is designed to make the mom-to-be feel special.',
    priceLabel: 'Contact for Quote',
    image: '/images/large-balloon-bouquet.webp',
    features: [
      'Gender reveal balloon options',
      'Themed letter and number balloons',
      'Soft color palettes and modern neutrals',
      'Dessert table garland displays',
      'Photo backdrop installations',
      'Gift table and entrance accents',
      'Balloon gift boxes and surprises',
      'Free consultation and design mockup',
    ],
    reviews: [
      {
        id: 'sr7',
        name: 'Nina H.',
        rating: 5,
        date: '2025-11-28',
        text: 'The setup team was punctual, professional, and did an amazing job. Everything was perfect by the time guests arrived. The pastel colors were gorgeous!',
        event: 'Baby Shower',
      },
    ],
  },
  {
    id: 'svc-graduation',
    name: 'Graduation Celebrations',
    description: 'Festive balloon displays to honor academic achievements',
    longDescription: 'Mark this milestone with festive, school-spirited balloon decorations. Our graduation balloon service includes bold, celebratory installations featuring school colors, year number balloons, and congratulatory displays. Perfect for backyard parties, restaurant gatherings, or venue receptions, we create photo-worthy displays that capture the pride of the occasion. From cap-and-gown themed arches to diploma-inspired centerpieces, every element celebrates the graduate\'s achievement.',
    priceLabel: 'Contact for Quote',
    image: '/images/balloon-column.webp',
    features: [
      'School color themed designs',
      'Year and letter balloon displays',
      'Photo backdrop installations',
      'Entrance arches and columns',
      'Table centerpiece bouquets',
      'Indoor and outdoor setups',
      'Works with any venue type',
      'Same-week booking available',
    ],
    reviews: [
      {
        id: 'sr8',
        name: 'Maria G.',
        rating: 5,
        date: '2025-12-10',
        text: 'Ordered decorations for our graduation party and they were gorgeous. The school colors looked amazing and everything lasted well into the next day!',
        event: 'Graduation',
      },
    ],
  },
];

export function getServiceById(id: string): ServiceItem | undefined {
  return servicesList.find((s) => s.id === id);
}

// Helper to resolve add-on IDs to full add-on objects
export function getProductAddOns(product: Product): AddOn[] {
  const addOnIds = product.addOns as unknown as string[];
  return addOnIds
    .map((id) => addOns.find((ao) => ao.id === id))
    .filter((ao): ao is AddOn => ao !== undefined);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProducts(): Product[] {
  return allProducts.filter((p) => p.type === 'product');
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'arches', label: 'Arches' },
  { id: 'garlands', label: 'Garlands' },
  { id: 'columns', label: 'Columns' },
  { id: 'bouquets', label: 'Bouquets' },
  { id: 'custom', label: 'Custom' },
  { id: 'packages', label: 'Packages' },
];
