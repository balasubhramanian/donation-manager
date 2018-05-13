package com.bala.donation.notification.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringSubstitutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class SmsService {

    Logger logger = LoggerFactory.getLogger(SmsService.class);

    RestTemplate restTemplate = new RestTemplate();

    @Value("#{'${sms.http_api_url}'.replace('^','$')}")
    String smsUrl;

    public void send(String phone, String msg) {
        if (!StringUtils.isNumeric(phone) || StringUtils.length(phone) != 10 || StringUtils.isBlank(msg)) {
            return;
        }

        if (StringUtils.isBlank(smsUrl)) {
            logger.error("SMS HTTP URL not set. Unable to send sms for {} : {}", phone, msg);
        }

        Map<String, Object> model = new HashMap<>();
        model.put("phone", phone);
        model.put("content", msg);

        String url = StringSubstitutor.replace(smsUrl, model);

        logger.info("Sending sms for {} : {}", phone, msg);

        try {
            restTemplate.getForEntity(url, null);
        } catch (Exception e) {
            logger.error("Unable to send sms for {} : {}", phone, msg, e);
        }
    }

}
