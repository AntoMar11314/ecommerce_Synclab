import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSeller, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const sellerFilter = seller ? { seller } : {};
    const name = req.query.name || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const category = req.query.category || '';
    const categoryFilter = category ? { category } : {};
    const min =
        req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
        req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
        req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
        order === 'lowest' ? { price: 1 } :
            order === 'highest' ? { price: -1 } :
                order === 'toprated' ? { rating: -1 }
                    : { _id: -1 }
    const products = await Product.find(
        {
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter
        }
    ).populate(
        'seller', 'seller.name seller.logo'
    )
        .sort(sortOrder);
    res.send(products);
})
)

productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: 'Nessun venditore trovato. Esegui prima /api/users/seed' });
    }
  })
);


productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
        'seller', 'seller.name seller.rating seller.numReviews'
    );
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Prodotto non trovato' })
    }
}))

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: 'es nome' + Date.now(),
        seller: req.user._id,
        model: 'es modello',
        model_code: 'es sigla',
        category: 'es categoria',
        subcategory: 'es sub',
        mainImage: '/images/gallery-1.jpg',
        images: [
            '/images/gallery-1.jpg',
            '/images/p1.jpg',
            '/images/gallery-3.jpg',
            '/images/gallery-4.jpg'
        ],
        price: 0,
        countInStock: 1,
        brand: 'es brand',
        rating: 0,
        numReviews: 0,
        description: 'es descrizione',
        colour: 'es colore'
    });
    const createdProduct = await product.save();
    res.send({ message: 'Prodotto creato', product: createdProduct });
})
);

productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.model = req.body.model;
        product.model_code = req.body.model_code;
        product.category = req.body.category;
        product.mainImage = req.body.mainImage;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        product.brand = req.body.brand;
        product.rating = req.body.rating;
        product.numReviews = req.body.numReviews;
        product.description = req.body.description;
        product.colour = req.body.colour;
        const updatedProduct = await product.save();
        res.send({ message: "Prodotto modificato", product: updatedProduct })

    } else {
        res.status(404).send({ message: "Prodotto non trovato" })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: "Prodotto eliminato", product: deleteProduct })

    } else {
        res.status(404).send({ message: 'Prodotto non trovato' })
    }
}))

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        if(product.reviews.find(x => x.name === req.user.name)){
           return  res.status(400).send({message: 'Già ha inserito una rencensione per questo prodotto'})
        }
        const review = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce(
            (a, c) =>
                c.rating + a, 0
        ) / product.reviews.length;

        const updatedProduct = await product.save();
        res.status(201).send({ message: "Recensione creata",
         review: updatedProduct.reviews[updatedProduct.reviews.length -1] })

    } else {
        res.status(404).send({ message: "Prodotto non trovato" })
    }
}))

export default productRouter;