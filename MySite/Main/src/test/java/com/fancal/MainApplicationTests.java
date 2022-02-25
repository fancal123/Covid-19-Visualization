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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@SpringBootTest
class MainApplicationTests {
    @Autowired
    private OverallMapper overallMapper;

    @Autowired
    private ProvinceMaper provinceMaper;
    @Test
    public void test(){
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
