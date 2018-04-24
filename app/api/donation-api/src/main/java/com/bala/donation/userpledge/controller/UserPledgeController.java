package com.bala.donation.userpledge.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.userpledge.model.UserPledgeModel;
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
    public @ResponseBody void deleteDonation(@PathVariable("id") Long userId,
            @PathVariable("userPledgeId") Long userPledgeId) {
        userPledgeService.deleteUserPledge(userId, userPledgeId);
    }

}
