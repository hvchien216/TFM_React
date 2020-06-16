import React from 'react'
import { formatCurrency } from '../../commons/utils';
import SelectQuan from '../SelectQuan';
import { Link } from 'react-router-dom';
function CartItem(props) {
    const { id, img, name, quantity, price, variantInfo, removeItem, changeQuantity, mobile } = props;
    const handleChangeQuan = (quan) => {
        changeQuantity(id, quan)
    }
    if (mobile) {
        return (
            <>
                <div className="product-item-mb flex">
                    <div className="product-item-mb-thumb">
                        <Link
                            to={name}
                            className="product-images1"
                            title={name}
                        >
                            <img
                                alt={name}
                                src={img} />
                        </Link>
                    </div>
                    <div className="product-item-mb-title">
                        <h3><Link
                            to={name}
                            title="Domba Moonlake - Trắng / 37.5">{name}</Link>
                        </h3>
                        <p className="price">Giá: <span>{formatCurrency(price, '₫')}</span></p>
                    </div>
                    <div className="product-item-mb-select-quan">
                        <SelectQuan
                            quantity={quantity}
                            handleIncre={() => handleChangeQuan(1)}
                            handleDescre={() => handleChangeQuan(-1)}
                        />
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="item-cart flex">
            <div style={{ width: '17%' }} className="flex jf-al-center image">
                <Link className="product-image" title={name} to="/domba-trang-den">
                    <img
                        alt={name}
                        src={img}
                    />
                </Link>
            </div>
            <div style={{ width: '28%' }} className="flex jf-al-center">
                <h2 className="product-name">
                    <Link to="/domba-trang-den">{name}</Link>
                    <span className="variant-title">{variantInfo}</span>
                </h2>
            </div>
            <div style={{ width: '16%' }} className="flex jf-al-center">
                <span className="item-price">{formatCurrency(price, '₫')}</span>
            </div>
            <div style={{ width: '14%' }} className="flex jf-al-center">
                <SelectQuan
                    quantity={quantity}
                    handleIncre={() => handleChangeQuan(1)}
                    handleDescre={() => handleChangeQuan(-1)}
                />
            </div>
            <div style={{ width: '20%' }} className="flex jf-al-center">
                <span className="cart-price">
                    <span className="price">{formatCurrency(quantity * price, '₫')}</span>
                </span>
            </div>
            <div onClick={() => removeItem(id)} style={{ width: '5%' }} className="flex jf-al-center">
                <div
                    className="remove-item remove-item-cart"
                    title="Xóa"
                >
                </div>
            </div>
        </div>
    )

}

export default CartItem

