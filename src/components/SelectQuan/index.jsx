import React from "react";
import "./style.scss";
function SelectQuan(props) {
  const { handleIncre, handleDescre, quantity, detail, quanOfProduct } = props;
  if (detail) {
    return (
      <div className="box-pick-quan flex">
        <button
          style={{ cursor: quantity === 1 && "not-allowed" }}
          disabled={quantity === 1}
          onClick={handleDescre}
          className="items-change-quan btn-descre"
          type="button"
        >
          <span>-</span>
        </button>
        <input
          type="text"
          maxLength="3"
          min="0"
          readOnly
          className="number-quan"
          value={quantity}
        />
        <button
          style={{ cursor: quantity === quanOfProduct && "not-allowed" }}
          disabled={quantity === quanOfProduct}
          onClick={handleIncre}
          className="items-change-quan btn-increase"
          type="button"
        >
          <span>+</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="input_qty_pr relative flex jf-al-center">
        <button
          onClick={handleDescre}
          className="items-count btn-minus"
          type="button"
        >
          <span>-</span>
        </button>
        <input
          type="text"
          maxLength="3"
          min="0"
          readOnly
          className="number-sidebar"
          value={quantity}
        />
        <button
          style={{ cursor: quantity === quanOfProduct && "not-allowed" }}
          disabled={quantity === quanOfProduct}
          onClick={handleIncre}
          className="items-count btn-plus"
          type="button"
        >
          <span>+</span>
        </button>
      </div>
    </>
  );
}

export default SelectQuan;
