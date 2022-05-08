import React, { useEffect, useState } from "react"; 
import 'antd/dist/antd.css';
import {  Col, Row, Statistic,List } from 'antd';
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
import axios from "axios";
import api from '../api/covid19api'

//“较昨日增加”元素正负判断
function showIncr(Incr) {
    if (Incr > 0) {
        return '较昨日+' + Incr;
    } else if (Incr < 0) {
        return '较昨日' + Incr;
    } else if (Incr == 0) {
        return '较昨日无变化';
    }
}



export default function OverAllData(){

    // 总结数据
    const [overAllData, setoverAllData] = useState([]);
    // 实时新闻
    const [news, setnews] = useState([]);

    useEffect(() => {
        // 获取总结数据集
        axios.get(api.ip + '/getOverAllData').then(res => {
            setoverAllData(res.data);
        }).catch(res => {
            console.log("OverAll数据获取失败");
        });
        // 获取实时新闻
        axios.get(api.ip + '/getNews').then(res => {
            setnews(res.data);
        }).catch(res => {
            console.log("News数据获取失败");
        });

    }, []);
    // 实时新闻表格内容
    const newsList = news.map((news_) =>
        <a href={news_["link"]} style={{ color: '#000000' }}>{news_["pubDateStr"]} {news_["title"]}</a>
    );
    return (
        <ProCard split="vertical">
            <ProCard colSpan="65%">
                <Row>
                    <Col span={8}>
                        <Statistic title="累积确诊" value={overAllData['confirmedCount']} suffix={<label style={overAllData['confirmedIncr'] < 0 ? { color: '#52c41a', fontSize: 5 } : { color: '#DC143C', fontSize: 5 }} >{showIncr(overAllData['confirmedIncr'])}</label>} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="现存确诊" value={overAllData['currentConfirmedCount']} suffix={<label style={overAllData['currentConfirmedIncr'] < 0 ? { color: '#52c41a', fontSize: 5 } : { color: '#DC143C', fontSize: 5 }} >{showIncr(overAllData['currentConfirmedIncr'])}</label>} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="现存无症状" value={overAllData['seriousCount']} suffix={<label style={overAllData['seriousIncr'] < 0 ? { color: '#52c41a', fontSize: 5 } : { color: '#DC143C', fontSize: 5 }} >{showIncr(overAllData['seriousIncr'])}</label>} />
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Statistic title="境外输入" value={overAllData['suspectedCount']} suffix={<label style={overAllData['suspectedIncr'] < 0 ? { color: '#52c41a', fontSize: 5 } : { color: '#DC143C', fontSize: 5 }} >{showIncr(overAllData['suspectedIncr'])}</label>} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="累积治愈" value={overAllData['curedCount']} suffix={<label style={overAllData['curedIncr'] < 0 ? { color: '#DC143C', fontSize: 5 } : { color: '#52c41a', fontSize: 5 }} >{showIncr(overAllData['curedIncr'])}</label>} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="累积死亡" value={overAllData['deadCount']} suffix={<label style={overAllData['deadIncr'] < 0 ? { color: '#52c41a', fontSize: 5 } : { color: '#DC143C', fontSize: 5 }} >{showIncr(overAllData['deadIncr'])}</label>} />
                    </Col>
                </Row>
            </ProCard>
            <ProCard title="实时新闻" headerBordered>
                <div style={{ height: 100, overflow: 'auto' }}>
                    <List
                        size="small"
                        dataSource={newsList}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    >
                    </List>
                </div>
            </ProCard>
        </ProCard>
    );
}
