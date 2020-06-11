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

    return (
        <header className="header">
            <div className="header__top">
                <div className="flex">
                    <div className="col-8">
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
                    <div className="col-4 flex jf-end">
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
                                <div className="cart-img">
                                    <Link to="/cart">
                                        <img src={iconCart} alt="" />
                                    </Link>
                                </div>
                                <div className="cart-count flex jf-al-center">
                                    0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header__main">
                <div className="container-fluid">
                    <div className="logo flex jf-al-center col-2">
                        <Link to="/">
                            <img src={logo} title="The Fire Monkey Clone" alt="" />
                        </Link>
                    </div>
                    <div className="search-bar flex jf-al-center col-2">
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
                                <li className="nav-item   red-bul ">
                                    <Link className="nav-link" to="/giam-gia-1">Giảm Giá</Link>
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
    )
}

NavBar.propTypes = {
    // cart: PropTypes.object.isRequired,
    // removeItemFromCart: PropTypes.func.isRequired,
    // changeQuantityItemCart: PropTypes.func.isRequired,
    // removeAllItemCart: PropTypes.func.isRequired,
}

export default NavBar

