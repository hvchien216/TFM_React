import {
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
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
import BreadScrumb from "../../components/BreadScrumb";

const useStyles = makeStyles((theme) => ({
  trasport: {
    padding: "0px 15px",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      cursor: "pointer",
      backgroundColor: "#106ba3",
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span className={`${classes.icon} ${classes.checkedIcon}`} />
      }
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}
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
          key={"cartItem" + ele.product_id + ele.specName}
          id={ele.product_id}
          img={ele.img}
          name={ele.name}
          price={ele.price}
          specName={ele.specName}
          quantity={ele.quantity}
          checkout={checkout}
        />
      );
    });
  };
  console.log(cart.cart);
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
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <Grid container spacing={5}>
          <Grid item md={12}>
            <Formik
              initialValues={stateForm}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmitOrder(values)}
            >
              {(formikProps) => {
                const { values: valuesOfFormik, isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <h2>Thông tin mua hàng</h2>
                        {renderFields(CHECKOUT_MAIN_FIELDS, valuesOfFormik)}
                      </Grid>
                      <Grid item xs={12} md={4} className={classes.trasport}>
                        <h2>Thanh toán</h2>
                        <div className="transport__content">
                          <FormControl component="fieldset">
                            <RadioGroup
                              defaultValue="payment-live"
                              name="customized-radios"
                            >
                              <FormControlLabel
                                value="payment-live"
                                control={<StyledRadio />}
                                label="Thanh toán khi giao hàng (COD)"
                              />
                              <br />
                              <FormControlLabel
                                value="payment-with-credit-card"
                                control={<StyledRadio />}
                                label={
                                  <p>
                                    Chuyển khoản qua ngân hàng <br />
                                    Tài khoản vietcombank chi nhánh Nhà Bè
                                    <br />- Chủ tài khoản: Anubis
                                    <br />- STK: 054100026776
                                  </p>
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </Grid>
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
