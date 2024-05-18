// Creating a component to check if the profile is logged in.

import React from 'react';
import { Navigate } from 'react-router-dom';


type PropsProtected = {
    children: JSX.Element;
};

const Protected: React.FC<PropsProtected> = ({ children }) => {

    const isAuth = !!localStorage.getItem('token');

    return isAuth ? children : <Navigate to="/" />;
};

export default Protected;
