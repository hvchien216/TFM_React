import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductItem from "../ProductItem";
import "./style.scss";
const settings = {
  infinite: true,
  lazyLoad: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
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
      products.map((item) => {
        let price = Math.ceil(
          item?.price - item?.price * (parseInt(item?.discount || 0) / 100)
        );
        let img = item.img.filter((ele) => ele.is_main)[0].image_avatar_url;
        return (
          <ProductItem
            isCarouselItem={isCarouselItem}
            key={"recent-product-" + item.id}
            id={item.slug}
            name={item.name}
            img={img}
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
