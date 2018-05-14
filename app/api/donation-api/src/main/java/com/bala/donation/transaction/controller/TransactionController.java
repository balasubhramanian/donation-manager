package com.bala.donation.transaction.controller;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.jxls.template.SimpleExporter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.bala.donation.common.utils.AppUtils;
import com.bala.donation.transaction.model.TransactionModel;
import com.bala.donation.transaction.model.TransactionReportModel;
import com.bala.donation.transaction.model.TransactionSearchModel;
import com.bala.donation.transaction.model.TransactionType;
import com.bala.donation.transaction.service.TransactionService;

@RestController
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @RequestMapping(path = "/transaction", method = RequestMethod.GET)
    public ResponseEntity<?> getAllTransaction(TransactionSearchModel transaction) {
        List<TransactionModel> users = transactionService.getAllTransaction(transaction);
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/transaction/report", method = RequestMethod.GET)
    public ModelAndView getAllTransactionReport(TransactionSearchModel transactionSearchModel,
            HttpServletResponse response, ModelAndView mav) {
        List<TransactionModel> transactions = transactionService.getAllTransaction(transactionSearchModel);

        String reportType = TransactionType.CREDIT.equals(transactionSearchModel.getTransactionType()) ? "income"
                : "exepense";
        AppUtils.setExcelResponse(response, reportType);

        Long total = transactions.stream().map(t -> {
            return t.getAmount();
        }).reduce(0L, (a, currentValue) -> {
            return a + currentValue;
        });

        mav.setViewName("report/cashflow-report");

        ModelMap modelMap = mav.getModelMap();
        modelMap.addAttribute("filter", transactionSearchModel);
        modelMap.addAttribute("data", transactions);
        modelMap.addAttribute("total", total);
        return mav;
    }

    private void renderUsingSimpleExport(List<TransactionModel> transactions, HttpServletResponse response) {
        try {
            response.addHeader("Content-disposition", "attachment; filename=People.xls");
            response.setContentType("application/vnd.ms-excel");
            new SimpleExporter().gridExport(Arrays.asList("Date", "Type", "Desc", "Amount"), transactions,
                    "date, typeName,description,amount ", response.getOutputStream());
            response.flushBuffer();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(path = "/transaction", method = RequestMethod.POST)
    public ResponseEntity<?> saveTransaction(@Valid @RequestBody TransactionModel transaction) {
        transactionService.saveTransaction(transaction);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/transaction/{id}", method = RequestMethod.GET)
    public TransactionModel getTransaction(@PathVariable("id") Long id) {
        return transactionService.getTransaction(id);
    }

    @RequestMapping(path = "/transaction/{id}", method = RequestMethod.POST)
    public void updateTransaction(@PathVariable("id") Long id, @Valid @RequestBody TransactionModel transaction) {
        transactionService.updateTransaction(id, transaction);
    }

    @RequestMapping(path = "/transaction/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteTransaction(@PathVariable("id") Long id) {
        transactionService.deleteTransaction(id);
    }

    @RequestMapping(path = "/transaction/ledger/daily", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<?> getDailyLedgerEntires(
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
        TransactionReportModel ledgerEntries = transactionService.findDailyLedgerEntries(fromDate, toDate);
        return ResponseEntity.ok(ledgerEntries);
    }

    @RequestMapping(path = "/transaction/ledger/daily/report", method = RequestMethod.GET)
    public ModelAndView getDailyLedgerEntiresReport(
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate,
            HttpServletResponse response, ModelAndView mav) {

        TransactionReportModel ledgerEntries = transactionService.findDailyLedgerEntries(fromDate, toDate);

        AppUtils.setExcelResponse(response, "daily-ledger");

        mav.setViewName("report/ledger-report");

        ModelMap modelMap = mav.getModelMap();
        modelMap.addAttribute("fromDate", fromDate);
        modelMap.addAttribute("toDate", toDate);
        modelMap.addAttribute("reportType", "Daily Ledger Summary");
        modelMap.addAttribute("openingBalance", ledgerEntries.getOpeningBalance());
        modelMap.addAttribute("data", ledgerEntries.getEntries());
        modelMap.addAttribute("total", ledgerEntries.getClosingBalance());

        return mav;
    }

    @RequestMapping(path = "/transaction/ledger/monthly", method = RequestMethod.GET)
    public @ResponseBody ResponseEntity<?> getMonthlyLedgerEntires(
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate) {
        TransactionReportModel ledgerEntries = transactionService.findMonthlyLedgerTransaction(fromDate, toDate);
        return ResponseEntity.ok(ledgerEntries);
    }

    @RequestMapping(path = "/transaction/ledger/monthly/report", method = RequestMethod.GET)
    public ModelAndView getMonthlyLedgerEntiresReport(
            @RequestParam("fromDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fromDate,
            @RequestParam("toDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate toDate,
            HttpServletResponse response, ModelAndView mav) {

        TransactionReportModel ledgerEntries = transactionService.findMonthlyLedgerTransaction(fromDate, toDate);

        AppUtils.setExcelResponse(response, "daily-ledger");

        mav.setViewName("report/ledger-report");

        ModelMap modelMap = mav.getModelMap();
        modelMap.addAttribute("fromDate", fromDate);
        modelMap.addAttribute("toDate", toDate);
        modelMap.addAttribute("reportType", "Montly Ledger Summary");
        modelMap.addAttribute("openingBalance", ledgerEntries.getOpeningBalance());
        modelMap.addAttribute("data", ledgerEntries.getEntries());
        modelMap.addAttribute("total", ledgerEntries.getClosingBalance());

        return mav;
    }

}
