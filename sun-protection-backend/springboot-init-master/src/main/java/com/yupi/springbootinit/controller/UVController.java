package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.manager.UVManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.util.StringUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Slf4j
public class UVController
{
    @Resource
    private UVManager uvManager;

    @GetMapping("uv")
    public String getUVIndex(String city, String district)
    {
        String location = "";
        if (StringUtils.isNotBlank(city) && StringUtils.isNotBlank(district))
        {
            location = city + "," + district;
        }
        double[] latLon = uvManager.getLatAndLon(location);

        if (latLon != null) {
            // 2. 通过经纬度获取 UV 指数
            return uvManager.getUVIndex(latLon[0], latLon[1]);
        } else {
            return "{\"error\": \"无法获取该地区的经纬度\"}";
        }
    }
}
