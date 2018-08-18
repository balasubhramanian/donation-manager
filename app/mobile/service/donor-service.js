import moment from "moment";
import BaseService from "./base-service";

class DonorService extends BaseService {
  getAllDonors() {
    return this.execute(`select * from user_details`);
  }

  addUser(userDetails) {
    console.log("userdetais", userDetails);
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
function createRecords() {
  var data = [
    {
      id: 1,
      firstname: "Bala",
      lastname: "",
      doorno: "8/5",
      street: "Mary Helan Street",
      area: "Vetri nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      phone: "1298893297"
    },
    {
      id: 2,
      firstname: "Subash",
      lastname: "",
      doorno: "22",
      street: "Sakthi Street",
      area: "Vetri nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      phone: "9003247362"
    },
    {
      id: 3,
      firstname: "Karthick",
      lastname: "",
      doorno: "5",
      street: "Sarojini - Vetrivel Main Street",
      area: "Vetri nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      phone: "2983792"
    },
    {
      id: 4,
      firstname: "Gaffor",
      lastname: "",
      doorno: "2",
      street: "Adda Street",
      area: "Redhills",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      phone: "887328781"
    },
    {
      id: 5,
      firstname: "Rahim",
      lastname: "",
      doorno: "32",
      street: "1st Street",
      area: "Redhills",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      phone: "98962387678"
    }
  ];

  return data;
}
export default new DonorService();
