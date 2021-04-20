import axios from "axios";
import * as userUtils from '../../util/userUtil'
import * as tokenUtil from '../../util/tokenUtil'

export const STRIPE_PAYMENT_REQUEST = 'STRIPE_PAYMENT_REQUEST';
export const STRIPE_PAYMENT_SUCCESS = 'STRIPE_PAYMENT_SUCCESS';
export const STRIPE_PAYMENT_FAILURE = 'STRIPE_PAYMENT_FAILURE';



export const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_FAILURE = 'PLACE_ORDER_FAILURE';

export const GET_ALL_ORDERS_REQUEST = 'GET_ALL_ORDERS_REQUEST';
export const GET_ALL_ORDERS_SUCCESS = 'GET_ALL_ORDERS_SUCCESS';
export const GET_ALL_ORDERS_FAILURE = 'GET_ALL_ORDERS_FAILURE';



export const makeStripePayment = (body, history, order) => {
    return async (dispatch) => {
        try {
            if (userUtils.getToken()) {
                tokenUtil.setAuthToken(userUtils.getToken())

            }
            dispatch({ type: STRIPE_PAYMENT_REQUEST })
            const dataUrl = `${process.env.REACT_APP_PROD_URL}/api/payments/pay`
            const response = await axios.post(dataUrl, body)
            dispatch({ type: STRIPE_PAYMENT_SUCCESS, payload: response.data })
            dispatch(placeOrder(order, history))
        } catch (error) {
            console.error(error)
            dispatch({ type: STRIPE_PAYMENT_FAILURE, payload: error.message })
        }

    }
}


// place an order 

export const placeOrder = (order, history) => {
    return async (dispatch) => {
        try {
            if (userUtils.getToken()) {
                tokenUtil.setAuthToken(userUtils.getToken())

            }

            dispatch({ type: PLACE_ORDER_REQUEST })
            const datAuRL = `${process.env.REACT_APP_PROD_URL}/api/orders/`
            const response = await axios.post(datAuRL, order)
            dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data })
            history.push('/orders/order-success');

        } catch (error) {
            console.error(error);
            dispatch({ type: PLACE_ORDER_FAILURE, payload: error.message });
        }
    }
}


// export const getAllOrders = () => {
//     return async (dispatch) => {
//         try {
//             // setting the token to request header to send to server
//             if (userUtils.getToken()) {
//                 tokenUtil.setAuthToken(userUtils.getToken());
//             }
//             dispatch({ type: GET_ALL_ORDERS_REQUEST });
//             let dataURL = `${process.env.REACT_APP_EXPRESS_SERVER}/api/orders/all`;
//             let response = await axios.get(dataURL);
//             dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: response.data });
//         }
//         catch (error) {
//             console.error(error);
//             dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error });
//         }
//     }
// };

export const getAllOrders = () => {
    return async (dispatch) => {
        try {
            // setting the token to request header to send to server
            if (userUtils.getToken()) {
                tokenUtil.setAuthToken(userUtils.getToken());
            }
            dispatch({ type: GET_ALL_ORDERS_REQUEST });
            let dataURL = `${process.env.REACT_APP_PROD_URL}/api/orders/all`;
            let response = await axios.get(dataURL);
            dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: response.data });
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_ALL_ORDERS_FAILURE, payload: error });
        }
    }
};