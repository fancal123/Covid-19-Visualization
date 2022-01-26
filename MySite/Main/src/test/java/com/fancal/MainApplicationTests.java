package com.fancal;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.fancal.covid19.entity.Overall;
import com.fancal.covid19.entity.Province;
import com.fancal.covid19.repository.OverallMapper;
import com.fancal.covid19.repository.ProvinceMaper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class MainApplicationTests {
    @Autowired
    private OverallMapper overallMapper;

    @Autowired
    private ProvinceMaper provinceMaper;
    @Test
    public void test(){
        List<Province> provinceList = provinceMaper.selectList(null);
        // for(Province p:provinceList){
        //     System.out.println(p.getProvinceName());
        //     System.out.println(p.getContent());
        // }
        Province province=provinceList.get(1);
        JSONArray jsonArray = (JSONArray) JSONArray.toJSON(provinceList);


    }
}
