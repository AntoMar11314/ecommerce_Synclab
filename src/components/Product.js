import React from 'react';
import Rating from './Rating';
import FormatPrice from '../utilities/FormatPrice';

export default function Product(props) {
  const { product } = props;
  return (
   
    <div key={product._id} className="card">
      <a href={`/product/${product.id}`}>
        <img className="medium"
          src={product.mainImage}
          alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product.id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">
          <FormatPrice price={product.price} ></FormatPrice>
          </div>
      </div>
    </div>
  )
}