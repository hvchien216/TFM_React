import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './style.scss';
import { API_PRODUCT, SORT_PAGI } from './../../commons/constant';
import ProductItem from '../../components/ProductItem';
function Products(props) {

    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState(1);
    const mapOption = SORT_PAGI.map((item) => {
        return (
            <option key={'sort' + item.name} value={item.value}>{item.name}</option>
        )
    })

    const mapProductItem = [...products].map((item) => {
        return (
            <ProductItem
                key={'product-item' + item.id}
                id={item.id}
                name={item.name}
                img={item.img && item.img[0]}
                price={item.price}
                discount={item.discount}
            />
        )
    })

    const handleChangeSelect = (e) => {
        setSort(e.target.value);
        console.log(e.target.value)
        switch (e.target.value) {
            case '1': {
                console.log("1", products);
                const arrNew = [...products].sort((a, b) => a.name.localeCompare(b.name));
                console.log("2", arrNew)
                return setProducts(arrNew);
            }
            case '2': {
                const arrNew = [...products].sort((a, b) => b.name.localeCompare(a.name));
                return setProducts(arrNew);
            }
            case '3': {
                const arrNew = [...products].sort((a, b) => (a.price - (a.price * (a.discount / 100))) - (b.price - (b.price * (b.discount / 100))));
                return setProducts(arrNew);
            }
            case '4': {
                const arrNew = [...products].sort((a, b) => (b.price - (b.price * (b.discount / 100))) - (a.price - (a.price * (a.discount / 100))));
                return setProducts(arrNew);
            }
            default: return;
        }
    }

    useEffect(() => {
        // const data = API_PRODUCT.filter((item, index) => {
        //     return item.brand === props.match.params.maBrand;
        // })
        setProducts(API_PRODUCT);
    }, [])


    return (
        <>
            <div className="products container-fluid flex">
                <aside className="products-sidebar">
                    1
                </aside>
                <section className="products-main">
                    <div className="category-header">
                        <div id="sortBar">
                            <select onChange={handleChangeSelect} value={sort} name="sortPagi" id="sortPagi">
                                {mapOption}
                            </select>
                        </div>
                    </div>
                    <div className="products-main-content flex">
                        {mapProductItem}
                    </div>
                </section>

            </div>
        </>
    )
}

Products.propTypes = {

}

export default Products;

