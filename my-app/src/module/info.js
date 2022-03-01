import React, { useEffect, useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { Descriptions, Badge, Tooltip, Button, Statistic, Row, Col } from "antd";
import { UndoOutlined } from '@ant-design/icons';

import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
import api from '../api/covid19api'
export default function InfoPanel() {
    const [UpdateTime, setUpdateTime] = useState([]);
    useEffect(() => {
        axios.get(api.ip + "/getUpdateTime").then(res => {
            setUpdateTime(res.data)
            console.log(res.data);
        })
    }, []);
    function update() {
        axios.post(api.ip+"/activateCrawler").then(res=>{
            axios.get(api.ip + "/getUpdateTime").then(res => {
                setUpdateTime(res.data)
                console.log(res.data);
            })
        });
        console.log("数据爬取中");
    }

    return (
        <ProCard>
            <Row>
                <Col span={11}>
                    <Statistic title="作者" value="鄢一凡" />
                </Col>
                <Col span={8}>
                    <Statistic title="联系方式" value="fancal@foxmail.com" />
                </Col>
            </Row>
            <Row style={{padding:'30px 0'}}>
                <Col>
                    <Statistic
                        title="上一次数据爬取时间"
                        value={UpdateTime.updatetime}

                    />
                </Col>
                <Col>
                    <Tooltip title="更新数据" >
                        <Button style={{margin: '34px 8px 0 '}} onClick={update} type="primary" shape="circle" icon={<UndoOutlined />} size="small" />
                    </Tooltip>
                </Col>
            </Row>



        </ProCard>

    );
}
