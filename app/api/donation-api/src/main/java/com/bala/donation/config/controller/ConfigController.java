package com.bala.donation.config.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.bala.donation.config.rest.model.ConfigModel;

@RequestMapping("/config")
public interface ConfigController {

    @RequestMapping(method = RequestMethod.POST)
    void addConfig(@Valid @RequestBody ConfigModel configModel);

    @RequestMapping(path = "/{id}", method = RequestMethod.POST)
    void updateConfig(Long id, @Valid @RequestBody ConfigModel configModel);

    @RequestMapping(method = RequestMethod.GET)
    List<ConfigModel> getAllConfig(@RequestParam(value = "module") String module);

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    void deleteConfig(Long id);

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    ConfigModel getConfigById(Long id);

    List<ConfigModel> getConfigByModule(String moduleName);

}
