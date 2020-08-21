import axiosClient from "./axiosClient";

const productApi = {
  list: (params = {}) => {
    if (!params.page) params.page = 1;
    if (!params.limit) params.limit = 12;
    const url = `/product`;
    return axiosClient.get(url, { params });
  },

  detail: (slug) => {
    const url = `/product/${slug}`;
    return axiosClient.get(url);
  },
  discountProductList: (params = {}) => {
    if (!params.page) params.page = 1;
    if (!params.limit) params.limit = 12;
    const url = `/product-discount`;
    return axiosClient.get(url, { params });
  }
}

export default productApi; 