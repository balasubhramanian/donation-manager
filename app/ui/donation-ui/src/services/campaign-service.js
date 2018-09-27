import BaseService from "./base-service";

class CampaignService extends BaseService {
  getAllCampaign(campaign) {
    return this.get("/campaign", campaign);
  }

  getAllCampaignDownloadUrl(param) {
    return this.getDownloadUrl("/campaign/export/csv", param);
  }

  getActiveCampaign() {
    return this.get("/campaign", { is_active: true });
  }

  getCampaign(id) {
    return this.get("/campaign/" + id);
  }

  deleteCampaign(id) {
    return this.delete("/campaign/" + id);
  }

  addCampaign(payload) {
    return this.post("/campaign", payload);
  }
  updateCampaign(id, payload) {
    return this.post("/campaign/" + id, payload);
  }
}

export default new CampaignService();
