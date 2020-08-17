import { CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import BreadScrumb from "../../components/BreadScrumb";
import ProductItem from "../../components/ProductItem";
import imgTemp from "./../../assets/logo.png";
import { fetchingData, fetchListProduct } from "../../redux/actions/uiActions";
import "./style.scss";
import { alertNotification } from "../../commons/utils";

function Search(props) {
  const [products, setProducts] = useState({ results: [] });
  const [page, setPage] = useState(1);

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
    props.fetchingData();

    if (sessionStorage.getItem("flag-search")) {
      alertNotification(
        `Có ${data?.total} sản phẩm phù hợp với từ khóa "${
          qs.parse(history.location.search)?.keyword
        }" của bạn`
      );
      sessionStorage.removeItem("flag-search");
    }
    setProducts(data);
  }, [history.location.search]);

  useEffect(() => {
    if (!history.location.search || !qs.parse(history.location.search).keyword)
      return;
    fetchProductList();
  }, [fetchProductList]);

  const handlePageChange = (e, value) => {
    let query = qs.parse(history.location.search);
    query.page = value;
    history.push({
      pathname: "/search",
      search: qs.stringify(query),
    });
    setPage(value);
  };
  const mapProductItem = () => {
    let xhtml = (
      <div className="text-warning mlr15">
        Không tìm thấy sản phẩm phù hợp với từ khóa{" "}
      </div>
    );
    if (productList.length > 0) {
      xhtml = productList.map((item) => {
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

      <div className="products-search container-fluid flex">
        <section className="products-search-main">
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

Search.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Search);
