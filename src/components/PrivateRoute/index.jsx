import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

PrivateRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(PrivateRoute);
