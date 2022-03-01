import React, { useEffect, useState } from "react";

import * as echarts from 'echarts'
// import BMap  from 'BMap';
// const { BMap, BMAP_STATUS_SUCCESS } = window
import axios from "axios";
import api from '../api/covid19api'
import china from './中华人民共和国.json'
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
import { Popover, Tag, Space, Layout, Menu, Table, Col, Row, Statistic, Button, Divider, Collapse, List, Drawer } from 'antd';


// "国内页面"表格表头
const columns = [
    {
        title: '地区',
        dataIndex: 'provinceName',
        key: 'provinceName',
    },
    {
        title: '现存确诊',
        dataIndex: 'currentConfirmedCount',
        key: 'currentConfirmedCount',
    },
    {
        title: '累积确诊',
        dataIndex: 'confirmedCount',
        key: 'confirmedCount',
    },
    {
        title: '治愈',
        dataIndex: 'curedCount',
        key: 'curedCount',
    },
    {
        title: '死亡',
        dataIndex: 'deadCount',
        key: 'deadCount',
    },
];

export default function ProvinceDataWithMap() {
    // 各省各市数据
    const [provinceData, setprovinceData] = useState([]);

    useEffect(() => {
        // 获取各省各市数据
        axios.get(api.ip + '/getProvinceData').then(res => {
            setprovinceData(res.data)
        }).catch(res => {
            console.log("Province数据获取失败");
        });

    }, []);
    // 各省各市表格所需数据
    const data = provinceData.map(assemble)
    // const data = []
    function assemble(provinceData_) {
        return ({
            key: provinceData_['locationId'],
            provinceName: provinceData_['provinceName'],
            currentConfirmedCount: provinceData_['currentConfirmedCount'],
            confirmedCount: provinceData_['confirmedCount'],
            curedCount: provinceData_['curedCount'],
            deadCount: provinceData_['deadCount'],
            description: provinceData_['cities'].length > 0 ? provinceData_['cities'].map(cities_paser) : 'NoCity'
        });
    }
    function cities_paser(cityData) {
        if (cityData.lengh == 0) {
            return ('Not Expandable');
        }
        return ({
            key: cityData['locationId'],
            provinceName: cityData['cityName'],
            currentConfirmedCount: cityData['currentConfirmedCount'],
            confirmedCount: cityData['confirmedCount'],
            curedCount: cityData['curedCount'],
            deadCount: cityData['deadCount'],
        });
    }
    // 组装地图数据
    const mapdata = provinceData.map(assembleMapData);
    function assembleMapData(provinceData_) {
        if(provinceData_['provinceName']=="台湾"){
            return({
                name:'台湾省',
                value: provinceData_['currentConfirmedCount'],
            });
        }else{
            return({
                name: provinceData_['provinceName'],
                value: provinceData_['currentConfirmedCount'],
            });
        }

    }
    console.log(mapdata);
    useEffect(() => {
        let myChart = echarts.init(document.getElementById('map'))
        let name = 'china' //地图名
        let data = china  //地图的数据来自之前引入的json文件
        echarts.registerMap(name, data) //此步不可省略，要想展示一个地图，先需要注册
        let option = {
            backgroundColor: '#fff',
            geo: {
                select: {
                    disabled: true
                },
                center: [104.114129, 37.550339],
                type: 'map',
                map: name,
                roam: true,
                geoIndex: 1,
                zoom: 1.6,  //地图的比例
                scaleLimit: {//缩放控制，设置为同一数字，禁止缩放
                    min: 1.6,
                    max: 8
                },

                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#000000'  //字体颜色
                        },
                        fontSize: 8,
                    },
                    emphasis: {
                        textStyle: {
                            color: '#000000'  //选中后的字体颜色
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#EEEEEE',
                        borderColor: '#8b8b8b',
                    },
                    emphasis: {
                        focus: 'self',
                        color: '#fff'
                    },
                },
                nameMap: {
                    '澳门特别行政区': '澳门',
                    '香港特别行政区': '香港'
                },

            },
            visualMap: {
                left: 'left',
                min: 0,
                max: 500,
                inRange: {
                    color: [
                        '#fff',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026'
                    ]
                },
                text: ['High', 'Low'],
                calculable: true
            },

            series: [
                {
                    name: "现存确诊",
                    type: "map",
                    geoIndex: 0,
                    data: mapdata,
                },
            ],
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
            },
        }
        myChart.setOption(option, true);
    });

    return (


        <ProCard split="vertical">
            <ProCard colSpan="50%">
                <Table
                    dataSource={data}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <Table columns={columns} dataSource={record.description} />,
                        rowExpandable: record => record.description !== 'NoCity',
                    }}
                />
            </ProCard>
            <ProCard title="现存确诊地图" headerBordered>
                <div style={{ height: 500 }} >
                    <div id="map" style={{ height: '100%', width: '100%' }}></div>
                </div>
            </ProCard>
        </ProCard>

    );
}
