import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [model_code, setModel_Code] = useState('');
    const [price, setPrice] = useState('');
    const [mainImage, setMainImage] = useState('');
    //const [images, setMainImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [rating, setRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const [description, setDescription] = useState('');
    const [colour, setColour] = useState('');

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {

            props.history.push('/productlist')
        }
        if (!product || (product._id !== productId) || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setModel(product.model)
            setModel_Code(product.model_code)
            setPrice(product.price)
            setMainImage(product.mainImage)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setRating(product.rating)
            setNumReviews(product.numReviews)
            setDescription(product.description)
            setColour(product.colour)
        }
    }, [
        product, dispatch, productId, successUpdate, props.history
    ]
    );

    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch update product
        dispatch(updateProduct({
            _id: productId,
            name,
            model,
            model_code,
            price,
            mainImage,
            category,
            brand,
            countInStock,
            rating,
            numReviews,
            description,
            colour

        }))
    }
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file)
        setLoadingUpload(true)
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            setMainImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message)
            setLoadingUpload(false);
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Modifica prodotto {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <>
                                <div>
                                    <label htmlFor="name">Nome</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Inserisci nome"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="model">Modello</label>
                                    <input
                                        id="model"
                                        type="text"
                                        placeholder="Inserisci modello"
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="model_code">Sigla Modello</label>
                                    <input
                                        id="model_code"
                                        type="text"
                                        placeholder="Inserisci sigla modello"
                                        value={model_code}
                                        onChange={(e) => setModel_Code(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="price">Prezzo</label>
                                    <input
                                        id="price"
                                        type="text"
                                        placeholder="Inserisci prezzo"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="mainImage">Immagine principale</label>
                                    <input
                                        id="mainImage"
                                        type="text"
                                        placeholder="Inserisci img principale"
                                        value={mainImage}
                                        onChange={(e) => setMainImage(e.target.value)}
                                    ></input>

                                </div>
                                <div>
                                    <label htmlFor="imageFile">File img</label>
                                    <input
                                        type="file"
                                        id="imageFile"
                                        label="Scegli immagine"
                                        onChange={uploadFileHandler}
                                    ></input>
                                    {loadingUpload && <LoadingBox></LoadingBox>}
                                    {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                </div>
                                <div>
                                    <label htmlFor="category">Categoria</label>
                                    <input
                                        id="category"
                                        type="text"
                                        placeholder="Inserisci categoria"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="countInStock">Prodotti in magazzino</label>
                                    <input
                                        id="countInStock"
                                        type="text"
                                        placeholder="Inserisci countInStock"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                        id="brand"
                                        type="text"
                                        placeholder="Inserisci brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="rating">Recensione</label>
                                    <input
                                        id="rating"
                                        type="text"
                                        placeholder="Inserisci recensione"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="numReviews">Numero recensioni</label>
                                    <input
                                        id="numReviews"
                                        type="text"
                                        placeholder="Inserisci num recensioni"
                                        value={numReviews}
                                        onChange={(e) => setNumReviews(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="description">Descrizione</label>
                                    <input
                                        id="description"
                                        rows="3"
                                        type="text"
                                        placeholder="Inserisci descrizione"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="colour">Colore</label>
                                    <input
                                        id="colour"
                                        type="text"
                                        placeholder="Inserisci colore"
                                        value={colour}
                                        onChange={(e) => setColour(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">
                                        Modifica
                    </button>
                                </div>
                            </>
                }
            </form>
        </div>
    )
}
