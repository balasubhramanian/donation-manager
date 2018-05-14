import BaseService from "./base-service";

class DonationService extends BaseService {
  getAllDonation(param) {
    return this.get("/donation", param);
  }

  getAllDonationUrl(param) {
    return this.getDownloadUrl("/donation/report", param);
  }

  deleteDonation(id) {
    return this.delete("/donation/" + id);
  }

  saveDonation(payload) {
    return this.post("/donation", payload);
  }
  updateDonation(id, payload) {
    return this.post("/donation/" + id, payload);
  }
}

export default new DonationService();
