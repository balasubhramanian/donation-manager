import BaseService from "./base-service";

/*
* Service to hanlde operations on campaign 
*/
class CampaignService extends BaseService {
  addCampaign(campaign) {
    return this.execute(
      `insert into campaign 
                    (id,name,description,status,type,created_at,created_by,updated_at,updated_by) 
                  values  
                    (:id, :name, :description,:status,:type,:createdAt,:createdBy,:updatedAt,:updatedBy)
                  `,
      [
        campaign.id,
        campaign.name,
        campaign.description,
        campaign.status,
        campaign.type,
        campaign.createdAt,
        campaign.createdBy,
        campaign.updatedAt,
        campaign.updatedBy
      ]
    );
  }

  deleteAll() {
    return this.execute(`DELETE FROM  campaign`);
  }

  getAllCampaign() {
    return this.execute(`select * from campaign`);
  }
}

export default new CampaignService();
