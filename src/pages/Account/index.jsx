import { Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import DashBoardOrder from "../../components/DashBoardOrder";
import { fetchingData } from "../../redux/actions/uiActions";
import { fetchYourOrder } from "../../redux/actions/userActions";
import "./style.scss";

function Account(props) {
  const [orderList, setOrderList] = useState([]);
  const history = useHistory();
  const { userInfo, fetchingData } = props;
  const fetchYourOrder = useCallback(async () => {
    fetchingData();
    const data = await props.fetchYourOrder();
    fetchingData();

    setOrderList(data);
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
          <Grid item xs={12} md={9}>
            <DashBoardOrder
              order={orderList}
              isFetchingData={props.isFetchingData}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="heading-user-info flex jf-al-center">
              <h4>Thông tin khách hàng</h4>
            </div>
            <div className="user-info-content">
              <div className="info-item">
                <span>
                  <i className="fas fa-user"></i>
                  <strong>{userInfo.name}</strong>
                </span>
              </div>
              <div className="info-item">
                <span>
                  Số đơn hàng: <strong>{orderList.length}</strong>
                </span>
              </div>
              <div className="info-item">
                <span>
                  Chi tiêu: <strong>0</strong>
                </span>
              </div>
              <div className="info-item">
                <span>
                  <i className="fas fa-map-marker-alt"></i>
                  <strong>{userInfo?.address}</strong>
                </span>
              </div>
              <div className="info-item">
                <span>
                  <i className="fas fa-phone-alt"></i>
                  <strong>{userInfo?.phone}</strong>
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
  fetchingData: PropTypes.func,
  isFetchingData: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.credentials,
    isFetchingData: state.ui.isFetchingData,
  };
};

const mapDispatchToProps = {
  fetchYourOrder,
  fetchingData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
