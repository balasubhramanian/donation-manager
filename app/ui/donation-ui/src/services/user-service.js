import BaseService from "./base-service";
import { Promise } from "es6-promise";
class UserService extends BaseService {
  login(username, password) {
    let promise = this.post("/login", { username, password });
    return promise;

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
  }

  getAllUser() {
    return this.get("/user");
  }

  addUser(payload) {
    return this.post("/user", payload);
  }
}

export default new UserService();
