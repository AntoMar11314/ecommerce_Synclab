const data = {
    products: [
        {
            _id: '1',
            name: 'Camicia Lacoste',
            category: "Abbigliamento",
            mainImage: '/images/p1.jpg',
            images: ['/images/gallery-1.jpg','/images/p1.jpg','/images/gallery-3.jpg','/images/gallery-4.jpg'],
            price: 90,
            countInStock:5,
            brand: 'Lacoste',
            rating: 4.5,
            numReviews: 10,
            desription: "Camicia di alta qualità"
        },
        {
            _id: '2',
            name: 'Laptop ultra-slim',
            category: "Informatica",
            mainImage: '/images/p2.jpg',
            images: ['/images/gallery-1.jpg','/images/p2.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 999.89,
            countInStock:0, 
            brand: 'HP',
            rating: 4.0,
            numReviews: 10,
            desription: "Computer con ottimo hardaware. Prestazioni eccellenti in ambiti lavorativi informatici."
        },
        {
            _id: '3',
            name: 'Mobile con ante',
            category: "Arredamento",
            mainImage: '/images/p3.jpg',
            images: ['/images/gallery-1.jpg','/images/p3.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 85,
            countInStock:10, 
            brand: 'Mondo Convenienza',
            rating: 4.8,
            numReviews: 17,
            desription: "Mobile con 4 ante, facile da posizionare in casa."
        },
        {
            _id: '4',
            name: 'Scarpe bianche Nike',
            category: "Scarpe",
            mainImage: '/images/p4.jpg',
            images: ['/images/gallery-1.jpg','/images/p4.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 110,
            countInStock:10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 14,
            desription: "Scarpe bianche morbide e comodissime."
        },
        {
            _id: '5',
            name: 'Completino GIVOVA',
            category: "Sport",
            mainImage: '/images/p5.jpg',
            images: ['/images/gallery-1.jpg','/images/p5.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 20,
            countInStock:10,
            brand: 'GIVOVA',
            rating: 4.5,
            numReviews: 10,
            desription: "Completino calcio GIVOVA di colore arancione."
        },
        {
            _id: '6',
            name: 'Chitarra acustica elettrificata',
            category: "Musica",
            mainImage: '/images/p7.jpg',
            images: ['/images/gallery-1.jpg','/images/p7.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 359.99,
            countInStock:10,
            brand: 'Cort',
            rating: 2.5,
            numReviews: 35,
            desription: "CORT MR600F SSB CHITARRA ACUSTICA ELETTRIFICATA"
        },
        {
            _id: '7',
            name: 'Frullatore MOULINEX',
            category: "Cucina",
            mainImage: '/images/p6.jpg',
            images: ['/images/gallery-1.jpg','/images/p6.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 148.99,
            countInStock:10,
            brand: 'MOULINEX',
            rating: 4.5,
            numReviews: 15,
            desription: "Il robot da cucina Double Force Plus è dotato di una vasta gamma di accessori dedicati ed efficienti."
        },
        {
            _id: '8',
            name: 'PlayStation 4',
            category: "Videogiochi",
            mainImage: '/images/p8.jpg',
            images: ['/images/gallery-1.jpg','/images/p8.jpg','/images/p1.jpg','/images/gallery-4.jpg'],
            price: 285,
            countInStock:10,
            brand: 'Sony',
            rating: 5,
            numReviews: 150,
            desription: "La PS4 è una console multimediale: consente di guardare film in alta definizione fino a 1080p su un televisore Full HD."
        }
    ]
}


export default data;