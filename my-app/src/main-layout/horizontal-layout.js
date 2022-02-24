import React, { useEffect, useState } from "react";
import './horizontal-layout.css'
import 'antd/dist/antd.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Cascader, Popover, Tag, Space, Layout, Menu, Table, Col, Row, Statistic, Button, Divider, Collapse, List, Drawer } from 'antd';
import * as echarts from 'echarts';
import axios from "axios";
import api from '../api/covid19api'
import DataMap from '../module/provinceDataWithMap'
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
//我的组件
import OverAllData from "../module/overAllData";
import ProvinceDataWithMap from "../module/provinceDataWithMap";
import LocalData from "../module/localData";
import PolicyCheck from "../module/policyCheck";
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

function MainLayout() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">国内数据</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/policy">防疫政策查询</Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to="/info">关于</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Routes>
                <Route path='/' element={<National />} />
                <Route path='/policy' element={<Policy />} />
                <Route path='/info' element={<Info />} />
            </Routes>
            <Footer style={{ textAlign: 'center' }}>Data Visualization and Analyzation Platform of COVID-19 Created by FANCAL</Footer>
        </Layout>
    );

}


// 图表页面
function National(props) {


    return (
        <Content style={{ padding: '30px 150px' }}>
            <Divider orientation="left">全国概览</Divider>
            <OverAllData />
            <Divider orientation="left">本地数据</Divider>
            <LocalData />
            <Divider orientation="left">各省各市</Divider>
            <ProvinceDataWithMap />
        </Content>
    );
}

// 防疫政策查询页面
function Policy(props) {

    //级联选择生成
    // var data = citites["data"];
    // var genData=[];
    // for (let i = 0; i<data.length; i++) {
    //     var children=[];
    //     var cities=data[i].cities;
    //     genData.push({
    //         value: data[i].province_id,
    //         label: data[i].province,
    //         children: getCities(cities)
    //     });
    // }
    // function getCities(cities){
    //     var children=[];
    //    for(let i=0;i<cities.length;i++){

    //         children.push({
    //             value:cities[i].city_id,
    //             label:cities[i].city,
    //         });
    //    }
    //    return children;

    // }
    // console.log(genData);
   
    function onChange(value) {
        console.log(value);
    }
    return (
        <Content  style={{ padding: '30px 30px',width: '700px',textAlign:'center',alignSelf:'center' }}>
            <PolicyCheck />
        </Content>
    );
}

// 关于页面
function Info(props) {
    return (
        <Content style={{ padding: '30px 30px' }}>
            
        </Content>
    );
}

export default MainLayout;