import axiosClient from "./axiosClient";

const userApi = {
  register: (userData) => {
    const url = '/auth/register';
    let data = {
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName,
    }
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  getInfo: (token) => {
    const url = '/auth/profile';
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    return axiosClient.get(url, config);
  },
  updateProfile: (data) => {
    const url = '/auth/profile';
    return axiosClient.put(url, data);
  },
  resetPassword: (data) => {
    const url = '/auth/reset-password';
    return axiosClient.post(url, data);
  },
  changePassword: (data) => {
    const url = '/auth/change-password';
    return axiosClient.put(url, data);
  },
  yourOrder: () => {
    const url = '/order';
    return axiosClient.get(url);
  },
  yourOrderDetail: (code_order) => {
    const url = `/order/${code_order}`;
    return axiosClient.get(url);
  },
}

export default userApi; 