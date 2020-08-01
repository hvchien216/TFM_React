import React from "react";
import "./style.scss";
function RadioBtn(props) {
  const { handleChange, name, title, value } = props;
  return (
    <>
      <label className="container-custom-radio">
        <input onChange={handleChange} name={name} type="radio" value={value} />
        <span className="checkmark"></span>
        {title}
      </label>
    </>
  );
}

export default RadioBtn;
