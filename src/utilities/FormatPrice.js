import React from 'react';

export default function FormatPrice(props){
  const {price} =props;
     return (new Intl.NumberFormat("it-IT", {
         style: "currency",
         currency: "EUR",
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
     }).format(price)
     )
    
}
 