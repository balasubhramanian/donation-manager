import BaseService from "./base-service";

class UserPledgeService extends BaseService {
  getAllUserPledges(userId) {
    return this.get("/user/" + userId + "/pledge");
  }

  saveUserPledge(userId, payload) {
    return this.post("/user/" + userId + "/pledge", payload);
  }

  deleteUserPledge(userId, pledgeId) {
    return this.delete("/user/" + userId + "/pledge/" + pledgeId);
  }
}

export default new UserPledgeService();
