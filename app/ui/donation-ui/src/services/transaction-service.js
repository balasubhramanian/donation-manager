import BaseService from "./base-service";

class TransactionService extends BaseService {
  getAllTransaction(param) {
    return this.get("/transaction", param);
  }

  deleteTransaction(id) {
    return this.delete("/transaction/" + id);
  }

  saveTransaction(payload) {
    return this.post("/transaction", payload);
  }
}

export default new TransactionService();
