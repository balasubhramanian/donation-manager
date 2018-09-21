package com.bala.donation.donor.controller;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
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
import org.springframework.web.multipart.MultipartFile;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.ParseLong;
import org.supercsv.cellprocessor.constraint.NotNull;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.exception.SuperCsvConstraintViolationException;
import org.supercsv.io.CsvBeanReader;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.bala.donation.common.exception.AppException;
import com.bala.donation.common.exception.CSVError;
import com.bala.donation.donor.model.DonorSearchModel;
import com.bala.donation.donor.service.DonorService;
import com.bala.donation.user.model.DonorModel;

@RestController
public class DonorController {

    @Autowired
    DonorService donorService;

    @RequestMapping(path = "/donor", method = RequestMethod.GET)
    public ResponseEntity<?> getAllDonor(DonorSearchModel donor) {
        List<DonorModel> users = donorService.getAllDonor(donor);
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/donor/export/csv", method = RequestMethod.GET)
    public @ResponseBody byte[] exportAllDonorAsCSV(DonorSearchModel donor, HttpServletResponse response) {
        List<DonorModel> users = donorService.getAllDonor(donor);
        try {
            response.setContentType("application/csv");
            response.addHeader("Content-Disposition", "attachment; filename=" + "donors.csv");

            String[] header = new String[] { "id", "firstname", "lastname", "email", "phone", "doorno", "street",
                    "area", "city", "state", "country" };

            final CellProcessor[] processors = getDonorCSVProcessor();
            StringWriter strWriter = new StringWriter();
            CsvBeanWriter beanWriter = new CsvBeanWriter(strWriter, CsvPreference.STANDARD_PREFERENCE);
            beanWriter.writeHeader(header);

            for (DonorModel donors : users) {
                beanWriter.write(donors, header, processors);
            }
            beanWriter.close();
            strWriter.close();
            return strWriter.toString().getBytes();

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

    }

    private CellProcessor[] getDonorCSVProcessor() {
        final CellProcessor[] processors = new CellProcessor[] { new Optional(new ParseLong()), // id
                new NotNull(), // firstname
                new Optional(), // lastname
                new Optional(), // email
                new NotNull(), // phone
                new Optional(), // dorrno
                new Optional(), // street
                new Optional(), // area
                new Optional(), // city
                new Optional(), // state
                new Optional() // country
        };
        return processors;
    }

    @RequestMapping(path = "/donor", method = RequestMethod.POST)
    public ResponseEntity<?> save(@Valid @RequestBody DonorModel donor) {
        donorService.saveDonor(donor);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/donor/import", method = RequestMethod.POST)
    public void importDonor(@RequestParam("file") MultipartFile file) {
        String[] header = null;
        try (InputStreamReader inputStreamReader = new InputStreamReader(file.getInputStream());
                CsvBeanReader beanReader = new CsvBeanReader(inputStreamReader, CsvPreference.STANDARD_PREFERENCE)) {

            header = beanReader.getHeader(true);
            CellProcessor[] processors = getDonorCSVProcessor();
            DonorModel donorModel;
            while ((donorModel = beanReader.read(DonorModel.class, header, processors)) != null) {
                donorService.saveDonor(donorModel);
            }
        } catch (SuperCsvConstraintViolationException sccve) {
            String errorMsg = String.format("Invalid value for rownum: %s , column:%s",
                    sccve.getCsvContext().getRowNumber(), header[sccve.getCsvContext().getColumnNumber() - 1]);
            throw new AppException(CSVError.INVALID_DATA.withMessage(errorMsg));

        } catch (IOException e) {
            e.printStackTrace();
        }

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
