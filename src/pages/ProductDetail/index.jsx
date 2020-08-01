import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../commons/utils";
import AlertDialog from "../../components/AlertDialog";
import SelectQuan from "../../components/SelectQuan";
import productApi from "./../../api/productApi";
import { addToCart } from "./../../redux/actions/cartActions";
import { fetchingData } from "./../../redux/actions/uiActions";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import "./style.scss";
import { CircularProgress } from "@material-ui/core";
import { setAndGetViewedProducts } from "./../../commons/utils";
import ViewedProducts from "../../components/ViewedProducts";
function ProductDetail(props) {
  const [product, setProduct] = useState({});
  const [viewedProducts, setViewedProducts] = useState([]);
  const [quantity, setQuanity] = useState(1);
  const [sizee, setSizee] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);
  const [infoAlert, setInfoAlert] = useState({});

  const fetchProductDetails = useCallback(async () => {
    console.log("show modal!!!!");
    props.fetchingData();
    let { data } = await productApi.detail(props.match.params.maSP);
    props.fetchingData();
    const {
      id,
      name,
      category: { slug, name: nameCategory },
      description,
      images,
      specs,
      price,
      discount_rate,
    } = data;
    let mapSize = specs.map(({ attribute_item }) => attribute_item.name).sort();
    const dataShow = {
      id: id,
      name: name,
      brand: slug,
      slug: slug,
      specification_id: specs.id,
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
    console.log(dataShow);
    setProduct(dataShow);
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleChooseSize = (e) => {
    e.stopPropagation();
    setSizee(e.target.value);
  };

  const handleChangeQuan = (quan) => {
    if (quan === -1 && quantity === 1) {
      return;
    }
    let newQuan = quantity + quan;
    setQuanity(newQuan);
  };

  const handleAddToCart = () => {
    const { name, brand, price, discount, img, id, specification_id } = product;
    if (!sizee) {
      setError("Please choose size");
      return;
    }
    const data = {
      product_id: id,
      name,
      brand,
      specification_id: specification_id,
      img: img,
      quantity,
      price: Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      total:
        quantity * Math.ceil(price - price * (parseInt(discount || 0) / 100)),
      size: sizee,
    };
    console.log("data==>", data);
    props.addToCart(data);
    setShowAlert(true);
    setInfoAlert(data);
  };
  const renderUiProductDetailMain = () => {
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
                    sizee == ele.toString() ? "size-item active" : "size-item";
                  return (
                    <input
                      key={"size-item" + ele}
                      value={ele}
                      type="text"
                      readOnly
                      className={c}
                      onClick={handleChooseSize}
                    />
                  );
                })}
            </div>
          </div>
          <span style={{ color: "red", fontSize: 12 }}>{error}</span>
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
                onClick={handleAddToCart}
                type="button"
                className="btn-add-to-cart libra-sport___button"
                title="Mua ngay"
              >
                <span>
                  <i className="fa fa-shopping-bag" aria-hidden="true"></i> Mua
                  ngay
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
    rel_img,
    size,
  } = product;
  return (
    <>
      <AlertDialog
        open={showAlert}
        close={setShowAlert}
        data={{ ...infoAlert }}
      />
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
  showLoading: PropTypes.func.isRequired,
  fetchingData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isFetchingData: state.ui.isFetchingData,
  };
};
const mapDispatchToProps = {
  addToCart,
  fetchingData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
