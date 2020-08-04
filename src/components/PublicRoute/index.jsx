import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  restricted,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true && restricted ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PublicRoute.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(PublicRoute);
