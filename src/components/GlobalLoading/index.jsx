import React from "react";
import PropTypes from "prop-types";
import loadingIcon from "./../../assets/loading.gif";
import { useStyles } from "./styles";
import { connect } from "react-redux";
function GlobalLoading(props) {
  const classes = useStyles();
  const { visibleLoading } = props;

  if (!visibleLoading) return null;

  return (
    <div className={classes.globalLoading}>
      <div className={classes.wrapperIcon}>
        <img src={loadingIcon} alt="" />
      </div>
    </div>
  );
}

GlobalLoading.propTypes = {
  visibleLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  return {
    visibleLoading: state.ui.loading,
  };
};

export default connect(mapStateToProps)(GlobalLoading);
