import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

const useStyles = makeStyles((theme) => ({
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
