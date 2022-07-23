import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, NavLink, Link, Redirect, useHistory } from "react-router-dom"

import '../comp-styles.css';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '1%',
    backgroundColor: '#f8f1f1',
    '&:hover': {
      backgroundColor: '#f8f1f1',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'relative',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchInput: {

    padding: `2px ${theme.spacing(1)}px`,

  }
}));


export default function NavBar({ value, onChange, onClick }) {

  const classes = useStyles();

  const history = useHistory()

let handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      history.push(`/products/search/${value}`)
      onClick(value)
    }
  }


  return (

    <div className={classes.root}>
      <AppBar position="static" id="nav">
        <Toolbar id="bar">
      
          <div style={{ display: 'flex' }}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
              <Button color="inherit" href="" id="clickable" style={{ marginLeft: '15%' }}>
                Products
  </Button>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/products/search/On promotion">
              <Button color="inherit" href="" id="clickable" style={{ marginLeft: '35%' }}>
                Promotions</Button>
            </Link>
          </div>

          <div className={classes.search} style={{height: '40px' }} id="search">
            <InputBase
              type="text" placeholder="  Search by name..."
              value={value} onChange={onChange}
              onKeyPress={handleKeyPress}
              className={classes.searchInput}
              onKeyPress={handleKeyPress}
              endAdornment={<Link to={`/products/search/${value}`} style={{ color: 'white' }} onClick={onClick}>
                <SearchIcon id="clickable" style={{ fontSize: 'large%', color: '#2b4f60' }} /></Link>}
            />
            </div>

<div style={{ display: 'flex' }}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/beauty/life/company/help/contact/customers/service/questions/answers">
              <Button color="inherit" href="" id="clickable">
                Help
  </Button>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/beauty/life/company/help/contact/info/story/us/three/founders">
              <Button color="inherit" href="" id="clickable" style={{ marginLeft: '40%' }}>
                About</Button>
            </Link>
          </div>
        
        </Toolbar>
      </AppBar>
    </div>
  )
}
