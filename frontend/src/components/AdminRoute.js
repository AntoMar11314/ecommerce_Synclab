import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route {...rest} render={props =>
            userInfo && userInfo.isAdmin ?
            <Component {...props}></Component> //Se l'utente è loggato ed è admin lo reindirizzo al componente specificato in App.js con le sue props
                : (
                    <Redirect to="/signin" /> //se l'utente non è loggato lo reindirizzo al login
                )
        }
        ></Route>
    )
}
