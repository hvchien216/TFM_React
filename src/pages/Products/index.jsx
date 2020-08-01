import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { API_PRODUCT, SORT_PAGI, FILTER_BY } from "./../../commons/constant";
import ProductItem from "../../components/ProductItem";
import RadioButton from "../../components/RadioBtn";
import { useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import productApi from "./../../api/productApi";
import {
  hideLoading,
  showLoading,
  fetchingData,
} from "./../../redux/actions/uiActions";
import { connect } from "react-redux";
import qs from "query-string";
import imgTemp from "./../../assets/domba.jpg";
import { CircularProgress } from "@material-ui/core";
function Products(props) {
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [cc, setCC] = useState(1);
  const [_pageSize, _setPageSize] = useState(5);

  const [sort, setSort] = useState(1);
  const history = useHistory();
  const handleScrollInfinite = () => {
    const lastProductItem = document.getElementById("last-product-item");

    if (window.pageYOffset + 200 - lastProductItem.offsetTop >= 50) {
      setCC(cc + 1);
    }
  };
  const fetchProductList = useCallback(async () => {
    let query = qs.parse(history.location.search);
    for (let key in query) {
      if (!query[key]) {
        delete query[key];
      }
    }
    props.fetchingData();
    let { data } = await productApi.list(query);
    props.fetchingData();
    setProducts(data.results);
  }, [history.location.search]);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);
  // useEffect(() => {
  //   // const list = document.getElementById("list-product");
  //   // const footer = document.querySelector("footer");
  //   // const nearFooter = document.getElementById("tfm-copy-right");
  //   // list has auto height
  //   window.addEventListener("scroll", handleScrollInfinite);

  //   return () => {
  //     window.removeEventListener("scroll", handleScrollInfinite);
  //   };

  //   // const data = API_PRODUCT.filter((item, index) => {
  //   //     return item.brand === props.match.params.maBrand;
  //   // })
  //   // setProducts(API_PRODUCT);
  // }, []);

  // useEffect(() => {
  //   console.log("heheheh");
  //   getData();
  // }, [cc]);

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
    history.push({
      pathname: history.pathname,
      search: qs.stringify(query),
    });
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
    console.log("Sort here===>", e.target.value);
    setSort(e.target.value);
    switch (e.target.value) {
      case "1": {
        const arrNew = [...products].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        // console.log("2", arrNew)
        setProducts(arrNew);
        console.log("1==>", arrNew);
        return;
      }
      case "2": {
        const arrNew = [...products].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setProducts(arrNew);
        console.log("2==>", arrNew);
        return;
      }
      case "3": {
        const arrNew = [...products].sort(
          (a, b) =>
            a.price -
            a.price * (a.discount / 100) -
            (b.price - b.price * (b.discount / 100))
        );
        setProducts(arrNew);
        console.log("3==>", arrNew);
        return;
      }
      case "4": {
        const arrNew = [...products].sort(
          (a, b) =>
            b.price -
            b.price * (b.discount / 100) -
            (a.price - a.price * (a.discount / 100))
        );
        setProducts(arrNew);
        console.log("4==>", arrNew);
        return;
      }
      default:
        return;
    }
  };
  const mapProductItem = () => {
    let xhtml = <div class="text-warning">Không tìm thấy sản phẩm phù hợp</div>;
    if (products.length > 0) {
      xhtml = products.map((item, index) => {
        return (
          <ProductItem
            key={"product-item" + item.id}
            id={item.slug}
            name={item.name}
            img={item?.default_image || imgTemp}
            price={item?.price || 0}
            discount={item?.discount_rate}
            index={index}
            setId={products.length - 1 === index ? true : false}
          />
        );
      });
    }
    return xhtml;
  };

  // const getData = () => {
  //   console.log("get more!!!");
  //   // setProducts([...products, ...API_PRODUCT]);
  //   console.log("page getData===>", cc, _pageSize * cc);
  //   let arr = API_PRODUCT.slice(0, _pageSize * cc);
  //   setProducts(arr);
  //   // if (load) {
  //   //   fetch('https://dog.ceo/api/breeds/image/random/15')
  //   //     .then(res => {
  //   //       return !res.ok
  //   //       ? res.json().then(e => Promise.reject(e))
  //   //       : res.json();
  //   //     })
  //   //     .then(res => {
  //   //       props.setState([...props.state, ...res.message]);
  //   //     });
  //   // }
  // };

  const handleToggleSidebar = () => {
    const sideBar = document.querySelector(".products-sidebar");
    sideBar.classList.toggle("open-sidebar");
  };
  const handleTest = () => {};
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
            <div>
              <button onClick={handleTest}>Click me!</button>
            </div>
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
        </section>
      </div>
    </>
  );
}

Products.propTypes = {
  showLoading: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired,
  isFetchingData: PropTypes.bool.isRequired,
  fetchingData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isFetchingData: state.ui.isFetchingData,
  };
};
const mapDispatchToProps = {
  showLoading,
  hideLoading,
  fetchingData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
