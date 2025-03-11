package com.yupi.springbootinit.manager;

import cn.hutool.http.HttpRequest;
import cn.hutool.http.HttpResponse;
import cn.hutool.http.HttpUtil;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
@Slf4j
public class UVManager
{
    @Value("${openweather.api-key}")
    private String openWeatherApiKey;

    @Value("${openweather.geocoding-url}")
    private String openWeatherGeocoding;

    @Value("${openuv.key}")
    private String UVApiKey;

    @Value("${openuv.uv-url}")
    private String UVUrl;

    public double[] getLatAndLon(String location)
    {
        String url = openWeatherGeocoding + "?q=" + location + "&limit=1&appid=" + openWeatherApiKey;
        String response = HttpUtil.get(url);
        JSONArray jsonArray = JSONUtil.parseArray(response);
        if (!jsonArray.isEmpty())
        {
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            Double lat = jsonObject.getDouble("lat");
            Double lng = jsonObject.getDouble("lon");
            return new double[] {lat, lng};
        }
        return null;
    }

    public String getUVIndex(double lat, double lng)
    {
        String url = UVUrl + "?lat=" + lat + "&lng=" + lng;
        HttpResponse response = HttpRequest.get(url)
                .header("x-access-token", UVApiKey)
                .timeout(5000)
                .execute();
        if (response.getStatus() == 200) {
            // 解析 JSON
            JSONObject jsonObject = JSONUtil.parseObj(response.body());
            double uvIndex = jsonObject.getJSONObject("result").getDouble("uv");
            return "{\"uvIndex\": " + uvIndex + "}";
        } else {
            return "{\"error\": \"无法获取 UV 数据，HTTP 状态码: " + response.getStatus() + "\"}";
        }
    }
}
