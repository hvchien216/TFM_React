import { Container, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useReducer } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import CartItem from "../../components/CartItem";
import PurchaseInfoForm from "../../components/PurchaseInfoForm";
import { CHECKOUT_MAIN_FIELDS } from "./../../commons/constant";
import { orderAndCheckout } from "./../../redux/actions/cartActions";
import "./style.scss";
function CheckOut(props) {
  const { cart, userInfo } = props;
  const totalPrice = cart
    ? cart.cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const initValue = (inputs) => {
    const initialValues = {};

    inputs.forEach((field) => {
      if (!initialValues[field.name]) {
        initialValues[field.name] = userInfo[field.name] || field.value;
      }
    });
    return initialValues;
  };

  const stateForm = initValue(CHECKOUT_MAIN_FIELDS);

  const [formValues, setFormValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      ...stateForm,
    }
  );

  const handleChangeFormValues = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === "checkbox") {
      setFormValues({ [name]: checked });
      return;
    }
    setFormValues({ [name]: value });
  };
  const mapCartToUI = (checkout) => {
    return cart.cart.map((ele) => {
      return (
        <CartItem
          key={"cartItem" + ele.id}
          id={ele.id}
          img={ele.img}
          name={ele.name}
          price={ele.price}
          quantity={ele.quantity}
          checkout={checkout}
        />
      );
    });
  };

  const handleSubmitOrder = () => {
    const {
      name,
      phone,
      address,
      anotherAddress,
      nameReceive,
      addressReceive,
      phoneReceive,
      note,
    } = formValues;

    let data = {
      full_name: name,
      phone,
      address,
      note: note,
      cart_lines: [...cart.cart],
    };
    if (anotherAddress) {
      data.full_name = nameReceive;
      data.phone = phoneReceive;
      data.address = addressReceive;
    }
    props.orderAndCheckout(data);
  };

  if (cart.cart.length <= 0) {
    return <Redirect to="/cart" />;
  }
  return (
    <>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Thông tin mua hàng</Typography>
            <PurchaseInfoForm
              initialValues={formValues}
              handleChangeState={handleChangeFormValues}
              fields={CHECKOUT_MAIN_FIELDS}
            />
          </Grid>
          <Grid item xs={false} md={4}></Grid>
          <Grid item xs={12} md={4}>
            <div className="panel-order">
              <div className="panel-order__header">
                <h2>Đơn hàng (2 sản phẩm )</h2>
              </div>
              <div className="panel-order__content">
                <div className="panel-order__list">{mapCartToUI(true)}</div>
                <div className="panel-order__temp-price__content">
                  <p>
                    <span>Tạm tính:</span>
                    <span>{formatCurrency(totalPrice, "₫")}</span>
                  </p>
                  <p>
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(0, "₫")}</span>
                  </p>
                </div>
                <p className="panel-order__total-price">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(totalPrice, "₫")}</span>
                </p>
                <div className="panel-order__action">
                  <Link to="/cart">
                    <i className="fas fa-chevron-left"></i>{" "}
                    <span>Quay về giỏ hàng</span>{" "}
                  </Link>
                  <button
                    onClick={handleSubmitOrder}
                    type="button"
                    className="btn-order-products"
                  >
                    ĐẶT HÀNG
                  </button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CheckOut.propTypes = {
  cart: PropTypes.object,
  userInfo: PropTypes.object,
  orderAndCheckout: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userInfo: state.user.credentials,
  };
};

const mapDispatchToProps = {
  orderAndCheckout,
};
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
