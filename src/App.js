import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, NavLink, Link, Redirect, useHistory } from "react-router-dom"

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import UserLogin from './components/modules/users/UserLogin';
import UserRegister from './components/modules/users/UserRegister'
import * as userUtil from './util/userUtil'
import * as userActions from './redux/users/user.Actions';
import PrivateRoute from './util/PrivateRoute';
import TestPrivate from './components/TestPrivate';
import Checkout from './components/modules/orders/Checkout';

import { CartProvider } from './context/CartContext'
import { HeartProvider } from './context/HeartContex'
import { SearchProductsProvider } from './context/SearchProducts'
import { PrevProductsProvider } from './context/PrevProductsContext'
import { TagChoosenProvider } from './context/TagChoosenContext'
import OrderSuccess from './components/modules/orders/OrderSuccess';
import OrderList from './components/modules/orders/OrderList';


export default function App() {

  const dispatch = useDispatch()
  
  const history = useHistory()

  useEffect(() => {
    if (userUtil.getToken()) {
      dispatch(userActions.getUserInfo());
    }
  }, [])


  return (
    <div className="App">
      <Router>
        <PrevProductsProvider>
          <TagChoosenProvider>
            <SearchProductsProvider>
              <CartProvider>
                <HeartProvider>
                  <Header />
                  <Switch>
                    <Route path="/users/register" component={UserRegister} />
                    <Route exact path="/users/login" component={UserLogin} />
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path='/hallo' component={TestPrivate} />
                    <Route exact path="/products/:category" component={Home} />
                    <Route exact path="/products/search/:filter" component={Home} />
                    <Route exact path="/products/category/brand/:brand" component={Home} />
                    <Route exact path="/products/product/all/one/:id" component={Home} />

                    <PrivateRoute exact path="/beauty/life/users/user/profile" component={Home} />
                    
                    <Route exact path="/beauty/life/user/profile/buy/cart" component={Home} />

                    <PrivateRoute exact path="/beauty/life/user/profile/buy/cart/checkout" component={Checkout} />
                    <PrivateRoute exact path="/orders/order-success" component={OrderSuccess} />
                    <PrivateRoute exact path="/orders/order-list" component={OrderList} />

                    <Route exact path="/beauty/life/user/profile/products/buy/favorites/heart" component={Home} />
                    <Route exact path="/beauty/life/company/help/contact/customers/service/questions/answers" component={Home} />
                    <Route exact path="/beauty/life/company/help/contact/info/story/us/three/founders" component={Home} />
                    <Route exact path="/beauty/life/company/help/lessons/info/classes/makeup/class/lesson/yourlesson" component={Home} />
                  </Switch>
                  <Footer />
                </HeartProvider>
              </CartProvider>
            </SearchProductsProvider>
          </TagChoosenProvider>
        </PrevProductsProvider>
      </Router>,

    </div>
  );
}


