import React from "react";
import { Link } from "react-router-dom";
import { BREADBRUMBS } from "../../commons/constant";
import "./style.scss";
function BreadScrumb(props) {
  const renderBreadCrumbs = (
    path = props.path,
    productDetail = props.productDetail
  ) => {
    let pathArr;
    if (productDetail) {
      pathArr = [productDetail.slugBrand];
    } else {
      pathArr = path.pathname.split("/");
      pathArr = pathArr.filter((path) => path !== "collections");

      pathArr.shift();
      if (
        pathArr.some((path) => BREADBRUMBS[path.toLowerCase()] === undefined)
      ) {
        return;
      }
    }
    let breadScrumb = pathArr.map((item) => {
      return (
        <li key={"breadScrumb" + item}>
          <Link to={BREADBRUMBS[item.toLowerCase()].to}>
            <span>{BREADBRUMBS[item.toLowerCase()].label}</span>
          </Link>
        </li>
      );
    });
    breadScrumb.unshift(
      <li key={"breadScrumb root"}>
        <Link to="/">
          <span>Trang chủ</span>
        </Link>
      </li>
    );
    if (productDetail) {
      breadScrumb.push(
        <li key={`breadScrumb ${productDetail.slugProduct}`}>
          <Link to={productDetail.slugProduct}>
            <span>{productDetail.name}</span>
          </Link>
        </li>
      );
    }
    return breadScrumb;
  };
  if (props.path === "/") return null;
  return (
    <section className="breadscrumb-nav">
      <div className="container-fluid">
        <ul className="breadscrumb-nav-list flex">{renderBreadCrumbs()}</ul>
      </div>
    </section>
  );
}

export default BreadScrumb;
