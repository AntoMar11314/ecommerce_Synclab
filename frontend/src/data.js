const data={
    products: [
      {
        _id: 1,
        name: 'Camicia Lacoste',
        model: 'Lacoste Shirt',
        model_code: 'M567AS',
        category: 'Abbigliamento',
        mainImage: '/images/p1.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: '#01579b'
      },
      {
        _id: 2,
        name: 'Laptop ultra-slim',
        model: 'HP Pavilion',
        model_code: 'GT89HTY',
        category: 'Informatica',
        mainImage: '/images/p2.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p2.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 999.89,
        countInStock: 0,
        brand: 'HP',
        rating: 4,
        numReviews: 10,
        description: 'Computer con ottimo hardware. Prestazioni eccellenti in ambiti lavorativi informatici.',
        colour: '#263238'
      },
      {
        _id: 3,
        name: 'Mobile con ante',
        model: 'Mobili della primavera',
        model_code: '0123',
        category: 'Arredamento',
        mainImage: '/images/p3.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p3.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 85,
        countInStock: 10,
        brand: 'Mondo Convenienza',
        rating: 4.8,
        numReviews: 17,
        description: 'Mobile con 4 ante, facile da posizionare in casa.',
        colour: '#f5f5dc'
      },
      {
        _id: 4,
        name: 'Scarpe bianche Nike',
        model: 'AIRMAX',
        model_code: '720',
        category: 'Abbigliamento',
        subcategory: 'Scarpe',
        mainImage: '/images/p4.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p4.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 110,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'Scarpe bianche morb_ide e comodissime.',
        colour: '#fce4ec'
      },
      {
        _id: 5,
        name: 'Completino GIVOVA',
        model: 'Divise Calcio',
        model_code: '133A',
        category: 'Sport',
        mainImage: '/images/p5.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p5.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 20,
        countInStock: 10,
        brand: 'GIVOVA',
        rating: 4.5,
        numReviews: 10,
        description: 'Completino calcio GIVOVA di colore arancione.',
        colour: '#fb8c00'
      },
      {
        _id: 6,
        name: 'Chitarra acustica elettrificata',
        model: 'CORT ACUSTICA ELETTRIFICATA',
        model_code: 'MR600F',
        category: 'Musica',
        mainImage: '/images/p7.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p7.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 359.99,
        countInStock: 10,
        brand: 'Cort',
        rating: 2.5,
        numReviews: 35,
        description: 'CORT MR600F SSB CHITARRA ACUSTICA ELETTRIFICATA',
        colour: '#964b00'
      },
      {
        _id: 7,
        name: 'Frullatore MOULINEX',
        model: 'Double Force Plus',
        model_code: 'AF3000',
        category: 'Cucina',
        mainImage: '/images/p6.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p6.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 148.99,
        countInStock: 10,
        brand: 'MOULINEX',
        rating: 4.5,
        numReviews: 15,
        description: 'Il robot da cucina Double Force Plus è dotato di una vasta gamma di accessori dedicati ed efficienti.',
        colour: '#bdbdbd'
      },
      {
        _id: 8,
        name: 'PlayStation 4',
        model: 'PS',
        model_code: '-4',
        category: 'V_ideogiochi',
        mainImage: '/images/p8.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/p8.jpg',
          '/images/p1.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 285,
        countInStock: 10,
        brand: 'Sony',
        rating: 5,
        numReviews: 150,
        description: 'La PS4 è una console multimediale: consente di guardare film in alta definizione fino a 1080p su un televisore Full HD.',
        colour: 'black'
      },
      {
        _id: 9,
        name: 'Camicia Lacoste 2',
        model: 'Lacoste Shirt',
        model_code: 'M567AS2',
        category: 'Abbigliamento',
        mainImage: '/images/lacoste-1.jpg',
        images: [
          '/images/lacoste-1.jpg',
          '/images/lacoste-1-mod1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Creatore della prima polo nel 1933, Lacoste si è imposto come l\'unico marchio di lusso casual che combina eleganza alla francese e libertà di movimento, ereditato dalle sue origini sportive. Il marchio al coccodrillo è uno dei marchi più conosciuti al mondo e si è imposto come il riferimento del polo, reinventandolo costantemente in diverse forme, materiali e stili. Presente in 120 paesi, propone un universo completo: abbigliamento, pelletteria, profumi, scarpe, occhiali, biancheria per la casa, orologi e biancheria intima, la cui elaborazione risponde ai suoi elevati requisiti di qualità e responsabilità.',
        colour: '#1de9b6'
      },
      {
        _id: 10,
        name: 'Camicia Lacoste 3',
        model: 'Lacoste Shirt',
        model_code: 'M567AS3',
        category: 'Abbigliamento',
        mainImage: '/images/lacoste-2.jpg',
        images: [
          '/images/lacoste-2.jpg',
          '/images/p1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: '#e8eaf6'
      },
      {
        _id: 11,
        name: 'Camicia Lacoste 4',
        model: 'Lacoste Shirt',
        model_code: 'M567AS4',
        category: 'Abbigliamento',
        mainImage: '/images/lacoste-3.jpg',
        images: [
          '/images/lacoste-3.jpg',
          '/images/p1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: '#536dfe'
      },
      {
        _id: 12,
        name: 'Camicia Lacoste 5',
        model: 'Lacoste Shirt',
        model_code: 'M567AS4',
        category: 'Abbigliamento',
        mainImage: '/images/lacoste-4.jpg',
        images: [
          '/images/lacoste-4.jpg',
          '/images/p1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: '#ff6f00'
      },
      {
        _id: 13,
        name: 'Camicia Lacoste 6',
        model: 'Lacoste Shirt',
        model_code: 'AAA4',
        category: 'Abbigliamento',
        mainImage: '/images/lacoste-6.jpg',
        images: [
          '/images/lacoste-6.jpg',
          '/images/p1.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: 'red'
      },
      {
        _id: 14,
        name: 'Camicia Lacoste 7 - RED',
        model: 'Lacoste Shirt',
        model_code: 'M567AS',
        category: 'Abbigliamento',
        mainImage: '/images/gallery-1.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 90,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 10,
        description: 'Camicia di alta qualità',
        colour: '#d50000'
      },
      {
        _id: 15,
        name: 'Pantaloni Lacoste',
        model: 'Lacoste pantaloni',
        model_code: 'JE900',
        category: 'Abbigliamento',
        subcategory: 'Giubbino',
        mainImage: '/images/pantaloni-1.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 45,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 0,
        numReviews: 1,
        description: 'Camicia di alta qualità',
        colour: '#d50000'
      },
      {
        _id: 16,
        name: 'Giubbino Blu Lacoste',
        model: 'Lacoste giubbino',
        model_code: 'G67HY',
        category: 'Abbigliamento',
        subcategory: 'Giubbino',
        mainImage: '/images/giubbino-2.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 89.98,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 1,
        numReviews: 29,
        description: 'Camicia di alta qualità',
        colour: '#000080'
      },
      {
        _id: 17,
        name: 'Giubbino Beige Lacoste',
        model: 'Lacoste giubbino',
        model_code: 'G67HY',
        category: 'Abbigliamento',
        subcategory: 'Giubbino',
        mainImage: '/images/giubbino-3.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 109.99,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.2,
        numReviews: 7,
        description: 'Camicia di alta qualità',
        colour: '#f5f5dc'
      },
      {
        _id: 18,
        name: 'Polo Lacoste',
        model: 'Lacoste polo',
        model_code: 'G67HYc',
        category: 'Abbigliamento',
        subcategory: 'Giubbino',
        mainImage: '/images/polo-1.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 64.3,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 5,
        numReviews: 33,
        description: 'Camicia di alta qualità',
        colour: '#d50000'
      },
      {
        _id: 19,
        name: 'Scarpe Sportive Lacoste',
        model: 'Lacoste scarpe sportive',
        model_code: 'G67HYe',
        category: 'Abbigliamento',
        subcategory: 'Scarpe',
        mainImage: '/images/scarpe-1.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 70,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 4.5,
        numReviews: 5,
        description: 'Camicia di alta qualità',
        colour: '#d50000'
      },
      {
        _id: 20,
        name: 'Scarpe Uomo Lacoste',
        model: 'Lacoste scarpe uomo',
        model_code: 'G67HYF',
        category: 'Abbigliamento',
        subcategory: 'Scarpe',
        mainImage: '/images/scarpe-2.jpg',
        images: [
          '/images/gallery-1.jpg',
          '/images/gallery-2.jpg',
          '/images/gallery-3.jpg',
          '/images/gallery-4.jpg'
        ],
        price: 80.99,
        countInStock: 5,
        brand: 'Lacoste',
        rating: 2.3,
        numReviews: 100,
        description: 'Camicia di alta qualità',
        colour: '#d50000'
      }
    ]
  }

  export default data;