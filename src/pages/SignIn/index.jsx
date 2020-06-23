import React from 'react'
import './style.scss';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../custom-fields/InpuField';
import { Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submitBox: {
        marginTop: theme.spacing(2)
    },
}));

function SignIn() {
    const classes = useStyles();

    const validationSchemaSignIn = Yup.object().shape({
        email: Yup.string().required('Vui lòng nhập email'),

        password: Yup.string().required('Vui lòng nhập mật khẩu'),
    })
    return (
        <>
            <Container maxWidth="lg" component="main">
                <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <span>
                            Nếu bạn đã có tài khoản, đăng nhập tại đây.
                        </span>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchemaSignIn}
                            onSubmit={values => console.log("submit==>", values)}
                        >
                            {formikProps => {
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
                                        />
                                        <Grid item xs={12} md={6} className={classes.submitBox}>
                                            <Button type="submit" variant="contained" color="primary">
                                                Đăng nhập
                                            </Button>
                                            <Link to='/signup' className="signup-link">
                                                Đăng ký
                                            </Link>
                                        </Grid>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <span>
                            Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
                        </span>
                        <Formik
                            initialValues={{ emailForgotPwd: '' }}
                            onSubmit={values => console.log("forgot pwd==>", values)}
                        >
                            {formikProps => {
                                return (
                                    <Form className={classes.form}>
                                        <FastField
                                            name="emailForgotPwd"
                                            component={InputField}

                                            label="Email"
                                        />

                                        <Button type="submit" className={classes.submitBox} variant="contained" color="primary">
                                            Lấy lại mật khẩu
                                        </Button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

SignIn.propTypes = {

}

export default SignIn

