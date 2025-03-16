package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 
 * @TableName melanoma_skin_cancer
 */
@TableName(value ="melanoma_skin_cancer")
@Data
public class MelanomaSkinCancer {
    /**
     * id
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 
     */
    private Date year;

    /**
     * 
     */
    private Long count;
}