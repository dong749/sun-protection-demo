package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.yupi.springbootinit.constant.CommonConstant;
import com.yupi.springbootinit.mapper.ProductMapper;
import com.yupi.springbootinit.model.dto.product.ProductQueryRequest;
import com.yupi.springbootinit.model.entity.Product;
import com.yupi.springbootinit.utils.SqlUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import com.yupi.springbootinit.service.ProductService;

import java.util.List;

/**
* @author xu
* @description 针对表【product(商品)】的数据库操作Service实现
* @createDate 2025-03-11 20:29:30
*/
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product>
    implements ProductService{

    @Override
    public Wrapper<Product> getQueryWrapper(ProductQueryRequest productQueryRequest)
    {
        QueryWrapper<Product> queryWrapper = new QueryWrapper<>();
        if (productQueryRequest == null)
        {
            return queryWrapper;
        }

        Long id = productQueryRequest.getId();
        String name = productQueryRequest.getName();
        Long userId = productQueryRequest.getUserId();
        String category = productQueryRequest.getCategory();
        String sortField = productQueryRequest.getSortField();
        String sortOrder = productQueryRequest.getSortOrder();
        Double price = productQueryRequest.getPrice();

        queryWrapper.eq(id != null , "id", id);
        queryWrapper.eq(StringUtils.isNotBlank(name), "name", name);
        queryWrapper.eq(ObjectUtils.isNotEmpty(userId) , "userId", userId);
        queryWrapper.eq(StringUtils.isNotBlank(category) , "category", category);
        queryWrapper.eq(true, "price", price);
        queryWrapper.eq("isDelete", false);

        queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC)
                , sortField);

        return queryWrapper;
    }
}




