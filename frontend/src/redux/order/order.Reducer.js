import * as orderActions from './order.Actions'

export const orderFeatureKey = 'orders'


let initialState = {
    loading: false,
    order: {},
    orders: [],
    errorMessage: ''
}

export const reducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case orderActions.STRIPE_PAYMENT_REQUEST:
            return {
                loading: true
            }
        case orderActions.STRIPE_PAYMENT_SUCCESS:
            return {
                loading: false

            }

        case orderActions.STRIPE_PAYMENT_FAILURE:
            return {
                loading: false,

                errorMessage: payload
            }

        case orderActions.PLACE_ORDER_REQUEST:
            return {
                loading: true
            }
        case orderActions.PLACE_ORDER_SUCCESS:
            return {
                loading: false,
                order: payload.order
            }
        case orderActions.PLACE_ORDER_FAILURE:
            return {
                loading: false,
                order: {},
                errorMessage: payload
            }

        // Get all Orders
        case orderActions.GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case orderActions.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload
            };
        case orderActions.GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };

        default: return state
    }
}