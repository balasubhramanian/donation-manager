package com.bala.donation.userpledge.controller;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.donation.dto.UserDonationDTO;
import com.bala.donation.userpledge.model.UserPledgeModel;
import com.bala.donation.userpledge.model.UserPledgeSearchModel;
import com.bala.donation.userpledge.service.UserPledgeService;

@RestController
public class UserPledgeController {

    @Autowired
    UserPledgeService userPledgeService;

    @RequestMapping(path = "/user/{id}/pledge", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUserPledges(@PathVariable("id") Long userId) {
        List<UserPledgeModel> userPledgeModels = userPledgeService.getAllUserPledges(userId);
        return ResponseEntity.ok(userPledgeModels);
    }

    @RequestMapping(path = "/user/{id}/pledge", method = RequestMethod.POST)
    public ResponseEntity<?> saveUserPledge(@PathVariable("id") Long userId,
            @Valid @RequestBody UserPledgeModel userPledgeModel) {
        userPledgeModel.setDonorId(userId);
        userPledgeService.saveUserPledge(userPledgeModel);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/user/{id}/pledge/{userPledgeId}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteUserPledge(@PathVariable("id") Long userId,
            @PathVariable("userPledgeId") Long userPledgeId) {
        userPledgeService.deleteUserPledge(userId, userPledgeId);
    }

    // User who need to pay for a Campaing
    @RequestMapping(path = "/campaign/{campaignId}/pledge", method = RequestMethod.GET)
    public ResponseEntity<?> getPendingPledgesByCampaign(@PathVariable("campaignId") Long campaignId,
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {

        UserPledgeSearchModel userPledgeSearchModel = new UserPledgeSearchModel();
        userPledgeSearchModel.setCampaignId(campaignId);
        userPledgeSearchModel.setFromDate(fromDate);
        userPledgeSearchModel.setToDate(toDate);

        List<UserDonationDTO> userPledgeModels = userPledgeService
                .findUserPledgePaymentForMonthlyCampaign(userPledgeSearchModel);
        return ResponseEntity.ok(userPledgeModels);
    }

    // Users who paid for a campaign
    // @RequestMapping(path = "/user/{id}/donation", method = RequestMethod.GET)
    public ResponseEntity<?> getPaidPledgesByCampaign(@PathVariable("id") Long userId) {
        List<UserPledgeModel> userPledgeModels = userPledgeService.getAllUserPledges(userId);
        return ResponseEntity.ok(userPledgeModels);
    }

    /*
     * TODO: cron interval based logic
     * 
     * Pledges can be once - check user has paid atleast once monthly - each month
     * check if user has paid yearly - each year check if user has paid
     * 
     * Scenario: System should show the users who have not paid donation for this
     * month
     * 
     */

    // Users having pending Donation - return users & campaign
    @RequestMapping(path = "/pledge/pending", method = RequestMethod.GET)
    public ResponseEntity<?> getPendingPledges(@PathVariable("id") Long userId) {
        List<UserPledgeModel> userPledgeModels = userPledgeService.getAllUserPledges(userId);
        return ResponseEntity.ok(userPledgeModels);
    }

    // User paid donation
    @RequestMapping(path = "/pledge/paid", method = RequestMethod.GET)
    public ResponseEntity<?> getFullyPaidPledges(UserPledgeSearchModel searchModel) {
        List<UserDonationDTO> userPledgeModels = userPledgeService.findUserDonations(searchModel);
        return ResponseEntity.ok(userPledgeModels);
    }

    @RequestMapping(path = "/pledge/partial-paid", method = RequestMethod.GET)
    public ResponseEntity<?> getPartaillyPaidPledges(@PathVariable("id") Long userId) {
        List<UserPledgeModel> userPledgeModels = userPledgeService.getAllUserPledges(userId);
        return ResponseEntity.ok(userPledgeModels);
    }

    // @RequestMapping(path = "/user/{id}/donation", method = RequestMethod.GET)
    public ResponseEntity<?> getPledgesForCampaign(@PathVariable("id") Long userId) {
        List<UserPledgeModel> userPledgeModels = userPledgeService.getAllUserPledges(userId);
        return ResponseEntity.ok(userPledgeModels);
    }

}
