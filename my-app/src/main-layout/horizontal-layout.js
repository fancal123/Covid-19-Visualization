import React, { useEffect, useState } from "react";
import './horizontal-layout.css'
import 'antd/dist/antd.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Tag,Space,Layout, Menu, Table, Col, Row, Statistic, Button, Divider, Collapse, List, Drawer } from 'antd';
import * as echarts from 'echarts';
import axios from "axios";
import api from '../api/covid19api'

import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'




const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;

class MainLayout extends React.Component {
    render() {
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];


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
    // console.log({ provinceData });
    // 实时新闻表格内容
    const newsList = news.map((news_) =>
        <a href={news_["link"]} style={{ color: '#000000' }}>{news_["pubDateStr"]} {news_["title"]}</a>
    )

    return (
        <Content style={{ padding: '30px 30px' }}>

            <Divider orientation="left"></Divider>

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
            <Divider orientation="left">各省各市111</Divider>

            <Table columns={columns} dataSource={data} bo/>

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