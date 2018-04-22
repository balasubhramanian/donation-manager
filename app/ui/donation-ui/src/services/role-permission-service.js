import BaseService from "./base-service";
class RolePermissionService extends BaseService {
  getAllRoles() {
    return this.get("/role");
  }
}

export default new RolePermissionService();
