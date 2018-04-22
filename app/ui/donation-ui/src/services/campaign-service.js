import BaseService from "./base-service";

class CampaignService extends BaseService {
  getAllCampaign(campaign) {
    return this.get("/campaign", campaign);
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
