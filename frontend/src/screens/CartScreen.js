import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/shared/MessageBox';
import FormatPrice from '../utilities/FormatPrice';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log(cartItems)
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className="row top">
            <div className="col-2-b">
                <h1>Carrello</h1>
                {cartItems.length === 0 ? <MessageBox>
                    Il carrello è vuoto. <Link to="/">Fai shopping!</Link>
                </MessageBox>
                    :
                    (
                        <ul>
                            {
                                cartItems.map(item => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img
                                                    src={item.mainImage}
                                                    alt={item.name}
                                                    className="small"
                                                />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select
                                                    value={item.qty}
                                                    onChange={e =>
                                                        dispatch(
                                                            addToCart(item.product, Number(e.target.value))
                                                        )
                                                    }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <FormatPrice price={item.price} />
                                            </div>
                                            <div>
                                                <button type="button"className="removeItem"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >Rimuovi</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
            </div>
            <div className="col-1-b">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Totale ({cartItems.reduce((a, c) => a + c.qty, 0)} prodotti) :
                                 <FormatPrice price={Number(cartItems.reduce((a, c) => a + c.price * c.qty, 0))} />
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}>
                                Procedi all'acquisto
                            </button>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
