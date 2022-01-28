import React, { useEffect, useState } from "react";
import $ from 'jquery'
import * as d3 from 'd3'
// 在main.js中

import * as echarts from 'echarts'
// import BMap  from 'BMap';
// const { BMap, BMAP_STATUS_SUCCESS } = window
import axios from "axios";
import api from '../api/covid19api'
import china from './中华人民共和国.json'
import { select } from "d3";
export default function DataMap(props) {

    const {mapdata} = props;    
    
    console.log(mapdata);
    useEffect(() => {

        let myChart = echarts.init(document.getElementById('map1'))
        let name = 'china' //地图名是jiangxi
        let data = china  //地图的数据来自之前引入的json文件
        echarts.registerMap(name, data) //此步不可省略，要想展示一个地图，先需要注册，巨坑（官方根本无文档，全靠瞎猜）
        let option = {
            backgroundColor: '#fff',
            geo: {
                select:{
                    disabled:true
                },
                // data:mapdata,
                center: [104.114129, 37.550339],
                type: 'map',
                map: name, //'jiangxi'
                roam: true,
                geoIndex: 1,
                zoom: 1.6,  //地图的比例
                scaleLimit: {//缩放控制，设置为同一数字，禁止缩放
                    min: 1.6,
                    max: 3
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
                        color:'#fff'
                    },
                },
                nameMap: {
                    '澳门特别行政区': '',
                    '香港特别行政区': ''
                },
                
            },
            visualMap: {
                left: 'right',
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
        } //此处先省略，不放入任何数据

        myChart.setOption(option, true);
    });

    return (
        <div id="map1" style={{ height: '100%', width: '100%' }}>

        </div>
    );
}
