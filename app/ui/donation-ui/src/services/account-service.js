import BaseService from "./base-service";

class AccountService extends BaseService {
  getAllAccount() {
    return this.get("/account");
  }

  saveAccount(payload) {
    return this.post("/account", payload);
  }
}

export default new AccountService();
