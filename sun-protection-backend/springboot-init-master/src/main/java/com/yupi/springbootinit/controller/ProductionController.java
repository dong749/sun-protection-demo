package com.yupi.springbootinit.controller;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yupi.springbootinit.annotation.AuthCheck;
import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.DeleteRequest;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.constant.UserConstant;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.exception.ThrowUtils;
import com.yupi.springbootinit.model.dto.product.ProductAddRequest;
import com.yupi.springbootinit.model.dto.product.ProductEditRequest;
import com.yupi.springbootinit.model.dto.product.ProductQueryRequest;
import com.yupi.springbootinit.model.dto.product.ProductUpdateRequest;
import com.yupi.springbootinit.model.entity.Product;
import com.yupi.springbootinit.model.entity.User;
import com.yupi.springbootinit.service.ProductService;
import com.yupi.springbootinit.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 帖子接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/product")
@Slf4j
public class ProductionController {

    @Resource
    private ProductService productService;

    @Resource
    private UserService userService;

    // region 增删改查

    /**
     * 创建
     *
     * @param productAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addProduct(@RequestBody ProductAddRequest productAddRequest, HttpServletRequest request) {
        if (productAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productAddRequest, product);

        boolean result = productService.save(product);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        long newProductId = product.getId();
        return ResultUtils.success(newProductId);
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteProduct(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Product oldProduct = productService.getById(id);
        ThrowUtils.throwIf(oldProduct == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldProduct.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = productService.removeById(id);
        return ResultUtils.success(b);
    }



    /**
     * 根据 id 获取
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<Product> getProductVOById(long id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Product product = productService.getById(id);
        if (product == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        return ResultUtils.success(product);
    }


    /**
     * 分页获取列表（封装类）
     *
     * @param productQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<Product>> listProductVOByPage(@RequestBody ProductQueryRequest productQueryRequest,
            HttpServletRequest request) {
        long current = productQueryRequest.getCurrent();
        long size = productQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Product> productPage = productService.page(new Page<>(current, size),
                productService.getQueryWrapper(productQueryRequest));
        return ResultUtils.success(productPage);
    }

    /**
     * 分页获取当前用户创建的资源列表
     *
     * @param productQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<Product>> listMyProductVOByPage(@RequestBody ProductQueryRequest productQueryRequest,
            HttpServletRequest request) {
        if (productQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        productQueryRequest.setUserId(loginUser.getId());
        long current = productQueryRequest.getCurrent();
        long size = productQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Product> productPage = productService.page(new Page<>(current, size),
                productService.getQueryWrapper(productQueryRequest));
        return ResultUtils.success(productPage);
    }

    // endregion


    /**
     * 编辑（用户）
     *
     * @param productEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editProduct(@RequestBody ProductEditRequest productEditRequest, HttpServletRequest request) {
        if (productEditRequest == null || productEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Product product = new Product();
        BeanUtils.copyProperties(productEditRequest, product);

        User loginUser = userService.getLoginUser(request);
        long id = productEditRequest.getId();
        // 判断是否存在
        Product oldProduct = productService.getById(id);
        ThrowUtils.throwIf(oldProduct == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldProduct.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean result = productService.updateById(product);
        return ResultUtils.success(result);
    }

    @GetMapping("/all")
    public BaseResponse<List<Product>> getProductList(HttpServletRequest request)
    {
        List<Product> list = productService.list();
        return ResultUtils.success(list);
    }

}
