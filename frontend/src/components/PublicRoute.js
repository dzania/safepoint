import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ component: Component, ...rest }) => {
  const userLoggedIn = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={(props) =>
        userLoggedIn ? (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PublicRoute;
