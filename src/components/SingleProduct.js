import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";

import { CartContext } from '../context/CartContext'
import { HeartContext } from '../context/HeartContex'

import './comp-styles.css'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Photo from '../img/7.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));


export default function SingleProduct() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const { id } = useParams()

  const [product, setProduct] = useState()

  useEffect(() => {
    if (id) {
      fetch(`${BACK_URL}/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data.oneProduct))
    } 
  }, [id])

  const [cart, setCart] = useContext(CartContext);

  const addToCart = (item) => {
    const checkedCart = cart.find(alreadyInCart => alreadyInCart._id === item._id)
    if (!checkedCart) {
      setCart((prev) => {
        return [{
          _id: item._id, product_name: item.product_name, product_price: item.product_price,
          product_image: item.product_image, quantity_in_stock: item.quantity_in_stock, 
          quantity: 1, subTotal: item.product_price * 1
        }, ...prev]
      })
    } else if (checkedCart) {
      setCart(cart.filter((one) => one._id !== item._id))
    }
  }

  const [heart, setHeart] = useContext(HeartContext);

  const addToHeart = (item) => {
    const checkedHeart = heart.find(alreadyInHeart => alreadyInHeart._id === item._id)
    if (!checkedHeart) {
      setHeart((prev) => { return [item, ...prev] })
    }
    else if (checkedHeart) {
      setHeart(heart.filter((one) => one._id !== item._id))
    }
  }

  return (

    <>
      {  product && 
      <>
        <div id="table" className={classes.root} style={{ padding: '1% 2%', border: '5px solid #f8f1f1' }}>
          <Grid container spacing={12} id="single">
          <Grid item xs={12} sm container style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'flex-start' }}>
          <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" style={{ fontSize: '1.7rem', fontWeight: 'bold', color: '#2b4f60' }}>
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom style={{ fontSize: '1.1rem', color: '#0000008a' }}>
                    {product.product_categories[0].name}   By   {product.product_brands[0].name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ fontSize: '1.1rem', color: '#0000008a' }}>
                    {product.product_tags.map((tag) => {return (<p style={{ color: '#0000008a', margin: 0, padding: 0 }}>#{tag.name}</p>)})}
                <br></br>
                </Typography>
                </Grid>
              <Grid item style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <Typography variant="subtitle1" style={{ fontSize: '1.3rem' }}>   € {product.product_price}</Typography>
                <br></br>
              {cart && <ShoppingBasketIcon id="clickable" style={{ fontSize: '2.5rem' }} onClick={() => { addToCart(product) }} className={cart.find(one => one._id === product._id) ? 'superRed' : ''} />}
              <br></br>
              {heart && <FavoriteIcon id="clickable" style={{ fontSize: '2.5rem' }} onClick={() => { addToHeart(product) }} className={heart.find(one => one._id === product._id) ? 'superRed' : ''} />}
            </Grid>
                <Grid item>
              <img className={classes.img} alt="complex" src={Photo} />
          </Grid>
                </Grid>
            <Grid item xs={12} sm container  style={{ border: 'none', marginLeft: '5%', marginRight: '2%' }}>
                <Grid item>

      <Tabs style={{ border: 'none' }}>
    <TabList style={{ marginBottom: '50px', borderBottom: '5px solid #f8f1f1' }}>
      <Tab style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: 'none' }}>ABOUT</Tab>
      <Tab style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: 'none' }}>USAGE</Tab>
      <Tab style={{ fontSize: '1.1rem', backgroundColor: 'transparent', border: 'none' }}>INGREDIENTS</Tab>
    </TabList>

    <TabPanel style={{ border: 'none' }}>
    <h5>{product.product_description}</h5>
    </TabPanel>
    <TabPanel style={{ border: 'none' }}>
      <h5>{product.product_usage}</h5>
    </TabPanel>
    <TabPanel style={{ border: 'none' }}>
      <h5>{product.product_ingredients}</h5>
    </TabPanel>
  </Tabs>

                </Grid>
              </Grid>
            </Grid>
        </div>
      </>
      }
    </>
  );
}

