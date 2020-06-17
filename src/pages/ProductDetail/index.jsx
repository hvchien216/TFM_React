import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss';
import { API_PRODUCT } from './../../commons/constant';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../commons/utils';
import SelectQuan from '../../components/SelectQuan';
import { connect } from 'react-redux';
import { addToCart } from './../../redux/actions/cartActions';
function ProductDetail(props) {

    const [product, setProduct] = useState({});
    const [quantity, setQuanity] = useState(1);
    const [sizee, setSizee] = useState(null);

    useEffect(() => {
        const pro = API_PRODUCT.filter((ele, index) => {
            return ele.id == props.match.params.maSP;
        })
        setProduct(pro[0]);
    }, [])

    const handleChooseSize = (e) => {
        e.stopPropagation();
        setSizee(e.target.value);
    }

    const handleChangeQuan = (quan) => {
        if (quan === -1 && quantity === 1) {
            return;
        }
        let newQuan = quantity + quan;
        setQuanity(newQuan);
    }

    const handleAddToCart = () => {
        const { name, brand, price, img } = product;
        const data = {
            id: props.match.params.maSP,
            name,
            brand,
            img: img && img[1],
            quantity,
            price,
            size: sizee
        }
        console.log("data==>", data)
        props.addToCart(data);
    }

    const { name, brand, nameBrand, discount, price, img, rel_img, size } = product;
    return (
        <section className="product-detail-tempalte">
            <div className="container-fluid">
                <div className="product-detail-main flex">
                    <div className="pro-image-list">
                        <div className="image-large">
                            <img src={img && img[0]} alt="" />
                        </div>
                    </div>
                    <div className="pro-details">
                        <div className="pro-details-title">
                            <h2>{name}</h2>
                        </div>
                        <div className="pro-details-vendor">
                            <label>Hãng: </label>
                            <span className="vendor_item">
                                <Link to={'/products/' + brand}>{nameBrand}</Link>
                            </span>
                        </div>
                        <div className="pro-details-price-box">
                            <div className="special-price">
                                <span className="price">
                                    {(discount) ?
                                        formatCurrency(Math.ceil((price - (price * (discount / 100)))), '₫')
                                        :
                                        price && formatCurrency(price, '₫')
                                    }
                                </span>
                            </div>
                            {discount ? <div className="old-price">
                                <span className="price">
                                    {price && formatCurrency(price, '₫')}
                                </span>
                            </div> : null}

                        </div>
                        <div className="pro-details-size">
                            <label>Size: </label>
                            <div className="size-box-content">
                                {size && size.map(ele => {
                                    let c = sizee == ele.toString() ? 'size-item active' : 'size-item';
                                    return (
                                        <input
                                            key={'size-item' + ele}
                                            value={ele}
                                            type="text"
                                            readOnly
                                            className={c}
                                            onClick={handleChooseSize}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <div className="pro-details-action">
                            <div className="pro-details-quantity">
                                <label>Số lượng: </label>
                                <SelectQuan
                                    quantity={quantity}
                                    handleIncre={() => handleChangeQuan(1)}
                                    handleDescre={() => handleChangeQuan(-1)}
                                />
                            </div>
                            <div className="button-actions">
                                <button onClick={handleAddToCart} type="button" className="btn-add-to-cart libra-sport___button" title="Mua ngay">
                                    <span><i className="fa fa-shopping-bag" aria-hidden="true"></i> Mua ngay</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
ProductDetail.propTypes = {
    addToCart: PropTypes.func.isRequired,
}

const mapStateToProps = null;
const mapDispatchToProps = {
    addToCart
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

