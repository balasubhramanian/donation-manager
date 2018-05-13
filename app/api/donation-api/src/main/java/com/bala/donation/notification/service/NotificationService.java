package com.bala.donation.notification.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.text.StringSubstitutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.bala.donation.config.model.ConfigModel;
import com.bala.donation.config.model.ConfigModuleType;
import com.bala.donation.config.model.ConfigType;
import com.bala.donation.config.service.ConfigService;
import com.bala.donation.donation.entity.DonationEntity;

@Component
public class NotificationService {

    @Autowired
    ConfigService configService;

    @Autowired
    SmsService smsService;

    Logger logger = LoggerFactory.getLogger(NotificationService.class);

    @Async
    public void onDonationRecieved(DonationEntity donationEntity) {

        if (!configService.getBooleanOf(ConfigType.SMS_ENABLED)) {
            return;
        }

        String template = configService.getConfigByModule(ConfigModuleType.SMS_DONATION_TEXT).stream()
                .map(c -> c.getName()).findFirst().orElse(null);

        List<ConfigModel> smsNotes = configService.getConfigByModule(ConfigModuleType.SMS_NOTES);

        if (CollectionUtils.isNotEmpty(smsNotes)) {
            int noteIndex = RandomUtils.nextInt(0, smsNotes.size());
            template += smsNotes.get(noteIndex).getName();
        }
        Map<String, Object> value = new HashMap<>();
        value.put("amount", donationEntity.getAmount());

        String msg = StringSubstitutor.replace(template, value);
        smsService.send(donationEntity.getUserDetails().getPhone(), msg);
    }
}
