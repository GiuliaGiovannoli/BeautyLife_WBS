import React, { Fragment, useEffect } from 'react'
import { Col, Container, ListGroup, Row, Table } from 'react-bootstrap'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import * as orderActions from '../../../redux/order/order.Actions'
import * as orderReducer from '../../../redux/order/order.Reducer'
import * as userReducer from '../../../redux/users/user.Reducer'

import { useDispatch, useSelector } from 'react-redux';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const OrderList = () => {
    const dispatch = useDispatch();
    // get Orders Info from Redux Store
    const orderInfo = useSelector((state) => {
        return state[orderReducer.orderFeatureKey];
    });

    let { orders, loading } = orderInfo;


    const userInfo = useSelector((state) => {
        return state[userReducer.usersFeaturesKey]
    })

    let { user } = userInfo

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, []);
    return (
        <Fragment>
            <section>
                <Container>
                    <Row>
                        <Col style={{ margin: "30px" }}>
                            <h3> <PlaylistAddCheckIcon fontSize="large" /> Order List</h3>
                        </Col>
                    </Row>
                </Container>
            </section>


            {
                loading ? <CheckCircleOutlineIcon /> :
                    <Fragment>


                        {
                            orders && orders.length > 0 ? <React.Fragment>
                                <Container style={{ marginTop: '15px' }} >
                                    <Row>
                                        <Col>
                                            <Table hover striped style={{ marginBottom: "2%", border: '5px solid #f8f1f1' }}>
                                                <thead style={{ backgroundColor: '#f8f1f1' }}>
                                                    <tr>
                                                        <th>Order</th>
                                                        <th>NAME</th>
                                                        <th>EMAIL</th>
                                                        <th>MOBILE</th>
                                                        <th>ITEMS</th>
                                                        <th>TOTAL</th>
                                                        <th>DATE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orders.length > 0 && Object.keys(user).length > 0 ? <React.Fragment>
                                                            {
                                                                orders.map(order => {
                                                                    return (
                                                                        <tr key={order._id}>
                                                                            <td>{order._id.substr(order._id.length - 5)}</td>
                                                                            <td>{user.firstName} {user.lastName}</td>
                                                                            <td> {user.email}</td>
                                                                            <td>{user.address.mobile}</td>
                                                                            <td>
                                                                                <ListGroup>


                                                                                    {
                                                                                        order.items.map(item => {
                                                                                            return (

                                                                                                <ListGroup.Item className="list-group-item">
                                                                                                    NAME : {item.name} {" "}
                                                                                                        Qty : {item.qty} {" "}
                                                                                                        Price : {item.price} {" "}
                                                                                                </ListGroup.Item>

                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </ListGroup>
                                                                            </td>
                                                                            <td>€   {(Number(order.total) + Number(order.tax)).toFixed(2)}</td>
                                                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </React.Fragment> : null
                                                    }
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Container>
                            </React.Fragment> :
                                <React.Fragment>
                                    <h3 >  No orders found </h3>
                                </React.Fragment>
                        }

                    </Fragment>
            }

        </Fragment>
    )
}

export default OrderList
