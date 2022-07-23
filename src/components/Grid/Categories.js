import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom"

import '../comp-styles.css';
import MakeUp from '../../img/MakeUp.jpg'
import Face from '../../img/Hair.jpg'
import Hair from '../../img/Face.jpg'
import Body from '../../img/Body.jpg'
import Parfume from '../../img/Parfume.jpg'
import Class from '../../img/class.jpg'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Categories() {

  const classes = useStyles();

  const BACK_URL = process.env.REACT_APP_PROD_URL

  const [categories, setCategories] = useState()

  useEffect(() => {
  fetch(`${BACK_URL}/api/categories`)
            .then(res=> res.json())
            .then(json=> setCategories(json.allCategories))
  }, [])


  return (
    <>
    <div id="categories">
    { categories && 
      categories.map((category) => {
        return (
          <Card className={classes.root} id="oneCategory" style={{ width : '100%', borderRadius: '6%', backgroundColor: '#2b4f60' }}>
          <Link id="linkStyle" to={category.name !== 'Classes' ? `/BeautyLife_WBS/products/${category.name}` : '/BeautyLife_WBS/beauty/life/company/help/lessons/info/classes/makeup/class/lesson/yourlesson'}>
      <CardActionArea style={{ cursor: 'pointer' }}>
        <CardMedia
          className={classes.media}
          image={category._id ==='6076cd5bac056bf1e2a9fb23' ? 
          Parfume : category._id ==='6076cd6aac056bf1e2a9fb24' ? 
          Class : category._id ==='6064d7716e21c23174ae0c31' ? 
          MakeUp : category._id === '6064d7666e21c23174ae0c2f' ? 
          Body : category._id === '6064d76a6e21c23174ae0c30' ? 
          Face : Hair }
          title=""
          style={{width: '100%', padding: '2%' }}
        />
        <CardContent style={{ textAlign: 'center', color: 'white', padding: '3%' }}>
          <Typography gutterBottom variant="h5" component="h2">
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
        )
      })
    } 

    </div>
    </>
  );
}
