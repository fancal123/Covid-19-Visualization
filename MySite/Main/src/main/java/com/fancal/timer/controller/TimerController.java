package com.fancal.timer.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.fancal.timer.entity.Timer;
import com.fancal.timer.repository.TimerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/timer")
public class TimerController {
    static{
        HashMap<String, String> stringStirngHashMap = new HashMap<String, String>();
    }
    @Autowired
    private TimerMapper timerMapper;

    @PostMapping("/save")
    public void saveTime(@RequestBody JSONObject jsonObject){
        String time = jsonObject.getString("time");
        //获取今日日期
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String todaysDate = formatter.format(date);

        System.out.println("time:"+time+"dateL"+todaysDate);

        Timer timer = new Timer();
        timer.setTime(time);
        timer.setDate(todaysDate);
        //查询是否有今日的记录，有则更新，没有就插入
        Integer count = timerMapper.selectCount(new QueryWrapper<Timer>().eq("date", todaysDate));
        if(count>0){
            timerMapper.update(timer,new UpdateWrapper<Timer>().eq("date",todaysDate));
        }else{
            timerMapper.insert(timer);
        }

    }
    @GetMapping("/get")
    public JSONObject getTime(){
        //获取今日日期
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String todaysDate = formatter.format(date);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("date",todaysDate);

        Timer dbTime =  new Timer();
        //查询是否有今日的记录，有则更新，没有就插入
        Integer count = timerMapper.selectCount(new QueryWrapper<Timer>().eq("date", todaysDate));
        if(count>0){
            dbTime = timerMapper.selectOne(new QueryWrapper<Timer>().eq("date", todaysDate));
            jsonObject.put("time",dbTime.getTime());
        }else{
            Timer newTimer = new Timer();
            newTimer.setDate(todaysDate);
            timerMapper.insert(newTimer);
            jsonObject.put("time","0-0-0");
        }
        return jsonObject;
    }
}
