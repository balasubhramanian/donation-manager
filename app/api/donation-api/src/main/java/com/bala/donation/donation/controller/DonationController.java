package com.bala.donation.donation.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bala.donation.common.utils.AppUtils;
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

    @RequestMapping(path = "/donation/report", method = RequestMethod.GET)
    public ModelAndView getAllDonationReport(DonationSearchModel donationSearchModel, HttpServletResponse response,
            ModelAndView mav) {

        List<DonationModel> donations = donorService.getAllDonation(donationSearchModel);

        AppUtils.setExcelResponse(response, "donation");

        Long total = donations.stream().map(t -> {
            return t.getAmount();
        }).reduce(0L, (a, currentValue) -> {
            return a + currentValue;
        });

        mav.setViewName("report/donation-report");

        ModelMap modelMap = mav.getModelMap();
        modelMap.addAttribute("filter", donationSearchModel);
        modelMap.addAttribute("data", donations);
        modelMap.addAttribute("total", total);
        return mav;
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
