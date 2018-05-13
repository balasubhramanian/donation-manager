package com.bala.donation.config.model;

public enum ConfigType {

    SMS_ENABLED(ConfigModuleType.NOTIFICATION, "sms_enabled");
    ;

    String config;
    ConfigModuleType moduleType;

    private ConfigType(ConfigModuleType module, String config) {
        this.config = config;
        this.moduleType = module;
    }

    public String getConfig() {
        return config;
    }

    public ConfigModuleType getModuleType() {
        return moduleType;
    }

    public String getModule() {
        return moduleType.getModuleName();
    }

}
