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
import { createReview, detailsProduct } from '../actions/productActions';
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";
import { PRODUCT_SCREEN, RELATED_STARS } from '../constants/classNameConstants';
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate
    } = productReviewCreate;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Recensione inviata correttamente');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
        }
        dispatch(detailsProduct(productId), listProducts({}));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(createReview(productId, { rating, comment, name: userInfo.name }))
        } else {
            alert('Per favore inserisci un commento e una valutazione')
        }
    }


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
                                                Venditore <h2>
                                                    <Link to={`/seller/${product.seller._id}`}>
                                                        {product.seller.seller.name}
                                                    </Link>
                                                </h2>
                                                <Rating rating={product.seller.seller.rating}
                                                    numReviews={product.seller.seller.numReviews}
                                                    url={PRODUCT_SCREEN}></Rating>
                                            </li>
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
                                                    <Product key={prod._id} product={prod} url={PRODUCT_SCREEN} />
                                                    : null
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                           

                            <div className="top">
                                    <h2 id="reviews">
                                        Recensioni
                                    </h2>
                                    {product.reviews.length === 0 &&
                                        (<MessageBox>Non ci sono recensioni</MessageBox>)}
                                    <ul>
                                        {product.reviews.map(review => (
                                            <li key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating url={PRODUCT_SCREEN} rating={review.rating} caption=" "></Rating>
                                                <p>
                                                    {review.createdAt.substring(0, 10)}
                                                </p>
                                                <p>
                                                    {review.comment}
                                                </p>
                                            </li>
                                        ))}
                                        <li>
                                            {userInfo ? (
                                                <form className="form" onSubmit={submitHandler}>
                                                    <div>
                                                        <h2>Scrivi una recensione</h2>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="rating">Valutazione</label>
                                                        <select id="rating" value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value="">Seleziona...</option>
                                                            <option value="1">1-Scarso</option>
                                                            <option value="2">2-Equo</option>
                                                            <option value="3">3-Buono</option>
                                                            <option value="4">4-Molto buono</option>
                                                            <option value="5">5-Eccellente</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="comment">Commento</label>
                                                        <textarea id="comment" value={comment}
                                                            onChange={(e) => setComment(e.target.value)}>

                                                        </textarea>
                                                    </div>
                                                    <div>
                                                        <label />
                                                        <button className="primary" type="submit">Invia</button>
                                                    </div>
                                                    <div>
                                                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                                        {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                                    </div>
                                                </form>
                                            ) : (
                                                    <MessageBox>
                                                        Per favore, <Link to="/signin">Accedi</Link> per scrivere una recensione
                                                    </MessageBox>
                                                )}
                                        </li>
                                    </ul>
                                </div>

                        </div>


                    )

            }

        </div>


    )
}
