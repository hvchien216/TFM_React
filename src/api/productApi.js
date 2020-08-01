import axiosClient from "./axiosClient";

const productApi = {
  list: (params = {}) => {
    console.log("params is here==>", params);
    const url = '/product';
    return axiosClient.get(url, { params });
  },

  detail: (slug) => {
    const url = `/product/${slug}`;
    return axiosClient.get(url);
  },
}

export default productApi; 