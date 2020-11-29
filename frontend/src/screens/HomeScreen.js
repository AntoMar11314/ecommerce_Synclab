import React, { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "../components/shared/MessageBox";
import LoadingBox from "../components/shared/LoadingBox";
import {useSelector , useDispatch} from 'react-redux'; 
import { listProducts } from "../actions/productActions";
import { HOME_SCREEN } from "../constants/classNameConstants";

export default function HomeScreen() {
   const dispatch = useDispatch();
   const productList = useSelector(state => state.productList);
   const {loading, error, products} = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [])
    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <div className="row center">
                        {
                            products.map(product => (
                                <Product key={product._id} product={product} url={HOME_SCREEN}></Product>
                            ))
                        }
                    </div>
            }

        </div>
    );
}