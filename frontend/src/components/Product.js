import React from 'react';
import Rating from './Rating';
import FormatPrice from '../utilities/FormatPrice';
import { Link } from 'react-router-dom';
import { HOME_SCREEN, PRODUCT_SCREEN, SEARCH_SCREEN, SELLER_SCREEN } from '../constants/classNameConstants';

export default function Product(props) {
  const { product } = props;
  let checkUrl = props.url;
  //console.log(checkUrl)
  /*
      if(props.productScreen!=null){
        console.log("dentro")
        checkUrl='ProductScreen';
      }
      else{
        console.log('fuori')
        checkUrl='HomeScreen';
      }
      */
  return (
    <div key={product._id} className={
      (checkUrl === HOME_SCREEN || checkUrl === SELLER_SCREEN || checkUrl===SEARCH_SCREEN) ? "card"
        : checkUrl === PRODUCT_SCREEN ? "card-related"
          : null
    }>
      <Link to={`/product/${product._id}`}>
        <img className={
          (checkUrl === HOME_SCREEN || checkUrl === SELLER_SCREEN || checkUrl===SEARCH_SCREEN) ? "medium"
            : checkUrl === PRODUCT_SCREEN ? "medium-related"
              : null
        }
          src={product.mainImage}
          alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
          url={props.url}
        ></Rating>
        <div className="row">
          <div className="price">
            <FormatPrice price={product.price} ></FormatPrice>
            </div>
            <div>
              <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}