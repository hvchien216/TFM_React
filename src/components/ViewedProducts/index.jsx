import React, { useEffect } from "react";
import "./style.scss";
import { formatCurrency } from "./../../commons/utils";
import ProductItem from "../ProductItem";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const settings = {
  dots: true,
  infinite: true,
  // lazyLoad: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="bs-btn next" onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="bs-btn pre" onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
}

function ViewedProducts(props) {
  const { products } = props;
  console.log("products recent==>", products);
  const mapProductItem =
    products &&
    products.map((item, index) => {
      let price = Math.ceil(
        item?.price - item?.price * (parseInt(item?.discount) / 100)
      );
      return (
        <ProductItem
          key={"recent-product-" + item.id}
          id={item.slug}
          name={item.name}
          img={item?.default_image || imgTemp}
          price={price || 0}
          discount={0}
          // index={index}
          setId={false}
        />
      );
    });
  const carouselProduct = () => {
    let xhtml = null;
    if (products.length <= 4) {
      xhtml = <div className="module-content-box flex">{mapProductItem}</div>;
    } else {
      xhtml = <Slider {...settings}>{mapProductItem}</Slider>;
    }
    return xhtml;
  };

  return (
    <>
      <div className="container-fluid recent-products">
        <div className="module-header">
          <h2 className="title-head module-title">
            <span>Bạn đã xem</span>
          </h2>
        </div>
        <div className="module-content">{carouselProduct()}</div>
      </div>
    </>
  );
}

export default ViewedProducts;
