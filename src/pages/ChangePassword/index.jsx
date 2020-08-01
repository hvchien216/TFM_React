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
import "./style.scss";
import BreadScrumb from "../../components/BreadScrumb";
import { changePassword } from "../../redux/actions/userActions";
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

function ChangePassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const validationSchemaChangePassword = Yup.object().shape({
    old_password: Yup.string().required("Vui lòng nhập email"),

    new_password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  return (
    <>
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <h1>ĐỔI MẬT KHẨU</h1>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                old_password: "",
                new_password: "",
              }}
              validationSchema={validationSchemaChangePassword}
              onSubmit={(values) =>
                props.changePassword(values, history, false)
              }
              // onSubmit={(values) => console.log(values)}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
                    <FastField
                      name="old_password"
                      component={InputField}
                      label="Mật khẩu cũ"
                      type="password"
                    />
                    <FastField
                      name="new_password"
                      component={InputField}
                      label="Mật khẩu mới"
                      type="password"
                    />
                    {props.error && (
                      <Typography
                        variant="body2"
                        className={classes.customError}
                      >
                        {props.error.charAt(0).toUpperCase() +
                          props.error.slice(1)}
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
                          "Đổi mật khẩu"
                        )}
                      </Button>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
    </>
  );
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    error: state.ui.errors,
  };
};

const mapDispatchToProps = {
  changePassword,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
