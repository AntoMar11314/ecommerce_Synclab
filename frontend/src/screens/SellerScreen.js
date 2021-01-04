import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import MessageBox from '../components/shared/MessageBox';
import LoadingBox from '../components/shared/LoadingBox';
import { SELLER_SCREEN } from '../constants/classNameConstants';
import Product from '../components/Product';

export default function SellerScreen(props) {
    const sellerId = props.match.params.id;
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const productList = useSelector(state => state.productList);
    const { loading: loadingProducts, error: errorProducts, products } = productList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listProducts({ seller: sellerId }))
    }, [dispatch, sellerId])
    return (
        <div className="row top">
            <div className="col-1">
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            (
                                <ul className="card card-body">
                                    <li>
                                        <div className="row start">
                                            <div className="p-1">
                                                <img
                                                    className="small"
                                                    src={user.seller.logo} alt={user.seller.name}></img>
                                            </div>
                                            <div className="p-1"> 
                                                <h1>
                                                    {user.seller.name}
                                                </h1>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Rating rating={user.seller.rating} numReviews={user.seller.numReviews} url={SELLER_SCREEN}></Rating>
                                    </li>
                                    <li>
                                        <a href={`mailto:${user.email}`}>Contatta venditore</a>
                                    </li>
                                    <li>
                                        {user.seller.description}
                                    </li>
                                </ul>
                            )
                }
            </div>
            <div className="col-3">
                {
                    loadingProducts ? <LoadingBox></LoadingBox>
                        :
                        errorProducts ? <MessageBox variant="danger">{errorProducts}</MessageBox>
                            :
                            (
                                <>
                                    {products.length === 0 && (<MessageBox>Nessuno prodotto trovato</MessageBox>)}
                                    <div className="row center">
                                        {
                                            products.map(product => (
                                                <Product key={product._id} product={product} url={SELLER_SCREEN}></Product>
                                            ))
                                        }
                                    </div>
                                </>
                            )
                }
            </div>
        </div>
    )
}
