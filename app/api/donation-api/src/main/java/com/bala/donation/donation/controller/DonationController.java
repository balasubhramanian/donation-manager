package com.bala.donation.donation.controller;

import java.io.IOException;
import java.io.InputStreamReader;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.ParseDate;
import org.supercsv.cellprocessor.ParseLong;
import org.supercsv.cellprocessor.constraint.NotNull;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.exception.SuperCsvConstraintViolationException;
import org.supercsv.io.CsvBeanReader;
import org.supercsv.prefs.CsvPreference;

import com.bala.donation.common.constants.AppConstants;
import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.CSVError;
import com.bala.donation.common.utils.AppUtils;
import com.bala.donation.donation.model.DonationModel;
import com.bala.donation.donation.model.DonationSearchModel;
import com.bala.donation.donation.service.DonationService;

@RestController
public class DonationController {

    @Autowired
    DonationService donationService;

    @RequestMapping(path = "/donation", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDonation(DonationSearchModel donationSearchModel) {
        List<DonationModel> donations = donationService.getAllDonation(donationSearchModel);
        return ResponseEntity.ok(donations);
    }

    @RequestMapping(path = "/donation/report", method = RequestMethod.GET)
    public ModelAndView getAllDonationReport(DonationSearchModel donationSearchModel, HttpServletResponse response,
            ModelAndView mav) {

        List<DonationModel> donations = donationService.getAllDonation(donationSearchModel);

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
        donationService.saveDonation(donation);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.GET)
    public DonationModel getDonation(@PathVariable("id") Long id) {
        return donationService.getDonation(id);
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.POST)
    public void updateDonation(@PathVariable("id") Long id, @Valid @RequestBody DonationModel donation) {
        donationService.updateDonation(id, donation);
    }

    @RequestMapping(path = "/donation/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteDonation(@PathVariable("id") Long id) {
        donationService.deleteDonation(id);
    }

    private CellProcessor[] getDonationCSVProcessor() {
        final CellProcessor[] processors = new CellProcessor[] { new Optional(new ParseLong()), // id
                new NotNull(new ParseDate(AppConstants.DATE_FORMAT)), // date
                new NotNull(new ParseLong()), // amount
                new NotNull(new ParseLong()), // userId
                new NotNull(new ParseLong()), // campaignId
                new NotNull(new ParseDate(AppConstants.DATE_FORMAT)) // createdAt

        };
        return processors;
    }

    @RequestMapping(path = "/donation/import", method = RequestMethod.POST)
    public void importDonation(@RequestParam("file") MultipartFile file) {
        String[] header = null;
        try (InputStreamReader inputStreamReader = new InputStreamReader(file.getInputStream());
                CsvBeanReader beanReader = new CsvBeanReader(inputStreamReader, CsvPreference.STANDARD_PREFERENCE)) {

            header = beanReader.getHeader(true);
            CellProcessor[] processors = getDonationCSVProcessor();
            DonationModel donationModel;
            while ((donationModel = beanReader.read(DonationModel.class, header, processors)) != null) {
                donationService.saveDonation(donationModel);
            }
        } catch (SuperCsvConstraintViolationException sccve) {
            String errorMsg = String.format("Invalid value for rownum: %s , column:%s",
                    sccve.getCsvContext().getRowNumber(), header[sccve.getCsvContext().getColumnNumber() - 1]);
            throw new AppException(CSVError.INVALID_DATA.withMessage(errorMsg));

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
