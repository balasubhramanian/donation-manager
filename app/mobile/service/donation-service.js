import BaseService from "./base-service";

/*
* Service to hanlde operations on Donation
*/
class DonationService extends BaseService {
  addDonation(donation) {
    console.log("Donation data", donation);
    return this.execute(
      `insert into donation 
        (amount,date,campaign_id,user_id,created_at,created_by) 
      values 
        (:amount,:date,:campaign_id,:user_id,:created_at,:created_by) `,
      [
        donation.amount,
        donation.date,
        donation.campaignId,
        donation.userId,
        donation.createdAt,
        donation.createdBy
      ]
    );
  }

  getAllDonation() {
    return this.execute(
      `
    select d.id , d.date,d.amount, 
    ud.id 'userId' ,
    c.id 'campaignId', d.created_at , c.name 'campaignName', ud.firstname 'userName' 
    from donation d 
    join user_details ud 
    on ud.id = d.user_id 
    join campaign c
    on d.campaign_id = c.id
    order by d.id desc
    `
    ).then(data => {
      console.log("service ", data);
      return data;
    });
  }

  getDonationByDate(fromDate, toDate) {
    return this.execute(
      `
    select d.id , d.date,d.amount, 
    ud.id 'userId' ,
    c.id 'campaignId', d.created_at , c.name 'campaignName', ud.firstname 'userName' 
    from donation d 
    join user_details ud 
    on ud.id = d.user_id 
    join campaign c
    on d.campaign_id = c.id
    where date >= '${fromDate}' and date <= '${toDate}'
    order by d.id desc
    `
    ).then(data => {
      console.log("service ", data);
      return data;
    });
  }

  deleteAll() {
    return this.execute("DELETE FROM  donation");
  }
}

export default new DonationService();
