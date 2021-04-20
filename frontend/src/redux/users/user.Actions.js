import Axios from 'axios'
import * as userUtils from '../../util/userUtil'
import * as tokenUtil from '../../util/tokenUtil'
import axios from 'axios';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';



export const LOGOUT_USER = 'LOGOUT_USER';


export const registerUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: REGISTER_USER_REQUEST });
            const dataUrl = `${process.env.REACT_APP_PROD_URL}/api/auth/register`
            const response = await Axios.post(dataUrl, user)
            dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data })
            history.push('/users/login')
        } catch (error) {
            dispatch({ type: REGISTER_USER_FAILURE, payload: error.response.data })
        }
    }
}


export const loginUser = (user, history) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_USER_REQUEST })
            const dataUrl = `${process.env.REACT_APP_PROD_URL}/api/auth/login`
            const response = await Axios.post(dataUrl, user)
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
            history.push('/');

        } catch (error) {
            dispatch({ type: LOGIN_USER_FAILURE, payload: error.message })

        }
    }
}


export const logOutUser = (history) => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER });
        history.push('/');
    };
};

export const getUserInfo = () => {
    return async (dispatch) => {

        if (userUtils.getToken())
            tokenUtil.setAuthToken(userUtils.getToken())


        try {
            dispatch({ type: GET_USER_INFO_REQUEST });
            let dataURL = `${process.env.REACT_APP_PROD_URL}/api/auth/user`
            let response = await Axios.get(dataURL);
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data });
        } catch (error) {
            console.error(error);
            dispatch({ type: GET_USER_INFO_FAILURE, payload: error });
        }
    }
}

export const updateAddress = (address) => {
    if (userUtils.getToken())
        tokenUtil.setAuthToken(userUtils.getToken())

    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_ADDRESS_REQUEST });
            let dataUrl = `${process.env.REACT_APP_PROD_URL}/api/auth/address`
            let response = await Axios.post(dataUrl, address)
            dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data })
        } catch (error) {
            console.error(error)
            dispatch({ type: UPDATE_ADDRESS_FAILURE, payload: error.message })
        }
    }
}