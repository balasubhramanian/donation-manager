import BaseService from "./base-service";
//import Realm from "realm";
import moment from "moment";

// const TBL_DONATION = "donation";
// let repository = new Realm({
//   schema: [
//     {
//       name: TBL_DONATION,
//       primaryKey: "id",
//       properties: {
//         id: { type: "int" },
//         userId: "int",
//         campaignId: "int",
//         date: "date",
//         amount: "int",
//         createdAt: "date",
//         updatedAt: "date"
//       }
//     }
//   ]
// });
// getAllDonation() {
//   return repository.objects(TBL_DONATION);
// }

// saveDonation(donationEntry) {
//   repository.write(() => {
//     donationEntry.userId = parseInt(donationEntry.userId);
//     donationEntry.campaignId = parseInt(donationEntry.campaignId);
//     donationEntry.amount = parseInt(donationEntry.amount);
//     donationEntry.date = moment(donationEntry.date).toDate();

//     donationEntry.id = this.getMaxId(repository, TBL_DONATION);
//     donationEntry.updatedAt = new Date();
//     donationEntry.createdAt = new Date();

//     repository.create(TBL_DONATION, donationEntry);
//   });
// }
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
    ud.id 'userId' , ud.firstname 'userName' ,
    c.id 'campaignId', c.name 'campaignName', d.created_at
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
  deleteAll() {
    return this.execute(`DELETE FROM  donation`);
  }
}

export default new DonationService();
