import { executeSQL } from "../common/db";

export default class BaseService {
  execute(sql, args = []) {
    return executeSQL(sql, args);
  }
}
