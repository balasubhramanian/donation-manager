package com.bala.donation.common.utils;

import java.util.Collections;
import java.util.Set;

import org.springframework.stereotype.Component;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.dialect.AbstractDialect;
import org.thymeleaf.dialect.IExpressionObjectDialect;
import org.thymeleaf.expression.IExpressionObjectFactory;

@Component
public final class AppFormatter extends AbstractDialect implements IExpressionObjectDialect {

    protected AppFormatter() {
        super("AppFormatterDialect");
        // TODO Auto-generated constructor stub
    }

    public static String formatINR(Number number) {
        return number == null ? null : number.toString().replaceAll("(\\d)(?=(((\\d{2})+)(\\d{1})(?!\\d)))", "$1,");
    }

    @Override
    public IExpressionObjectFactory getExpressionObjectFactory() {
        // TODO Auto-generated method stub
        return new IExpressionObjectFactory() {

            @Override
            public boolean isCacheable(String expressionObjectName) {
                return false;
            }

            @Override
            public Set<String> getAllExpressionObjectNames() {
                return Collections.singleton("appFormatter");
            }

            @Override
            public Object buildObject(IExpressionContext context, String expressionObjectName) {
                // TODO Auto-generated method stub
                return new AppFormatter();
            }
        };
    }
}
