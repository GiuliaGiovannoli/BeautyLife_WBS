import React, { Fragment, useEffect, useState } from 'react'

import { Button, Card, Col, Container, Form, FormControl, InputGroup, ListGroup, Row } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

import { useDispatch, useSelector } from 'react-redux'
import * as userActions from "../../../redux/users/user.Actions"
import * as userReducer from "../../../redux/users/user.Reducer"
import { useHistory } from 'react-router'


const UserProfile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [enableAddress, setenableAddress] = useState(false)
    const [address, setAddress] = useState({
        flat: ' ',
        street: ' ',
        landmark: ' ',
        city: ' ',
        state: ' ',
        country: ' ',
        pin: ' ',
        mobile: ' '
    });


    // Get User Info from the REDUX Store
    const userInfo = useSelector(state => state[userReducer.usersFeaturesKey])

    let { loading, user } = userInfo


    useEffect(() => {
        setAddress({
            flat: user && user.address ? user.address.flat : '',
            street: user && user.address ? user.address.street : '',
            landmark: user && user.address ? user.address.landmark : '',
            city: user && user.address ? user.address.city : '',
            state: user && user.address ? user.address.state : '',
            country: user && user.address ? user.address.country : '',
            pin: user && user.address ? user.address.pin : '',
            mobile: user && user.address ? user.address.mobile : '',
        });
    }, [user]);
    const updateInputAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }


    const submitUpdateAddress = (e) => {
        e.preventDefault()

        dispatch(userActions.updateAddress(address))
        setenableAddress(false)
    }


    let handleLogout = () => {
        dispatch(userActions.logOutUser(history))

    }
    return (
        <Fragment>
            <section>
                <Container>
                    <Row>
                        <Col style={{ margin: "30px", display: 'flex', justifyContent: 'space-between' }}>

                            <Button id="clickable" style={{ backgroundColor: "#f8f1f1", color: "#2b4f60", border: "none" }} onClick={() => {
                                history.push('/orders/order-list')
                            }}>HISTORY ORDER </Button>
                            <Button id="clickable" style={{ backgroundColor: "#f8f1f1", color: "#2b4f60", border: "none" }} onClick={handleLogout}
                            >LOG OUT  </Button>

                        </Col>
                    </Row>
                </Container>
            </section>





            <Fragment>
                {
                    Object.keys(user).length > 0 &&
                    <section>
                        <Container >
                            <Row>
                                <Col md={3} >
                                    <img src={user.avatar} className="img-fluid rounded-circle profile-img" />
                                </Col>
                                <Col md={9} >
                                    <Card style={{ marginBottom: "2%", border: '1px solid #f8f1f1' }}>
                                        <Card.Header style={{ backgroundColor: '#f8f1f1' }} >
                                            <h4>INFO</h4>
                                        </Card.Header>
                                        <Card.Body className="bg-brown">
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    NAME * : <span className="font-weight-bold">{user.firstName} {user.lastName}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    EMAIL * : <span className="font-weight-bold">{user.email}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    MOBILE : <span className="font-weight-bold">{user.address.mobile}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>


                                </Col>
                            </Row>
                        </Container>
                        <Container>

                            <Card style={{ marginTop: '10px', border: '1px solid #f8f1f1' }} md={8}>
                                <Col style={{ padding: 0 }}>
                                    <Card.Header style={{ backgroundColor: '#f8f1f1' }} >
                                        <Row>
                                            <Col><h4>ADDRESS</h4></Col>
                                            <BootstrapSwitchButton onlabel='SAVE' offlabel='EDIT' style='w-50 mx-2' checked={false} onstyle="info" size="sm"
                                                onChange={(checked) => {
                                                    setenableAddress(checked)
                                                }}
                                            />
                                        </Row>
                                    </Card.Header>
                                    {
                                        user.address && !enableAddress &&
                                        <Card.Body>
                                            <ListGroup variant="flush">
                                                <ListGroup.Item>
                                                    Flat :
                                                    <span className="font-weight-bold">{user.address.flat}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Street :
                                                    <span className="font-weight-bold">{user.address.street}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Landmark :
                                                    <span className="font-weight-bold">{user.address.landmark}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    City :
                                                    <span className="font-weight-bold">{user.address.city}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    State :
                                                    <span className="font-weight-bold">{user.address.state}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Country :
                                                    <span className="font-weight-bold">{user.address.country}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    PinCode :
                                                    <span className="font-weight-bold">{user.address.pin}</span>
                                                </ListGroup.Item>
                                                <ListGroup.Item>
                                                    Mobile :
                                                    <span className="font-weight-bold">{user.address.mobile}</span>
                                                </ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                    }
                                    {
                                        user.address && enableAddress &&
                                        <Card.Body>
                                            <Form onSubmit={submitUpdateAddress}>
                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">FLAT</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="flat"
                                                        value={address.flat}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">STREET *</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="street"
                                                        value={address.street}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>


                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">LANDMARK</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="landmark"
                                                        value={address.landmark}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">CITY *</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="city"
                                                        value={address.city}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">STATE </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="state"
                                                        value={address.state}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">COUNTRY *</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="country"
                                                        value={address.country}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">POSTCODE *</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="pin"
                                                        value={address.pin}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <InputGroup className="mb-3" >
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">MOBILE</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <FormControl
                                                        name="mobile"
                                                        value={address.mobile}
                                                        onChange={updateInputAddress}
                                                    />
                                                </InputGroup>

                                                <Button variant="secondary"
                                                    type="submit"
                                                >UPDATE</Button>
                                            </Form>
                                        </Card.Body>
                                    }

                                </Col>
                            </Card>

                        </Container>
                    </section>
                }
            </Fragment>



        </Fragment>
    )
}

export default UserProfile

