import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductItem from "../ProductItem";
import imgTemp from "./../../assets/stan-smith-shoes-white-m20605-01-standard.jpg";
import "./style.scss";
const settings = {
  dots: true,
  infinite: true,
  // lazyLoad: true,
  // autoplay: true,
  autoplaySpeed: 2000,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
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
  const mapProductItem = (isCarouselItem) => {
    return (
      products &&
      products.map((item, index) => {
        let price = Math.ceil(
          item?.price - item?.price * (parseInt(item?.discount || 0) / 100)
        );
        return (
          <ProductItem
            isCarouselItem={isCarouselItem}
            key={"recent-product-" + item.id}
            id={item.slug}
            name={item.name}
            img={item?.default_image || imgTemp}
            price={price || 0}
            discount={0}
          />
        );
      })
    );
  };

  const carouselProduct = () => {
    let xhtml = null;
    if (products.length <= 4) {
      xhtml = (
        <div className="module-content-box flex">{mapProductItem(false)}</div>
      );
    } else {
      xhtml = <Slider {...settings}>{mapProductItem(true)}</Slider>;
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
