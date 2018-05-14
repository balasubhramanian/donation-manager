import axios from "axios";
import store from "store";

export default class BaseService {
  request(data) {
    let token = this.getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.getToken();
    }
    let request = axios({ ...data, baseURL: this.getBaseUrl() });
    return request;
  }

  getDownloadUrl(path, param) {
    let url = this.getBaseUrl() + path + "?";
    let queryParam = Object.assign({ token: this.getToken() }, param);

    let queryParamStr = Object.entries(queryParam)
      .map(([key, value]) => key + "=" + (value ? value : ""))
      .join("&");

    return url + queryParamStr;
  }

  getBaseUrl() {
    return window.app.api.baseURL;
  }

  getToken() {
    if (
      store.getState() &&
      store.getState().auth &&
      store.getState().auth.user
    ) {
      return store.getState().auth.user.token;
    }
  }

  get(path, queryParam) {
    return this.request({
      method: "get",
      url: path,
      params: queryParam
    });
  }

  post(path, data) {
    return this.request({
      method: "post",
      url: path,
      data: data
    });
  }

  delete(path) {
    return this.request({
      method: "delete",
      url: path
    });
  }
}

// let q = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (username === "admin") {
//       resolve({data :{ user: "admin" , token : 'AUTH_TOKEN' }});
//     } else {
//       reject({ msg: "Invalid username or password" });
//     }
//   }, 2000);
// });
// return q;
