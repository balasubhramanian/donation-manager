import BaseService from "./base-service";
class RolePermissionService extends BaseService {
  login(username, password) {
    let promise = this.post("/login", { username, password });
    return promise;
  }

  getAllRoles() {
    return this.get("/role");
  }
}

export default new RolePermissionService();
