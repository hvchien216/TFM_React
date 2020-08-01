import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import { fetchYourOrderDetail } from "../../redux/actions/userActions";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import { ORDER_DETAIL_COLUMNS } from "./../../commons/constant";
import "./style.scss";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));

function OrderDetail(props) {
  const classes = useStyles();
  const [orderDetail, setOrderDetail] = useState({});
  const history = useHistory();
  console.log(history);
  const { userInfo } = props;
  console.log(orderDetail);
  const fetchYourOrderDetail = useCallback(async () => {
    const res = await props.fetchYourOrderDetail(props.match.params.code);
    const {
      data: {
        code,
        created,
        lines,
        note,
        shipping_address: { address, full_name, phone },
        total,
        subtotal,
      },
    } = res;
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
    console.log(res);
  }, []);

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
  console.log(orderDetail.total);
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
            <p>{orderDetail.full_name}</p>
            <p>{orderDetail.phone}</p>
            <p>{orderDetail.address}</p>
            <p>
              Tổng tiền:{" "}
              {orderDetail.hasOwnProperty("total") &&
                formatCurrency(orderDetail.total, "₫")}
            </p>
          </Grid>

          {/* <Grid item md={3}>
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
            <Link className="user-info-edit" to="/OrderDetail/edit">
              Chỉnh sửa thông tin
            </Link>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}

OrderDetail.propTypes = {
  fetchYourOrderDetail: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.errors,
    userInfo: state.user.credentials,
  };
};

const mapDispatchToProps = {
  fetchYourOrderDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
