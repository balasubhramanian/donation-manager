package com.bala.donation.donation.controller;

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

import com.bala.donation.donation.model.DonationModel;
import com.bala.donation.donation.model.DonationSearchModel;
import com.bala.donation.donation.service.DonationService;

@RestController
public class DonationController {

    @Autowired
    DonationService donorService;

    @RequestMapping(path = "/donation", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDonation(DonationSearchModel donationSearchModel) {
        List<DonationModel> donations = donorService.getAllDonation(donationSearchModel);
        return ResponseEntity.ok(donations);
    }

    @RequestMapping(path = "/donation", method = RequestMethod.POST)
    public ResponseEntity<?> saveDonation(@Valid @RequestBody DonationModel donation) {
        donorService.saveDonation(donation);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.GET)
    public DonationModel getDonation(@PathVariable("id") Long id) {
        return donorService.getDonation(id);
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.POST)
    public void updateDonation(@PathVariable("id") Long id, @Valid @RequestBody DonationModel donation) {
        donorService.updateDonation(id, donation);
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteDonation(@PathVariable("id") Long id) {
        donorService.deleteDonation(id);
    }

}
