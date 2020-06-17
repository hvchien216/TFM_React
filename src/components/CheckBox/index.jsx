import React from 'react'
import './style.scss';
function CheckBox(props) {
    const { handleChange, name, title, value } = props;
    return (
        <>
            <label className="container-custom-checkbox">
                <input onChange={handleChange} name={name} type="checkbox" value={value} />
                <span className="checkmark"></span>{title}
            </label>
        </>
    )
}


export default CheckBox

