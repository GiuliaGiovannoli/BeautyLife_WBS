import React from "react";
import {Route , Redirect} from 'react-router-dom';
import * as userUtil from './userUtil';

let PrivateRoute = ({component : Component , ...rest}) => {

    return <Route {...rest} render={(props) => {
        return !userUtil.isLoggenIn() ? <Redirect to="/BeautyLife_WBS/users/login"/> : <Component {...props}/>
    }}/>
};
export default PrivateRoute;