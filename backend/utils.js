import jwt from "jsonwebtoken";
import config from './config.js';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
    }, process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        })
}

export const isAuth= (req,res,next) =>{
    const authorization = req.headers.authorization;
    if(authorization){
        const token= authorization.slice(7, authorization.length); // Bearer ****
        jwt.verify(token, config.JWT_SECRET || 'somethingsecret'
        , (err,decode) => {
            if(err){
                res.status(401).send({ message: 'Token errato'})
            } else{
                req.user= decode;
                next()
            }
        })
    } else{
        res.status(401).send({ message: 'Token inesistente'})

    }
}

export const isAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401).send({message: "Token admin errato"})
    }
}

export const isSeller = (req,res,next) => {
    if(req.user && req.user.isSeller){
        next();
    } else{
        res.status(401).send({message: "Token venditore errato"})
    }
}

export const isSellerOrAdmin = (req,res,next) => {
    if(req.user && (req.user.isSeller || req.user.isAdmin)){
        next();
    } else{
        res.status(401).send({message: "Token admin/venditore errato"})
    }
}