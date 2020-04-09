import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

export async function getUsername() {
    const userInfo = await Auth.currentUserInfo();
    return userInfo.getUsername();
}

export async function getAccessToken() {
    const session = await Auth.currentSession();
    return session.getAccessToken();
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('userToken') !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )