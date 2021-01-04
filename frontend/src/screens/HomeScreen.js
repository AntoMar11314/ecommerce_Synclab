import React, { useEffect } from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from "../components/Product";
import MessageBox from "../components/shared/MessageBox";
import LoadingBox from "../components/shared/LoadingBox";
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from "../actions/productActions";
import { HOME_SCREEN } from "../constants/classNameConstants";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const userTopSellerList = useSelector(state => state.userTopSellerList);
    const { loading: loadingSellers, error: errorSellers, users: sellers } = userTopSellerList;

    useEffect(() => {
        dispatch(listProducts({}));
        dispatch(listTopSellers())
    }, [dispatch])
    return (
        <div>
            <h2>Top Venditori</h2>
            {loadingSellers ? <LoadingBox></LoadingBox>
                :
                errorSellers ? <MessageBox variant="danger">{errorSellers}</MessageBox>
                    :
                    (
                        <>
                            {sellers.length === 0 && <MessageBox>Nessun venditore trovato</MessageBox>}
                            <Carousel showArrows autoPlay showThumbs={false}>
                                {sellers.map((seller)=>(
                                    <div key={seller._id}>
                                        <Link to={`/seller/${seller._id}`}>
                                            <img src={seller.seller.logo} alt={seller.seller.name}/>
                                            <p className="legend">{seller.seller.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </Carousel>
                        </>
                    )
            }

            <h2>Prodotti sponsorizzati</h2>
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        {products.length === 0 && <MessageBox>Nessun prodotto trovato</MessageBox>}
                        <div className="row center">
                            {
                                products.map(product => (
                                    <Product key={product._id} product={product} url={HOME_SCREEN}></Product>
                                ))
                            }
                        </div>
                    </>

            }

        </div>
    );
}