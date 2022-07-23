import { Avatar, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from '@material-ui/core'

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import './Usercss.css'

import { useDispatch } from 'react-redux';
import * as userActions from '../../../redux/users/user.Actions'
import * as userUtil from '../../../util/userUtil'

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(2),

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    mainContainer: {
        border: {
            color: 'black',
            width: 5,
            style: 'solid'
        }
    }
}))


const UserLogin = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    let handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }



    useEffect(() => {
        if (userUtil.getToken()) {
            dispatch(userActions.getUserInfo());
            history.push('/')


        }
    }, [])
    // let onSubmitLogin = (e) => {
    //     e.preventDefault();
    //     if(user.email !== "" && user.password !== "" ){
    //         // dispatch(userActions.loginUser(user,history))
    //         axios.post(`${process.env.REACT_APP_PROD_URL}/api/auth/login`,user).then((res)=>{
    //             console.log(res.data)
    //         }).catch((err)=>{
    //             console.log(err)
    //         })
    //     }else{
    //         window.alert('please fill all forms !')

    //     }
    // }



    let onSubmitLogin = (e) => {
        e.preventDefault();
        if (user.email !== "" && user.password !== "") {
            dispatch(userActions.loginUser(user, history))
            setUser({
                email: '',
                password: ''
            })

        } else {
            window.alert('please fill all forms !')

        }
    }
    const classes = useStyles()
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "30px", borderRadius: '5%', backgroundColor: '#f8f1f1' }}>
            < CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar} style={{ backgroundColor: '#7b113a' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" >
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    {/* <pre>{JSON.stringify(user)}</pre> */}
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        onChange={handleOnChange}
                        autoFocus

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="none"
                        onChange={handleOnChange}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        style={{ backgroundColor: '#7b113a' }}
                        variant='contained'
                        color='primary'
                        onClick={onSubmitLogin}
                        className={classes.submit}>

                        Sign in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/BeautyLife_WBS/users/register" variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    )
}

export default UserLogin
