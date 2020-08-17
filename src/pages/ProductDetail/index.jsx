import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { PRODUCT_STATUSES } from "../../commons/constant";
import { formatCurrency } from "../../commons/utils";
import BreadScrumb from "../../components/BreadScrumb";
import SelectQuan from "../../components/SelectQuan";
import ViewedProducts from "../../components/ViewedProducts";
import imgTemp from "./../../assets/logo.png";
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
import Slider from "react-slick";

function ProductDetail(props) {
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [viewedProducts, setViewedProducts] = useState([]);
  const [quantity, setQuanity] = useState(1);
  const [quanOfProduct, setQuanOfProduct] = useState(1);
  const [sizee, setSizee] = useState(null);
  const [specification_id, setSpecification_id] = useState(null);
  const [specName, setSpecName] = useState(null);
  const [settings, setSettings] = useState(null);
  const fetchProductDetails = useCallback(async () => {
    props.fetchingData();
    let data = await props.fetchProductDetail(props.match.params.maSP, history);
    if (!data || typeof data !== "object") {
      props.fetchingData();
    } else {
      if (isObjectEmpty(data)) {
        props.fetchingData();
        return;
      }
    }
    props.fetchingData();
    const {
      id,
      name,
      category: { slug: slugCategory },
      supplier: { name: nameSuplier },
      slug,
      description,
      images,
      specs,
      price,
      discount_rate,
      status,
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
    let img =
      images.length > 0
        ? images
        : [{ id: 1, image_avatar_url: imgTemp, is_main: true }];
    const dataShow = {
      id,
      name,
      brand: slugCategory,
      slug,
      nameBrand: nameSuplier,
      description: description,
      discount: discount_rate,
      price,
      img,
      size: mapSize,
      status,
    };
    const { images: recentProducts } = setAndGetViewedProducts(dataShow);
    setSettings({
      customPaging: function (i) {
        return (
          <a>
            <img src={img[i].image_avatar_url} alt="" />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
    setViewedProducts(recentProducts);
    setQuanOfProduct(quanOfProduct);
    setProduct(dataShow);
  }, [props.match.params.maSP]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChooseSize = (e) => {
    e.stopPropagation();
    let quanOfProductShow = product.size.filter(
      (ele) => ele.id === parseInt(e.target.name)
    )[0].quantity;
    setQuanity(1);
    setSizee(e.target.value);
    setSpecification_id(e.target.name);
    setSpecName(e.target.value);
    setQuanOfProduct(quanOfProductShow);
  };

  const handleChangeQuan = (quan) => {
    let newQuan = quantity + quan;
    setQuanity(newQuan);
  };

  const handleAddToCart = () => {
    const { name, slug, brand, price, discount, img, id } = product;
    if (!sizee) {
      props.setError("Vui lòng chọn size !!!");
      return;
    }
    const img_url = img.filter((img) => img.is_main)[0].image_avatar_url;
    const data = {
      product_id: id,
      name,
      slug,
      brand,
      specification_id,
      specName,
      img: img_url,
      quantity,
      price: Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      total:
        quantity * Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      size: sizee,
      quanOfProduct,
    };
    props.addToCart(data);
    alertNotification(
      <span>
        {`Bạn đã thêm `}
        <span
          style={{ color: "red" }}
        >{`[${data.quantity} ${data.name}, size: ${data.size}]`}</span>
        {` vào giỏ hàng`}
      </span>
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
            {settings && (
              <Slider {...settings}>
                {img.map((img) => (
                  <img
                    className="slider-img-item"
                    key={"show-img-slider" + img.id}
                    src={img.image_avatar_url}
                    alt=""
                  />
                ))}
              </Slider>
            )}
          </div>
        </div>
        <div className="pro-details">
          <div className="pro-details-title">
            <h2>{name}</h2>
          </div>
          <div className="pro-details-vendor">
            <label>Hãng: </label>
            <span className="vendor_item">
              <Link to={"/collections/" + brand}>{nameBrand}</Link>
            </span>
          </div>
          <p>
            <strong>Tình trạng: </strong> {PRODUCT_STATUSES[status]}
          </p>
          <br />

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
                quanOfProduct={quanOfProduct}
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
    slug,
    price,
    img,
    size,
    status,
  } = product;
  return (
    <>
      {brand && slug && name && (
        <BreadScrumb
          path={history.location}
          productDetail={{ slugBrand: brand, slugProduct: slug, name }}
        />
      )}

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
        <ViewedProducts products={viewedProducts} />
      </section>
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
