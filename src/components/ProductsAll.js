import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";

import { CartContext } from '../context/CartContext'
import { HeartContext } from '../context/HeartContex'
import { SearchProductsContext } from '../context/SearchProducts'
import { PrevProductsContext } from '../context/PrevProductsContext'
import { TagChoosenContext } from '../context/TagChoosenContext'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import One from '../img/1.jpg';
import Two from '../img/2.jpg';
import Three from '../img/3.jpg';
import Five from '../img/5.jpg';
import Seven from '../img/7.jpg';
import Eleven from '../img/11.jpg';

import './comp-styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 90,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function ProductsAll({ userInput }) {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [products, setProducts] = useState()

  const [searchProducts, setSearchProducts] = useContext(SearchProductsContext);

  const [prevProducts, setPrevProducts] = useContext(PrevProductsContext)

  const [tagChoosen, setTagChoosen] = useContext(TagChoosenContext)

  const { category, brand, filter } = useParams()

  useEffect(() => {
    if (filter === 'On promotion') {
      fetch(`${BACK_URL}/api/products/find/category/brand/tag/On%20promotion`)
        .then(res => res.json())
        .then(json => setProducts(json.matchingProducts))
    } else if (brand) {
      fetch(`${BACK_URL}/api/products/find/category/brand/${brand}`)
        .then(res => res.json())
        .then(json => setProducts(json.matchingProducts))
    } else if (category) {
      fetch(`${BACK_URL}/api/products/find/category/${category}`)
        .then(res => res.json())
        .then(json => setProducts(json.matchingProducts))
    } else if (searchProducts && searchProducts.length >= 1) {
      setProducts(searchProducts)
    } else if (searchProducts && searchProducts.length < 1) {
      setProducts([])
    } 
  }, [brand, category, searchProducts, filter])

  useEffect(() => {
    if (products && products) {
      setPrevProducts(products)
      setTagChoosen([])
    }
  }, [products])

  const [cart, setCart] = useContext(CartContext);

  const addToCart = (item) => {
    const checkedCart = cart.find(alreadyInCart => alreadyInCart._id === item._id)
    if (!checkedCart) {
      setCart((prev) => {
        return [{
          _id: item._id, product_name: item.product_name, product_price: item.product_price,
          product_image: item.product_image,
          quantity_in_stock: item.quantity_in_stock, quantity: 1, subTotal: item.product_price * 1
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
      setHeart((prev) => {
        return [item, ...prev];
      })
    } else if (checkedHeart) {
      setHeart(heart.filter((one) => one._id !== item._id))
    }
  }

  
  return (
    <>
      {
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sml">
            <Typography component="div">
              <div className="productsContainer">

                {prevProducts && prevProducts.length >= 1 ?

                  prevProducts && prevProducts.map((product, index) => {
                    return (
                      <Card className={classes.root} id="product"
                        style={{cursor: 'default', backgroundColor: '#f8f1f1', borderRadius: '5%', boxShadow: '0px 0px 0px 0px' }}>
                        <Link to={`/BeautyLife_WBS/products/product/all/one/${product._id}`}>
                          <CardMedia
                            className={classes.media}
                            image={index % 7 === 0 ? Seven : 
                              index % 11 === 0 ? Eleven : 
                                index % 5 === 0 ? Five : 
                                  index % 3 === 0 ? Three : 
                                  index % 2 === 0 ? Two : One}
                            title="product"
                          />
                        </Link>
                        <CardActions disableSpacing style={{ margin: '-38% 0', padding: 0, backgroundColor: 'white', 
                        width: '15%', display: 'flex', flexFlow: 'column wrap' }}>
                          <IconButton id="clickable">
                            {heart && <FavoriteIcon onClick={() => { addToHeart(product) }} className={heart.find(one => one._id === product._id) ? 'superRed' : ''} />}
                          </IconButton>
                          <IconButton id="clickable">
                            {cart && <ShoppingBasketIcon onClick={() => { addToCart(product) }} className={cart.find(one => one._id === product._id) ? 'superRed' : ''} />}
                          </IconButton>
                        </CardActions>
                        <CardContent style={{ margin: '43% 2% 2% 2%' }}>
                        <CardHeader
                          title={product.product_name}
                          subheader={
                            product.product_categories[0] === '6064d7616e21c23174ae0c2e' ? 'Face care' :
                              product.product_categories[0] === '6064d7666e21c23174ae0c2f' ? 'Body care' :
                                product.product_categories[0] === '6064d76a6e21c23174ae0c30' ? 'Hair care' :
                                  product.product_categories[0] === '6064d7716e21c23174ae0c31' ? 'Make up' :
                                    product.product_categories[0] === '6076cd5bac056bf1e2a9fb23' ? 'Perfume' :
                                      product.product_categories[0]._id === '6064d7616e21c23174ae0c2e' ? 'Face care' :
                                        product.product_categories[0]._id === '6064d7666e21c23174ae0c2f' ? 'Body care' :
                                          product.product_categories[0]._id === '6064d76a6e21c23174ae0c30' ? 'Hair care' :
                                            product.product_categories[0]._id === '6064d7716e21c23174ae0c31' ? 'Make up' :
                                              product.product_categories[0]._id === '6076cd5bac056bf1e2a9fb23' ? 'Perfume' : ''}
                          style={{ textAlign: 'center', margin: 0, padding: 0 }}
                        />
                        <Typography variant="body2" color="textSecondary" component="p" style={{ margin: '0', textAlign: 'center' }}>
                          {
                            product.product_brands[0] === '6064cdfa664c0c2e42e4c49e' ? ' By Dior' :
                              product.product_brands[0] === '6064ce07664c0c2e42e4c4a0' ? ' By Hermes' :
                                product.product_brands[0] === '606ff46f8f8c5927f4aedef2' ? ' By Chanel' :
                                  product.product_brands[0] === '606ff4bc8f8c5927f4aedef3' ? ' By Hugo Boss' :
                                    product.product_brands[0] === '606ff4d78f8c5927f4aedef4' ? ' By Clinique' :
                                      product.product_brands[0] === '606ff4e18f8c5927f4aedef5' ? ' By Estee Lauder' :
                                        product.product_brands[0] === '606ff4ee8f8c5927f4aedef6' ? ' By Ritauls' :
                                          product.product_brands[0] === '606ff4f78f8c5927f4aedef7' ? ' By MAC' :
                                            product.product_brands[0]._id === '6064cdfa664c0c2e42e4c49e' ? ' By Dior' :
                                              product.product_brands[0]._id === '6064ce07664c0c2e42e4c4a0' ? ' By Hermes' :
                                                product.product_brands[0]._id === '606ff46f8f8c5927f4aedef2' ? ' By Chanel' :
                                                  product.product_brands[0]._id === '606ff4bc8f8c5927f4aedef3' ? ' By Hermes' :
                                                    product.product_brands[0]._id === '606ff4d78f8c5927f4aedef4' ? ' By Clinique' :
                                                      product.product_brands[0]._id === '606ff4e18f8c5927f4aedef5' ? ' By Estee Lauder' :
                                                        product.product_brands[0]._id === '606ff4ee8f8c5927f4aedef6' ? ' By Ritauls' :
                                                          product.product_brands[0]._id === '606ff4f78f8c5927f4aedef7' ? ' By MAC' : ''
                          }
                        </Typography>



                          <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center', margin: 0 }}>
                            € {product.product_price}
                            <br></br>
                            {
                              product.product_tags.map((one) => {
                                if (one === '60744ab592fca000227fbda5') { return '#Bio' }
                                else if (one === '60745c968bd2d850a6e33c59') { return '   #On promotion   ' }
                                else if (one === '60745e0da3bc580022b41369') { return '   #Paraben-free   ' }
                                else if (one === '60745e1ea3bc580022b4136a') { return '   #Alcohol-free   ' }
                                else if (one === '60745e3ea3bc580022b4136c') { return '   #Fragrance-free   ' }
                                else if (one === '60745e4ca3bc580022b4136d') { return '   #Organic   ' }
                                else if (one === '60745e66a3bc580022b4136e') { return '   #Vegan   ' }
                                else if (one === '60745e81a3bc580022b4136f') { return '   #Not tested on Animal   ' }
                                else if (one === '60745e8ba3bc580022b41370') { return '   #Natural   ' }
                                else if (one === '60745ebaa3bc580022b41371') { return '   #For dry skin   ' }
                                else if (one === '60745ebfa3bc580022b41372') { return '   #For oily skin   ' }
                                else if (one === '60745ecca3bc580022b41373') { return '   #For allergic skin   ' }
                                else if (one === '60745ee0a3bc580022b41374') { return '   #Anti-aging   ' }
                                else if (one === '60745ef2a3bc580022b41375') { return '   #Moisturizing   ' }
                                else if (one === '60745f31a3bc580022b41376') { return '   #UV protection   ' }
                                else if (one._id === '60744ab592fca000227fbda5') { return '#Bio' }
                                else if (one._id === '60745c968bd2d850a6e33c59') { return '   #On promotion   ' }
                                else if (one._id === '60745e0da3bc580022b41369') { return '   #Paraben-free   ' }
                                else if (one._id === '60745e1ea3bc580022b4136a') { return '   #Alcohol-free   ' }
                                else if (one._id === '60745e3ea3bc580022b4136c') { return '   #Fragrance-free   ' }
                                else if (one._id === '60745e4ca3bc580022b4136d') { return '   #Organic   ' }
                                else if (one._id === '60745e66a3bc580022b4136e') { return '   #Vegan   ' }
                                else if (one._id === '60745e81a3bc580022b4136f') { return '   #Not tested on Animal   ' }
                                else if (one._id === '60745e8ba3bc580022b41370') { return '   #Natural   ' }
                                else if (one._id === '60745ebaa3bc580022b41371') { return '   #For dry skin   ' }
                                else if (one._id === '60745ebfa3bc580022b41372') { return '   #For oily skin   ' }
                                else if (one._id === '60745ecca3bc580022b41373') { return '   #For allergic skin   ' }
                                else if (one._id === '60745ee0a3bc580022b41374') { return '   #Anti-aging   ' }
                                else if (one._id === '60745ef2a3bc580022b41375') { return '   #Moisturizing   ' }
                                else if (one._id === '60745f31a3bc580022b41376') { return '   #UV protection   ' }
                                else { return '' }
                              })
                            }
                          </Typography>
                        </CardContent>
                      </Card>
                    )
                  })
                  : (
                    <div style={{ display: 'flex', margin: '10% 25%', flexFlow: 'column wrap' }}>
                      <Typography style={{ fontSize: '1.5rem' }}>
                        No products found 
                    <Link to="/BeautyLife_WBS/" id="linkStyle">
                          <Button id="clickable" style={{ backgroundColor: '#f8f1f1', margin: '2% 40%' }}>
                            Go back
                    </Button>
                        </Link>
                      </Typography>
                    </div>
                  )
                }
              </div>
            </Typography>
          </Container>
        </React.Fragment>}
    </>
  );
}



/* else if (products && brand) {
      fetch(`${BACK_URL}/api/products/find/category/brand/${brand}`)
                .then(res=> res.json())
                .then(json=> setBrandProducts(json.matchingProducts))
                const checkedProducts = products && products.map((one) => one._id)
                const checkedBrandProducts = brandProducts && brandProducts.map((one) => one._id)
                const inCommon = checkedProducts.filter(one => checkedBrandProducts.includes(one))
                const filteredProducts = products.filter((one) => { if(inCommon.includes(one._id)) return  one})
                console.log(filteredProducts)
                setProducts(filteredProducts)
    } */