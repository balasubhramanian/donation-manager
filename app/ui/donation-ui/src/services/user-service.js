import BaseService from "./base-service";

class UserService extends BaseService {
  login(username, password) {
    let promise = this.post("/login", { username, password });
    return promise;
  }

  getAllUser() {
    return this.get("/user");
  }

  getUser(id) {
    return this.get("/user/" + id);
  }

  deleteUser(id) {
    return this.delete("/user/" + id);
  }

  addUser(payload) {
    return this.post("/user", payload);
  }
  updateUser(id, payload) {
    return this.post("/user/" + id, payload);
  }

  updatePassword(id, password) {
    return this.post("/user/" + id + "/password", { password: password });
  }
}

export default new UserService();
