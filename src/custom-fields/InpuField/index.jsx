import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage } from "formik";

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
  input: {
    // fontSize: 12,
    // color: '',
    // typography: {
    //     subtitle1: {
    //         fontSize: 12,
    //     },
    //     body1: {
    //         fontWeight: 500,
    //     },
    //     button: {
    //         fontStyle: 'italic',
    //     },
    // },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function InputField(props) {
  const classes = useStyles();

  const { field, form, type, label, disabled, onChange } = props;
  const { name, onChange: onChangeOfField } = field;
  const { errors, touched } = form;
  const isError = errors[name] && touched[name];
  return (
    <>
      <TextField
        // className={classes.input}
        {...props}
        variant="outlined"
        margin="normal"
        fullWidth
        id={name}
        name={name}
        {...field}
        error={isError}
        helperText={errors[name]}
        onChange={onChange || onChangeOfField}
        label={label && label}
        type={type}
        disabled={disabled}
        InputProps={{
          className: classes.input,
        }}
        // autoFocus
      />
    </>
  );
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
