import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Switch, Route, NavLink, Link, Redirect, useParams } from "react-router-dom"

import '../comp-styles.css';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Suggestions() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [suggestions, setSuggestions] = useState()

  const [suggestionOne, setSuggestionOne] = useState()
  const [suggestionTwo, setSuggestionTwo] = useState()
  const [suggestionThree, setSuggestionThree] = useState()

  const { id } = useParams()

  useEffect(() => {
      fetch(`${BACK_URL}/api/products`)
        .then(res => res.json())
        .then(data => setSuggestions(data))
  }, [])

  useEffect(() => {
    if(id && id && suggestions && suggestions) {
      const theCurrentProduct = suggestions.filter((item) => item._id === id)
      const AllOthersProducts = suggestions.filter((item) => item._id !== id)
      const sameCategoryProduct = AllOthersProducts.filter((item) => {if
        (item.product_categories[0]._id === theCurrentProduct[0].product_categories[0]._id) {return item}})
      setSuggestionOne(sameCategoryProduct[0])
      const sameBrandProduct = AllOthersProducts.filter((item) => {if
        (item.product_brands[0]._id === theCurrentProduct[0].product_brands[0]._id) {return item}})
      const sameNotAgainBrandProduct = sameBrandProduct.filter((item) => item._id !== sameCategoryProduct[0]._id)
      setSuggestionTwo(sameNotAgainBrandProduct[0])
      const sameTagProduct = AllOthersProducts.filter((item) => {if
        (item.product_tags[0]._id === theCurrentProduct[0].product_tags[0]._id) {return item}})
      const sameNotAgainTagProduct = sameTagProduct.filter((item) => item._id !== sameCategoryProduct[0]._id)
      const sameNotAgainAlsoTagProduct = sameNotAgainTagProduct.filter((item) => item._id !== sameNotAgainBrandProduct[0]._id)
      setSuggestionThree(sameNotAgainAlsoTagProduct[0])
    }
  }, [id, suggestions])


  return (

    <Container style={{ margin: '5% 0'}}> 
    <h6 style={{ marginLeft: '-10%'}}><em> Suggested for you</em></h6>
        { suggestionOne && suggestionOne ? 
          <Card id="suggestion" className={classes.root} style={{ width : '120px', borderRadius: '6%', backgroundColor: '#f8f1f1', marginTop: '5%', marginBottom: '20%' }}>
          <Link id="linkStyle" to={`/products/product/all/one/${suggestionOne._id}`}>
      <CardActionArea style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={`${BACK_URL}/${suggestionOne.product_image}`}
          title=""
          style={{ width : '120px', height: '100px', padding: '1%' }}
        />
        <CardContent style={{ textAlign: 'center', color: '#2b4f60' }}>
          <Typography gutterBottom variant="h6" component="h6">
          {suggestionOne.product_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
          : ''}

          { suggestionTwo && suggestionTwo ? 
            <Card id="suggestion" className={classes.root} style={{ width : '120px', borderRadius: '6%', backgroundColor: '#f8f1f1', marginTop: '5%', marginBottom: '20%' }}>
          <Link id="linkStyle" to={`/products/product/all/one/${suggestionTwo._id}`}>
      <CardActionArea style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={`${BACK_URL}/${suggestionTwo.product_image}`}
          title=""
          style={{ width: '120px', height: '100px', padding: '1%' }}
        />
        <CardContent style={{ textAlign: 'center', color: '#2b4f60' }}>
          <Typography gutterBottom variant="h6" component="h6">
          {suggestionTwo.product_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
          : ''}

          { suggestionThree && suggestionThree ? 
            <Card id="suggestion" className={classes.root} style={{ width : '120px', borderRadius: '6%', backgroundColor: '#f8f1f1', marginTop: '5%', marginBottom: '20%' }}>
          <Link id="linkStyle" to={`/products/product/all/one/${suggestionThree._id}`}>
      <CardActionArea style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={`${BACK_URL}/${suggestionThree.product_image}`}
          title=""
          style={{ width : '120px', height: '100px', padding: '1%' }}
        />
        <CardContent style={{ textAlign: 'center', color: '#2b4f60' }}>
          <Typography gutterBottom variant="h6" component="h6">
          {suggestionThree.product_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
          : ''}


          {id && id ? '' : 
          suggestions && suggestions.slice(4, 7).map((one) => {

          return (
            <Card id="suggestion" className={classes.root} style={{ width : '120px', borderRadius: '6%', backgroundColor: '#f8f1f1', marginTop: '5%', marginBottom: '20%' }}>
          <Link id="linkStyle" to={`/products/product/all/one/${one._id}`}>
      <CardActionArea style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={`${BACK_URL}/${one.product_image}`}
          title=""
          style={{ width : '120px', height: '100px', padding: '1%' }}
        />
        <CardContent style={{ textAlign: 'center', color: '#2b4f60', padding: '1%' }}>
          <Typography gutterBottom variant="h6" component="h6">
          {one.product_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
          )
      }) }
    </Container>
  );
}


