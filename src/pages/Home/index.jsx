import React from "react";
import { Link } from "react-router-dom";
import banner1 from "./../../assets/index_banner_medium_1___1_image.jpg";
import banner2 from "./../../assets/index_banner_medium_1___2_image.jpg";
import "./style.scss";
import Slider from "react-slick";
import { LOGO_BRAND_LIST } from "./../../commons/constant";
import promoImg from "./../../assets/slider_1_image.png";

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
const settings = {
  infinite: true,
  speed: 500,
  lazyLoad: true,
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
        initialSlide: 2,
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
function Home() {
  return (
    <section className="home">
      <img src={promoImg} alt="" />
      <h2 className="title__banner">THƯƠNG HIỆU NỔI BẬT</h2>
      <section className="sec__banner flex">
        <div className="sec__banner__item">
          <Link to="/collections/reebok">
            <img src={banner1} alt="" />
          </Link>
        </div>
        <div className="sec__banner__item">
          <Link to="/collections/reebok">
            <img src={banner2} alt="" />
          </Link>
        </div>
      </section>
      <section className="sec__carousel-logo">
        <Slider {...settings}>
          {LOGO_BRAND_LIST.map((logo) => {
            return (
              <Link
                className="carousel-logo-item"
                to={logo.to}
                key={"LOGO_BRAND_LIST " + logo.id}
              >
                <img src={logo.image} alt="" />
              </Link>
            );
          })}
        </Slider>
      </section>
    </section>
  );
}

export default Home;
