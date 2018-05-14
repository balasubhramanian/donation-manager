package com.bala.donation.common.utils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletResponse;

public class AppUtils {

    public static String generateFileName(String prefix) {
        return prefix + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public static void setExcelResponse(HttpServletResponse response, String reportType) {
        response.setHeader("Content-Disposition",
                "attachment; filename=" + reportType + "-report-" + Instant.now().getEpochSecond() + ".xls");

    }
}
