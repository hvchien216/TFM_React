import { Container, Grid, CircularProgress, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatCurrency, alertNotification } from "../../commons/utils";
import {
  fetchYourOrderDetail,
  cancelOrder,
} from "../../redux/actions/userActions";
import { fetchingData } from "./../../redux/actions/uiActions";
import imgTemp from "./../../assets/logo.png";
import { ORDER_DETAIL_COLUMNS } from "./../../commons/constant";
import "./style.scss";
import { Form, Formik } from "formik";
import { TRANSPORT_STATUSES } from "./../../commons/constant";
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
      status,
      // shipping_address: { address, full_name, phone },
      shipping_address,
      total,
      subtotal,
      tax_amount,
    } = data;
    const infoOrderDetail = {
      code,
      created,
      lines,
      note,
      address: shipping_address?.address,
      status,
      full_name: shipping_address?.full_name,
      phone: shipping_address?.phone,
      total,
      subtotal,
      tax_amount,
    };
    setOrderDetail(infoOrderDetail);
  }, [history]);

  useEffect(() => {
    fetchYourOrderDetail();
  }, [fetchYourOrderDetail]);

  const handleCancelOrder = async () => {
    let willDel = await alertNotification(
      "Bạn có muốn hủy đơn hàng này không!",
      "warning",
      ["Không hủy", "Chắn chắn"]
    );
    if (willDel) {
      props.cancelOrder(orderDetail.code, history);
    }
  };

  const mapHeadingTable = () => {
    return ORDER_DETAIL_COLUMNS.map(({ label }) => {
      return <th key={"thead-" + label}>{label}</th>;
    });
  };
  const mapDataRowTable = () => {
    return (
      orderDetail.hasOwnProperty("lines") &&
      orderDetail?.lines.map(
        ({
          price,
          quantity,
          id,
          product: { default_image, slug, name },
          specs: { attribute_item },
        }) => {
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
                <p>{`${name} - Size: ${attribute_item.name}`}</p>
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
            <h1>THÔNG TIN SẢN PHẨM</h1>
            <br />
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
              Tạm tính:{" "}
              <strong>
                {orderDetail.hasOwnProperty("subtotal") &&
                  formatCurrency(orderDetail.subtotal, "₫")}
              </strong>
            </p>
            <br />
            <p>
              Thuế:{" "}
              <strong>
                {orderDetail.hasOwnProperty("tax_amount") &&
                  formatCurrency(orderDetail.tax_amount, "₫")}
              </strong>
            </p>
            <br />
            <p>
              Tổng tiền:{" "}
              <strong>
                {orderDetail.hasOwnProperty("total") &&
                  formatCurrency(orderDetail.total, "₫")}
              </strong>
            </p>
            <br />
            <h1>TÌNH TRẠNG ĐƠN HÀNG</h1>
            <h3>Đơn hàng: {TRANSPORT_STATUSES[orderDetail.status]}</h3>
            <br />
            {orderDetail.status !== "completed" &&
              orderDetail.status !== "canceled" && (
                <Formik initialValues={{}} onSubmit={handleCancelOrder}>
                  {(formikProps) => {
                    const { isSubmitting } = formikProps;

                    return (
                      <Form>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="contained"
                          color="secondary"
                        >
                          {isSubmitting ? (
                            <CircularProgress size={23} color="primary" />
                          ) : (
                            "Hủy đơn hàng"
                          )}
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              )}
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
  cancelOrder: PropTypes.func,
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
  cancelOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
