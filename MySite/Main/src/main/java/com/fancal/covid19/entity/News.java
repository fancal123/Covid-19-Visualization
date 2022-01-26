package com.fancal.covid19.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("news")
@ToString
public class News {
    private String pubDate;
    private String pubDateStr;
    private String title;
    private String summary;
    private String link;
}
