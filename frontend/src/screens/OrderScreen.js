import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import FormatPrice from '../utilities/FormatPrice';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }
        if (!order || successPay || successDeliver
            || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(detailsOrder(orderId))
        }
        else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                }
                else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        //dispatch pay order
        dispatch(payOrder(order, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    }

    return loading ? (<LoadingBox></LoadingBox>)
        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
                <div>
                    <h1>Ordine {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2> Info spedizione</h2>
                                        <p>
                                            <strong>Nome: </strong> {order.shippingAddress.fullName}<br />
                                            <strong>Indirizzo: </strong> {order.shippingAddress.address},
                                    {order.shippingAddress.city},{order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                        </p>
                                        {
                                            order.isDelivered ?
                                                <MessageBox variant="success">Consegnato a {order.deliveredAt}</MessageBox>
                                                :
                                                <MessageBox variant="danger" >Non consegnato</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2> Info pagamento</h2>
                                        <p>
                                            <strong>Metodo: </strong> {order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid ?
                                                <MessageBox variant="success">Pagato a {order.paidAt}</MessageBox>
                                                :
                                                <MessageBox variant="danger" >Non pagato</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2> Prodotti ordinati</h2>
                                        <ul>
                                            {
                                                order.orderItems.map(item => (
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
                                            <div><FormatPrice price={order.itemsPrice}></FormatPrice>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Spedizione</div>
                                            <div><FormatPrice price={order.shippingPrice}></FormatPrice>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tasse</div>
                                            <div><FormatPrice price={order.taxPrice}></FormatPrice>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>
                                                <strong>Totale ordine</strong>
                                            </div>
                                            <div><FormatPrice price={order.totalPrice}></FormatPrice>
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>)
                                                    : (
                                                        <>
                                                            {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                            {loadingPay && <LoadingBox></LoadingBox>}
                                                            <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )
                                    }
                                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                            <button type="button"
                                                className="primary block"
                                                onClick={deliverHandler}
                                            >
                                                Consegna ordine
                                                 </button>
                                        </li>
                                    )}

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}
