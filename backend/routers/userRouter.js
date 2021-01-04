import express from 'express';
import expressAsyncHandlerasync from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/top-sellers' , expressAsyncHandler(async (req,res) => {
    const topSellers = await User.find({ isSeller : true})
    .sort({ 'seller.rating' :-1})
    .limit(3);
    res.send(topSellers);
}))

userRouter.get('/seed',
    expressAsyncHandlerasync(async (req, res) => {
        // await User.remove({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);


userRouter.post('/signin', expressAsyncHandlerasync(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller,
                token: generateToken(user)
            })
            return;
        }
    }
    res.status(401).send({ message: "Email o password errati." })
})
);

userRouter.post('/register', expressAsyncHandlerasync(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save();
    res.send({
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser)
    })
}))


userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "Utente non trovato" })
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(user.isSeller){
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
        }
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(updatedUser),

        })

    }
}))

userRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
}))

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if(user.email === 'marinoantonio885@gmail.com'){
            res.status(400).send({message: 'Non puoi eliminare un ADMIN'})
            return ;
        }
        const deletedUser = await user.remove();
        res.send({ message: 'Utente eliminato', user: deletedUser })
    } else {
        res.status(404).send({ message: 'Utente non trovato' })
    }
}))

userRouter.put('/:id' , isAuth , isAdmin , expressAsyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id);
    //console.log(user + " USER")
    if(user){
        //console.log(JSON.stringify(req.body) + " BODY")
        //console.log(req.body.isAdmin + " ADMIN")
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        //user.isSeller = req.body ? req.body.isSeller : user.isSeller;
        //user.isAdmin = req.body? req.body.isAdmin :  user.isAdmin;
        user.isAdmin= Boolean(req.body.isAdmin)
        user.isSeller= Boolean(req.body.isSeller)
       // console.log(user.isAdmin)
        const updatedUser = await user.save();
        res.send({message: 'Utente modificato', user: updatedUser})
    } else{
        res.status(404).send({message: 'Utente non trovato'})
    }
}))

export default userRouter;