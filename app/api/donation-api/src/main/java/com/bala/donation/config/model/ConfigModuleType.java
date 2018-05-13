package com.bala.donation.config.model;

public enum ConfigModuleType {

    SMS_NOTES("sms_notes"), SMS_DONATION_TEXT("sms_donation_text"), NOTIFICATION("notification");
    ;

    String moduleName;

    private ConfigModuleType(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleName() {
        return moduleName;
    }

}
