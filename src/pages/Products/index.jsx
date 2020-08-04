import { CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import ProductItem from "../../components/ProductItem";
import RadioButton from "../../components/RadioBtn";
import imgTemp from "./../../assets/domba.jpg";
import { FILTER_BY, SORT_PAGI } from "./../../commons/constant";
import {
  fetchingData,
  fetchListProduct,
} from "./../../redux/actions/uiActions";
import "./style.scss";
import { alertNotification } from "../../commons/utils";

function Products(props) {
  const [products, setProducts] = useState({ results: [] });
  const [page, setPage] = useState(1);

  const [sort, setSort] = useState(1);
  const history = useHistory();
  const { results: productList, total_page } = products;

  const fetchProductList = useCallback(async () => {
    let query = qs.parse(history.location.search);
    for (let key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    //tránh sai current_page khi chuyển route = nút BACK
    setPage(parseInt(query.page));
    props.fetchingData();
    const data = await props.fetchListProduct(query, history);
    const { total } = data;
    if (sessionStorage.getItem("flag-search")) {
      alertNotification(`Có ${total} sản phẩm phù hợp với tìm kiếm của bạn`);
      sessionStorage.removeItem("flag-search");
    }
    props.fetchingData();
    setProducts(data);
  }, [history]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  const handleChangeChecked = (e) => {
    let queryOnUrl = qs.parse(history.location.search);
    let value = JSON.parse(e.target.value);
    let query = {
      ...queryOnUrl,
      ...value,
    };
    for (let key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    query.page = 1;
    history.push({
      pathname: history.pathname,
      search: qs.stringify(query),
    });
  };

  const handlePageChange = (e, value) => {
    let query = qs.parse(history.location.search);
    query.page = value;
    history.push({
      pathname: "/products",
      search: qs.stringify(query),
    });
    setPage(value);
  };

  const mapOption = SORT_PAGI.map((item) => {
    return (
      <option key={"sort" + item.name} value={item.value}>
        {item.name}
      </option>
    );
  });
  const mapSidebarFilter = FILTER_BY.map((item) => {
    return (
      <div className="sidebar-item" key={"sibebarItem" + item.id}>
        <div className="sidebar-item-title">
          <h2 className="title-head">{item.title}</h2>
        </div>
        <div className="sidebar-item-content">
          <div className="filter-group">
            <ul className="filter-list">
              {item.items.map((ele) => {
                return (
                  <li key={"li" + item.name + ele.id}>
                    <RadioButton
                      name={"radio" + item.name}
                      title={ele.name}
                      handleChange={handleChangeChecked}
                      value={JSON.stringify(ele.value)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  });

  const handleChangeSort = (e) => {
    let { results: productList } = products;
    setSort(e.target.value);
    switch (e.target.value) {
      case "1": {
        const results = [...productList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setProducts({ ...products, results });
        return;
      }
      case "2": {
        const results = [...productList].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setProducts({ ...products, results });
        return;
      }
      case "3": {
        const results = [...productList].sort((a, b) => {
          const realPriceA = a.discount_rate
            ? a.price - a.price * (parseInt(a.discount_rate) / 100)
            : a.price;
          const realPriceB = b.discount_rate
            ? b.price - b.price * (parseInt(b.discount_rate) / 100)
            : b.price;
          return realPriceA - realPriceB;
        });
        setProducts({ ...products, results });
        return;
      }
      case "4": {
        const results = [...productList].sort((a, b) => {
          const realPriceA = a.discount_rate
            ? a.price - a.price * (parseInt(a.discount_rate) / 100)
            : a.price;
          const realPriceB = b.discount_rate
            ? b.price - b.price * (parseInt(b.discount_rate) / 100)
            : b.price;
          return realPriceB - realPriceA;
        });
        setProducts({ ...products, results });
        return;
      }
      default:
        return;
    }
  };
  const mapProductItem = () => {
    let xhtml = (
      <div className="text-warning mlr15">Không tìm thấy sản phẩm phù hợp</div>
    );
    if (productList.length > 0) {
      xhtml = productList.map((item, index) => {
        return (
          <ProductItem
            key={"product-item" + item.id}
            id={item.slug}
            name={item.name}
            img={item?.default_image || imgTemp}
            price={item?.price || 0}
            discount={item?.discount_rate}
          />
        );
      });
    }
    return xhtml;
  };

  const handleToggleSidebar = () => {
    const sideBar = document.querySelector(".products-sidebar");
    sideBar.classList.toggle("open-sidebar");
  };
  const PaginationCPN = (
    <Pagination
      page={page}
      count={total_page}
      size="large"
      color="primary"
      shape="rounded"
      onChange={handlePageChange}
      showFirstButton={total_page > 8}
      showLastButton={total_page > 8}
    />
  );
  return (
    <>
      <BreadScrumb path={history.location} />
      <div className="products container-fluid flex">
        <aside className="products-sidebar">
          <div className="products-sidebar-content">
            {mapSidebarFilter}
            <div onClick={handleToggleSidebar} className="icon-filter">
              <i className="fas fa-filter open-sidebar"></i>
              <i className="fas fa-times close-sidebar"></i>
            </div>
          </div>
        </aside>
        <section className="products-main">
          <div className="category-header">
            {PaginationCPN}
            <div id="sortBar">
              <select
                onChange={handleChangeSort}
                value={sort}
                name="sortPagi"
                id="sortPagi"
              >
                {mapOption}
              </select>
            </div>
          </div>
          <div id="list-product" className="products-main-content flex f-wrap">
            {props.isFetchingData ? (
              <div className="flex jf-center mtb100" style={{ width: "100%" }}>
                <CircularProgress size={80} color="secondary" />
              </div>
            ) : (
              mapProductItem()
            )}
          </div>
          <div className="category-header mt-20">{PaginationCPN}</div>
        </section>
      </div>
    </>
  );
}

Products.propTypes = {
  isFetchingData: PropTypes.bool.isRequired,
  fetchingData: PropTypes.func.isRequired,
  fetchListProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isFetchingData: state.ui.isFetchingData,
  };
};
const mapDispatchToProps = {
  fetchingData,
  fetchListProduct,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
