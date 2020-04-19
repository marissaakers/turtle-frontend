import { Auth } from 'aws-amplify';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

export async function getUsername(attempt = 0) {
  try {
    const userInfo = await Auth.currentAuthenticatedUser();
    return userInfo["username"];
  } catch(err) {
    window.setTimeout(() => {
      if (attempt < 5) {
        getUsername(attempt + 1);
      }
    }, 500);
  }
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
