import SQLite from "react-native-sqlite-2";

const sqlLiteDB = SQLite.openDatabase("donation.db", "1.0", "", 1);

export const executeSQL = (sql, args = []) => {
  return new Promise((resolve, reject) => {
    console.log("executing sql ", sql);
    try {
      sqlLiteDB.transaction(txn => {
        txn.executeSql(
          sql,
          args,
          (tx, res) => {
            var result = [];
            for (let i = 0; i < res.rows.length; ++i) {
              result.push(res.rows.item(i));
            }
            console.log("succes execution", result);
            resolve(result);
          },
          (tx, err) => {
            console.log("Error executing : " + sql, err);
            reject(err);
          }
        );
      });
    } catch (e) {
      console.log("error executeSQL", e);
      reject(e);
    }
  });
};

export const initDatabase = () => {
  const CREATE_CAMPAIGN_SQL = `CREATE TABLE IF NOT EXISTS campaign (id interger primary key,name varchar(255) DEFAULT NULL,description varchar(1000) DEFAULT NULL,start_date datetime DEFAULT NULL,end_date datetime DEFAULT NULL,status varchar(1) DEFAULT NULL,type varchar(20) DEFAULT NULL,created_at datetime DEFAULT NULL,created_by bigint(20) DEFAULT NULL,updated_at datetime DEFAULT NULL,updated_by bigint(20) DEFAULT NULL)`;
  const CREATE_USER_DETAILS_SQL = `CREATE TABLE IF NOT EXISTS user_details (id interger primary key,firstname varchar(255) DEFAULT NULL,lastname varchar(255) DEFAULT NULL,street varchar(255) DEFAULT NULL,area varchar(255) DEFAULT NULL,city varchar(255) DEFAULT NULL,state varchar(255) DEFAULT NULL,country varchar(255) DEFAULT NULL,doorno varchar(255) DEFAULT NULL,email varchar(255) DEFAULT NULL,phone varchar(255) DEFAULT NULL,created_at datetime DEFAULT NULL,created_by bigint(20) DEFAULT NULL,updated_at datetime DEFAULT NULL,updated_by bigint(20) DEFAULT NULL)`;
  const CREATE_DONATION_SQL = `CREATE TABLE IF NOT EXISTS donation (id interger primary key,amount bigint(20) NOT NULL,date date DEFAULT NULL,campaign_id bigint(20) DEFAULT NULL,user_id bigint(20) DEFAULT NULL,created_at datetime DEFAULT NULL,created_by bigint(20) DEFAULT NULL)`;

  let p = new Promise((resolve, reject) => {
    try {
      //executeSQL("Delete from donation");
      executeSQL(CREATE_CAMPAIGN_SQL);
      executeSQL(CREATE_USER_DETAILS_SQL);
      executeSQL(CREATE_DONATION_SQL);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
  return p;
};