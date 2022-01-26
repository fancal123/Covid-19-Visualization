package com.fancal.timer.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("t_timer")
public class Timer {
    @TableId(type = IdType.ASSIGN_UUID)
    private String id;
    @TableField
    private String time;
    @TableField
    private String date;
}
