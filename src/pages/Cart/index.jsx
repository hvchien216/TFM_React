import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import CartItem from "../../components/CartItem";
import { formatCurrency } from "./../../commons/utils";
import {
  changeQuantityItemCart,
  removeAllItemCart,
  removeItemFromCart,
} from "./../../redux/actions/cartActions";
import "./style.scss";
function Cart(props) {
  useEffect(() => {
    JSON.parse(localStorage.getItem("your_cart"));
  }, [JSON.parse(localStorage.getItem("your_cart")).toString()]);
  const { cart } = props;
  const history = useHistory();
  const totalPrice = cart
    ? cart.cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const removeItem = (id, specification_id) => {
    props.removeItemFromCart(id, specification_id);
  };
  const mapCartToUI = (mobile) => {
    return cart.cart.map((ele) => {
      return (
        <CartItem
          key={"cartItem" + ele.product_id + ele.specName}
          id={ele.product_id}
          img={ele.img}
          slug={ele.slug}
          name={ele.name}
          specification_id={ele.specification_id}
          specName={ele.specName}
          price={ele.price}
          quantity={ele.quantity}
          quanOfProduct={ele.quanOfProduct}
          removeItem={removeItem}
          changeQuantity={props.changeQuantityItemCart}
          mobile={mobile}
        />
      );
    });
  };

  const showSummaryCart = () => {
    if (cart.cart.length <= 0) {
      return (
        <div className="container-fluid">
          <span>
            Không có sản phẩm nào trong giỏ hàng. Quay lại{" "}
            <Link style={{ color: "#3dc8f6" }} to="/collections/discount">
              cửa hàng
            </Link>{" "}
            để tiếp tục mua sắm.
          </span>
        </div>
      );
    }
    return (
      <>
        <div className="cart-main container-fluid">
          <div className="list-product-of-cart">
            <div className="cart-thead flex">
              <div style={{ width: "17%" }}>Ảnh sản phẩm</div>
              <div style={{ width: "28%" }}>Thông tin</div>
              <div style={{ width: "16%" }}>Đơn giá</div>
              <div style={{ width: "14%" }}>Số lượng</div>
              <div style={{ width: "20%" }}>Thành tiền</div>
              <div style={{ width: "5%" }}>Xóa</div>
            </div>
            <div className="cart-tbody">{mapCartToUI(false)}</div>
          </div>
          <div className="cart-submit-now">
            <div className="total-price">
              <span>Tổng tiền: </span>
              <strong>{formatCurrency(totalPrice, "₫")}</strong>
            </div>
            <div className="checkout flex jf-end">
              <Link
                className="btn-gray mr-15 libra-sport___button"
                title="Tiếp tục mua hàng"
                to="/collections/giam-gia"
              >
                <span>Tiếp tục mua hàng</span>
              </Link>
              <Link
                className="btn-proceed-checkout libra-sport___button"
                title="Tiến hành đặt hàng"
                to="/checkout"
              >
                <span>Tiến hành đặt hàng</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="cart-mobile">
          <h3 className="container-fluid">Giỏ hàng của bạn</h3>
          <div className="content-product-list-mb">{mapCartToUI(true)}</div>
          <div className="cart-submit-mb">
            <div className="title-cart">
              <h3 className="total-price">
                <span>Tổng tiền: </span>
                <strong>{formatCurrency(totalPrice, "₫")}</strong>
              </h3>
            </div>
            <div className="checkout-mb">
              <Link
                className="btn-proceed btn-back-store"
                title="Tiếp tục mua hàng"
                to="/collections/giam-gia"
              >
                <span>Tiếp tục mua hàng</span>
              </Link>
              <Link
                className="btn-proceed btn-checkout"
                title="Tiến hành đặt hàng"
                to="/checkout"
              >
                <span>Tiến hành thanh toán</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <section className="cart ">
      <BreadScrumb path={history.location} />
      <section className="main-cart-page mt-20">{showSummaryCart()}</section>
    </section>
  );
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  changeQuantityItemCart: PropTypes.func.isRequired,
  removeAllItemCart: PropTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = {
  removeItemFromCart,
  changeQuantityItemCart,
  removeAllItemCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
