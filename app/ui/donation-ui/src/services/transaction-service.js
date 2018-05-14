import BaseService from "./base-service";

class TransactionService extends BaseService {
  getAllTransaction(param) {
    return this.get("/transaction", param);
  }

  getAllTransactionReportUrl(param) {
    return this.getDownloadUrl("/transaction/report", param);
  }

  getDailyLedgerEntries(param) {
    return this.get("/transaction/ledger/daily", param);
  }

  getDailyLedgerEntriesReportUrl(param) {
    return this.getDownloadUrl("/transaction/ledger/daily/report", param);
  }

  getMonthlyLedgerEntries(param) {
    return this.get("/transaction/ledger/monthly", param);
  }

  getMonthlyLedgerEntriesReportUrl(param) {
    return this.getDownloadUrl("/transaction/ledger/monthly/report", param);
  }

  deleteTransaction(id) {
    return this.delete("/transaction/" + id);
  }

  saveTransaction(payload) {
    return this.post("/transaction", payload);
  }
}

export default new TransactionService();
