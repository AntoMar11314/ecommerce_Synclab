import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import Product from '../components/Product';
import { HOME_SCREEN, SEARCH_SCREEN } from '../constants/classNameConstants';
import { prices, ratings } from '../utilities/utils';
import Rating from '../components/Rating';

export default function SearchScreen(props) {
    const {
        name = 'all',
        category = 'all',
        min = 0,
        max = 0,
        rating = 0,
        order= 'newest'
    } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCategoryList = useSelector(state => state.productCategoryList);
    const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;

    useEffect(() => {
        dispatch(listProducts({
            name: name !== 'all' ? name : '',
            category: category !== 'all' ? category : '',
            min, max, rating, order
        }))
    }, [dispatch, name, category, min, max, rating,order])

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;

        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`
    }
    return (
        <div>
            <div className="row">
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            :
                            <div>
                                {products.length} Risultati
            </div>
                }
                <div>
                    Ordina per {' '}
                    <select value={order}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({ order: e.target.value }))
                        }}
                    >
                        <option value="newest">Nuovi arrivi</option>
                        <option value="lowest">Prezzo crescente</option>
                        <option value="highest">Prezzo decrescente</option>
                        <option value="toprated">Più votati</option>
                    </select>
                </div>
            </div>

            <div className="row top">
                <div className="col-1">
                    <h3>Categoria</h3>
                    <div>
                        {
                            loadingCategories ? <LoadingBox></LoadingBox>
                                :
                                errorCategories ? <MessageBox variant="danger">{errorCategories}</MessageBox>
                                    :
                                    (
                                        <ul>
                                            <li>
                                                <Link
                                                    className={'all' === category ? 'active' : ''}
                                                    to={getFilterUrl({ category: 'all' })}
                                                >
                                                    Qualsiasi
                                                    </Link>
                                            </li>
                                            {categories.map(c => (
                                                <li key={c}>
                                                    <Link
                                                        className={c === category ? 'active' : ''}
                                                        to={getFilterUrl({ category: c })}
                                                    >
                                                        {c}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )
                        }
                    </div>
                    <div>
                        <h3>Prezzo</h3>
                        <ul>
                            {prices.map(p => (
                                <li key={p.name}>
                                    <Link
                                        className={
                                            `${p.min}-${p.max}` === `${min}-${max}`
                                                ? 'active' : ''
                                        }
                                        to={getFilterUrl({ min: p.min, max: p.max })}>
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Media Recensioni</h3>
                        <ul>
                            {ratings.map(r => (
                                <li key={r.name}>
                                    <Link
                                        className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                        to={getFilterUrl({ rating: r.rating })}>
                                        <Rating
                                            url={SEARCH_SCREEN}
                                            caption={' & più'}
                                            rating={r.rating}
                                        ></Rating>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="col-3">
                    {
                        loading ? <LoadingBox></LoadingBox>
                            :
                            error ? <MessageBox variant="danger">{error}</MessageBox>
                                :
                                <>
                                    {products.length === 0 && <MessageBox>Nessun prodotto trovato</MessageBox>}
                                    <div className="row center">
                                        {
                                            products.map(product => (
                                                <Product key={product._id} product={product} url={SEARCH_SCREEN}></Product>
                                            ))
                                        }
                                    </div>
                                </>
                    }
                </div>
            </div>
        </div>
    )
}
