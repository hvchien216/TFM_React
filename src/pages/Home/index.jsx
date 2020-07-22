import React from "react";
import PropTypes from "prop-types";
import banner1 from "./../../assets/index_banner_medium_1___1_image.jpg";
import banner2 from "./../../assets/index_banner_medium_1___2_image.jpg";
import { Link } from "react-router-dom";
import "./style.scss";
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
    </section>
  );
}

Home.propTypes = {};

export default Home;
