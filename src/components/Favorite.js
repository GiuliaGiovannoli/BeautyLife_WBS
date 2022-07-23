import React, { useContext, useState } from 'react';
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom"

import { HeartContext }from '../context/HeartContex'
import { CartContext } from '../context/CartContext'

import './comp-styles.css';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Favorite() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [heart, setHeart] = useContext(HeartContext);

  const [ cart, setCart ] = useContext(CartContext);

  const addToCart = (heart) => {
    const checkedCart = cart.map(item => item._id)
    let checkedHeart = heart.map(item => item._id)
    const inCommon = checkedHeart.filter(item => checkedCart.includes(item))
    heart.map(item => {
      if(!inCommon.includes(item._id)) {
        setCart((prev) => {return [{ _id: item._id, product_name: item.product_name, product_price: item.product_price,
          product_image: item.product_image,
          quantity_in_stock: item.quantity_in_stock, quantity: 1, subTotal: item.product_price * 1}, ...prev]})
  }})}
  const removeFromHeart = (targetItem) => {
    const filteredHeart= heart.filter((item) => { return item._id !== targetItem })
    setHeart(filteredHeart)
  }


  return (

    <>
    <div>
    <div style={{ textAlign: 'center', marginTop: '2%' }}>
    <FavoriteIcon style={{ marginRight: '5%', fontSize: '3rem' }} />   
    {heart && cart && heart.length >= 1 && <Button id="btn" style={{ lineHeight: '50px' }} onClick={()=> {addToCart(heart)}}>
    BUY ALL   
    </Button>}
    </div>
    <Container id="productsContainer" className={classes.root} style={{ width: '100%', display: 'flex', justifyContent: 'space-around', backgroundColor: 'transparent' }}>
    {heart && heart.length > 0 ? 
    (heart.map((row) => {
      return (
        
        <Card className={classes.root} style={{ width : '200px', borderRadius: '6%', backgroundColor: '#f8f1f1', marginTop: '3%', marginLeft: '2%' }}>
      <CardActionArea style={{ cursor: 'default' }}>
      <Link id="linkStyle" to={`/products/product/all/one/${row._id}`}>
        <CardMedia
          className={classes.media}
          image={`${BACK_URL}/${row.product_image}`}
          title=""
          style={{ width : '200px', height: '100px', padding: '1%', cursor: 'pointer' }}
        />
                  </Link>
        <CardContent style={{ textAlign: 'center', color: '#2b4f60', padding: '1%' }}>
          <Typography gutterBottom variant="h5" component="h4">
          {row.product_name}
          <br></br>   € {row.product_price}
          </Typography>
          <br></br>
          <Button id="btn" onClick={()=>{removeFromHeart(row._id)}}><ClearIcon /></Button>
        </CardContent>
      </CardActionArea>
    </Card>
    
      )
    }))
    : <p>Choose some favorites</p>}
    </Container>
    </div>
    <div className="buttons" style={{ marginTop: '2%'}}>
    </div>
    </>
  );
}
