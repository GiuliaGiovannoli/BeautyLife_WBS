import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";

import { PrevProductsContext } from '../../context/PrevProductsContext'
import { TagChoosenContext } from '../../context/TagChoosenContext'

import '../comp-styles.css';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function SideBar() {

  const classes = useStyles();

  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [tags, setTags] = useState()

  const [choosenTag, setChoosenTag] = useContext(TagChoosenContext)

  const [tagClickedProducts, setTagClickedProducts] = useState()

  const [prevProducts, setPrevProducts] = useContext(PrevProductsContext)

  const [allProducts, setAllProducts] = useState()

  const { category, brand, filter } = useParams()

  useEffect(() => {
    fetch(`${BACK_URL}/api/tags`)
            .then(res=> res.json())
            .then(json=> setTags(json.allTags))
  }, [])

  useEffect(() => {
    if(choosenTag && choosenTag.length >= 1) {
    fetch(`${BACK_URL}/api/products/find/category/brand/tag/${choosenTag}`)
            .then(res=> res.json())
            .then(json=> setTagClickedProducts(json.matchingProducts))
    }
  }, [choosenTag])

  useEffect(()=> {
    if(tagClickedProducts && tagClickedProducts && prevProducts && prevProducts) {
    const checkedPrevProducts = prevProducts.map(item => item._id)
    let checkedTagClickedProducts = tagClickedProducts.map(item => item._id)
    const inCommon = checkedPrevProducts.filter(item => checkedTagClickedProducts.includes(item))
    const filteredPrevProducts = prevProducts.filter((item) => { if(inCommon.includes(item._id)) return  item})
    setPrevProducts(filteredPrevProducts)
    } 
  }, [tagClickedProducts])

  const handleTagClick = (item) => {
    const alreadyChoosenTag = choosenTag.includes(item)
    if(choosenTag && choosenTag.length === 0) {
      setAllProducts(prevProducts)
      setChoosenTag(item)
  } else if(choosenTag && choosenTag.length > 0) {
    if(alreadyChoosenTag) {
      setChoosenTag([])
      setPrevProducts(allProducts)
      } else {
        setChoosenTag(item)
        setPrevProducts(allProducts)
      }}
  }


  return (
    <>
<div className={classes.root}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
          filters   
            <MenuIcon style={{ backgroundColor: '#f8f1f1' }} />
            
          </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        { tags && tags.filter((one) => one._id !== "60745c968bd2d850a6e33c59").map((tag) => {
    return (
      <ListItem key={tag._id} style={{ fontStyle: 'italic' }}>
      <IconButton id="clickable">
      {choosenTag &&  <FavoriteIcon onClick={() => {handleTagClick(tag.name)}} 
        className={choosenTag.includes(tag.name) ? 'superRed' : ''}
        />}
        </IconButton>
        <ListItemText>
        {tag.name}
        </ListItemText>
      </ListItem>
    )
  })
  }
      </Drawer>

    </div>
    </>
  );
}
