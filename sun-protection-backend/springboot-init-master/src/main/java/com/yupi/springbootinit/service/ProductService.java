package com.yupi.springbootinit.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.springbootinit.model.dto.product.ProductQueryRequest;
import com.yupi.springbootinit.model.entity.Product;

/**
* @author xu
* @description 针对表【product(商品)】的数据库操作Service
* @createDate 2025-03-11 20:29:30
*/
public interface ProductService extends IService<Product> {

    Wrapper<Product> getQueryWrapper(ProductQueryRequest productQueryRequest);
}
