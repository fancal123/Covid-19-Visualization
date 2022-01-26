package com.fancal.covid19.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fancal.covid19.entity.News;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsMapper extends BaseMapper<News> {
}
