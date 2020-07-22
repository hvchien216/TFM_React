import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../custom-fields/InpuField";
import { signIn } from "./../../redux/actions/userActions";
import "./style.scss";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const validationSchemaSignIn = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email"),

    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  return (
    <>
      <Container maxWidth="lg" component="main">
        <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <span>Nếu bạn đã có tài khoản, đăng nhập tại đây.</span>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchemaSignIn}
              onSubmit={(values) => props.signIn(values, history)}
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
                    {props.error && (
                      <Typography
                        variant="body2"
                        className={classes.customError}
                      >
                        {props.error}
                      </Typography>
                    )}
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
              initialValues={{ emailForgotPwd: "" }}
              onSubmit={(values) => console.log("forgot pwd==>", values)}
            >
              {(formikProps) => {
                return (
                  <Form className={classes.form}>
                    <FastField
                      name="emailForgotPwd"
                      component={InputField}
                      label="Email"
                    />

                    <Button
                      type="submit"
                      className={classes.submitBox}
                      variant="contained"
                      color="primary"
                    >
                      Lấy lại mật khẩu
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
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.errors,
  };
};

const mapDispatchToProps = {
  signIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
