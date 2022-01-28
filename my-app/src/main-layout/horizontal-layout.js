import React, { useEffect, useState } from "react";
import './horizontal-layout.css'
import 'antd/dist/antd.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Popover, Tag, Space, Layout, Menu, Table, Col, Row, Statistic, Button, Divider, Collapse, List, Drawer } from 'antd';
import * as echarts from 'echarts';
import axios from "axios";
import api from '../api/covid19api'
import DataMap from '../module/provinceDataWithMap'
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
import OverAllData from "../module/overAllData";
import ProvinceDataWithMap from "../module/provinceDataWithMap";


const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

function MainLayout() {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/">国内</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/globle">全球</Link>
                    </Menu.Item>

                    <Menu.Item key="3">
                        <Link to="/info">关于</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Routes>
                <Route path='/' element={<National />} />
                <Route path='/globel' element={<Globel />} />
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
                <OverAllData/>
            <Divider orientation="left">本地数据</Divider>

            <Divider orientation="left">各省各市</Divider>
                <ProvinceDataWithMap />
        </Content>
    );
}

// 数据页面
function Globel(props) {
    return (
        <Content style={{ padding: '30px 30px' }}>
            <div className="site-layout-content">Data</div>
        </Content>
    );
}

// 关于页面
function Info(props) {
    return (
        <Content style={{ padding: '30px 30px' }}>
            <div className="site-layout-content">Info</div>
        </Content>
    );
}

export default MainLayout;