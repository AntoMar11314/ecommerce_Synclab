import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            mainImage: data.mainImage,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
            /*
            model: data.model,
            model_code: data.model_code,
            category: data.category,
            images: data.images,
            brand: data.brand,
            rating: data.rating,
            numReviews: data.numReviews,
            description: data.description,
            colour: data.colour
            */

        },
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}