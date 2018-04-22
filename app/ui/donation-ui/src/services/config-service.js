import BaseService from "./base-service";

class ConfigService extends BaseService {
  getConfigByModule(module) {
    return this.get("/config", { module: module });
  }

  getConfig(id) {
    return this.get("/config/" + id);
  }

  deleteConfig(id) {
    return this.delete("/config/" + id);
  }

  addConfig(payload) {
    return this.post("/config", payload);
  }
  updateConfig(id, payload) {
    return this.post("/config/" + id, payload);
  }
}

export default new ConfigService();
