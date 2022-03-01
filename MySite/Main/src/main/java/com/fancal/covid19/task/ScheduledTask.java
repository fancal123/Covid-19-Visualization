package com.fancal.covid19.task;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;

@Configuration
@EnableScheduling
public class ScheduledTask {
    //定时任务每小时爬取一次数据
    @Scheduled(cron = "0 0 0/1 * * ? ")
    private void configureTasks() {
        try {
            Process pro = Runtime.getRuntime().exec("C:/Users/糙米小面包/AppData/Local/Programs/Python/Python39/python.exe d:/项目/Covid-19-Visualization/丁香园疫情数据.py");
            String line;
            BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            while ((line = buf.readLine()) != null)
                System.out.println(line);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.err.println("执行爬虫定时任务时间: " + LocalDateTime.now());
    }
}
