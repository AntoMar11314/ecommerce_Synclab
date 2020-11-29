import React, { useEffect, useState } from "react";
import Rating from '../components/Rating';
import { Link } from "react-router-dom";
import FormatPrice from '../utilities/FormatPrice';
import c from '../utilities/changeImgsrc';
import PutImgDetails from "../components/PutImgDetails";
import PutColoursDetails from "../components/PutColoursDetails";
import BarsforStars from "../components/BarsforStars";
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from "../components/shared/LoadingBox";
import MessageBox from "../components/shared/MessageBox";
import { detailsProduct } from '../actions/productActions';
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import {PRODUCT_SCREEN, RELATED_STARS} from '../constants/classNameConstants';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const productList = useSelector(state => state.productList);
   const {products} = productList;

    useEffect(() => {
        dispatch(detailsProduct(productId), listProducts());
    }, [dispatch, productId]);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    //console.log(JSON.stringify(products) + " GUARDA QUI")
    let siblingProducts = false;
    const check = products.find(x => (x._id == productId));
    if (!productDetails.loading && check != null) {
        const app = products.some(prod => (
            prod.model == productDetails.product.model && prod.model_code != productDetails.product.model_code
        ))
        siblingProducts = app;
    }

    return (

        <div>
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    : (
                        <div>
                            <Link to="/">Torna indietro</Link>
                            <div className="row top">
                                <div className="col-2">
                                    <div className="productImages">
                                        <div className="div-img-small">
                                            {
                                                product.images.map(img => {
                                                    return (
                                                        <img src={img} className="small-img" onClick={c} alt="photo" />
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="div-main-img">
                                            <img className="mainImg" src={product.mainImage} alt={product.name} id="big-img"></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1 info">
                                    <ul>
                                        <div className="title-reviews">
                                            <li>
                                                <h1 className="productTitle">{product.name}</h1>
                                            </li>
                                            <li>
                                                <Rating rating={product.rating} numReviews={product.numReviews} url={PRODUCT_SCREEN}></Rating>
                                            </li>
                                        </div>


                                        {
                                            siblingProducts ?
                                                <li>
                                                    <span className="font-bold">Prodotti simili: </span>
                                                    <br></br>
                                                    {
                                                        products.map(prod => (
                                                            (prod.model == product.model && prod.model_code != product.model_code) ?
                                                                <PutImgDetails key={prod._id} id={prod._id} printImg={prod.mainImage}></PutImgDetails>
                                                                : null
                                                        ))
                                                    }
                                                </li>
                                                : null
                                        }

                                        <li className="container-container-c">
                                            <div className="container-container">
                                                <span className="font-bold">Colore: </span>
                                                <div className="container-colours">
                                                    {
                                                        products.map(prod => (
                                                            (prod.model == product.model && prod.model_code == product.model_code) ?
                                                                <PutColoursDetails key={prod._id} id={prod._id} colour={prod.colour}></PutColoursDetails>
                                                                : null
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        <br />
                                        <br />
                                        <br />
                                        <li>
                                            <div className="font-bold">Prezzo :</div>  <FormatPrice price={product.price}></FormatPrice>
                                        </li>

                                        <li>
                                            <div>
                                                <p className="font-bold">Descrizione</p>
                                                <p className="font-light">{product.description}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1 buy-section">
                                    <div className="card card-body" id="buy-card">
                                        <ul>
                                            <li>
                                                <div>
                                                    <div className="price-font">Prezzo:  <FormatPrice price={product.price} /></div>
                                                    <div className="state-font">Stato:
                                        {product.countInStock > 0 ? (
                                                            <span className="success"> Disponibile</span>
                                                        ) : (
                                                                <span className="danger"> Non disponibile</span>
                                                            )}
                                                    </div>

                                                </div>
                                            </li>
                                            {
                                                product.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div>
                                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                                        {
                                                                            [...Array(product.countInStock).keys()].map(x => (
                                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>

                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button onClick={addToCartHandler} className="primary block">Aggiungi al Carrello</button>
                                                        </li>
                                                    </>

                                                )
                                            }

                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="related-span">
                                <span className="font-bold ">Altri prodotti consigliati</span>
                                <div className="row top" id="containerRelatedProducts">
                                    <div className="row center">

                                        {
                                            products.map(prod => (
                                                (prod.category == product.category && prod.brand == product.brand
                                                    && prod.model_code != product.model_code && prod.model != product.model) ?
                                                    <Product key={prod._id} product={prod} url={PRODUCT_SCREEN}/>
                                                    : null
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="row top container-ratings">
                                <div id="rating-stars-container">
                                    {console.log(product)}
                                    <Rating rating={product.rating}
                                        numReviews={product.numReviews} url={RELATED_STARS}/>
                                    <BarsforStars></BarsforStars>
                                </div>

                                <div id="container-reviews"></div>
                            </div>
                        </div>


                    )

            }

        </div>


    )
}
