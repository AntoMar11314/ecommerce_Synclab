import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type:String , required:true, unique:true},
    model: {type:String , required:true},
    model_code: {type:String , required:true},
    category: {type:String , required:true},
    subcategory: {type:String },
    mainImage: {type:String , required:true},
    images: {type: Array , required:true},
    price: {type:Number , required:true},
    countInStock: {type:Number , required:true},
    brand: {type:String , required:true},
    rating: {type:Number , required:true},
    numReviews: {type:Number , required:true},
    description: {type:String , required:true},
    colour:{type:String , required:true}
},
{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);

export default Product;