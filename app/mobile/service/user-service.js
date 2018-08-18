import BaseService from "./base-service";

class UserService extends BaseService {
  login(username, password) {
    return new Promise((resolve, reject) => {
      if (username == "admin") {
        resolve({ firstname: "Bala" });
      } else {
        reject({ msg: "Invalid Username" });
      }
    });
  }
}
export default new UserService();
