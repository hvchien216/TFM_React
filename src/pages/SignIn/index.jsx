import { Button, CircularProgress, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../custom-fields/InpuField";
import { signInAndUp, resetPassword } from "./../../redux/actions/userActions";
import "./style.scss";
import BreadScrumb from "../../components/BreadScrumb";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Email không đúng định dạng"),

    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const validationSchemaForgetPwd = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email để lấy mật khẩu"),
  });

  return (
    <>
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <span>Nếu bạn đã có tài khoản, đăng nhập tại đây.</span>
            <Formik
              initialValues={{
                email:
                  process.env.NODE_ENV === "development"
                    ? "hahaha@gmail.com"
                    : "",
                password:
                  process.env.NODE_ENV === "development" ? "kimjisoo@" : "",
              }}
              validationSchema={validationSchemaSignIn}
              onSubmit={(values) => props.signInAndUp(values, history, false)}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
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
                          "Đăng nhập"
                        )}
                      </Button>
                      <Link to="/signup" className="signup-link">
                        Đăng ký
                      </Link>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          <Grid item xs={12} md={6}>
            <span>
              Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua
              email.
            </span>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchemaForgetPwd}
              onSubmit={(values) => props.resetPassword(values)}
            >
              {(formikProps) => {
                const { isSubmitting, values } = formikProps;
                console.log(values);
                return (
                  <Form className={classes.form}>
                    <FastField
                      name="email"
                      component={InputField}
                      label="Email"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={classes.submitBox}
                      variant="contained"
                      color="primary"
                    >
                      {isSubmitting ? (
                        <CircularProgress size={23} />
                      ) : (
                        "Lấy lại mật khẩu"
                      )}
                    </Button>
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

SignIn.propTypes = {
  signInAndUp: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signInAndUp,
  resetPassword,
};
export default connect(null, mapDispatchToProps)(SignIn);
