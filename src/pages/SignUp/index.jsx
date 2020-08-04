import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InpuField";
import { Container, Grid, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import { signInAndUp } from "./../../redux/actions/userActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();

  const validationSchemaSignUp = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng Họ"),
    lastName: Yup.string().required("Vui lòng Tên"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        /(03|07|08|09)+([0-9]{8})\b/,
        "Không đúng định dạng số điện thoại"
      ),
    email: Yup.string()
      .required("Vui lòng nhập Email")
      .email("Email không đúng định dạng"),
    password: Yup.string().required("Vui lòng nhập Mật khẩu"),
  });

  return (
    <>
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
        <Grid container spacing={5}>
          <Grid item md={6}>
            <span>Nếu chưa có tài khoản vui lòng đăng ký tại đây</span>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phone: "",
                address: "",
              }}
              validationSchema={validationSchemaSignUp}
              onSubmit={(values) => console.log(values)}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
                    <FastField
                      name="firstName"
                      component={InputField}
                      label="Họ"
                    />
                    <FastField
                      name="lastName"
                      component={InputField}
                      label="Tên"
                    />
                    <FastField
                      name="phone"
                      component={InputField}
                      label="Số điện thoại"
                    />
                    <FastField
                      name="address"
                      component={InputField}
                      label="Địa chỉ"
                    />
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email"
                    />
                    <FastField
                      name="password"
                      component={InputField}
                      label="Mật khẩu"
                      type="password"
                    />
                    <Grid item xs={12} md={6} className={classes.submitBox}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                      >
                        {isSubmitting ? (
                          <CircularProgress size={23} />
                        ) : (
                          "Đăng ký"
                        )}
                      </Button>
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

SignUp.propTypes = {
  signInAndUp: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInAndUp,
};
export default connect(null, mapDispatchToProps)(SignUp);
