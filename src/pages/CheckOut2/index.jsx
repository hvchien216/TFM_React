import {
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { formatCurrency } from "../../commons/utils";
import CartItem from "../../components/CartItem";
import InputField from "../../custom-fields/InpuField";
import { CHECKOUT_MAIN_FIELDS } from "./../../commons/constant";
import { requiredWith } from "./../../commons/utils";
import { orderAndCheckout } from "./../../redux/actions/cartActions";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function CheckOut(props) {
  const classes = useStyles();
  const history = useHistory();
  Yup.addMethod(Yup.mixed, "requiredWith", requiredWith);
  const validationSchema = Yup.object().shape({
    email: Yup.string().requiredWith(
      Yup.ref("anotherAddress"),
      false,
      "Vui lòng nhập email "
    ),

    name: Yup.string().requiredWith(
      Yup.ref("anotherAddress"),
      false,
      "Vui lòng nhập họ tên "
    ),

    phone: Yup.string()
      .requiredWith(Yup.ref("anotherAddress"), false, "Vui lòng nhập sđt")
      .matches(/^[0-9]{10}$/, "Không đúng định dạng số điện thoại"),

    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    nameReceive: Yup.string().requiredWith(
      Yup.ref("anotherAddress"),
      true,
      "Vui lòng nhập họ tên người nhận"
    ),
    addressReceive: Yup.string().requiredWith(
      Yup.ref("anotherAddress"),
      true,
      "Vui lòng nhập địa chỉ người nhận"
    ),
    phoneReceive: Yup.string()
      .requiredWith(
        Yup.ref("anotherAddress"),
        true,
        "Vui lòng nhập số điện thoại người nhận"
      )
      .matches(
        /(03|07|08|09)+([0-9]{8})\b/,
        "Không đúng định dạng số điện thoại"
      ),
  });
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

  const mapCartToUI = (checkout) => {
    return cart.cart.map((ele) => {
      return (
        <CartItem
          key={"cartItem" + ele.product_id}
          id={ele.product_id}
          img={ele.img}
          name={ele.name}
          price={ele.price}
          quantity={ele.quantity}
          checkout={checkout}
        />
      );
    });
  };

  const handleSubmitOrder = (values) => {
    const {
      name,
      phone,
      address,
      anotherAddress,
      nameReceive,
      addressReceive,
      phoneReceive,
      note,
    } = values;

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
    props.orderAndCheckout(data, history);
  };
  const renderFields = (inputs, valuesOfFormik) => {
    return inputs.map((input) => {
      if (valuesOfFormik["anotherAddress"] === false) {
        if (
          input.name === "nameReceive" ||
          input.name === "addressReceive" ||
          input.name === "phoneReceive"
        ) {
          return null;
        }
      }

      if (input.type === "checkbox") {
        return (
          <FastField name={input.name} key={"checkbox" + input.name}>
            {({ field: { onChange } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={input.name}
                    onChange={onChange}
                    color="primary"
                  />
                }
                label={input.label}
              />
            )}
          </FastField>
        );
      }
      if (input.type === "textarea") {
        return (
          <FastField
            key={"textarea" + input.name}
            name={input.name}
            component={InputField}
            label={input.label}
            multiline
            rows={2}
          />
        );
      }
      return (
        <FastField
          key={"input" + input.name}
          name={input.name}
          component={InputField}
          label={input.label}
        />
      );
    });
  };
  if (cart.cart.length <= 0) {
    return <Redirect to="/cart" />;
  }
  return (
    <>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5}>
          <Grid item md={12}>
            <Formik
              initialValues={stateForm}
              validationSchema={validationSchema}
              // onSubmit={(values) => console.log(values)}
              onSubmit={(values) => handleSubmitOrder(values)}
            >
              {(formikProps) => {
                const { values: valuesOfFormik, isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        {renderFields(CHECKOUT_MAIN_FIELDS, valuesOfFormik)}
                      </Grid>
                      <Grid item xs={12} md={4}></Grid>
                      <Grid item xs={12} md={4}>
                        <div className="panel-order">
                          <div className="panel-order__header">
                            <h2>Đơn hàng (2 sản phẩm )</h2>
                          </div>
                          <div className="panel-order__content">
                            <div className="panel-order__list">
                              {mapCartToUI(true)}
                            </div>
                            <div className="panel-order__temp-price__content">
                              <br />
                              <p>
                                <span>Tạm tính:</span>
                                <span>{formatCurrency(totalPrice, "₫")}</span>
                              </p>
                              <br />
                              <p>
                                <span>Phí vận chuyển:</span>
                                <span>{formatCurrency(0, "₫")}</span>
                              </p>
                              <br />
                            </div>
                            <br />

                            <p className="panel-order__total-price">
                              <span>Tổng cộng:</span>
                              <span>{formatCurrency(totalPrice, "₫")}</span>
                            </p>
                            <br />

                            <div className="panel-order__action">
                              <Link to="/cart">
                                <i className="fas fa-chevron-left"></i>{" "}
                                <span>Quay về giỏ hàng</span>{" "}
                              </Link>
                              <button
                                type="submit"
                                className="btn-order-products"
                              >
                                {isSubmitting ? (
                                  <CircularProgress
                                    size={23}
                                    color="secondary"
                                  />
                                ) : (
                                  "ĐẶT HÀNG"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
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
