import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, NavLink, Link, Redirect } from "react-router-dom"
import { CartContext } from '../context/CartContext'
import { HeartContext } from '../context/HeartContex'

import './comp-styles.css';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Badge } from '@material-ui/core';


export default function Header() {

  const [cart, setCart] = useContext(CartContext);

  const [heart, setHeart] = useContext(HeartContext);

  return (
    <>
      <div className="profileAndHeader">
        <Link to="/" id="linkStyle"><h1 className="title">Beauty Life</h1></Link>
        <div id="profile">
          <ButtonGroup
            orientation="horizontal"
            aria-label="horizontal contained button group"
          >
            <Link to="/beauty/life/users/user/profile"><AccountCircleIcon id="clickable" /></Link>
            <Link to="/beauty/life/user/profile/buy/cart"><Badge badgeContent={cart.length} style={{ color: '#7b113a' }}>
              <ShoppingBasketIcon id="clickable" className={cart && cart.length > 0 ? 'superRed' : ''} style={{marginLeft: '50%'}} />
            </Badge></Link>
            <Link to="/beauty/life/user/profile/products/buy/favorites/heart">
            <FavoriteIcon id="clickable" className={heart && heart.length > 0 ? 'superRed' : ''} style={{marginLeft: '100%'}} /></Link>
          </ButtonGroup>
        </div>
      </div>
    </>
  )
}

