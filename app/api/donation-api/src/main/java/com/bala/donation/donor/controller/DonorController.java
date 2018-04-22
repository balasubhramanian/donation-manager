package com.bala.donation.donor.controller;

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

import com.bala.donation.donor.model.DonorSearchModel;
import com.bala.donation.donor.service.DonorService;
import com.bala.donation.user.model.DonorModel;

@RestController
public class DonorController {

    @Autowired DonorService donorService;

    @RequestMapping(path = "/donor", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDonor(DonorSearchModel donor) {
        List<DonorModel> users = donorService.getAllDonor(donor);
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/donor", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody DonorModel donor) {
        donorService.saveDonor(donor);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/donor/{id}", method = RequestMethod.GET)
    public DonorModel getDonor(@PathVariable("id") Long id) {
        return donorService.getDonor(id);
    }

    @RequestMapping(path = "/donor/{id}", method = RequestMethod.POST)
    public void updateDonor(@PathVariable("id") Long id, @Valid @RequestBody DonorModel user) {
        donorService.updateDonor(id, user);
    }

    @RequestMapping(path = "/donor/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteDonor(@PathVariable("id") Long id) {
        donorService.deleteDonor(id);
    }

}
