import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import InputField from "../../custom-fields/InpuField";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PurchaseInfoForm(props) {
  const classes = useStyles();
  const { initialValues, handleChangeState, fields } = props;
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Vui lòng nhập email "),

    name: Yup.string().required("Vui lòng nhập họ tên "),

    phone: Yup.string().required("Vui lòng nhập sđt"),

    address: Yup.string().required("Vui lòng nhập địa chỉ"),
  });

  const renderFields = (inputs, onChange) => {
    return inputs.map((input) => {
      if (initialValues.anotherAddress === false) {
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
          <FormControlLabel
            key={"checkbox" + input.name}
            control={
              <Checkbox name={input.name} onChange={onChange} color="primary" />
            }
            label={input.label}
          />
        );
      }
      if (input.type === "textarea") {
        return (
          <FastField
            key={"textarea" + input.name}
            name={input.name}
            component={InputField}
            onChange={onChange}
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
          onChange={onChange}
          label={input.label}
        />
      );
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("submit==>", values)}
      >
        {(formikProps) => {
          const { values, errors, touched, handleChange } = formikProps;
          const onChange = (e) => {
            handleChangeState(e);
            return handleChange(e);
          };

          return (
            <Form className={classes.form}>
              {renderFields(fields, onChange)}
              {/* <FastField
                                name="email"
                                component={InputField}
                                onChange={onChange}
                                label="Email"
                            />

                            <FastField
                                name="name"
                                component={InputField}

                                onChange={onChange}
                                label="Họ và tên"
                            />
                            <FastField
                                name="phone"
                                component={InputField}

                                onChange={onChange}
                                label="Số điện thoại"
                            />
                            <FastField
                                name="address"
                                component={InputField}

                                onChange={onChange}
                                label="Địa chỉ"
                            />
                            <FastField
                                name="note"
                                component={InputField}

                                onChange={onChange}
                                label="Ghi chú"
                                multiline
                                rows={2}
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    name="anotherAddress"
                                    onChange={onChange}
                                    color="primary" />}
                                label="Remember me"
                            /> */}
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default PurchaseInfoForm;
