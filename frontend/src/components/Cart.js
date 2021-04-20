import React, { useEffect, useContext, useState, useRef } from 'react';
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom"
import { CartContext }from '../context/CartContext'

import './comp-styles.css';
import Class from '../img/class.jpg'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));


export default function Cart() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [cart, setCart] = useContext(CartContext);
  
  const [minQuantity, setMinQuantity] = useState(1)
  // const [quantity, setQuantity] = useState()

  const removeFromCart = (targetItem) => {
    const filteredCart= cart.filter((item) => { return item._id !== targetItem })
    setCart(filteredCart)
  }

  const increaseQuantity = (item) => {
    if(item.quantity_in_stock > item.quantity) {
      let updatedCart = cart && cart.map((one) => {
        if (one._id === item._id) {
          return {...item, quantity: item.quantity + 1, subTotal: item.quantity * item.product_price + item.product_price }
        } else return one
      }) 
      setCart(updatedCart)
    }
  }

  const decreaseQuantity = (minQuantity, item) => {
    if (item.quantity > minQuantity) {
      let updatedCart = cart && cart.map((one) => {
        if (one._id === item._id) {
          return {...item, quantity: item.quantity - 1, subTotal: item.quantity * item.product_price - item.product_price}
        } else return one
      }) 
      setCart(updatedCart)
    }
  }

  const totalPrice = cart && cart.map((one)=> one.subTotal)
  const getTotalPrice = totalPrice.reduce((acc, curr) => acc + curr, 0)


  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2% 20%' }}>
    <ShoppingBasketIcon style={{fontSize: '4rem', color: '#2b4f60' }} />
    { cart &&cart.length >= 1 && <Link id="linkStyle" to ="/beauty/life/user/profile/buy/cart/checkout">
      <Button style={{ lineHeight: '50px' }} id="btn">Checkout</Button></Link>}
      </div>
      <br></br>
      <div style={{ display: 'flex' }} id="cart">
      <TableContainer component={Paper} id="cart" style={{ margin : '0 2%', border: '1px solid #fde2e2' }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{ backgroundColor: '#f8f1f1' }}>
          <TableCell></TableCell>
            <TableCell style={{ fontSize: '1.2rem', color: '#2b4f60' }}>Item</TableCell>
            <TableCell style={{ fontSize: '1.2rem', color: '#2b4f60' }}>Price</TableCell>
            <TableCell style={{ fontSize: '1.2rem', color: '#2b4f60' }}>Quantity</TableCell>
            <TableCell style={{ fontSize: '1.2rem', color: '#2b4f60' }}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {cart && cart.map((row) => (
            <TableRow>
            <TableCell><img src={row._id === '0000' ? Class : `${BACK_URL}/${row.product_image}`} alt="" width="80px" /></TableCell>
              <TableCell component="th" scope="row">
              <Link id="linkStyle" to={row._id  === '0000' ? "/beauty/life/company/help/lessons/info/classes/makeup/class/lesson/yourlesson" : `/products/product/all/one/${row._id}`}>{row.product_name}
              </Link></TableCell>
              <TableCell>€ {row.product_price}</TableCell>
              <TableCell>
              <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={() => {decreaseQuantity(minQuantity, row)}}>-</Button>
                <Button>{row.quantity}</Button>
                <Button onClick={row.quantity < row.quantity_in_stock ? 
                ()=> {increaseQuantity(row)} 
                : () => {handleClick()} }>+</Button>
              </ButtonGroup>
              </TableCell>
              <TableCell>
              € {row.subTotal}
              <Button onClick={()=>{removeFromCart(row._id)}}><ClearIcon /></Button>
              </TableCell>
            </TableRow>
          )) 
          }
          { cart && cart.length >= 1 ? <TableRow align="right" style={{ color: '#2b4f60' }}><h4 style={{ marginTop: '5%' }}>Total € {getTotalPrice}</h4></TableRow> : <p>Add products in your cart</p>}
        </TableBody>
      </Table>
    </TableContainer>
    
    { open && open === true ? 
  <>
  <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  message="Max quantity achieved"
  action={
    <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>} />
  </>
  : ''
  }

    </div>
    </>
  );
}



  /* const increaseQuantity = (item) => {
    if(item.quantity_in_stock > item.quantity) {
    const target = cart && cart.find((one) => one._id === item._id)
    const filteredCart= cart.filter((one) => { return one._id !== target._id })
    setCart(filteredCart)
    const updatingTarget = {_id: target._id, product_name: target.product_name, product_price: target.product_price, 
      quantity_in_stock: target.quantity_in_stock, quantity: target.quantity + 1, subTotal: target.quantity * target.product_price + target.product_price}
    const updatedTarget = Object.assign(target, updatingTarget )
    setCart((prev) => {return [{_id: updatedTarget._id, product_name: updatedTarget.product_name, product_price: updatedTarget.product_price, 
      quantity_in_stock: updatedTarget.quantity_in_stock, quantity: updatedTarget.quantity, subTotal: updatedTarget.subTotal}, ...prev]})
    }
    }  
    
  const decreaseQuantity = (minQuantity, item) => {
    if (item.quantity > minQuantity) {
      const target = cart && cart.find((one) => one._id === item._id)
    const filteredCart= cart.filter((one) => { return one._id !== target._id })
    setCart(filteredCart)
    const updatingTarget = {_id: target._id, product_name: target.product_name, product_price: target.product_price, 
      quantity_in_stock: target.quantity_in_stock, quantity: target.quantity - 1, subTotal: target.quantity * target.product_price - target.product_price}
    const updatedTarget = Object.assign(target, updatingTarget )
    setCart((prev) => {return [{_id: updatedTarget._id, product_name: updatedTarget.product_name, product_price: updatedTarget.product_price, 
      quantity_in_stock: updatedTarget.quantity_in_stock, quantity: updatedTarget.quantity, subTotal: updatedTarget.subTotal}, ...prev]})
    }
} */