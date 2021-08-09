import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

    const PrivateRoute = ({ component: Component, ...rest }) => {
      const userLoggedIn = localStorage.getItem('user');
      return (
        <Route
          {...rest}
          render={(props) => (
            userLoggedIn
              ? <Component {...props} />
              : (
                <Redirect to={{
                  pathname: '/login',
                }}
                />
              )
          )}
        />
      );
    };

    PrivateRoute.propTypes = {
      component: PropTypes.elementType.isRequired,
    };


    export default PrivateRoute;

