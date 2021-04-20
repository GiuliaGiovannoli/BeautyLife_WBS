import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom"

import { SearchProductsContext } from '../context/SearchProducts'

import './comp-styles.css';
import NavBar from './Grid/NavBar'
import Categories from './Grid/Categories'
import Brands from './Grid/Brands'
import SideBar from './Grid/SideBar'
import ProductsAll from './ProductsAll'
import SingleProduct from './SingleProduct'
import Suggestions from './Grid/Suggestions'
import Classes from './Grid/Classes'
import FAQ from './littles/littlesFAQ'
import Founders from './littles/founders'
import Cart from './Cart'
import Favorite from './Favorite'
import UserProfile from './modules/users/UserProfile';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [userInput, setUserInput] = useState("");

  const [searchProducts, setSearchProducts] = useContext(SearchProductsContext);

  const [products, setProducts] = useState([])

  useEffect(() => {
    if(userInput && userInput){
      fetch(`${BACK_URL}/api/products`)
                .then(res=> res.json())
                .then(json=> setProducts(json))}
  }, [userInput])

  function handleSearch(userInput) {
    if(products && products) {
        const lowerCaseInput = userInput && userInput.toLowerCase()
        const filteredProducts = products && products.filter((product) => product.product_name.toLowerCase().includes(lowerCaseInput) 
        || product.product_categories[0].name.toLowerCase().includes(lowerCaseInput) || product.product_brands[0].name.toLowerCase().includes(lowerCaseInput) )
        if(filteredProducts.length <= 0) {
          setUserInput("")
          setProducts([])
          setSearchProducts([])
        } else if(products.find((product) => product.product_name.toLowerCase().includes(!lowerCaseInput)))
        { setUserInput("")
          setProducts()
          setSearchProducts()
        } else if(filteredProducts.length > 0) {
          setSearchProducts(filteredProducts)
          setUserInput("")
        }
      }}
      
function handleChange() {
  setUserInput(document.querySelector('input').value);
}


  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <NavBar value={userInput} onChange={handleChange} onClick={() => handleSearch(userInput)} />
        </Grid>
        <Grid item xs={12}>
        <Switch>
        <Route path="/beauty/life/company/help/contact/info/story/us/three/founders" exact>
        <Founders />
        </Route>
        <Route path="/beauty/life/company/help/contact/customers/service/questions/answers" exact>
        <FAQ />
        </Route>
        <Route path="/beauty/life/user/profile/products/buy/favorites/heart" exact>
        <Favorite />
        </Route>
        <Route path="/beauty/life/user/profile/buy/cart" exact>
        <Cart />
        </Route>
        <Route path="/beauty/life/users/user/profile" exact>
        <UserProfile />
        </Route>
        <Route path="/products/category/brand/:brand" exact>
            <Brands />
            </Route>
            <Route path="/products/search/:filter" exact>
            <Brands />
            </Route>
            <Route path="/products/:category" exact>
            <Brands />
            </Route>
            <Route path="/" exact>
            <Brands />
        </Route>
        </Switch>
        </Grid>
        <Grid item xs={12} id="home" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item xs={2}>
        <Switch>
        <Route path="/products/product/all/one/:id" exact>
            <Suggestions />
        </Route>
        <Route path="/products/category/brand/:brand" exact>
            <SideBar />
            </Route>
            <Route path="/products/search/:filter" exact>
            <SideBar />
            </Route>
            <Route path="/products/:category" exact>
            <SideBar />
            </Route>
            <Route path="/" exact>
            <Suggestions />
            </Route>
        </Switch>
        </Grid>
        <Grid item xs={10}>
        <Switch>
        <Route exact path="/beauty/life/company/help/lessons/info/classes/makeup/class/lesson/yourlesson">
        <Classes />
        </Route>
        <Route path="/products/product/all/one/:id" exact>
            <SingleProduct />
        </Route>
        <Route path="/products/category/brand/:brand" exact>
            <ProductsAll userInput={userInput} />
            </Route>
            <Route path="/products/search/:filter" exact>
            <ProductsAll userInput={userInput} />
            </Route>
            <Route path="/products/:category" exact>
            <ProductsAll userInput={userInput} />
            </Route>
        <Route path="/" exact>
            <Categories />
        </Route>
        </Switch>
        </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
