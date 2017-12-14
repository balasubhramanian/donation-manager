import BaseService from "./base-service";
import { Promise } from "es6-promise";
class UserService extends BaseService {
  login(username, password) {
    //let promise = this.post({username,password})
    //return promise;

    let q = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin") {
          resolve({ user: "admin" });
        } else {
          reject({ msg: "Invalid username or password" });
        }
      }, 2000);
    });
    return q;
  }
}

export default new UserService();
