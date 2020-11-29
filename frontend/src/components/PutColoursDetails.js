import React from 'react';
import { Link } from 'react-router-dom';

export default function PutColoursDetails(props) {
    if (props != null) {
        return (
            <Link to={`/product/${props.id}`}><div className="div-align" style={{backgroundColor : props.colour , width: "3rem" , height:"3rem"} } ></div> </Link>
        );
    }
}