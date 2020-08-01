import axiosClient from "./axiosClient";

const cartApi = {
  checkout: (data) => {
    const url = '/checkout';
    return axiosClient.post(url, data);
  },
}

export default cartApi; 