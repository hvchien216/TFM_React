import axiosClient from "./axiosClient";

const userApi = {
  register: (data) => {
    const url = '/user/register';
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = '/user/login';
    return axiosClient.post(url, data);
  },

}

export default userApi; 