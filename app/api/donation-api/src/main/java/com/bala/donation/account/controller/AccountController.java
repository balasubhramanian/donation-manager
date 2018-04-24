package com.bala.donation.account.controller;

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

import com.bala.donation.account.model.AccountModel;
import com.bala.donation.account.service.AccountService;

@RestController
public class AccountController {

    @Autowired
    AccountService accountService;

    @RequestMapping(path = "/account", method = RequestMethod.GET)
    public ResponseEntity<?> getAllAccount() {
        List<AccountModel> users = accountService.getAll();
        return ResponseEntity.ok(users);
    }

    @RequestMapping(path = "/account", method = RequestMethod.POST)
    public ResponseEntity<?> saveAccount(@Valid @RequestBody AccountModel account) {
        accountService.save(account);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(path = "/account/{id}", method = RequestMethod.GET)
    public AccountModel getAccount(@PathVariable("id") Long id) {
        return accountService.get(id);
    }

    @RequestMapping(path = "/account/{id}", method = RequestMethod.POST)
    public void updateAccount(@PathVariable("id") Long id, @Valid @RequestBody AccountModel account) {
        accountService.update(id, account);
    }

    @RequestMapping(path = "/account/{id}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteAccount(@PathVariable("id") Long id) {
        accountService.delete(id);
    }

}
