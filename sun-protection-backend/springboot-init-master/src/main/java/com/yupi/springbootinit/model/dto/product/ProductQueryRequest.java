package com.yupi.springbootinit.model.dto.product;

import com.yupi.springbootinit.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * 查询请求
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ProductQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;



    /**
     * 标题
     */
    private String name;



    /**
     * 创建用户 id
     */
    private Long userId;

    /**
     * 分类
     */
    private String category;


    private static final long serialVersionUID = 1L;
}