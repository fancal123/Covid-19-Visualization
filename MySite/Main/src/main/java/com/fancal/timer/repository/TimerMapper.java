package com.fancal.timer.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fancal.timer.entity.Timer;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TimerMapper extends BaseMapper<Timer> {
}
