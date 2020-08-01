import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../../custom-fields/InpuField";
import {
  Container,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
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

    email: Yup.string().required("Vui lòng nhập Email"),

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
              }}
              validationSchema={validationSchemaSignUp}
              onSubmit={(values) => props.signInAndUp(values, history, true)}
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
                    {/* {props.error && (
                      <Typography
                        variant="body2"
                        className={classes.customError}
                      >
                        {props.error.charAt(0).toUpperCase() +
                          props.error.slice(1)}
                      </Typography>
                    )} */}
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

const mapStateToProps = (state) => {
  return {
    error: state.ui.errors,
  };
};

const mapDispatchToProps = {
  signInAndUp,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
