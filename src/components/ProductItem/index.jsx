import React from 'react'
import PropTypes from 'prop-types'
import './style.scss';
import { Link } from 'react-router-dom';
import { formatCurrency } from './../../commons/utils';
function ProductItem(props) {
    const { id, name, price, discount, img, } = props;
    return (
        <>
            <div className="product-item">
                <div className="product-item-box">
                    <div className="product-thumbnail">
                        <div className="tag-sale sale-flash flex jf-al-center">{'-' + discount + '%'}</div>
                        <Link to={'/products/' + id} title={name}>
                            <img className="img-responsive" src={img} alt={name} />
                        </Link>
                        <div className="product-action">
                            <Link to={'/products/' + id} className="btn-see-more flex jf-al-center" title="Xem thêm" >
                                <span><i className="fa fa-eye" aria-hidden="true"></i></span>
                            </Link>
                        </div>
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">
                            <Link to={'/products/' + id} title={name}>
                                {name}
                            </Link>
                        </h3>
                        <div className="price-box price-loop-style res-item">
                            <div className="special-price">
                                <span className="price">{discount ? formatCurrency((price - (price * (discount / 100))), '₫') : formatCurrency(price, '₫')}</span>
                            </div>
                            <div className="old-price">
                                <span className="price">
                                    {discount && formatCurrency(price, '₫')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ProductItem.propTypes = {

}

export default ProductItem

