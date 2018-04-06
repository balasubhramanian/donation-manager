import BaseService from "./base-service";

class DonorService extends BaseService {
  login(username, password) {
    let promise = this.post("/login", { username, password });
    return promise;
  }

  getAllDonor(donor) {
    return this.get("/donor", donor);
  }

  getDonor(id) {
    return this.get("/donor/" + id);
  }

  deleteDonor(id) {
    return this.delete("/donor/" + id);
  }

  addDonor(payload) {
    return this.post("/donor", payload);
  }
  updateDonor(id, payload) {
    return this.post("/donor/" + id, payload);
  }
}

export default new DonorService();
