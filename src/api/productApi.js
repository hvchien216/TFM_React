import axiosClient from "./axiosClient";

const productApi = {
  list: (params = {}) => {
    if (!params.page) params.page = 1;
    params.limit = 5;
    const url = `/product`;
    return axiosClient.get(url, { params });
  },

  detail: (slug) => {
    const url = `/product/${slug}`;
    return axiosClient.get(url);
  },
}

export default productApi; 