import * as userActions from './user.Actions'

export const usersFeaturesKey = 'users'

let initialState = {
    loading: false,
    errorMessage: '',
    token: '',
    user: {},
    isAuthenticated: false
};

export const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case userActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }

        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem('beauty-app-token', payload.token)
            return {
                ...state,
                loading: false,
                user: payload.user,
                token: payload.token,
                isAuthenticated: true,
            }
        case userActions.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload,
                token: '',
                user: {},
                isAuthenticated: false
            }
        case userActions.LOGOUT_USER:
            localStorage.removeItem('beauty-app-token');


            return {
                token: '',
                user: {},
                isAuthenticated: false
            }

        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user
            };
        case userActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                user: {}
            };
        case userActions.UPDATE_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userActions.UPDATE_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user
            };
        case userActions.UPDATE_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: payload
            }

        default: return state
    }
}