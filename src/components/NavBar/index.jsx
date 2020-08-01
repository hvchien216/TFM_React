import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";
import iconAcc from "./../../assets/icon_account.png";
import iconCartEmpty from "./../../assets/icon_cart___empty.png";
import iconCartFull from "./../..//assets/icon_cart___full.png";
import logo from "./../../assets/logo.png";
import { connect } from "react-redux";
import RingRing from "../RingRing";
import {
  removeItemFromCart,
  changeQuantityItemCart,
} from "./../../redux/actions/cartActions";
import { logoutUser } from "./../../redux/actions/userActions";
import { formatCurrency } from "../../commons/utils";
import { NAV_ITEM } from "../../commons/constant";
import SelectQuan from "../SelectQuan";

function NavBar(props) {
  const { cart } = props;
  const totalPrice = cart
    ? cart.cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const [query, setQuery] = useState("");

  const totalQuantity = () => {
    return cart.cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    console.log(query);
  };

  const handleToggleMenuMobile = (e) => {
    e.stopPropagation();
    const iconMenu = document.getElementById("menu-ham");
    const navMb = document.getElementById("nav-mobile");
    const root = document.querySelector("#root");
    iconMenu.classList.toggle("active");
    navMb.classList.toggle("active");
    root.classList.toggle("active");
  };

  const handleToggleSubMenuMobile = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const subMenu = document.getElementById(id);
    subMenu.classList.toggle("active");
  };

  const handleChangeTab = (e, tabName) => {
    e.stopPropagation();
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("nav-tab-item");

    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    e.currentTarget.className += " active";
  };

  const totalItemCart = totalQuantity();

  const renderCartMiniItem = () => {
    return cart.cart.map((item) => {
      return (
        <li className="cart-mini-list-item" key={"cartMiniListItem" + item.id}>
          <Link className="product-img" to={"/product-detail/" + item.id}>
            <img src={item.img} alt="" />
          </Link>
          <div className="product-info-detail">
            <p className="product-name">
              <Link to={"/product-detail/" + item.id}>{item.name}</Link>
            </p>
            <div className="product-price-box">
              <div className="product-price flex jf-al-center">
                {formatCurrency(item.price, "₫")}
              </div>
              <div className="product-select-quan">
                <SelectQuan
                  detail={true}
                  quantity={item.quantity}
                  handleIncre={() => props.changeQuantityItemCart(item.id, 1)}
                  handleDescre={() => props.changeQuantityItemCart(item.id, -1)}
                />
              </div>
            </div>
            <button
              onClick={() => props.removeItemFromCart(item.id)}
              className="btn-remove-item-product"
              type="button"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </li>
      );
    });
  };

  const renderListCartMini = () => {
    if (cart.cart.length <= 0) {
      return;
    }
    return (
      <>
        <ul className="cart-mini-list">{renderCartMiniItem()}</ul>
        <div className="cart-count__total flex">
          <strong>Tổng cộng:</strong>{" "}
          <span className="price">{formatCurrency(totalPrice, "₫")}</span>
        </div>
        <div className="cart-count__redirect flex">
          <Link to="/cart" className="cart-count__redirect-item">
            Giỏ hàng
          </Link>
          <Link to="/checkout" className="cart-count__redirect-item">
            Thanh toán
          </Link>
        </div>
      </>
    );
  };

  const renderBoxCredentials = (mobile) => {
    if (mobile) {
      if (props.authenticated) {
        return (
          <>
            <ul className="mm-listview">
              <li
                className="cp-item mm-listitem"
                onClick={handleToggleMenuMobile}
              >
                <Link to="/account">
                  <span className="btn-transition">
                    <i className="fa fa-sign-in-alt"></i>{" "}
                    {props.credentials.name}
                  </span>
                </Link>
              </li>
              <li
                className="cp-item mm-listitem"
                onClick={handleToggleMenuMobile}
              >
                <Link to="/account/change-password">
                  <i className="fa fa-key"></i> Đổi mật khẩu
                </Link>
              </li>
              <li className="cp-item mm-listitem" onClick={props.logoutUser}>
                <span className="btn-transition">
                  <i className="fa fa-edit"></i> Thoát
                </span>
              </li>
            </ul>
          </>
        );
      }
      return (
        <>
          <ul className="mm-listview">
            <li
              className="cp-item mm-listitem"
              onClick={handleToggleMenuMobile}
            >
              <Link to="/signin" title="Đăng nhập" className="btn-transition">
                <i className="fa fa-sign-in-alt"></i> Đăng nhập
              </Link>
            </li>
            <li
              className="cp-item mm-listitem"
              onClick={handleToggleMenuMobile}
            >
              <Link to="/signup" title="Đăng ký" className="btn-transition">
                <i className="fa fa-edit"></i>Đăng ký
              </Link>
            </li>
          </ul>
        </>
      );
    }

    if (props.authenticated) {
      return (
        <>
          <ul className="flex">
            <li>
              <Link to="/account">
                <span>{props.credentials.name}</span>
              </Link>
            </li>
            <li>
              <Link to="/account/change-password">
                <span>Đổi mật khẩu</span>
              </Link>
            </li>
            <li onClick={props.logoutUser}>
              <span>Thoát</span>
            </li>
          </ul>
        </>
      );
    }

    return (
      <>
        <ul className="flex">
          <li>
            <Link to="/signin">Đăng nhập</Link>
          </li>
          <li>
            <Link to="/signup">Đăng ký</Link>
          </li>
        </ul>
      </>
    );
  };
  const renderNavItem = () => {
    return NAV_ITEM.map((nav) => {
      return (
        <li className="nav-item  has-mega" key={nav.id}>
          <Link to={nav.to} className="nav-link">
            {nav.label}{" "}
            {nav.nav_nested.length > 0 && <i className="fa fa-angle-down"></i>}
          </Link>

          {nav.nav_nested.length > 0 && (
            <div className="mega-content">
              <ul className="flex f-wrap">
                {nav.nav_nested.map((item) => {
                  return (
                    <li
                      className="mega-item flex jf-al-center col-3"
                      key={item.id}
                    >
                      <h4 className="mega-item-title">
                        <Link className="mega-item-url" to={item.to}>
                          <span>{item.label}</span>
                        </Link>
                      </h4>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <>
      <div className="nav-mb" id="nav-mobile" onClick={handleToggleMenuMobile}>
        <div className="nav-mb-overlay">
          <div className="nav-tab">
            <div
              onClick={(e) => handleChangeTab(e, "panel-menu")}
              className="nav-tab-item active"
            >
              <i className="fa fa-bars"></i> DANH MỤC
            </div>
            <div
              onClick={(e) => handleChangeTab(e, "panel-account")}
              className="nav-tab-item"
            >
              <i className="fa fa-user"></i> TÀI KHOẢN
            </div>
          </div>
          <div className="nav-mb__panel">
            <div className="tab-content" id="panel-menu">
              <ul className="mm-listview">
                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/tfm-clothing">
                    TFM CLOTHING
                    <span
                      onClick={(e) =>
                        handleToggleSubMenuMobile(e, "sub-tfm-clothing")
                      }
                      className="has-submenu"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </span>
                  </Link>
                  <ul className="mm-listview" id="sub-tfm-clothing">
                    <li
                      className="mm-listitem"
                      onClick={(e) =>
                        handleToggleSubMenuMobile(e, "sub-tfm-clothing")
                      }
                    >
                      <i className="fas fa-chevron-left"></i> TFM CLOTHING
                    </li>
                    {NAV_ITEM[0].nav_nested.map((nav) => {
                      return (
                        <li
                          key={"nav-item-mb" + nav.id}
                          className="mm-listitem"
                          onClick={handleToggleMenuMobile}
                        >
                          <Link to={nav.to}>{nav.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/products">
                    Sneakers
                    <span
                      onClick={(e) =>
                        handleToggleSubMenuMobile(e, "sub-tfm-sneaker")
                      }
                      className="has-submenu"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </span>
                  </Link>
                  <ul className="mm-listview" id="sub-tfm-sneaker">
                    <li
                      className="mm-listitem"
                      onClick={(e) =>
                        handleToggleSubMenuMobile(e, "sub-tfm-sneaker")
                      }
                    >
                      <i className="fas fa-chevron-left"></i> Sneaker
                    </li>
                    {NAV_ITEM[1].nav_nested.map((nav) => {
                      return (
                        <li
                          key={"nav-item-mb" + nav.id}
                          className="mm-listitem"
                          onClick={handleToggleMenuMobile}
                        >
                          <Link to={nav.to}>{nav.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/champion">Champion</Link>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/giam-gia-1">Giảm Giá</Link>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/tin-tuc">Tin Tức</Link>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="panel-account">
              {renderBoxCredentials(true)}
            </div>
          </div>
          <div onClick={handleToggleMenuMobile} className="close-modal">
            <i className="fas fa-times"></i>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="header__top">
          <div className="header__top__content flex">
            <div className="col-8 header__left__info">
              <div className="header__top__left">
                <ul className="flex">
                  <li>Miễn phí vận chuyển với đơn hàng trên 2 triệu</li>
                  <li>
                    Hotline: <span>0983 151 780</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-4 flex header__right__info">
              <div className="header__top__right flex">
                <div className="ico-acc">
                  <img src={iconAcc} alt="" />
                </div>
                {renderBoxCredentials(false)}
              </div>
              <div className="panel-cart">
                <div className="cart-contain">
                  <div className="cart-count flex jf-al-center">
                    {totalItemCart}
                  </div>
                  <div className="cart-img">
                    <div className="icon-cart">
                      <Link to="/cart">
                        {props.cart.cart.length > 0 ? (
                          <img src={iconCartFull} alt="" />
                        ) : (
                          <img src={iconCartEmpty} alt="" />
                        )}
                      </Link>
                    </div>
                    <div className="cart-mini">
                      <div className="cart-mini__content">
                        {cart.cart.length > 0 ? (
                          <div className="cart-count__info">
                            Giỏ hàng hiện có <strong>{totalItemCart}</strong>{" "}
                            sản phẩm
                          </div>
                        ) : (
                          <div className="cart-count__info">
                            Không có sản phẩm nào trong giỏ hàng.
                          </div>
                        )}
                        {renderListCartMini()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__main">
          <div className="container-fluid header__main__content">
            <div
              onClick={handleToggleMenuMobile}
              className="menu-bar"
              id="menu-ham"
            >
              <div className="menu-bar__content">
                <div className="icon-ham"></div>
                <div className="icon-ham"></div>
                <div className="icon-ham"></div>
              </div>
            </div>
            <div className="logo">
              <Link to="/">
                <img src={logo} title="The Fire Monkey Clone" alt="" />
              </Link>
            </div>
            <div className="search-bar">
              <div className="search-bar-contain">
                <input
                  type="text"
                  className="input-control"
                  autoComplete="off"
                  maxLength="70"
                  name="query"
                  value={query}
                  onChange={handleSearchQuery}
                  id="search"
                  title="Nhập từ khoá cần tìm"
                  placeholder="Tìm kiếm ..."
                  required=""
                />
                <button
                  onClick={handleSubmitQuery}
                  className="btn-input"
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="menu-pc flex lf-al-center">
              <nav>
                <ul id="nav" className="nav flex jf-al-center">
                  {renderNavItem()}
                  {/* <li className="nav-item  has-mega">
                    <Link to="/tfm-clothing" className="nav-link">
                      TFM CLOTHING <i className="fa fa-angle-down"></i>
                    </Link>

                    <div className="mega-content">
                      <ul className="flex f-wrap">
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/phu-kien">
                              <span>Phụ Kiện</span>
                            </Link>
                          </h4>
                        </li>

                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/quan">
                              <span>Quần</span>
                            </Link>
                          </h4>
                        </li>

                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/ao">
                              <span>Áo</span>
                            </Link>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item  has-mega">
                    <Link to="/brand" className="nav-link">
                      Sneakers <i className="fa fa-angle-down"></i>
                    </Link>

                    <div className="mega-content">
                      <ul className="flex f-wrap">
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link
                              className="mega-item-url"
                              to="/products/adidas"
                            >
                              <span>Adidas</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/products/nike">
                              <span>Nike</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/products/vans">
                              <span>Vans</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link
                              className="mega-item-url"
                              to="/products/converse"
                            >
                              <span>Converse</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/products/fila">
                              <span>Fila</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link
                              className="mega-item-url"
                              to="/products/reebok"
                            >
                              <span>Reebok</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/products/puma">
                              <span>Puma</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link
                              className="mega-item-url"
                              to="/products/domba"
                            >
                              <span>Domba</span>
                            </Link>
                          </h4>
                        </li>
                        <li className="mega-item flex jf-al-center col-3">
                          <h4 className="mega-item-title">
                            <Link className="mega-item-url" to="/products/asic">
                              <span>Asic</span>
                            </Link>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item  ">
                    <Link className="nav-link" to="/champion">
                      Champion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      style={{ color: "red" }}
                      to="/giam-gia-1"
                    >
                      Giảm Giá
                    </Link>
                  </li>
                  <li className="nav-item  ">
                    <Link className="nav-link" to="/tin-tuc">
                      Tin Tức
                    </Link>
                  </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <RingRing />
    </>
  );
}

NavBar.propTypes = {
  cart: PropTypes.object.isRequired,
  authenticated: PropTypes.bool,
  credentials: PropTypes.object,
  removeItemFromCart: PropTypes.func.isRequired,
  changeQuantityItemCart: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    authenticated: state.user.authenticated,
    credentials: state.user.credentials,
  };
};

const mapDispatchToProps = {
  removeItemFromCart,
  changeQuantityItemCart,
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
