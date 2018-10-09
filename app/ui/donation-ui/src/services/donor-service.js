import BaseService from "./base-service";

class DonorService extends BaseService {
  getAllDonor(donor) {
    return this.get("/donor", donor);
  }

  getAllDonorDownloadUrl(param) {
    return this.getDownloadUrl("/donor/export/csv", param);
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

  uploadDonor(files) {
    let formData = new FormData();
    formData.append("file", files[0]);
    return this.upload("/donor/import", formData);
  }
}

export default new DonorService();
