import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route {...rest} render={props =>
            userInfo ?
            <Component {...props}></Component> //Se l'utente è loggato lo reindirizzo al componente specificato in App.js con le sue props
                : (
                    <Redirect to="/signin" /> //se l'utente non è loggato lo reindirizzo al login
                )
        }
        ></Route>
    )
}
