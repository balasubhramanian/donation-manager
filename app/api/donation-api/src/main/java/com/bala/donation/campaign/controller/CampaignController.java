package com.bala.donation.campaign.controller;

import java.io.IOException;
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
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.constraint.NotNull;
import org.supercsv.cellprocessor.constraint.Unique;
import org.supercsv.cellprocessor.ift.CellProcessor;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

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

    @RequestMapping(path = "/campaign/export/csv", method = RequestMethod.GET)
    public @ResponseBody byte[] exportAllCampaignAsCSV(
            @RequestParam(value = "is_active", defaultValue = "false") boolean onlyActive,
            HttpServletResponse response) {
        List<CampaignModel> campaigns = campaignService.getAllCampaign(onlyActive);
        String[] header = new String[] { "id", "name", "type", "startDate", "endDate" };

        final CellProcessor[] processors = new CellProcessor[] { new Unique(), // id
                new NotNull(), // name
                new Optional(), // type
                new Optional(), // startDate
                new Optional() // endDate

        };
        try (StringWriter strWriter = new StringWriter();
                CsvBeanWriter beanWriter = new CsvBeanWriter(strWriter, CsvPreference.STANDARD_PREFERENCE)) {
            beanWriter.writeHeader(header);

            for (CampaignModel donors : campaigns) {
                beanWriter.write(donors, header, processors);
            }
            beanWriter.close();
            strWriter.close();

            response.setContentType("application/csv");
            response.addHeader("Content-Disposition", "attachment; filename=" + "campaign.csv");

            return strWriter.toString().getBytes();

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

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
