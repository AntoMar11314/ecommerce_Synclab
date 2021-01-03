import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS } from '../constants/productConstants';
import FormatPrice from '../utilities/FormatPrice';

export default function ProductListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >=0;
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete } = productDelete;
    const userSignin = useSelector ( state => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts({seller: sellerMode ? userInfo._id : ''}));
    }, [dispatch, createdProduct, props.history, successCreate , successDelete]);

    
    const deleteHandler = (product) => {
        if(window.confirm('Sei sicuro di voler eliminare questo prodotto?')){
            //dispatch delete action
            dispatch(deleteProduct(product._id))
        }
        
    }

    const createHandler = () => {
        dispatch(createProduct());
    }
    return (
        <div>
            <div className="row">
                <h1>Prodotti</h1>
                <button type="button"
                    className="primary"
                    onClick={createHandler}
                >
                    Crea Prodotto
            </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>MODELLO</th>
                                <th>SIGLA MODELLO</th>
                                <th>CATEGORIA</th>
                                <th>PREZZO</th>
                                <th>BRAND</th>
                                <th>AZIONI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.model}</td>
                                    <td>{product.model_code}</td>
                                    <td>{product.category}</td>
                                    <td><FormatPrice price={product.price}></FormatPrice></td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <button type="button" className="small"
                                            onClick={() =>
                                                props.history.push(`/product/${product._id}/edit`)
                                            }
                                        >
                                            Modifica
                                    </button>
                                        <button
                                            type="button"
                                            className="small"
                                            onClick={() => deleteHandler(product)}
                                        >
                                            Elimina</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </div>
    )
}
