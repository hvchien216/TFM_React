import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InpuField";
import {
  Container,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import { fetchYourOrder } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import DashBoardOrder from "../../components/DashBoardOrder";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));

function Account(props) {
  const classes = useStyles();
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const { userInfo } = props;

  const fetchYourOrder = useCallback(async () => {
    const res = await props.fetchYourOrder();
    setOrderList(res?.data);
    console.log(res);
  }, []);

  useEffect(() => {
    fetchYourOrder();
  }, [fetchYourOrder]);

  return (
    <>
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <Grid container spacing={5}>
          <Grid item md={12}>
            <h1>THÔNG TIN TÀI KHOẢN</h1>
            <div style={{ marginTop: "20px" }}>
              Xin chào,
              <i>
                <strong> {userInfo?.name}</strong>
              </i>
            </div>
          </Grid>
          <Grid item md={9}>
            <DashBoardOrder order={orderList} />
          </Grid>
          <Grid item md={3}>
            <div className="heading-user-info flex jf-al-center">
              <h4>Thông tin khách hàng</h4>
            </div>
            <div className="user-info-content">
              <div className="info-item">
                <span>
                  <i className="fas fa-user"></i>
                  {userInfo.name}
                </span>
              </div>
              <div className="info-item">
                <span>Đơn hàng: 0</span>
              </div>
              <div className="info-item">
                <span>Chi tiêu: 0</span>
              </div>
              <div className="info-item">
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                  {userInfo?.address}
                </span>
              </div>
              <div className="info-item">
                <span>
                  <i className="fas fa-phone-alt"></i>
                  {userInfo?.phone}
                </span>
              </div>
            </div>
            <Link className="user-info-edit" to="/account/edit">
              Chỉnh sửa thông tin
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Account.propTypes = {
  fetchYourOrder: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.errors,
    userInfo: state.user.credentials,
  };
};

const mapDispatchToProps = {
  fetchYourOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
