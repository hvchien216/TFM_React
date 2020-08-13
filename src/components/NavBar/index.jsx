import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import RingRing from "../RingRing";
import SelectQuan from "../SelectQuan";
import iconCartFull from "./../..//assets/icon_cart___full.png";
import iconAcc from "./../../assets/icon_account.png";
import iconCartEmpty from "./../../assets/icon_cart___empty.png";
import logo from "./../../assets/logo.png";
import {
  changeQuantityItemCart,
  removeItemFromCart,
} from "./../../redux/actions/cartActions";
import { logoutUser } from "./../../redux/actions/userActions";
import "./style.scss";

function NavBar(props) {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const { cart } = props;
  const totalPrice = cart
    ? cart.cart.reduce((total, item) => {
        return (total = total + item.price * item.quantity);
      }, 0)
    : null;

  const totalQuantity = () => {
    return cart.cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (!keyword) return;
    let query = {
      limit: 12,
      page: 1,
      keyword: keyword.toLocaleLowerCase(),
    };
    //set flag to show notification
    sessionStorage.setItem("flag-search", "true");
    history.push({
      pathname: "/search",
      search: qs.stringify(query),
    });
  };

  const handleToggleMenuMobile = (e) => {
    e.stopPropagation();
    const iconMenu = document.getElementById("menu-ham");
    const navMb = document.getElementById("nav-mobile");
    const root = document.querySelector("#root");
    iconMenu.classList.toggle("active");
    navMb.classList.toggle("active");
    root.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  // const handleToggleSubMenuMobile = (e, id) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const subMenu = document.getElementById(id);
  //   subMenu.classList.toggle("active");
  // };

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
        <li
          className="cart-mini-list-item"
          key={"cartMiniListItem" + item.product_id}
        >
          <Link
            className="product-img"
            to={"/product-detail/" + item.product_id}
          >
            <img src={item.img} alt="" />
          </Link>
          <div className="product-info-detail">
            <p className="product-name">
              <Link to={"/product-detail/" + item.product_id}>{item.name}</Link>
            </p>
            <div className="product-price-box">
              <div className="product-price flex jf-al-center">
                {formatCurrency(item.price, "₫")}
              </div>
              <div className="product-select-quan">
                <SelectQuan
                  detail={true}
                  quantity={item.quantity}
                  handleIncre={() =>
                    props.changeQuantityItemCart(item.product_id, 1)
                  }
                  handleDescre={() =>
                    props.changeQuantityItemCart(item.product_id, -1)
                  }
                />
              </div>
            </div>
            <button
              onClick={() => props.removeItemFromCart(item.product_id)}
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
                    <i className="fa fa-edit"></i> {props.credentials.name}
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
                  <i className="fa fa-sign-in-alt"></i> Thoát
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
    return props.routeNavbar.map((nav) => {
      return (
        <li className="nav-item  has-mega" key={nav.id}>
          <Link
            to={nav.to || "/"}
            onClick={(e) => {
              nav.nav_nested.length > 0 && e.preventDefault();
            }}
            className="nav-link"
            style={{ cursor: nav.to ? "pointer" : "default" }}
          >
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

  const renderBottomNav = () => {
    let xhtml = null;
    xhtml = (
      <section className="bottom-nav">
        <Link
          className="bottom-nav__item"
          to="/collections/discount"
          style={{
            color: "#f12c2c",
          }}
        >
          <span>
            <i className="fas fa-gift"></i>
            <p>Giảm Giá</p>
          </span>
        </Link>
        {props.authenticated || (
          <Link className="bottom-nav__item" to="/signin">
            <span>
              <i className="fas fa-user"></i>
              <p>Tài Khoản</p>
            </span>
          </Link>
        )}
        <Link className="bottom-nav__item" to="/account">
          <span>
            <i className="fas fa-phone-alt"></i>
            <p>Hàng Order</p>
          </span>
        </Link>
        <Link className="bottom-nav__item" to="/cart">
          <span>
            <i className="fas fa-shopping-cart"></i>
            <p>Giỏ Hàng</p>
          </span>
        </Link>
      </section>
    );
    return xhtml;
  };
  const handleToggleNavItemMobile = (e, disableLink) => {
    e.stopPropagation();
    if (disableLink) {
      e.preventDefault();
    }
    e.target.classList.toggle("active");
    let nextELe = e.target.nextElementSibling;
    if (!nextELe) {
      return;
    }
    if (nextELe.style.maxHeight) {
      nextELe.style.maxHeight = null;
    } else {
      nextELe.style.maxHeight = nextELe.scrollHeight + "px";
    }
  };

  const renderNavMobile = () => {
    let xhtml = null;
    xhtml = (
      <ul className="nav-mobile-list-parent">
        {props.routeNavbar.map((nav) => {
          const { nav_nested, to, label, id } = nav;
          return (
            <li
              className="nav-mobile-parent-item"
              key={"link parent " + id + label}
            >
              <Link
                to={to || "/"}
                onClick={(e) =>
                  handleToggleNavItemMobile(e, nav_nested.length > 0)
                }
              >
                <span>{label}</span>
                {nav_nested.length > 0 && (
                  <i className="fas fa-chevron-right"></i>
                )}
              </Link>
              {nav_nested.length > 0 && (
                <ul
                  className="nav-mobile-list-child"
                  key={"link list " + id + label}
                >
                  {nav_nested.map((ele) => {
                    return (
                      <li
                        className="nav-mobile-child-item"
                        key={"link child item" + ele.id + ele.label}
                      >
                        <Link to={ele.to}>{ele.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
    return xhtml;
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
              {renderNavMobile()}

              {/* <ul className="mm-listview">
                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link
                    to={"/"}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
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
                  <Link
                    to={"/"}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
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
                  <Link to="/collections/champion">Champion</Link>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/collections/giam-gia">Giảm Giá</Link>
                </li>

                <li className="mm-listitem" onClick={handleToggleMenuMobile}>
                  <Link to="/news">Tin Tức</Link>
                </li>
              </ul> */}
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
              <form
                onSubmit={handleSubmitSearch}
                className="search-bar-contain"
              >
                <input
                  type="text"
                  className="input-control"
                  autoComplete="off"
                  maxLength="70"
                  name="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                  id="search"
                  title="Nhập từ khoá cần tìm"
                  placeholder="Tìm kiếm ..."
                  required=""
                />
                <button className="btn-input" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
            <div className="menu-pc flex lf-al-center">
              <nav>
                <ul id="nav" className="nav flex jf-al-center">
                  {renderNavItem()}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {renderBottomNav()}
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
  routeNavbar: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    routeNavbar: state.ui.routeNavbar,
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
