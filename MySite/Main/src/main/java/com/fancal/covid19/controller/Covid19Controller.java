package com.fancal.covid19.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fancal.covid19.entity.News;
import com.fancal.covid19.entity.Overall;
import com.fancal.covid19.entity.Province;
import com.fancal.covid19.entity.UpdateTime;
import com.fancal.covid19.repository.NewsMapper;
import com.fancal.covid19.repository.OverallMapper;
import com.fancal.covid19.repository.ProvinceMaper;
import com.fancal.covid19.repository.UpdateTimeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@RestController
@RequestMapping("/covid19")
public class Covid19Controller {
    @Autowired
    private OverallMapper overallMapper;

    @Autowired
    private NewsMapper newsMapper;

    @Autowired
    private ProvinceMaper provinceMaper;

    @Autowired
    private UpdateTimeMapper updateTimeMapper;
    //获取全国概览数据
    @GetMapping("/getOverAllData")
    public JSONObject getOverAllInfo(){
        Overall overall = overallMapper.selectOne(null);
        JSONObject jsonObject = (JSONObject) JSONObject.toJSON(overall);
        return jsonObject;
    };
    //获取时事新闻
    @GetMapping("/getNews")
    public JSONArray getNews(){
        List<News> news = newsMapper.selectList(null);
        JSONArray jsonArray= (JSONArray) JSONArray.toJSON(news);
        return jsonArray;
    }
    //获取各省各市数据
    @GetMapping("/getProvinceData")
    public JSONArray getProvinceData(){
        List<Province> provinceList = provinceMaper.selectList(null);
        JSONArray jsonArray = new JSONArray();
        for(Province province:provinceList){
            JSONObject jsonObject = JSONObject.parseObject(province.getContent());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }
    //查询当前城市数据
    @PostMapping("/findLocalData")
    public JSONObject getLocalData(@RequestBody JSONObject jsonObject){
        String provinceName = jsonObject.getString("provinceName");
        String cityName = jsonObject.getString("cityName");
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("provinceName",provinceName);
        Province province = provinceMaper.selectOne(queryWrapper);
        //由于结构设定，不需要传递province对象中的provincename，content中就包含了所有所需数据
        JSONObject content = JSONObject.parseObject(province.getContent());
        // JSONArray  jsonArray= (JSONArray) JSONArray.toJSON(content.get("cities"));


        return content;
    }
    //获取爬虫数据爬取时间
    @GetMapping("/getUpdateTime")
    public JSONObject getUpdateTime(){
        JSONObject jsonObject = new JSONObject();
        UpdateTime updateTime=updateTimeMapper.selectOne(null);
        jsonObject.put("updatetime",updateTime.getTime());
        return jsonObject;
    }
    @PostMapping("/activateCrawler")
    public void activateCrawler(){
        try {
            Process pro = Runtime.getRuntime().exec("C:/Users/糙米小面包/AppData/Local/Programs/Python/Python39/python.exe d:/项目/Covid-19-Visualization/丁香园疫情数据.py");
            String line;
            BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            while ((line = buf.readLine()) != null)
                System.out.println(line);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
