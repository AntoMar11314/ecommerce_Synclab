import React from 'react';
import { HOME_SCREEN, PRODUCT_SCREEN, RELATED_STARS } from '../constants/classNameConstants';

export default function Rating(props) {
    const { rating, numReviews } = props;
    let checkUrl= props.url;
    let max = 1;
    let min = 0.5;
    let arrayIcons = [];

    function faStar(){
        return (
            (checkUrl===PRODUCT_SCREEN || checkUrl===HOME_SCREEN)
            ? "fa fa-star"
            : (checkUrl===RELATED_STARS) 
            ? "fa fa-star related-stars" 
            : null
        )
    }

    function faStarHalf(){
        return (
            (checkUrl===PRODUCT_SCREEN || checkUrl===HOME_SCREEN)
            ? "fa fa-star-half-o"
            : (checkUrl===RELATED_STARS) 
            ? "fa fa-star-half-o related-stars" 
            : null
        )
    }

    function faStarO(){
        return (
            (checkUrl===PRODUCT_SCREEN || checkUrl===HOME_SCREEN)
            ? "fa fa-star-o"
            : (checkUrl===RELATED_STARS) 
            ? "fa fa-star-o related-stars" 
            : null
        )
    }
   
    function icons() {
        for (let i = 0; i < 5; i++) {
            arrayIcons.push(<span><i className={
                rating >= max ? faStar()
                    : rating >= min
                        ? faStarHalf()
                        : faStarO()
            }></i></span>
            )
            max++;
            min++;
        }

        return arrayIcons;
    }

    return (
        <div className="rating">
            {icons()}
            <span>
                {numReviews + ' recensioni'}
            </span>
        </div>
    )
}