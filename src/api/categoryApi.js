import axiosClient from "./axiosClient";

const categorytApi = {
  parentList: () => {
    const url = `/category`;
    return axiosClient.get(url);
  },

  childList: (category_id) => {
    const url = `/category/${category_id}`;
    return axiosClient.get(url);
  },
}

export default categorytApi; 