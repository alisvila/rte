import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";

  import fakeAuth from './services/auth'
  // localStorage.setItem('token', 'filan')
  // const fakeAuth = {
  //   isAuthenticated: true,
  //   authenticate(cb) {
  //     console.log('check for auth')
  //     fakeAuth.isAuthenticated = true;
  //     setTimeout(cb, 100); // fake async
  //   },
  //   signout(cb) {
  //     fakeAuth.isAuthenticated = false;
  //     setTimeout(cb, 100);
  //   }
  // };
  

  export default function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          fakeAuth.isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }