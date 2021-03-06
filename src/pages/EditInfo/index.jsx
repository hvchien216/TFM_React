import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import BreadScrumb from "../../components/BreadScrumb";
import InputField from "../../custom-fields/InpuField";
import { editProfile } from "../../redux/actions/userActions";
import avatarDefault from "./../../assets/user_default.jpg";
import "./style.scss";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submitBox: {
    marginTop: theme.spacing(2),
  },
}));

function EditInfo(props) {
  const classes = useStyles();
  const history = useHistory();
  const [avatar, setAvatar] = useState({
    image: avatarDefault,
    file: "",
    isTouch: false,
  });
  const {
    userInfo: {
      first_name,
      last_name,
      phone,
      address,
      avatar: avatarFromServer,
    },
  } = props;
  const validationSchemaEditInfo = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng Họ"),
    lastName: Yup.string().required("Vui lòng Tên"),
    address: Yup.string().required("Vui lòng nhập địa chỉ"),
    phone: Yup.string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        /(03|07|08|09)+([0-9]{8})\b/,
        "Không đúng định dạng số điện thoại"
      ),
  });

  useEffect(() => {
    setAvatar({ ...avatar, image: avatarFromServer });
  }, []);

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onloadend = function (e) {
      setAvatar({ image: reader.result, file: image, isTouch: true });
    };
  };
  const handleSubmit = (values) => {
    const data = {
      ...values,
      avatar: avatar,
    };
    props.editProfile(data, history);
  };
  return (
    <>
      <BreadScrumb path={history.location} />

      <Container maxWidth="lg" component="main">
        <h1>ĐỊA CHỈ CỦA BẠN</h1>
        <Grid container spacing={5}>
          <Grid item md={12}>
            <Formik
              initialValues={{
                firstName: first_name ? first_name : "",
                lastName: last_name ? last_name : "",
                address: address ? address : "",
                phone: phone ? phone : "",
              }}
              validationSchema={validationSchemaEditInfo}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form className={classes.form}>
                    <Grid container>
                      <Grid item xs={12} md={3}>
                        <div className="profile-info-wrapper">
                          <img
                            src={avatar?.image}
                            alt="Avatar"
                            className="profile-info-image"
                          />
                          <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={handleImageChange}
                          />
                          <Tooltip
                            title="Edit profile picture"
                            className=""
                            placement="top"
                          >
                            <IconButton
                              onClick={handleEditPicture}
                              className="btn-edit-image"
                            >
                              <i className="fas fa-pen"></i>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={9}>
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
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={false} md={4}></Grid>

                      <Grid item xs={12} md={4} className={classes.submitBox}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="contained"
                          color="primary"
                          fullWidth={true}
                        >
                          {isSubmitting ? (
                            <CircularProgress size={23} />
                          ) : (
                            "Cập nhật"
                          )}
                        </Button>
                      </Grid>
                      <Grid item xs={false} md={4}></Grid>
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

EditInfo.propTypes = {
  editProfile: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.credentials,
  };
};

const mapDispatchToProps = {
  editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
