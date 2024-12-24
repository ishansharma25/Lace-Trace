import React,{useContext} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';


function PrivateRoute({ children }) {
    const { user } = useContext(UserContext);

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
