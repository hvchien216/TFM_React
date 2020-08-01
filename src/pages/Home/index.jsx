import React from "react";
import PropTypes from "prop-types";
import banner1 from "./../../assets/index_banner_medium_1___1_image.jpg";
import banner2 from "./../../assets/index_banner_medium_1___2_image.jpg";
import { Link } from "react-router-dom";
import "./style.scss";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// const settings = {
//   dots: true,
//   infinite: true,
//   // lazyLoad: true,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   speed: 500,
//   slidesToShow: 5,
//   slidesToScroll: 2,
//   initialSlide: 0,
//   nextArrow: <SampleNextArrow />,
//   prevArrow: <SamplePrevArrow />,
// };

// function SampleNextArrow(props) {
//   const { onClick } = props;
//   return (
//     <div className="bs-btn next" onClick={onClick}>
//       <i class="fas fa-chevron-right"></i>
//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { onClick } = props;
//   return (
//     <div className="bs-btn pre" onClick={onClick}>
//       <i class="fas fa-chevron-left"></i>
//     </div>
//   );
// }

function Home(props) {
  return (
    <section className="home">
      <h2 className="title__banner">THƯƠNG HIỆU NỔI BẬT</h2>
      <section className="sec__banner flex">
        <div className="sec__banner__item">
          <Link to="/">
            <img src={banner1} alt="" />
          </Link>
        </div>
        <div className="sec__banner__item">
          <Link to="/">
            <img src={banner2} alt="" />
          </Link>
        </div>
      </section>
      {/* <div className="container-fluid">
        <Slider {...settings}>
          <div style={{ width: "20%" }}>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div> */}
    </section>
  );
}

Home.propTypes = {};

export default Home;
