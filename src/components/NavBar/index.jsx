import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import './style.scss';
import { Link } from 'react-router-dom';
import iconAcc from './../../assets/icon_account.png';
import iconCart from './../../assets/icon_cart___empty.png';
import logo from './../../assets/logo.png';
function NavBar(props) {

    const [query, setQuery] = useState('');

    const handleSearchQuery = e => {
        setQuery(e.target.value);
    }

    const handleSubmitQuery = (e) => {
        e.preventDefault();
        console.log(query);
    }

    const handleToggleMenuMobile = (e) => {
        e.stopPropagation();
        const iconMenu = document.getElementById("menu-ham");
        const navMb = document.getElementById("nav-mobile");
        iconMenu.classList.toggle("active");
        navMb.classList.toggle("active");
    }

    const handleToggleSubMenuMobile = (e, id) => {
        console.log(e);
        e.preventDefault();
        const subMenu = document.getElementById(id);
        subMenu.classList.toggle("active");
    }

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
    }
    return (
        <>
            <div className="nav-mb" id="nav-mobile">
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

                                <li className="mm-listitem">
                                    <Link to="/tfm-clothing">
                                        TFM CLOTHING
                                        <span
                                            onClick={(e) => handleToggleSubMenuMobile(e, "sub-tfm-clothing")}
                                            className="has-submenu"><i className="fas fa-chevron-right"></i></span>
                                    </Link>
                                    <ul className="mm-listview" id="sub-tfm-clothing">
                                        <li
                                            className="mm-listitem"
                                            onClick={(e) => handleToggleSubMenuMobile(e, "sub-tfm-clothing")}
                                        >
                                            <i className="fas fa-chevron-left"></i> TFM CLOTHING
                                        </li>
                                        <li className="mm-listitem" ><Link to="/phu-kien">Phụ kiện</Link></li>
                                        <li className="mm-listitem" ><Link to="/quan">Quần</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Áo</Link></li>
                                    </ul>
                                </li>

                                <li className="mm-listitem">
                                    <Link to="/brand">
                                        Sneakers
                                        <span
                                            onClick={(e) => handleToggleSubMenuMobile(e, "sub-tfm-sneaker")}
                                            className="has-submenu"><i className="fas fa-chevron-right"></i></span>
                                    </Link>
                                    <ul className="mm-listview" id="sub-tfm-sneaker">
                                        <li
                                            className="mm-listitem"
                                            onClick={(e) => handleToggleSubMenuMobile(e, "sub-tfm-sneaker")}
                                        >
                                            <i className="fas fa-chevron-left"></i> Sneaker
                                        </li>
                                        <li className="mm-listitem" ><Link to="/phu-kien">Adidas</Link></li>
                                        <li className="mm-listitem" ><Link to="/quan">Nike</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Vans</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Converse</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Fila</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Reebok</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Puma</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Domba</Link></li>
                                        <li className="mm-listitem" ><Link to="/ao">Asic</Link></li>
                                    </ul>
                                </li>

                                <li className="mm-listitem">
                                    <Link to="/champion">Champion</Link>
                                </li>

                                <li className="mm-listitem">
                                    <Link to="/giam-gia-1">Giảm Giá</Link>
                                </li>

                                <li className="mm-listitem">
                                    <Link to="/tin-tuc">Tin Tức</Link>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content" id="panel-account">
                            <ul className="mm-listview">

                                <li className="cp-item mm-listitem">
                                    <Link to="/account/login" title="Đăng nhập" className="btn-transition">
                                        <i className="fa fa-sign-in-alt"></i> Đăng nhập
                                    </Link>
                                </li>
                                <li className="cp-item mm-listitem">
                                    <Link to="/account/register" title="Đăng ký" className="btn-transition">
                                        <i className="fa fa-edit"></i>Đăng ký
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div
                        onClick={handleToggleMenuMobile}
                        className="close-modal"
                    >
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
                                    <li>
                                        Miễn phí vận chuyển với đơn hàng trên 2 triệu
                                    </li>
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
                                <ul className="flex">
                                    <li>
                                        <Link to='/signin'>Đăng nhập</Link>
                                    </li>
                                    <li>
                                        <Link to='/signup'>Đăng ký</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="panel-cart">
                                <div className="cart-contain">
                                    <div className="cart-count flex jf-al-center">
                                        0
                                    </div>
                                    <div className="cart-img">
                                        <Link to="/cart">
                                            <img src={iconCart} alt="" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__main">
                    <div className="container-fluid header__main__content">
                        <div onClick={handleToggleMenuMobile} className="menu-bar" id="menu-ham">
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
                                <button onClick={handleSubmitQuery} className="btn-input" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div className="menu-pc flex lf-al-center">
                            <nav>
                                <ul id="nav" className="nav flex jf-al-center">
                                    <li className="nav-item  has-mega">
                                        <Link to="/tfm-clothing" className="nav-link">TFM CLOTHING <i className="fa fa-angle-down"></i></Link>

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
                                        <Link to="/brand" className="nav-link">Sneakers <i className="fa fa-angle-down"></i></Link>

                                        <div className="mega-content">
                                            <ul className="flex f-wrap">
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/giay-adidas-chinh-hang">
                                                            <span>Adidas</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/nike">
                                                            <span>Nike</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/vans">
                                                            <span>Vans</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/converse">
                                                            <span>Converse</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/fila">
                                                            <span>Fila</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/reebok">
                                                            <span>Reebok</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/puma">
                                                            <span>Puma</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/domba">
                                                            <span>Domba</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                                <li className="mega-item flex jf-al-center col-3" >
                                                    <h4 className="mega-item-title">
                                                        <Link className="mega-item-url" to="/asic">
                                                            <span>Asic</span>
                                                        </Link>
                                                    </h4>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item  ">
                                        <Link className="nav-link" to="/champion">Champion</Link>
                                    </li>
                                    <li className="nav-item" >
                                        <Link className="nav-link" style={{ color: 'red' }} to="/giam-gia-1">Giảm Giá</Link>
                                    </li>
                                    <li className="nav-item  ">
                                        <Link className="nav-link" to="/tin-tuc">Tin Tức</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

NavBar.propTypes = {
    // cart: PropTypes.object.isRequired,
    // removeItemFromCart: PropTypes.func.isRequired,
    // changeQuantityItemCart: PropTypes.func.isRequired,
    // removeAllItemCart: PropTypes.func.isRequired,
}

export default NavBar

