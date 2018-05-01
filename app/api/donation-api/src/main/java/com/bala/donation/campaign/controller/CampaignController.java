package com.bala.donation.campaign.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.campaign.model.CampaignModel;
import com.bala.donation.campaign.service.CampaignService;

@RestController
public class CampaignController {

    @Autowired
    CampaignService campaignService;

    @RequestMapping(path = "/campaign", method = RequestMethod.GET)
    public ResponseEntity<?> getAllCampaign(
            @RequestParam(value = "is_active", defaultValue = "false") boolean onlyActive) {
        List<CampaignModel> campaigns = campaignService.getAllCampaign(onlyActive);
        return ResponseEntity.ok(campaigns);
    }

    @RequestMapping(path = "/campaign", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody CampaignModel campaign) {
        campaignService.saveCampaign(campaign);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/campaign/{id}", method = RequestMethod.GET)
    public CampaignModel getCampaign(@PathVariable("id") Long id) {
        return campaignService.getCampaign(id);
    }

    @RequestMapping(path = "/campaign/{id}", method = RequestMethod.POST)
    public void updateCampaign(@PathVariable("id") Long id, @Valid @RequestBody CampaignModel campaign) {
        campaignService.updateCampaign(id, campaign);
    }

    @RequestMapping(path = "/campaign/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteCampaign(@PathVariable("id") Long id) {
        campaignService.deleteCampaign(id);
    }

}
