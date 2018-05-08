import BaseService from "./base-service";

class TransactionService extends BaseService {
  getAllTransaction(param) {
    return this.get("/transaction", param);
  }
  getDailyLedgerEntries(param) {
    return this.get("/transaction/ledger/daily", param);
  }

  getMonthlyLedgerEntries(param) {
    return this.get("/transaction/ledger/monthly", param);
  }

  deleteTransaction(id) {
    return this.delete("/transaction/" + id);
  }

  saveTransaction(payload) {
    return this.post("/transaction", payload);
  }
}

export default new TransactionService();
