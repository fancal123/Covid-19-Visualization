package com.fancal.covid19.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("updatetime")
public class UpdateTime {
    private String time;
}
