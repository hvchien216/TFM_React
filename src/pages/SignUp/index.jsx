import React from 'react'
import './style.scss';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../custom-fields/InpuField';
import { Container, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submitBox: {
        marginTop: theme.spacing(2)
    },
}));

function SignUp() {
    const classes = useStyles();

    const validationSchemaSignUp = Yup.object().shape({
        firstName: Yup.string().required('Vui lòng Họ'),

        lastName: Yup.string().required('Vui lòng Tên'),

        email: Yup.string().required('Vui lòng nhập Email'),

        password: Yup.string().required('Vui lòng nhập Mật khẩu'),
    })
    return (
        <>
            <Container maxWidth="lg" component="main">
                <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
                <Grid container spacing={5}>
                    <Grid item md={6}>
                        <span>
                            Nếu chưa có tài khoản vui lòng đăng ký tại đây
                        </span>
                        <Formik
                            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                            validationSchema={validationSchemaSignUp}
                            onSubmit={values => console.log("submit==>", values)}
                        >
                            {formikProps => {
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
                                        />


                                        <Grid item xs={12} md={6} className={classes.submitBox}>
                                            <Button type="submit" variant="contained" color="primary">
                                                Đăng ký
                                            </Button>
                                        </Grid>
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

export default SignUp

