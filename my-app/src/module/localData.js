import React, { useEffect, useState } from "react";
import axios from "axios";
import api from '../api/covid19api'

import { Card, Col, Row, Popover, Button } from 'antd';
import 'antd/dist/antd.css';
const { BMap, BMAP_STATUS_SUCCESS } = window
export default function LocalData() {
    const [provinceName, setprovinceName] = useState(' ');
    const [cityName, setcityName] = useState('定位失败');
    const [currentLocationData, setcurrentLocationData] = useState([]);
    const [cityData, setcityData] = useState({});
    // 境外输入、待明确区域的人数（各地描述稍微有些出入）所以改为保存json对象
    const [importedCount, setimportedCount] = useState({});
    const [dangerAreas, setdangerAreas] = useState([]);
    useEffect(() => {
        // 获取用户坐标
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                // 获取到了用户当前位置的坐标
                console.log(lat, lng);
                var geoc = new BMap.Geocoder();
                let point = new BMap.Point(lng, lat);
                // 坐标转换，谷歌坐标转百度坐标
                var convertor = new BMap.Convertor();
                let pointArr = [];
                pointArr.push(point);
                convertor.translate(pointArr, 3, 5, data => {
                    if (data.status === 0) {
                        let pt = data.points[0];
                        geoc.getLocation(pt, function (rs) {
                            var addComp = rs.addressComponents;
                            console.log(addComp.province, addComp.city);
                            setprovinceName(addComp.province);
                            setcityName(addComp.city);
                            // 根据定位结果 用省市名查询对应的城市列表
                            axios.post(api.ip + '/findLocalData', {
                                provinceName: addComp.province,
                                cityName: addComp.city
                            }).then(res => {
                                // 保存整个省市数据
                                setcurrentLocationData(res.data);
                                // console.log(res.data);
                                // 保存定位城市名
                                setcityName(addComp.city)
                                // 查找定位城市名
                                setcityData(findCityData(res.data.cities, addComp.city))  
                                // 查找定位城市境外输入数量
                                setimportedCount(findImportedCount(res.data.cities))
                                //保存风险区域名称
                                setdangerAreas(res.data.dangerAreas)
                                console.log(res.data.dangerAreas);
                            }).catch(res => {
                                console.log(res);
                            })

                        });
                    }
                });
            }, error => {
                console.log('定位失败');
                //定位失败后在页面上显示定位失败
                setimportedCount(-1)
                setcurrentLocationData({ provinceName: "定位失败", currentConfirmedCount: -1 })
                setcityData({ currentConfirmedCountStr: -1 })
            });
        } else {
            console.log('当前浏览器不支持定位服务');
        }
    }, []);
    //查找对应定位城市数据 
    function findCityData(currentLocationData_, nameFromGPS) {
        for (let i = 0; i < currentLocationData_.length; i++) {
            let nameFromData = (currentLocationData_[i]["cityName"])
            console.log("定位地点："+nameFromGPS+" 对比项："+nameFromData+" 结果："+nameFromGPS.search(nameFromData))
            if (nameFromGPS.search(nameFromData) > -1) {
                console.log(currentLocationData_[i]);
                return currentLocationData_[i]
            }
        }
    }
    //查找对应城市的境外输入人数
    function findImportedCount(currentLocationData_) {
        if(currentLocationData_.length>0){
            for (let i = 0; i < currentLocationData_.length; i++) {
                let nameFromData = (currentLocationData_[i]["cityName"])
                let str = "境外输入"
                let str2="待明确地区"
                if (str.search(nameFromData) > -1) {
                    console.log("查找到的数据"+currentLocationData_[i]["currentConfirmedCount"]+"所有数据"+currentLocationData_[i]);
                    console.log(currentLocationData_[i]);
                    return currentLocationData_[i]
                }
                if (str2.search(nameFromData) > -1) {
                    console.log("查找到的数据"+currentLocationData_[i]["currentConfirmedCount"]+"所有数据"+currentLocationData_[i]);
                    console.log(currentLocationData_[i]);
                    return currentLocationData_[i]
                }
            }
        }else{
            return {cityName:"当前城市无此数据"}
        }
        
    }
    // 查找对应城市的高危地区
    // function findHighDangerArea(dangerAreas){
    //     for(let i = 0 ;i <dangerAreas.length;i++){
    //         let cityNameFromData = (dangerAreas[i]["cityName"])
            
    //         if(cityName.search(cityNameFromData)>-1){
    //             return 
    //         }
    //     };
    // }
    //页面元素转换 
    function convert(data) {
        var number = parseInt(data)
        // console.log(data);
        //部分省市出现了负数的现存确诊人数，所以小于0时直接显示暂无
        if (number == 0 || number<0) {
            return (
                <a style={{ color: '#52c41a' }}>暂无确诊</a>
            );

        } else if (number > 0) {
            return (
                <a style={{ color: '#DC143C' }}>存现确诊 {number} 人</a>

            );
        }else if (number == -1) {
            return (
                <a style={{ color: '#000000' }}>无法确定您的所在地</a>
            );
        }
    }


    //风险区域气泡内容
    const contentItem = dangerAreas.map((item) =>
        <p key={item.areaName}>{item.cityName}---{item.areaName}</p>
    );
    //风险区域气泡
    const content = (
        <div>
            {contentItem}
        </div>
    );
    //风险区域展开按钮
    const title = (
        <div>
            {currentLocationData['provinceName']}
            <Popover content={content} title="高危地区" >
                <Button danger style={{ margin: '0px 30px ', border: '0px' }} type="primary" shape="circle" size="small">?</Button>
            </Popover>

        </div>
    );
    const title_bak = (
        <div>
            {cityName}
            <Popover content={content} title="高危地区" >
                <Button danger style={{ margin: '0px 30px ', border: '0px' }} type="primary" shape="circle" size="small">?</Button>
            </Popover>

        </div>
    );
    

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                <Col span={8}>
                    <Card title={title} bordered={false}>
                        {convert(currentLocationData['currentConfirmedCount'])}
                    </Card>
                </Col>
                <Col span={8}>

                    <Card title={cityName} bordered={false}>
                        {convert(cityData["currentConfirmedCount"])}
                    </Card>

                </Col>
                <Col span={8}>
                    <Card title={importedCount['cityName']} bordered={false}>
                        {convert(importedCount['currentConfirmedCount'])}
                    </Card>
                </Col>
            </Row>
        </div>
    );

}
