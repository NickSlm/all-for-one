import React from 'react'
import {Navigate} from 'react-router-dom'
import hasJWT from './JWT';


const PrivateRoute = ({children}) => {
    const isLoggedIn = hasJWT();

    return isLoggedIn ? children: <Navigate to="/login"/>;

};

export default PrivateRoute;