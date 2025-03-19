package com.yupi.springbootinit.model.dto.product;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * 更新请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@Data
public class ProductUpdateRequest implements Serializable {

    private Long id;

    /**
     * 商品名称
     */
    private String name;

    /**
     * 商品信息
     */
    private String detail;

    /**
     * 商品分类
     */
    private String category;

    /**
     * 价格
     */
    private double price;

    /**
     * 图片
     */
    private String image;


    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 是否删除
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}