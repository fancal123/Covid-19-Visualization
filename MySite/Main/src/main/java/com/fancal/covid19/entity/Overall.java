package com.fancal.covid19.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("overalldata")
@ToString
public class Overall {
    @TableField
    private String currentConfirmedCount;
    private String currentConfirmedIncr;
    private String suspectedCount;
    private String suspectedIncr;
    private String seriousCount;
    private String seriousIncr;
    private String confirmedCount;
    private String confirmedIncr;
    private String deadCount;
    private String deadIncr;
    private String curedCount;
    private String curedIncr;
}
