import { combineReducers } from "redux";
import * as userActions from './users/user.Actions'
import * as userReducer from './users/user.Reducer'
import * as orderReducer from './order/order.Reducer'

export const rootReducer = combineReducers({
    [userReducer.usersFeaturesKey]: userReducer.reducer,
    [orderReducer.orderFeatureKey]: orderReducer.reducer
})
