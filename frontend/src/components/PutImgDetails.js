import React from 'react';
import { Link } from 'react-router-dom';

export default function PutImgDetails(props) {
    if (props != null) {
        return (
            <Link to={`/product/${props.id}`}><img src={props.printImg} className="small-img" alt="pic"></img> </Link>
        );
    }
}