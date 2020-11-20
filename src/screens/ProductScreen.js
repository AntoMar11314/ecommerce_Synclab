import React from "react";
import data from '../data';
import Rating from '../components/Rating';
import { Link } from "react-router-dom";
import FormatPrice from '../utilities/FormatPrice';
import c from '../utilities/changeImgsrc';


export default class ProductScreen extends React.Component {

    render() {
        const {datas, match: {params}} = this.props;
       //console.log(JSON.stringify(data[0].price) + " ueue12")
console.log(this.props.match.params.id + " SONO NEL PRODUCTSCREEN")
    const product = datas.find((x) => x.id == this.props.match.params.id);
    if (!product) {
        return <div>Il prodotto non esiste</div>
    }
    return (
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
                                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                            </li>
                        </div>
                        <li>
                            Prezzo : <FormatPrice price={product.price}></FormatPrice>
                        </li>
                        <li>
                            Descrizione
                                <p>{product.desription}</p>
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
                                                <span className="error"> Non disponibile</span>
                                            )}
                                    </div>

                                </div>
                            </li>
                            <li>
                                <button className="primary block">Aggiungi al Carrello</button>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

}