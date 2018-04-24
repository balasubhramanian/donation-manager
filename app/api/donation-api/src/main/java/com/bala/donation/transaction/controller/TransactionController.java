package com.bala.donation.transaction.controller;

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

import com.bala.donation.transaction.model.TransactionModel;
import com.bala.donation.transaction.model.TransactionSearchModel;
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

}
