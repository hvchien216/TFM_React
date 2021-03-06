import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import SelectQuan from "../SelectQuan";
import "./style.scss";
function CartItem(props) {
  const {
    id,
    img,
    name,
    slug,
    quantity,
    quanOfProduct,
    specification_id,
    specName,
    price,
    variantInfo,
    removeItem,
    changeQuantity,
    mobile,
    checkout,
  } = props;
  if (mobile) {
    return (
      <>
        <div className="product-item-mb flex ">
          <div className="product-item-mb-thumb">
            <Link
              to={`/product-detail/${slug}`}
              className="product-images1"
              title={name}
            >
              <img alt={name} src={img} />
            </Link>
          </div>
          <div className="product-item-mb-title">
            <h3>
              <Link to={`/product-detail/${slug}`} title={name}>
                {name}
              </Link>
              <span> size: {specName}</span>
            </h3>
            <p className="price">
              Giá: <span>{formatCurrency(price, "₫")}</span>
            </p>
          </div>
          <div className="product-item-mb-select-quan">
            <SelectQuan
              quantity={quantity}
              handleIncre={() => changeQuantity(id, 1, specification_id)}
              handleDescre={() => changeQuantity(id, -1, specification_id)}
              quanOfProduct={quanOfProduct}
            />
          </div>
        </div>
      </>
    );
  }

  if (checkout) {
    return (
      <>
        <div className="product-item-checkout flex ">
          <div className="product-item-checkout-thumb">
            <img alt={name} src={img} />
            <div className="thumb-badge">
              <span>{quantity}</span>
            </div>
          </div>
          <div className="product-item-checkout-title">
            <h4>{name}</h4>
            <span>size: {specName}</span>
          </div>
          <div className="product-item-checkout-price">
            <p>{formatCurrency(price, "₫")}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="item-cart flex">
      <div style={{ width: "17%" }} className="flex jf-al-center image">
        <Link
          className="product-image"
          title={name}
          to={`/product-detail/${slug}`}
        >
          <img alt={name} src={img} />
        </Link>
      </div>
      <div style={{ width: "28%" }} className="flex jf-al-center">
        <h2 className="product-name">
          <Link to={`/product-detail/${slug}`}>
            {name} <span>size: {specName}</span>
          </Link>
          <span className="variant-title">{variantInfo}</span>
        </h2>
      </div>
      <div style={{ width: "16%" }} className="flex jf-al-center">
        <span className="item-price">{formatCurrency(price, "₫")}</span>
      </div>
      <div style={{ width: "14%" }} className="flex jf-al-center">
        <SelectQuan
          quantity={quantity}
          handleIncre={() => changeQuantity(id, 1, specification_id)}
          handleDescre={() => changeQuantity(id, -1, specification_id)}
          quanOfProduct={quanOfProduct}
        />
      </div>
      <div style={{ width: "20%" }} className="flex jf-al-center">
        <span className="cart-price">
          <span className="price">{formatCurrency(quantity * price, "₫")}</span>
        </span>
      </div>
      <div
        onClick={() => removeItem(id, specification_id)}
        style={{ width: "5%" }}
        className="flex jf-al-center"
      >
        <div className="remove-item remove-item-cart" title="Xóa"></div>
      </div>
    </div>
  );
}

export default CartItem;
