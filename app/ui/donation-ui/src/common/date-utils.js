import * as moment from "moment";
let Configuration = {
  appDateFormat: "DD-MMM-YYYY",
  appDateTimeFormat: "DD-MMM-YYYY hh:mm A",
  serverDateFormat: "YYYY-MM-DD",
  serverDateTimeFormat: "YYYY-MM-DD HH:mm:ss"
};

export default class DateUtils {
  // DB Fromat : 2017-02-13 23:01:46
  // App Format : day-Month- Year
  static toAppDate(date) {
    if (!date) return null;

    if (typeof date == "string") {
      return moment(date, Configuration.serverDateTimeFormat).format(
        Configuration.appDateFormat
      );
    } else {
      return moment(date).format(Configuration.appDateFormat);
    }
  }

  static fromAppDateToDate(date) {
    return moment(date, Configuration.appDateFormat).toDate();
  }

  static toAppDateTime(date) {}

  static toServerDate(date) {
    if (date) {
      return moment(date).format(Configuration.serverDateFormat);
    } else {
      return null;
    }
  }

  static toServerDateTime(date) {}

  static before(days) {
    return moment().subtract(days, "days");
  }
}
