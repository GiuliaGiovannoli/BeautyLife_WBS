import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from "react-router-dom";

import { CartContext } from '../../context/CartContext'

import '../comp-styles.css';
import Class from '../../img/class.jpg'

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


export default function Classes () {

  const classes = useStyles();

  const [teacher, setTeacher] = useState('');

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setTeacher(event.target.value);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [selectedDate, setSelectedDate] = useState(Date.now());

  const handleDateChange = () => {
    const date = document.getElementById('datetime-local').value;
    setSelectedDate(date)
  };

  const [cart, setCart] = useContext(CartContext);

  const addToCart = (item) => {
    const checkedCart = cart.find(alreadyInCart => alreadyInCart._id === '0000')
    if (!checkedCart) {
      setCart((prev) => {
        if(selectedDate && selectedDate) {
          return [{
          _id: '0000', product_name: `Lesson by ${teacher} on ${selectedDate}`, product_price: 25,
          product_image: '', quantity_in_stock: 1, 
          quantity: 1, subTotal: 25
        }, ...prev]
      }}) 
  } else if (checkedCart) {
      setCart(cart.filter((one) => one._id !== '0000'))
    }
  }


  return (

    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
    <Card className={classes.root} 
    style={{ cursor: 'default', backgroundColor: '#f8f1f1',  
                        borderRadius: '5%', boxShadow: '0px 0px 0px 0px', width: '50%' }}>
    <CardHeader
      title="Make up online lesson"
      subheader="€ 25"
      style={{ textAlign: 'center', margin: 0 }}
    />
      <CardMedia
        className={classes.media}
        image={Class}
        title="classes"
        style={{width: '100%' }}
      />
    <CardContent>
    <Typography style={{ textAlign: 'center', margin: 0 }}>

    <br></br>
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Choose the lesson time"
        type="datetime-local"
        defaultValue="2021-04-20T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
        min: "2021-04-20T10:30"
        }}
        onChange={() => {handleDateChange()}}
      />
    </form>
    <br></br>

    </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" style={{ color: '#2b4f60' }}>Teacher</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={teacher}
          onChange={handleChange}
        >
          <MenuItem value={'Ramy'}>Ramy</MenuItem>
          <MenuItem value={'Giulia'}>Giulia</MenuItem>
          <MenuItem value={'Mustafa'}>Mustafa</MenuItem>
        </Select>
      </FormControl>
      <br></br>
        <br></br>
#counturing #eyeliner #summermakeup
</Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton id="clickable">
        {cart && <ShoppingBasketIcon 
        onClick={
          teacher && teacher === 'Ramy' || teacher === 'Giulia' || teacher === 'Mustafa' ? 
          () => { addToCart()} : 
          () => {handleClick()}
        } 
        className={cart.find(one => one._id === '0000') ? 'superRed' : ''} />}
      </IconButton>
      {}
    </CardActions>
  </Card>
  

  { open && open === true ? 
  <>
  <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  open={open}
  autoHideDuration={6000}
  onClose={handleClose}
  message="Choose a teacher"
  action={
    <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>} />
  </>
  : ''
  }
    </div>
  )
}
