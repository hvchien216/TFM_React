import { Container, Grid, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import { fetchYourOrderDetail } from "../../redux/actions/userActions";
import { fetchingData } from "./../../redux/actions/uiActions";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import { ORDER_DETAIL_COLUMNS } from "./../../commons/constant";
import "./style.scss";

function OrderDetail(props) {
  const [orderDetail, setOrderDetail] = useState({});
  const history = useHistory();
  const { userInfo } = props;
  const fetchYourOrderDetail = useCallback(async () => {
    props.fetchingData();
    const data = await props.fetchYourOrderDetail(
      props.match.params.code,
      history
    );
    props.fetchingData();
    if (!data) return;
    const {
      code,
      created,
      lines,
      note,
      shipping_address: { address, full_name, phone },
      total,
      subtotal,
    } = data;
    const infoOrderDetail = {
      code,
      created,
      lines,
      note,
      address,
      full_name,
      phone,
      total,
      subtotal,
    };
    setOrderDetail(infoOrderDetail);
  }, [history]);

  useEffect(() => {
    fetchYourOrderDetail();
  }, [fetchYourOrderDetail]);

  const mapHeadingTable = () => {
    return ORDER_DETAIL_COLUMNS.map(({ label }) => {
      return <th key={"thead-" + label}>{label}</th>;
    });
  };
  const mapDataRowTable = () => {
    return (
      orderDetail.hasOwnProperty("lines") &&
      orderDetail.lines.map(
        ({ price, quantity, id, product: { default_image, slug, name } }) => {
          return (
            <tr key={"row-order-" + id}>
              <td className="flex">
                <Link to={`/product-detail/${slug}`}>
                  <img
                    width="100px"
                    height="100px"
                    src={default_image || imgTemp}
                    alt=""
                  />
                </Link>
                <p>{name}</p>
              </td>
              <td>{formatCurrency(price, "₫")}</td>
              <td>{quantity}</td>
              <td>{formatCurrency(price * quantity, "₫")}</td>
            </tr>
          );
        }
      )
    );
  };
  if (props.isFetchingData) {
    return (
      <div className="flex jf-center mtb100" style={{ width: "100%" }}>
        <CircularProgress size={80} color="secondary" />
      </div>
    );
  }

  return (
    <>
      {/* <BreadScrumb path={history.location} /> */}

      <Container maxWidth="lg" component="main">
        <Grid container spacing={5}>
          <Grid item md={12}>
            <h1>CHI TIẾT ĐƠN HÀNG {props.match.params.code} CỦA BẠN</h1>
            <div style={{ marginTop: "20px" }}>
              Xin chào,
              <i>
                <strong> {userInfo?.name}</strong>
              </i>
            </div>
          </Grid>
          <Grid item md={7}>
            <table className="table-order">
              <thead className="table-order-thead">
                <tr>{mapHeadingTable()}</tr>
              </thead>
              <tbody>{mapDataRowTable()}</tbody>
            </table>
          </Grid>
          <Grid item md={5}>
            <h1>THÔNG TIN NGƯỜI NHẬN</h1>
            <br />
            <p>
              Họ tên: <strong>{orderDetail.full_name}</strong>
            </p>
            <br />
            <p>
              Điện thoại: <strong>{orderDetail.phone}</strong>
            </p>
            <br />
            <p>
              Địa chỉ: <strong>{orderDetail.address}</strong>
            </p>
            <br />
            <p>
              Tổng tiền:{" "}
              <strong>
                {orderDetail.hasOwnProperty("total") &&
                  formatCurrency(orderDetail.total, "₫")}
              </strong>
            </p>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

OrderDetail.propTypes = {
  fetchYourOrderDetail: PropTypes.func.isRequired,
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
  fetchYourOrderDetail,
  fetchingData,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
