import React , {useEffect} from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/shared/LoadingBox';
import MessageBox from '../components/shared/MessageBox';
import FormatPrice from '../utilities/FormatPrice';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(listOrderMine());
    }, [dispatch])
    return (
        <div>
            <h1>Cronologia ordini</h1>
            {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                        <table className="table">
                            <thead>
                                <th>ID</th>
                                <th>DATA</th>
                                <th>TOTALE</th>
                                <th>PAGATO</th>
                                <th>CONSEGNATO</th>
                                <th>AZIONI</th>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} >
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td><FormatPrice price={order.totalPrice}></FormatPrice></td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            <button type="button" className="small"
                                                onClick={() => { props.history.push(`/order/${order._id}`) }}
                                            >
                                                Dettagli
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    )
            }
        </div>
    )
}
