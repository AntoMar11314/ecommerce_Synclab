import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

//dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
app.use('/api/uploads' , uploadRouter)
app.use('/api/users' , userRouter); 
app.use('/api/products', productRouter);
app.use('/api/orders' , orderRouter)

const __dirname = path.resolve();
app.use('/uploads' , express.static(path.join( __dirname , '/uploads')))

app.get('/api/config/paypal' , (req,res) =>{
    res.send(config.PAYPAL_CLIENT_ID ) //|| 'sb')
})

app.get('/api/config/google' , (req,res) =>{
    res.send(config.GOOGLE_API_KEY ) //|| '')
})
app.get('/', (req, res) => {
    res.send('Il server è pronto');
});

app.use((err,req,res,next) => {
    res.status(500).send({message: err.message})
})

//const port = config.PORT || 5000;
app.listen(config.PORT, () => {
    console.log(`Serve at http://localhost:${config.PORT}`)
})

