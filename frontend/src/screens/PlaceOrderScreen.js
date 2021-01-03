import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import FormatPrice from '../utilities/FormatPrice';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector( state => state.orderCreate);
    const { loading , success, error, order}= orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)) // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.shippingPrice =
        cart.itemsPrice > 100
            ? toPrice(0)
            : toPrice(10)

    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        //TODO: dispatch place order action
        dispatch(createdOrder({...cart, orderItems: cart.cartItems}))
    }
    useEffect(() =>{
        if(success){
            props.history.push(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2> Info spedizione</h2>
                                <p>
                                    <strong>Nome: </strong> {cart.shippingAddress.fullName}<br />
                                    <strong>Indirizzo: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country}

                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2> Info pagamento</h2>
                                <p>
                                    <strong>Metodo: </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2> Prodotti ordinati</h2>
                                <ul>
                                    {
                                        cart.cartItems.map(item => (
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

                                                        {item.qty} x  <FormatPrice price={item.price} /> = <FormatPrice price={item.qty * item.price} />
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1 buy-section">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Riepilogo ordine</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Prodotti</div>
                                    <div><FormatPrice price={cart.itemsPrice}></FormatPrice>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Spedizione</div>
                                    <div><FormatPrice price={cart.shippingPrice}></FormatPrice>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tasse</div>
                                    <div><FormatPrice price={cart.taxPrice}></FormatPrice>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Totale ordine</strong>
                                    </div>
                                    <div><FormatPrice price={cart.totalPrice}></FormatPrice>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Invia ordine
                                    </button>
                            </li>
                            {
                                loading && <LoadingBox></LoadingBox>
                            }
                            {
                                error && <MessageBox variant="danger">{error};</MessageBox>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
