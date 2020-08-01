import qs from "query-string";
import React from "react";
import { Link } from "react-router-dom";
import { BREADBRUMBS } from "../../commons/constant";
import "./style.scss";
function BreadScrumb(props) {
  const renderBreadCrumbs = (path = props.path) => {
    let pathArr = path.pathname.split("/");
    let queryOnUrl = qs.parse(path.search);
    for (var key in queryOnUrl) {
      if (key === "supplier" && BREADBRUMBS.hasOwnProperty(queryOnUrl[key])) {
        pathArr = [...pathArr, queryOnUrl[key]];
      }
    }
    pathArr.shift();
    let breadScrumb = pathArr.map((item) => {
      return (
        <li key={"breadScrumb" + item}>
          <Link to={BREADBRUMBS[item].to}>
            <span>{BREADBRUMBS[item].label}</span>
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
    // let breadScrumb = null;
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
