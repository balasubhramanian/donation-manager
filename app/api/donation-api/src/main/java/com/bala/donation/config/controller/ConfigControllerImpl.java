package com.bala.donation.config.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bala.donation.config.model.ConfigModel;
import com.bala.donation.config.service.ConfigService;

@RestController
public class ConfigControllerImpl implements ConfigController {

    @Autowired
    ConfigService configService;

    @Override
    public void addConfig(@RequestBody ConfigModel configModel) {
        configService.addConfig(configModel);
    }

    @Override
    public void updateConfig(@PathVariable("id") Long id, @RequestBody ConfigModel configModel) {
        configService.updateConfig(id, configModel);
    }

    @Override
    public List<ConfigModel> getAllConfig(String module) {

        if (!StringUtils.isEmpty(module)) {
            return configService.getConfigByModule(module);
        }

        return configService.getAllConfig();
    }

    @Override
    public void deleteConfig(@PathVariable("id") Long id) {
        configService.deleteConfig(id);
    }

    @Override
    public ConfigModel getConfigById(@PathVariable("id") Long id) {
        return configService.getConfigById(id);
    }

    @Override
    public List<ConfigModel> getConfigByModule(String moduleName) {
        return configService.getConfigByModule(moduleName);
    }

}
