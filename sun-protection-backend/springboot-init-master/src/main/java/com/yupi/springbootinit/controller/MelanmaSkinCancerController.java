package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.model.entity.MelanomaSkinCancer;
import com.yupi.springbootinit.service.MelanomaSkinCancerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/data")
public class MelanmaSkinCancerController
{
    @Resource
    private MelanomaSkinCancerService melanomaSkinCancerService;

    @GetMapping
    public BaseResponse<List<MelanomaSkinCancer>> getData()
    {
        List<MelanomaSkinCancer> list = melanomaSkinCancerService.list();
        return ResultUtils.success(list);
    }
}
