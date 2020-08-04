import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import SelectQuan from "../../components/SelectQuan";
import ViewedProducts from "../../components/ViewedProducts";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import {
  alertNotification,
  isObjectEmpty,
  setAndGetViewedProducts,
} from "./../../commons/utils";
import { addToCart } from "./../../redux/actions/cartActions";
import {
  fetchingData,
  fetchProductDetail,
  setError,
} from "./../../redux/actions/uiActions";
import "./style.scss";
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const [viewedProducts, setViewedProducts] = useState([]);
  const [quantity, setQuanity] = useState(1);
  const [quanOfProduct, setQuanOfProduct] = useState(1);
  const [sizee, setSizee] = useState(null);
  const [specification_id, setSpecification_id] = useState(null);

  const fetchProductDetails = useCallback(async () => {
    props.fetchingData();
    let data = await props.fetchProductDetail(props.match.params.maSP);
    if (isObjectEmpty(data)) {
      props.fetchingData();
      return;
    }
    props.fetchingData();
    const {
      id,
      name,
      category: { slugCategory, name: nameCategory },
      slug,
      description,
      images,
      specs,
      price,
      discount_rate,
    } = data;
    let mapSize = specs
      .map(({ attribute_item: { name }, id, quantity }) => ({
        id,
        name,
        quantity,
      }))
      .sort()
      .reverse();
    let quanOfProduct = mapSize.reduce((acc, cur) => acc + cur.quantity, 0);
    const dataShow = {
      id: id,
      name: name,
      brand: slugCategory,
      slug: slug,
      nameBrand: nameCategory,
      description: description,
      discount: discount_rate,
      price: price,
      img: images.filter((img) => img.is_main === true)?.image_large || imgTemp,
      rel_img: images.filter((img) => img.is_main !== true),
      size: mapSize,
    };
    const { images: recentProducts } = setAndGetViewedProducts(dataShow);
    setViewedProducts(recentProducts);
    setQuanOfProduct(quanOfProduct);
    setProduct(dataShow);
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChooseSize = (e) => {
    e.stopPropagation();
    let quanOfProductShow = product.size.filter(
      (ele) => ele.id === parseInt(e.target.name)
    )[0].quantity;
    setSizee(e.target.value);
    setSpecification_id(e.target.name);
    setQuanOfProduct(quanOfProductShow);
  };

  const handleChangeQuan = (quan) => {
    if (quan === -1 && quantity === 1) {
      return;
    }
    let newQuan = quantity + quan;
    setQuanity(newQuan);
  };

  const handleAddToCart = () => {
    const { name, slug, brand, price, discount, img, id } = product;
    if (!sizee) {
      props.setError("Vui lòng chọn size !!!");
      return;
    }
    const data = {
      product_id: id,
      name,
      slug,
      brand,
      specification_id,
      img: img,
      quantity,
      price: Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      total:
        quantity * Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      size: sizee,
    };
    props.addToCart(data);
    alertNotification(
      <span>
        {`Bạn đã thêm `}
        <span
          style={{ color: "red" }}
        >{`[${data.quantity} ${data.name}, size: ${data.size}]`}</span>
        {` vào giỏ hàng`}
      </span>,
      "info"
    );
  };
  const renderUiProductDetailMain = () => {
    if (isObjectEmpty(product)) {
      return <div className="text-warning">Không tìm thấy sản phẩm</div>;
    }
    return (
      <div className="product-detail-main flex">
        <div className="pro-image-list">
          <div className="image-large">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="pro-details">
          <div className="pro-details-title">
            <h2>{name}</h2>
          </div>
          <div className="pro-details-vendor">
            <label>Hãng: </label>
            <span className="vendor_item">
              <Link to={"/products/" + brand}>{nameBrand}</Link>
            </span>
          </div>
          <div className="pro-details-price-box">
            <div className="special-price">
              <span className="price">
                {discount
                  ? formatCurrency(
                      Math.ceil(price - price * (discount / 100)),
                      "₫"
                    )
                  : price && formatCurrency(price, "₫")}
              </span>
            </div>
            {discount ? (
              <div className="old-price">
                <span className="price">
                  {price && formatCurrency(price, "₫")}
                </span>
              </div>
            ) : null}
          </div>
          <div className="pro-details-size">
            <label>Size: </label>
            <div className="size-box-content">
              {size &&
                size.map((ele) => {
                  let c =
                    sizee === ele.name.toString()
                      ? "size-item active"
                      : "size-item";
                  return (
                    <input
                      key={"size-item" + ele.id}
                      value={ele.name}
                      name={ele.id}
                      type="text"
                      readOnly
                      className={c}
                      onClick={handleChooseSize}
                    />
                  );
                })}
            </div>
          </div>
          <div className="pro-details-quan-of-product">
            <label>{quanOfProduct} sản phẩm có sẵn</label>
          </div>
          <div className="pro-details-action">
            <div className="pro-details-quantity">
              <label>Số lượng: </label>
              <SelectQuan
                detail={true}
                quantity={quantity}
                handleIncre={() => handleChangeQuan(1)}
                handleDescre={() => handleChangeQuan(-1)}
              />
            </div>
            <div className="button-actions">
              <button
                style={!quanOfProduct ? { background: "#8e8a8a" } : null}
                onClick={handleAddToCart}
                type="button"
                className="btn-add-to-cart libra-sport___button"
                title="Mua ngay"
                disabled={!quanOfProduct}
              >
                <span>
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                  {quanOfProduct ? "Mua ngay" : "Hết hàng"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const {
    name,
    brand,
    nameBrand,
    discount,
    price,
    img,
    // rel_img,
    size,
  } = product;
  return (
    <>
      <section className="product-detail-tempalte">
        <div className="container-fluid">
          {props.isFetchingData ? (
            <div className="flex jf-center mtb100" style={{ width: "100%" }}>
              <CircularProgress size={80} color="secondary" />
            </div>
          ) : (
            renderUiProductDetailMain()
          )}
        </div>
      </section>
      <ViewedProducts products={viewedProducts} />
    </>
  );
}
ProductDetail.propTypes = {
  addToCart: PropTypes.func.isRequired,
  fetchingData: PropTypes.func.isRequired,
  fetchProductDetail: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isFetchingData: state.ui.isFetchingData,
  };
};
const mapDispatchToProps = {
  addToCart,
  fetchingData,
  fetchProductDetail,
  setError,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
