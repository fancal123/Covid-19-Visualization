import React, { useEffect, useState } from "react";
import './horizontal-layout.css'
import 'antd/dist/antd.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Popover, Tag, Space, Layout, Menu, Table, Col, Row, Statistic, Button, Divider, Collapse, List, Drawer } from 'antd';
import * as echarts from 'echarts';
import axios from "axios";
import api from '../api/covid19api'
import DataMap from '../module/testMap'
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'


// import ProTable, { TableDropdown } from '@ant-design/pro-table';

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


// 图表页面
function National(props) {

    // 总结数据
    const [overAllData, setoverAllData] = useState([]);
    // 实时新闻
    const [news, setnews] = useState([]);
    // 各省各市数据
    const [provinceData, setprovinceData] = useState([]);



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
        // 获取各省各市数据
        axios.get(api.ip + '/getProvinceData').then(res => {
            setprovinceData(res.data)
        }).catch(res => {
            console.log("Province数据获取失败");
        });

    }, []);
    

    // 实时新闻表格内容
    const newsList = news.map((news_) =>
        <a href={news_["link"]} style={{ color: '#000000' }}>{news_["pubDateStr"]} {news_["title"]}</a>
    );
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
    const mapdata = provinceData.map(assembleMapData);
    function assembleMapData(provinceData_) {
        return ({
            name: provinceData_['provinceName'],
            value: provinceData_['currentConfirmedCount'],
        });
    }
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


    return (
        <Content style={{ padding: '30px 150px' }}>

            <Divider orientation="left">全国概览</Divider>

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
                            <Statistic title="累积死亡" value={overAllData['deadCount']} suffix={<label style={overAllData['deadIncr'] < 0 ? { color: '#DC143C', fontSize: 5 } : { color: '#52c41a', fontSize: 5 }} >{showIncr(overAllData['deadIncr'])}</label>} />
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
            <Divider orientation="left">各省各市</Divider>

            {/* <Table columns={columns} dataSource={data} /> */}

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
                    <div style={{ height: 500 }} id="map">
                        <DataMap mapdata={mapdata}/>
                    </div>
                </ProCard>
            </ProCard>
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