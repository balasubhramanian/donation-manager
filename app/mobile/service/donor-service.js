import BaseService from "./base-service";

/*
* Service to hanlde operations on Donor 
*/
class DonorService extends BaseService {
  getAllDonors(filter) {
    if (!filter) {
      return this.execute(`select * from user_details`);
    }
    if (filter.street)
      return this.execute(
        `select * from user_details where street like '` + filter.street + `%'`
      );
  }

  getAllStreet() {
    return this.execute(
      `select distinct street,area from user_details order by 1`
    );
  }

  addUser(userDetails) {
    return this.execute(
      `
          insert into user_details
              (id,firstname,lastname,doorno,street,area,city,state,country,phone,created_at,created_by,updated_at,updated_by) 
          values 
              (:id,:firstname,:lastname,:doorno,:street,:area,:city,:state,:country,:phone,:createdAt,:createdBy,:updatedAt,:updatedBy)
    `,
      [
        userDetails.id,
        userDetails.firstname,
        userDetails.lastname,
        userDetails.doorno,
        userDetails.street,
        userDetails.area,
        userDetails.city,
        userDetails.state,
        userDetails.country,
        userDetails.phone,
        userDetails.createdAt,
        userDetails.createdBy,
        userDetails.updatedAt,
        userDetails.updatedBy
      ]
    );
  }

  deleteAll() {
    return this.execute(`DELETE FROM  user_details`);
  }
}

export default new DonorService();
