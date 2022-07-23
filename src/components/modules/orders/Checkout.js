import React, { Fragment, useContext } from 'react'
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CartContext } from "../../../context/CartContext"
import * as userReducer from '../../../redux/users/user.Reducer'
import StripeCheckout from 'react-stripe-checkout';
import * as orderReducer from '../../../redux/order/order.Reducer'
import * as orderActions from '../../../redux/order/order.Actions'

const Checkout = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    /// fetch from userReducer
    const userInfo = useSelector(state => state[userReducer.usersFeaturesKey])
    let { loading, user } = userInfo;
    /// fetch from useContext
    const [cartItems, setCartItems] = useContext(CartContext);

    /// calculations
    let calcTotal = () => {
        let total = 0;
        for (let cartItem of cartItems) {
            total += (cartItem.product_price * cartItem.quantity)
        }
        return total;
    };
    let calcTax = () => {
        let tax = 19;
        return calcTotal() * tax / 100;
    };


    let calcGrandTotal = () => {
        return calcTotal() + calcTax();
    };


    let clickPayment = (token) => {
        let items = cartItems.map(item => {
            return {
                // _id: item._id,
                name: item.product_name,
                price: item.product_price,
                qty: item.quantity
            }
        });
        let order = {
            items: items,
            tax: calcTax(),
            total: calcTotal()
        }

        let product = {
            price: Number(calcGrandTotal()) * 100,
            name: 'Product from BeautyLife'
        }
        let body = {
            token, product
        }
        dispatch(orderActions.makeStripePayment(body, history, order))

        setCartItems([])
    }
    return (

        <Fragment>

            {
                Object.keys(user).length > 0 &&
                <section style={{
                    marginTop: "30px"

                }}>
                    <Container>
                        <Row>
                            <Col md={8}>
                                <Card style={{ border: '1px solid #f8f1f1' }}>
                                    <Card.Header style={{ backgroundColor: '#f8f1f1' }}>
                                        <Row>
                                            <Col><h4>Address</h4></Col>
                                            <Col></Col>
                                            <Button
                                                style={{ backgroundColor: '#2b4f60', border: 'none' }}
                                                onClick={() => {
                                                    history.push('/BeautyLife_WBS/beauty/life/users/user/profile')
                                                }}
                                            >Update Address</Button>
                                        </Row>

                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup style={{ padding: 0 }}>
                                            <ListGroup.Item style={{ border: 'none' }}>
                                                <small>Flat : {user?.address.flat}</small><br />
                                                <small>Street : {user?.address.street}</small><br />
                                                <small>Landmark : {user?.address.landmark}</small><br />
                                                <small>City : {user?.address.city}</small><br />
                                                <small>State : {user?.address.state}</small><br />
                                                <small>Country : {user?.address.country}</small><br />
                                                <small>PinCode : {user?.address.pin}</small><br />
                                                <small>Mobile : {user?.address.mobile}</small><br />
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card >
                                <Card style={{ marginTop: '15px', border: '1px solid #f8f1f1' }}>
                                    <Card.Header style={{ backgroundColor: '#f8f1f1' }}>
                                        <h4>Payment Details</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>


                                            <fieldset>
                                                <Form.Group as={Row}>

                                                    <Col >
                                                        <Form.Check
                                                            type="radio"
                                                            label="Cash On Delivery"
                                                            name="exampleRadios"
                                                            id="formHorizontalRadios1"
                                                            value="option1"
                                                        />
                                                        <Form.Check
                                                            type="radio"
                                                            label="Credit Card Payment"
                                                            name="exampleRadios"
                                                            id="formHorizontalRadios2"
                                                            value="option2"
                                                            defaultChecked
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </fieldset>

                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col >
                            <Col md={4}>
                                <Card style={{ marginTop: '15px', border: '1px solid #f8f1f1' }}
                                >
                                    <Card.Header style={{ backgroundColor: '#f8f1f1' }}>
                                        <h4>Your Cart</h4>
                                    </Card.Header>
                                    <Card.Body style={{ padding: 0 }}>


                                        {
                                            cartItems.length > 0 &&
                                            <ListGroup>
                                                {
                                                    cartItems.map((cartItem) => {
                                                        return (
                                                            <ListGroup.Item style={{ border: 'none' }}>
                                                                <Row>
                                                                    <Col md={4} >

                                                                        <img src={`${process.env.REACT_APP_PROD_URL}/${cartItem.product_image}`} alt="" className="img-fluid" />
                                                                    </Col>
                                                                    <Col md={8} >
                                                                        <small>{cartItem.product_name}</small><br />
                                                                        <small>{cartItem.product_price}</small><br />
                                                                        <small>Qty : {cartItem.quantity}</small><br />
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        )
                                                    })
                                                }

                                            </ListGroup>
                                        }



                                        {/* {
                                            cartItems.length > 0 &&
                                            <ul className="list-group">
                                                {
                                                    cartItems.map((cartItem) => {
                                                        return (
                                                            <li key={cartItem._id} className="list-group-item">
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-2">
                                                                        <img src={cartItem.image} alt="" className="img-fluid" />
                                                                    </div>
                                                                    <div className="col-md-8">
                                                                        <small>{cartItem.product_name}</small><br />
                                                                        <small>&#8377; {cartItem.product_price}</small><br />
                                                                        <small>Qty : {cartItem.quantity}</small><br />
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        } */}


                                        <ListGroup style={{ marginTop: '15px' }} >
                                            <ListGroup.Item style={{ border: 'none' }}>
                                                Total : <span className="font-weight-bold">{calcTotal().toFixed(2)} €</span>

                                            </ListGroup.Item>
                                            <ListGroup.Item style={{ border: 'none' }}>
                                                Tax 19% :<span className="font-weight-bold">{calcTax().toFixed(2)} €</span>

                                            </ListGroup.Item>
                                            <ListGroup.Item style={{ border: 'none' }}>
                                                Grand Total : <span className="font-weight-bold">{calcGrandTotal().toFixed(2)} €</span>

                                            </ListGroup.Item>
                                        </ListGroup>
                                        <StripeCheckout token={clickPayment}
                                            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
                                            name="Stripe Payment"
                                            amount={calcGrandTotal() * 100}
                                            description="Payments with Stripe"
                                            currency="USD"
                                        >
                                            <Button variant="danger" style={{ width: '90%', margin: '15px 5% 15px 5%', backgroundColor: '#2b4f60', border: 'none' }} className={"btn-block"}>Pay Now {calcGrandTotal().toFixed(2)}</Button>
                                        </StripeCheckout>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            }

        </Fragment>
    )
}

export default Checkout
