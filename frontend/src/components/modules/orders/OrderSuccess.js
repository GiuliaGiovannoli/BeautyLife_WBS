import React, { Fragment } from 'react'
import { Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as orderReducer from '../../../redux/order/order.Reducer'
import * as userReducer from '../../../redux/users/user.Reducer'

const OrderSuccess = () => {

    const orderInfo = useSelector((state) => {
        return state[orderReducer.orderFeatureKey]
    })


    let { order, loading } = orderInfo


    const userInfo = useSelector((state) => {
        return state[userReducer.usersFeaturesKey]
    })

    let { user } = userInfo
    // calc Grand Total
    const calculateGrandTotal = () => {
        let total = 0
        if (order.items?.length > 0) {
            for (let item of order.items) {
                total += Number(item.qty) * Number(item.price)
            }
            return (total + Number(order.tax))
        }
    }
    let takePrint = (e) => {
        e.preventDefault();
        return window.print();
    };

    return (

        <Fragment>
            <section>
                <Container>
                    <Row>
                        <Col style={{ margin: "30px" }}>
                            <h3>
                                <CheckCircleOutlineIcon fontSize="large" />
                                Order Success</h3>
                        </Col>
                    </Row>
                </Container>
            </section>

            {
                loading ? <CheckCircleOutlineIcon /> :
                    <Fragment>

                        <section >
                            {
                                Object.keys(order).length > 0 && Object.keys(user).length > 0 ?
                                    <Fragment>
                                        <Container>
                                            <Row>
                                                <Col md={10} style={{ marginTop: 'auto' }} >
                                                    <Card>
                                                        <Card.Header style={{ backgroundColor: '#f8f1f1' }}>
                                                            <h3>Order Summary</h3>

                                                        </Card.Header>
                                                        <Card.Body>
                                                            <ListGroup>
                                                                <ListGroup.Item>
                                                                    Order ID :  {order._id}
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                    NAME :  {user.firstName}   {user.lastName}
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                    Email :  {user.email}
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                    Mobile :  {user.address.mobile}
                                                                </ListGroup.Item>
                                                                <ListGroup.Item>
                                                                    DATE : {new Date(order.createdAt).toLocaleDateString()}
                                                                </ListGroup.Item>
                                                            </ListGroup>
                                                            <Table striped hover >
                                                                <thead>
                                                                    <tr>
                                                                        <th>Number</th>
                                                                        <th>Item Name</th>
                                                                        <th>Item Quantity</th>
                                                                        <th>Item Price</th>
                                                                        <th>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        order.items.length > 0 ?
                                                                            <Fragment>

                                                                                {
                                                                                    order.items.map((item, index) => {
                                                                                        return (
                                                                                            // <tr key={item._id}>
                                                                                            //     <td>{index + 1}</td>
                                                                                            //     <td>{item.name}</td>
                                                                                            //     <td>{item.qty}</td>
                                                                                            //     <td>{item.price}</td>
                                                                                            //     <td>{(item.price * item.qty).toFixed(2)}</td>
                                                                                            // </tr>
                                                                                            <tr key={item._id}>
                                                                                                <td>{index + 1}</td>
                                                                                                <td>{item.name}</td>
                                                                                                <td>{item.qty}</td>
                                                                                                <td>{item.price}</td>
                                                                                                <td>{(item.price * item.qty).toFixed(2)}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    })
                                                                                }

                                                                            </Fragment> : null
                                                                    }



                                                                    {
                                                                        Object.keys(order).length > 0 &&

                                                                        <tr>
                                                                            <td colSpan="4" />
                                                                            <td>
                                                                                TAX <span>{Number(order.tax)}</span>
                                                                            </td>
                                                                        </tr>
                                                                    }

                                                                    <tr>
                                                                        <td colSpan="4" />
                                                                        <td>Grand Total :
                                            <span className="text-primary">{calculateGrandTotal()}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>

                                                            </Table>
                                                            <h5>NOTE : Your shipment will be delivered within 3 business days</h5>
                                                            <Button variant="danger" style={{ width: '90%', margin: '15px 5% 15px 5%', backgroundColor: '#2b4f60', border: 'none' }} onClick={takePrint}>Print Doc</Button>
                                                            <Link to="/">
                                                                <Button variant="danger" style={{ width: '90%', margin: '15px 5% 15px 5%', backgroundColor: '#2b4f60', border: 'none' }}>Done</Button>

                                                            </Link>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Fragment> :
                                    <React.Fragment>
                                        <h3 >Please select some items</h3>
                                    </React.Fragment>
                            }



                        </section>
                    </Fragment>
            }

        </Fragment>
    )
}

export default OrderSuccess
