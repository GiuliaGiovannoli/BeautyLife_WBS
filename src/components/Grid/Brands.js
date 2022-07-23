import React from 'react';
import { Link } from "react-router-dom"

import '../comp-styles.css';
import One from '../../img/one.svg'
import Two from '../../img/two.svg'
import Three from '../../img/three.svg'
import Four from '../../img/four.svg'
import Five from '../../img/five.svg'
import Six from '../../img/six.svg'
import Seven from '../../img/seven.svg'
import Eight from '../../img/eight.svg'
import Nine from '../../img/nine.svg'
import Ten from '../../img/ten.svg'
import Eleven from '../../img/eleven.svg'

import Carousel from 'react-bootstrap/Carousel'

export default function Brands(){

  return(
    
    <Carousel fade keyboard={false} controls={false} indicators={false} interval={3000}>
  <Carousel.Item>
  <div id="carousel">
  <Link  id="clickable" to="/products/category/brand/Dior">
    <img
      className=""
      src={One}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/Hugo Boss">
    <img
      className=""
      src={Two}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/Chanel">
    <img
      className=""
      src={Three}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/Hermes">
    <img
      className=""
      src={Four}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    </div>
  </Carousel.Item>
  <Carousel.Item>
  <div id="carousel">
  <Link  id="clickable" to="/products/category/brand/Clinique">
    <img
      className=""
      src={Five}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/Estee Lauder">
    <img
      className=""
      src={Six}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/Rituals">
    <img
      className=""
      src={Eleven}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/MAC">
    <img
      className=""
      src={Eight}
      alt="First slide"
      width="45%"
      height="25px"
    /></Link>
    </div>
  </Carousel.Item>

</Carousel>
  )
}


/*  <Carousel.Item>
  <div id="carousel" style={{ marginTop : '-3%'}}>
  <Link  id="clickable" to="/products/category/brand/">
    <img
      className=""
      src={Nine}
      alt="First slide"
      width="30%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/">
    <img
      className=""
      src={Seven}
      alt="First slide"
      width="30%"
      height="25px"
    /></Link>
    <Link  id="clickable" to="/products/category/brand/" style={{ 'width' : '2
    height="25px"8%', marginTop : '-3%'}}>
    <img
      className=""
      src={Ten}
      alt="First slide"
      width="65%"
      height="25px"
    /></Link>
    <Link></Link>
    </div>
  </Carousel.Item> */