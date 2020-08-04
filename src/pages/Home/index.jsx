import React from "react";
import banner1 from "./../../assets/index_banner_medium_1___1_image.jpg";
import banner2 from "./../../assets/index_banner_medium_1___2_image.jpg";
import { Link } from "react-router-dom";
import "./style.scss";

function Home() {
  return (
    <section className="home">
      <h2 className="title__banner">THƯƠNG HIỆU NỔI BẬT</h2>
      <section className="sec__banner flex">
        <div className="sec__banner__item">
          <Link to="/products?supplier=reebok">
            <img src={banner1} alt="" />
          </Link>
        </div>
        <div className="sec__banner__item">
          <Link to="/products?supplier=reebok">
            <img src={banner2} alt="" />
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Home;
