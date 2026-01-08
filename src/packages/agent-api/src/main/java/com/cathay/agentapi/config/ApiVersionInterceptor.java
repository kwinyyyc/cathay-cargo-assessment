package com.cathay.agentapi.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class ApiVersionInterceptor implements HandlerInterceptor {

    private static final String API_VERSION_HEADER = "API-Version";
    private static final String DEFAULT_VERSION = "v1";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String apiVersion = request.getHeader(API_VERSION_HEADER);

        if (apiVersion == null || apiVersion.isEmpty()) {
            apiVersion = DEFAULT_VERSION;
        }

        request.setAttribute("apiVersion", apiVersion);
        return true;
    }
}

