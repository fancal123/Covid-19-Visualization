package com.fancal.covid19.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fancal.covid19.entity.News;
import com.fancal.covid19.entity.Overall;
import com.fancal.covid19.entity.Province;
import com.fancal.covid19.repository.NewsMapper;
import com.fancal.covid19.repository.OverallMapper;
import com.fancal.covid19.repository.ProvinceMaper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/getOverAllData")
    public JSONObject getOverAllInfo(){
        Overall overall = overallMapper.selectOne(null);
        JSONObject jsonObject = (JSONObject) JSONObject.toJSON(overall);
        return jsonObject;
    };
    @GetMapping("/getNews")
    public JSONArray getNews(){
        List<News> news = newsMapper.selectList(null);
        JSONArray jsonArray= (JSONArray) JSONArray.toJSON(news);
        return jsonArray;
    }
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
}
