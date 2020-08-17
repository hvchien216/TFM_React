import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "./../../commons/utils";
import "./style.scss";
function ProductItem(props) {
  const { id, name, price, discount, img, isCarouselItem } = props;
  return (
    <>
      <div
        style={
          isCarouselItem
            ? {
                width: "100%",
                padding: "0 5px",
                margin: "0 -5px",
              }
            : null
        }
        className="product-item"
      >
        <div className="product-item-box">
          <div className="product-thumbnail">
            {discount ? (
              <div className={"tag-sale sale-flash flex jf-al-center"}>
                {"-" + discount + "%"}
              </div>
            ) : null}
            <Link to={"/product-detail/" + id} title={name}>
              <img
                style={
                  isCarouselItem
                    ? {
                        objectFit: "inherit",
                        width: "100%",
                        userSelect: "none",
                      }
                    : {
                        objectFit: "contain",
                        width: "100%",
                      }
                }
                className="img-responsive"
                src={img}
                alt={name}
              />
            </Link>
            <div className="product-action">
              <Link
                to={"/product-detail/" + id}
                className="btn-see-more flex jf-al-center"
                title="Xem thêm"
              >
                <span>
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-name">
              <Link to={"/product-detail/" + id} title={name}>
                <strong>{name}</strong>
              </Link>
            </h3>
            <div className="price-box">
              <div className="special-price">
                <span className="price">
                  {discount
                    ? formatCurrency(
                        Math.ceil(price - price * (parseInt(discount) / 100)),
                        "₫"
                      )
                    : formatCurrency(price, "₫")}
                </span>
              </div>
              {discount ? (
                <div className="old-price">
                  <span className="price">{formatCurrency(price, "₫")}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProductItem.propTypes = {};

export default ProductItem;
