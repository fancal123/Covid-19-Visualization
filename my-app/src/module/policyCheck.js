import React, { useEffect, useState } from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import { Cascader, Col, Row, Statistic, List, Alert, Card } from "antd";
import ProCard from '@ant-design/pro-card';
import '@ant-design/pro-card/dist/card.css'
import destination from "../res/destination.png"
import location from "../res/location.png"

import { SwapOutlined, CaretDownOutlined } from '@ant-design/icons';
export default function PolicyCheck() {
    const options = [
        {
            "value": 1,
            "label": "安徽",
            "children": [
                {
                    "value": 10001,
                    "label": "合肥"
                },
                {
                    "value": 10002,
                    "label": "芜湖"
                },
                {
                    "value": 10003,
                    "label": "蚌埠"
                },
                {
                    "value": 10004,
                    "label": "淮南"
                },
                {
                    "value": 10005,
                    "label": "马鞍山"
                },
                {
                    "value": 10006,
                    "label": "淮北"
                },
                {
                    "value": 10007,
                    "label": "铜陵"
                },
                {
                    "value": 10008,
                    "label": "安庆"
                },
                {
                    "value": 10009,
                    "label": "黄山"
                },
                {
                    "value": 10010,
                    "label": "滁州"
                },
                {
                    "value": 10011,
                    "label": "阜阳"
                },
                {
                    "value": 10012,
                    "label": "宿州"
                },
                {
                    "value": 10013,
                    "label": "六安"
                },
                {
                    "value": 10014,
                    "label": "亳州"
                },
                {
                    "value": 10015,
                    "label": "池州"
                },
                {
                    "value": 10016,
                    "label": "宣城"
                }
            ]
        },
        {
            "value": 2,
            "label": "北京",
            "children": [
                {
                    "value": 10017,
                    "label": "北京"
                }
            ]
        },
        {
            "value": 3,
            "label": "重庆",
            "children": [
                {
                    "value": 10018,
                    "label": "重庆"
                }
            ]
        },
        {
            "value": 4,
            "label": "福建",
            "children": [
                {
                    "value": 10019,
                    "label": "福州"
                },
                {
                    "value": 10020,
                    "label": "厦门"
                },
                {
                    "value": 10021,
                    "label": "莆田"
                },
                {
                    "value": 10022,
                    "label": "三明"
                },
                {
                    "value": 10023,
                    "label": "泉州"
                },
                {
                    "value": 10024,
                    "label": "漳州"
                },
                {
                    "value": 10025,
                    "label": "南平"
                },
                {
                    "value": 10026,
                    "label": "龙岩"
                },
                {
                    "value": 10027,
                    "label": "宁德"
                }
            ]
        },
        {
            "value": 5,
            "label": "广东",
            "children": [
                {
                    "value": 10028,
                    "label": "广州"
                },
                {
                    "value": 10029,
                    "label": "韶关"
                },
                {
                    "value": 10030,
                    "label": "深圳"
                },
                {
                    "value": 10031,
                    "label": "珠海"
                },
                {
                    "value": 10032,
                    "label": "汕头"
                },
                {
                    "value": 10033,
                    "label": "佛山"
                },
                {
                    "value": 10034,
                    "label": "江门"
                },
                {
                    "value": 10035,
                    "label": "湛江"
                },
                {
                    "value": 10036,
                    "label": "茂名"
                },
                {
                    "value": 10037,
                    "label": "肇庆"
                },
                {
                    "value": 10038,
                    "label": "惠州"
                },
                {
                    "value": 10039,
                    "label": "梅州"
                },
                {
                    "value": 10040,
                    "label": "汕尾"
                },
                {
                    "value": 10041,
                    "label": "河源"
                },
                {
                    "value": 10042,
                    "label": "阳江"
                },
                {
                    "value": 10043,
                    "label": "清远"
                },
                {
                    "value": 10044,
                    "label": "东莞"
                },
                {
                    "value": 10045,
                    "label": "中山"
                },
                {
                    "value": 10046,
                    "label": "潮州"
                },
                {
                    "value": 10047,
                    "label": "揭阳"
                },
                {
                    "value": 10048,
                    "label": "云浮"
                }
            ]
        },
        {
            "value": 6,
            "label": "甘肃",
            "children": [
                {
                    "value": 10049,
                    "label": "兰州"
                },
                {
                    "value": 10050,
                    "label": "嘉峪关"
                },
                {
                    "value": 10051,
                    "label": "金昌"
                },
                {
                    "value": 10052,
                    "label": "白银"
                },
                {
                    "value": 10053,
                    "label": "天水"
                },
                {
                    "value": 10054,
                    "label": "武威"
                },
                {
                    "value": 10055,
                    "label": "张掖"
                },
                {
                    "value": 10056,
                    "label": "平凉"
                },
                {
                    "value": 10057,
                    "label": "酒泉"
                },
                {
                    "value": 10058,
                    "label": "庆阳"
                },
                {
                    "value": 10059,
                    "label": "定西"
                },
                {
                    "value": 10060,
                    "label": "陇南"
                },
                {
                    "value": 10061,
                    "label": "临夏"
                },
                {
                    "value": 10062,
                    "label": "甘南"
                }
            ]
        },
        {
            "value": 7,
            "label": "广西",
            "children": [
                {
                    "value": 10063,
                    "label": "南宁"
                },
                {
                    "value": 10064,
                    "label": "柳州"
                },
                {
                    "value": 10065,
                    "label": "桂林"
                },
                {
                    "value": 10066,
                    "label": "梧州"
                },
                {
                    "value": 10067,
                    "label": "北海"
                },
                {
                    "value": 10068,
                    "label": "防城港"
                },
                {
                    "value": 10069,
                    "label": "钦州"
                },
                {
                    "value": 10070,
                    "label": "贵港"
                },
                {
                    "value": 10071,
                    "label": "玉林"
                },
                {
                    "value": 10072,
                    "label": "百色"
                },
                {
                    "value": 10073,
                    "label": "贺州"
                },
                {
                    "value": 10074,
                    "label": "河池"
                },
                {
                    "value": 10075,
                    "label": "来宾"
                },
                {
                    "value": 10076,
                    "label": "崇左"
                }
            ]
        },
        {
            "value": 8,
            "label": "贵州",
            "children": [
                {
                    "value": 10077,
                    "label": "贵阳"
                },
                {
                    "value": 10078,
                    "label": "六盘水"
                },
                {
                    "value": 10079,
                    "label": "遵义"
                },
                {
                    "value": 10080,
                    "label": "安顺"
                },
                {
                    "value": 10081,
                    "label": "毕节"
                },
                {
                    "value": 10082,
                    "label": "铜仁"
                },
                {
                    "value": 10083,
                    "label": "黔西南"
                },
                {
                    "value": 10084,
                    "label": "黔东南"
                },
                {
                    "value": 10085,
                    "label": "黔南"
                }
            ]
        },
        {
            "value": 9,
            "label": "河北",
            "children": [
                {
                    "value": 10086,
                    "label": "石家庄"
                },
                {
                    "value": 10087,
                    "label": "唐山"
                },
                {
                    "value": 10088,
                    "label": "秦皇岛"
                },
                {
                    "value": 10089,
                    "label": "邯郸"
                },
                {
                    "value": 10090,
                    "label": "邢台"
                },
                {
                    "value": 10091,
                    "label": "保定"
                },
                {
                    "value": 10092,
                    "label": "张家口"
                },
                {
                    "value": 10093,
                    "label": "承德"
                },
                {
                    "value": 10094,
                    "label": "沧州"
                },
                {
                    "value": 10095,
                    "label": "廊坊"
                },
                {
                    "value": 10096,
                    "label": "衡水"
                }
            ]
        },
        {
            "value": 10,
            "label": "湖北",
            "children": [
                {
                    "value": 10097,
                    "label": "武汉"
                },
                {
                    "value": 10098,
                    "label": "黄石"
                },
                {
                    "value": 10099,
                    "label": "十堰"
                },
                {
                    "value": 10100,
                    "label": "宜昌"
                },
                {
                    "value": 10101,
                    "label": "襄阳"
                },
                {
                    "value": 10102,
                    "label": "鄂州"
                },
                {
                    "value": 10103,
                    "label": "荆门"
                },
                {
                    "value": 10104,
                    "label": "孝感"
                },
                {
                    "value": 10105,
                    "label": "荆州"
                },
                {
                    "value": 10106,
                    "label": "黄冈"
                },
                {
                    "value": 10107,
                    "label": "咸宁"
                },
                {
                    "value": 10108,
                    "label": "随州"
                },
                {
                    "value": 10109,
                    "label": "恩施"
                },
                {
                    "value": 10110,
                    "label": "仙桃"
                },
                {
                    "value": 10111,
                    "label": "潜江"
                },
                {
                    "value": 10112,
                    "label": "天门"
                },
                {
                    "value": 10113,
                    "label": "神农架"
                }
            ]
        },
        {
            "value": 11,
            "label": "黑龙江",
            "children": [
                {
                    "value": 10114,
                    "label": "哈尔滨"
                },
                {
                    "value": 10115,
                    "label": "齐齐哈尔"
                },
                {
                    "value": 10116,
                    "label": "鸡西"
                },
                {
                    "value": 10117,
                    "label": "鹤岗"
                },
                {
                    "value": 10118,
                    "label": "双鸭山"
                },
                {
                    "value": 10119,
                    "label": "大庆"
                },
                {
                    "value": 10120,
                    "label": "伊春"
                },
                {
                    "value": 10121,
                    "label": "佳木斯"
                },
                {
                    "value": 10122,
                    "label": "七台河"
                },
                {
                    "value": 10123,
                    "label": "牡丹江"
                },
                {
                    "value": 10124,
                    "label": "黑河"
                },
                {
                    "value": 10125,
                    "label": "绥化"
                },
                {
                    "value": 10126,
                    "label": "大兴安岭"
                }
            ]
        },
        {
            "value": 12,
            "label": "海南",
            "children": [
                {
                    "value": 10127,
                    "label": "海口"
                },
                {
                    "value": 10128,
                    "label": "三亚"
                },
                {
                    "value": 10129,
                    "label": "三沙"
                },
                {
                    "value": 10130,
                    "label": "儋州"
                },
                {
                    "value": 10131,
                    "label": "五指山"
                },
                {
                    "value": 10132,
                    "label": "琼海"
                },
                {
                    "value": 10133,
                    "label": "文昌"
                },
                {
                    "value": 10134,
                    "label": "万宁"
                },
                {
                    "value": 10135,
                    "label": "东方"
                },
                {
                    "value": 10136,
                    "label": "定安"
                },
                {
                    "value": 10137,
                    "label": "屯昌"
                },
                {
                    "value": 10138,
                    "label": "澄迈"
                },
                {
                    "value": 10139,
                    "label": "临高"
                },
                {
                    "value": 10140,
                    "label": "白沙"
                },
                {
                    "value": 10141,
                    "label": "昌江"
                },
                {
                    "value": 10142,
                    "label": "乐东"
                },
                {
                    "value": 10143,
                    "label": "陵水"
                },
                {
                    "value": 10144,
                    "label": "保亭"
                },
                {
                    "value": 10145,
                    "label": "琼中"
                }
            ]
        },
        {
            "value": 13,
            "label": "河南",
            "children": [
                {
                    "value": 10146,
                    "label": "郑州"
                },
                {
                    "value": 10147,
                    "label": "开封"
                },
                {
                    "value": 10148,
                    "label": "洛阳"
                },
                {
                    "value": 10149,
                    "label": "平顶山"
                },
                {
                    "value": 10150,
                    "label": "安阳"
                },
                {
                    "value": 10151,
                    "label": "鹤壁"
                },
                {
                    "value": 10152,
                    "label": "新乡"
                },
                {
                    "value": 10153,
                    "label": "焦作"
                },
                {
                    "value": 10154,
                    "label": "濮阳"
                },
                {
                    "value": 10155,
                    "label": "许昌"
                },
                {
                    "value": 10156,
                    "label": "漯河"
                },
                {
                    "value": 10157,
                    "label": "三门峡"
                },
                {
                    "value": 10158,
                    "label": "南阳"
                },
                {
                    "value": 10159,
                    "label": "商丘"
                },
                {
                    "value": 10160,
                    "label": "信阳"
                },
                {
                    "value": 10161,
                    "label": "周口"
                },
                {
                    "value": 10162,
                    "label": "驻马店"
                },
                {
                    "value": 10163,
                    "label": "济源"
                }
            ]
        },
        {
            "value": 14,
            "label": "湖南",
            "children": [
                {
                    "value": 10164,
                    "label": "长沙"
                },
                {
                    "value": 10165,
                    "label": "株洲"
                },
                {
                    "value": 10166,
                    "label": "湘潭"
                },
                {
                    "value": 10167,
                    "label": "衡阳"
                },
                {
                    "value": 10168,
                    "label": "邵阳"
                },
                {
                    "value": 10169,
                    "label": "岳阳"
                },
                {
                    "value": 10170,
                    "label": "常德"
                },
                {
                    "value": 10171,
                    "label": "张家界"
                },
                {
                    "value": 10172,
                    "label": "益阳"
                },
                {
                    "value": 10173,
                    "label": "郴州"
                },
                {
                    "value": 10174,
                    "label": "永州"
                },
                {
                    "value": 10175,
                    "label": "怀化"
                },
                {
                    "value": 10176,
                    "label": "娄底"
                },
                {
                    "value": 10177,
                    "label": "湘西"
                }
            ]
        },
        {
            "value": 15,
            "label": "吉林",
            "children": [
                {
                    "value": 10178,
                    "label": "长春"
                },
                {
                    "value": 10179,
                    "label": "吉林"
                },
                {
                    "value": 10180,
                    "label": "四平"
                },
                {
                    "value": 10181,
                    "label": "辽源"
                },
                {
                    "value": 10182,
                    "label": "通化"
                },
                {
                    "value": 10183,
                    "label": "白山"
                },
                {
                    "value": 10184,
                    "label": "松原"
                },
                {
                    "value": 10185,
                    "label": "白城"
                },
                {
                    "value": 10186,
                    "label": "延边"
                }
            ]
        },
        {
            "value": 16,
            "label": "江苏",
            "children": [
                {
                    "value": 10187,
                    "label": "南京"
                },
                {
                    "value": 10188,
                    "label": "无锡"
                },
                {
                    "value": 10189,
                    "label": "徐州"
                },
                {
                    "value": 10190,
                    "label": "常州"
                },
                {
                    "value": 10191,
                    "label": "苏州"
                },
                {
                    "value": 10192,
                    "label": "南通"
                },
                {
                    "value": 10193,
                    "label": "连云港"
                },
                {
                    "value": 10194,
                    "label": "淮安"
                },
                {
                    "value": 10195,
                    "label": "盐城"
                },
                {
                    "value": 10196,
                    "label": "扬州"
                },
                {
                    "value": 10197,
                    "label": "镇江"
                },
                {
                    "value": 10198,
                    "label": "泰州"
                },
                {
                    "value": 10199,
                    "label": "宿迁"
                }
            ]
        },
        {
            "value": 17,
            "label": "江西",
            "children": [
                {
                    "value": 10200,
                    "label": "南昌"
                },
                {
                    "value": 10201,
                    "label": "景德镇"
                },
                {
                    "value": 10202,
                    "label": "萍乡"
                },
                {
                    "value": 10203,
                    "label": "九江"
                },
                {
                    "value": 10204,
                    "label": "新余"
                },
                {
                    "value": 10205,
                    "label": "鹰潭"
                },
                {
                    "value": 10206,
                    "label": "赣州"
                },
                {
                    "value": 10207,
                    "label": "吉安"
                },
                {
                    "value": 10208,
                    "label": "宜春"
                },
                {
                    "value": 10209,
                    "label": "抚州"
                },
                {
                    "value": 10210,
                    "label": "上饶"
                }
            ]
        },
        {
            "value": 18,
            "label": "辽宁",
            "children": [
                {
                    "value": 10211,
                    "label": "沈阳"
                },
                {
                    "value": 10212,
                    "label": "大连"
                },
                {
                    "value": 10213,
                    "label": "鞍山"
                },
                {
                    "value": 10214,
                    "label": "抚顺"
                },
                {
                    "value": 10215,
                    "label": "本溪"
                },
                {
                    "value": 10216,
                    "label": "丹东"
                },
                {
                    "value": 10217,
                    "label": "锦州"
                },
                {
                    "value": 10218,
                    "label": "营口"
                },
                {
                    "value": 10219,
                    "label": "阜新"
                },
                {
                    "value": 10220,
                    "label": "辽阳"
                },
                {
                    "value": 10221,
                    "label": "盘锦"
                },
                {
                    "value": 10222,
                    "label": "铁岭"
                },
                {
                    "value": 10223,
                    "label": "朝阳"
                },
                {
                    "value": 10224,
                    "label": "葫芦岛"
                }
            ]
        },
        {
            "value": 19,
            "label": "内蒙古",
            "children": [
                {
                    "value": 10225,
                    "label": "呼和浩特"
                },
                {
                    "value": 10226,
                    "label": "包头"
                },
                {
                    "value": 10227,
                    "label": "乌海"
                },
                {
                    "value": 10228,
                    "label": "赤峰"
                },
                {
                    "value": 10229,
                    "label": "通辽"
                },
                {
                    "value": 10230,
                    "label": "鄂尔多斯"
                },
                {
                    "value": 10231,
                    "label": "呼伦贝尔"
                },
                {
                    "value": 10232,
                    "label": "巴彦淖尔"
                },
                {
                    "value": 10233,
                    "label": "乌兰察布"
                },
                {
                    "value": 10234,
                    "label": "兴安"
                },
                {
                    "value": 10235,
                    "label": "锡林郭勒"
                },
                {
                    "value": 10236,
                    "label": "阿拉善"
                }
            ]
        },
        {
            "value": 20,
            "label": "宁夏",
            "children": [
                {
                    "value": 10237,
                    "label": "银川"
                },
                {
                    "value": 10238,
                    "label": "石嘴山"
                },
                {
                    "value": 10239,
                    "label": "吴忠"
                },
                {
                    "value": 10240,
                    "label": "固原"
                },
                {
                    "value": 10241,
                    "label": "中卫"
                }
            ]
        },
        {
            "value": 21,
            "label": "青海",
            "children": [
                {
                    "value": 10242,
                    "label": "西宁"
                },
                {
                    "value": 10243,
                    "label": "海东"
                },
                {
                    "value": 10244,
                    "label": "海北"
                },
                {
                    "value": 10245,
                    "label": "黄南"
                },
                {
                    "value": 10246,
                    "label": "海南"
                },
                {
                    "value": 10247,
                    "label": "果洛"
                },
                {
                    "value": 10248,
                    "label": "玉树"
                },
                {
                    "value": 10249,
                    "label": "海西"
                }
            ]
        },
        {
            "value": 22,
            "label": "四川",
            "children": [
                {
                    "value": 10250,
                    "label": "成都"
                },
                {
                    "value": 10251,
                    "label": "自贡"
                },
                {
                    "value": 10252,
                    "label": "攀枝花"
                },
                {
                    "value": 10253,
                    "label": "泸州"
                },
                {
                    "value": 10254,
                    "label": "德阳"
                },
                {
                    "value": 10255,
                    "label": "绵阳"
                },
                {
                    "value": 10256,
                    "label": "广元"
                },
                {
                    "value": 10257,
                    "label": "遂宁"
                },
                {
                    "value": 10258,
                    "label": "内江"
                },
                {
                    "value": 10259,
                    "label": "乐山"
                },
                {
                    "value": 10260,
                    "label": "南充"
                },
                {
                    "value": 10261,
                    "label": "眉山"
                },
                {
                    "value": 10262,
                    "label": "宜宾"
                },
                {
                    "value": 10263,
                    "label": "广安"
                },
                {
                    "value": 10264,
                    "label": "达州"
                },
                {
                    "value": 10265,
                    "label": "雅安"
                },
                {
                    "value": 10266,
                    "label": "巴中"
                },
                {
                    "value": 10267,
                    "label": "资阳"
                },
                {
                    "value": 10268,
                    "label": "阿坝"
                },
                {
                    "value": 10269,
                    "label": "甘孜"
                },
                {
                    "value": 10270,
                    "label": "凉山"
                }
            ]
        },
        {
            "value": 23,
            "label": "山东",
            "children": [
                {
                    "value": 10271,
                    "label": "济南"
                },
                {
                    "value": 10272,
                    "label": "青岛"
                },
                {
                    "value": 10273,
                    "label": "淄博"
                },
                {
                    "value": 10274,
                    "label": "枣庄"
                },
                {
                    "value": 10275,
                    "label": "东营"
                },
                {
                    "value": 10276,
                    "label": "烟台"
                },
                {
                    "value": 10277,
                    "label": "潍坊"
                },
                {
                    "value": 10278,
                    "label": "济宁"
                },
                {
                    "value": 10279,
                    "label": "泰安"
                },
                {
                    "value": 10280,
                    "label": "威海"
                },
                {
                    "value": 10281,
                    "label": "日照"
                },
                {
                    "value": 10282,
                    "label": "临沂"
                },
                {
                    "value": 10283,
                    "label": "德州"
                },
                {
                    "value": 10284,
                    "label": "聊城"
                },
                {
                    "value": 10285,
                    "label": "滨州"
                },
                {
                    "value": 10286,
                    "label": "菏泽"
                }
            ]
        },
        {
            "value": 24,
            "label": "上海",
            "children": [
                {
                    "value": 10287,
                    "label": "上海"
                }
            ]
        },
        {
            "value": 25,
            "label": "山西",
            "children": [
                {
                    "value": 10288,
                    "label": "太原"
                },
                {
                    "value": 10289,
                    "label": "大同"
                },
                {
                    "value": 10290,
                    "label": "阳泉"
                },
                {
                    "value": 10291,
                    "label": "长治"
                },
                {
                    "value": 10292,
                    "label": "晋城"
                },
                {
                    "value": 10293,
                    "label": "朔州"
                },
                {
                    "value": 10294,
                    "label": "晋中"
                },
                {
                    "value": 10295,
                    "label": "运城"
                },
                {
                    "value": 10296,
                    "label": "忻州"
                },
                {
                    "value": 10297,
                    "label": "临汾"
                },
                {
                    "value": 10298,
                    "label": "吕梁"
                }
            ]
        },
        {
            "value": 26,
            "label": "陕西",
            "children": [
                {
                    "value": 10299,
                    "label": "西安"
                },
                {
                    "value": 10300,
                    "label": "铜川"
                },
                {
                    "value": 10301,
                    "label": "宝鸡"
                },
                {
                    "value": 10302,
                    "label": "咸阳"
                },
                {
                    "value": 10303,
                    "label": "渭南"
                },
                {
                    "value": 10304,
                    "label": "延安"
                },
                {
                    "value": 10305,
                    "label": "汉中"
                },
                {
                    "value": 10306,
                    "label": "榆林"
                },
                {
                    "value": 10307,
                    "label": "安康"
                },
                {
                    "value": 10308,
                    "label": "商洛"
                }
            ]
        },
        {
            "value": 27,
            "label": "天津",
            "children": [
                {
                    "value": 10309,
                    "label": "天津"
                }
            ]
        },
        {
            "value": 28,
            "label": "新疆",
            "children": [
                {
                    "value": 10310,
                    "label": "乌鲁木齐"
                },
                {
                    "value": 10311,
                    "label": "克拉玛依"
                },
                {
                    "value": 10312,
                    "label": "吐鲁番"
                },
                {
                    "value": 10313,
                    "label": "哈密"
                },
                {
                    "value": 10314,
                    "label": "昌吉"
                },
                {
                    "value": 10315,
                    "label": "博尔塔拉"
                },
                {
                    "value": 10316,
                    "label": "巴音郭楞"
                },
                {
                    "value": 10317,
                    "label": "阿克苏"
                },
                {
                    "value": 10318,
                    "label": "克孜勒苏"
                },
                {
                    "value": 10319,
                    "label": "喀什"
                },
                {
                    "value": 10320,
                    "label": "和田"
                },
                {
                    "value": 10321,
                    "label": "伊犁"
                },
                {
                    "value": 10322,
                    "label": "塔城"
                },
                {
                    "value": 10323,
                    "label": "阿勒泰"
                }
            ]
        },
        {
            "value": 29,
            "label": "西藏",
            "children": [
                {
                    "value": 10324,
                    "label": "拉萨"
                },
                {
                    "value": 10325,
                    "label": "日喀则"
                },
                {
                    "value": 10326,
                    "label": "昌都"
                },
                {
                    "value": 10327,
                    "label": "林芝"
                },
                {
                    "value": 10328,
                    "label": "山南"
                },
                {
                    "value": 10329,
                    "label": "那曲"
                },
                {
                    "value": 10330,
                    "label": "阿里"
                }
            ]
        },
        {
            "value": 30,
            "label": "云南",
            "children": [
                {
                    "value": 10331,
                    "label": "昆明"
                },
                {
                    "value": 10332,
                    "label": "曲靖"
                },
                {
                    "value": 10333,
                    "label": "玉溪"
                },
                {
                    "value": 10334,
                    "label": "保山"
                },
                {
                    "value": 10335,
                    "label": "昭通"
                },
                {
                    "value": 10336,
                    "label": "丽江"
                },
                {
                    "value": 10337,
                    "label": "普洱"
                },
                {
                    "value": 10338,
                    "label": "临沧"
                },
                {
                    "value": 10339,
                    "label": "楚雄"
                },
                {
                    "value": 10340,
                    "label": "红河"
                },
                {
                    "value": 10341,
                    "label": "文山"
                },
                {
                    "value": 10342,
                    "label": "西双版纳"
                },
                {
                    "value": 10343,
                    "label": "大理"
                },
                {
                    "value": 10344,
                    "label": "德宏"
                },
                {
                    "value": 10345,
                    "label": "怒江"
                },
                {
                    "value": 10346,
                    "label": "迪庆"
                }
            ]
        },
        {
            "value": 31,
            "label": "浙江",
            "children": [
                {
                    "value": 10347,
                    "label": "杭州"
                },
                {
                    "value": 10348,
                    "label": "宁波"
                },
                {
                    "value": 10349,
                    "label": "温州"
                },
                {
                    "value": 10350,
                    "label": "嘉兴"
                },
                {
                    "value": 10351,
                    "label": "湖州"
                },
                {
                    "value": 10352,
                    "label": "绍兴"
                },
                {
                    "value": 10353,
                    "label": "金华"
                },
                {
                    "value": 10354,
                    "label": "衢州"
                },
                {
                    "value": 10355,
                    "label": "舟山"
                },
                {
                    "value": 10356,
                    "label": "台州"
                },
                {
                    "value": 10357,
                    "label": "丽水"
                }
            ]
        },
        {
            "value": 32,
            "label": "台湾",
            "children": [
                {
                    "value": 10358,
                    "label": "台湾"
                }
            ]
        },
        {
            "value": 33,
            "label": "香港",
            "children": [
                {
                    "value": 10359,
                    "label": "香港"
                }
            ]
        },
        {
            "value": 34,
            "label": "澳门",
            "children": [
                {
                    "value": 10360,
                    "label": "澳门"
                }
            ]
        }
    ]
    //出发城市信息
    const [DepartureCityData, setDepartureCityData] = useState([]);
    //出发城市id
    const [DepartureCityCode, setDepartureCityCode] = useState();
    //目标城市信息
    const [DestinationCityData, setDestinationCityData] = useState({city_name:0});
    //目标城市id
    const [DestinationCityCode, setDestinationCityCode] = useState();

    function outOnChange(value) {
        let city = value[1];
        setDepartureCityCode(city);
        axios.get("https://v2.alapi.cn/api/springTravel/current?city_id=" + city + "&token=RNOEu0j2ZwtRyh2J").then(res => {
            setDepartureCityData(res.data.data)
            console.log(res.data);
        });

    }
    function inOnChange(value) {
        let city = value[1];
        console.log("目的地城市代码"+city);
        setDestinationCityCode(city);
        axios.get("https://v2.alapi.cn/api/springTravel/current?city_id=" + city + "&token=RNOEu0j2ZwtRyh2J").then(res => {
            setDestinationCityData(res.data.data)
            console.log(DepartureCityData);
        });
    }

    return (
        <div>
            <ProCard style={{ marginTop: 10, alignItems: 'center' }} gutter={8} title="查询出行防疫政策">
                <ProCard layout="center" bordered title="">
                    <Cascader options={options} onChange={outOnChange} placeholder="出发地" />
                </ProCard>
                <SwapOutlined style={{ padding: '30px' }} />
                <ProCard layout="center" bordered >
                    <Cascader options={options} onChange={inOnChange} placeholder="目的地" />
                </ProCard>
            </ProCard>

            {DepartureCityCode == undefined ? '' : <Out cityName={DepartureCityData.city_name} out_desc={DepartureCityData.out_desc}/>}
            {/* <Out cityName="南昌"/> */}
            {DestinationCityCode == undefined ? '' : <In cityName={DestinationCityData.city_name} in_desc={DestinationCityData.low_in_desc}/>}


        </div>
    );
}

function OutLocation(params) {
    return (
        <div>
            <img src={location} style={{ width: '20px', height: '20px', margin: '-6px 0 0 0' }} /> 离开{params.cityName}
        </div>

    );
}
function Out(params) {
    // 处理换行符
    let info='';
    info=params.out_desc;
    // info = info.replace("\\n", "<br>")
    return (
        <ProCard style={{ marginTop: 5 }} gutter={8} >
            <Alert
                style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
                message={<OutLocation cityName={params.cityName} />}
                description={info}
                type="info"
            />
        </ProCard>

    );
}
function InLocation(params) {
    return (
        <div>
            <img src={location} style={{ width: '20px', height: '20px', margin: '-6px 0 0 0' }} /> 进入{params.cityName}
        </div>

    );
}
function In(params) {
    // 处理换行符
    let info='';
    info=params.in_desc;
    // info = info.replace("\\n", "<br>")
    return (
        <ProCard style={{ marginTop: 5 }} gutter={8} >
            <Alert
                style={{ whiteSpace: "pre-wrap", textAlign: "left" }}
                message={<InLocation cityName={params.cityName} />}
                description={info}
                type="info"
            />
        </ProCard>

    );
}