import BaseService from "./base-service";

/*
* Service to hanlde operations on user login
*/
class UserService extends BaseService {
  login(username, password) {
    return new Promise((resolve, reject) => {
      if (username === "admin" && !password) {
        resolve({ firstname: "Bala" });
      } else {
        reject({ msg: "Invalid Username" });
      }
    });
  }
}
export default new UserService();
