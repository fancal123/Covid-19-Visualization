# -*- codeing = utf-8 -*-
from bs4 import BeautifulSoup  # 网页解析，获取数据
import requests  # 制定URL，获取网页数据
import socket
import time
import http.client
import random
import re
import json
import mysql.connector as mc
import time
# from service.nameMap import country_type_map, city_name_map, country_name_map,
# 爬取网页
def getData(url):
    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62"
    }
    timeout = random.choice(range(80, 180))
    while True:
        try:
            rep = requests.get(url, headers=header, timeout=timeout)
            rep.encoding = "utf-8"
            break
        except socket.timeout as e:
            print("3:", e)
            time.sleep(random.choice(range(8, 15)))

        except socket.error as e:
            print("4:", e)
            time.sleep(random.choice(range(20, 60)))

        except http.client.BadStatusLine as e:
            print("5:", e)
            time.sleep(random.choice(range(30, 80)))

        except http.client.IncompleteRead as e:
            print("6:", e)
            time.sleep(random.choice(range(5, 15)))

    bs = BeautifulSoup(rep.text, "lxml")  # 使用BeautifulSoup解析网页文本内容

    # 数据统计结果
    overall_information = re.search(
        r'(\{"id".*\})\}', str(bs.find("script", attrs={"id": "getStatisticsService"}))
    )
    overall_paser(overall_information)

    # 全国数据
    areaStat = re.search(
        r"\[(.*)\]", str(bs.find("script", attrs={"id": "getAreaStat"}))
    )
    national_paser(areaStat)
    # 全国新闻
    news = re.search(
        r'\[(.*)\}\]', str(bs.find("script", attrs={"id": "getTimelineService1"}))
    )
    news_paser(news)
   

    # 全球数据
    abroad_info = re.search(
        r"\[(.*)\]",
        str(bs.find("script", attrs={"id": "getListByCountryTypeService2true"})),
    )
    abroad_paser(abroad_info)


# 处理数据统计结果
def overall_paser(overall_information):
    overall_information = json.loads(overall_information.group(1))
    overall_information.pop("id")
    overall_information.pop("createTime")
    overall_information.pop("modifyTime")
    overall_information.pop("imgUrl")
    overall_information.pop("deleted")
    overall_information["countRemark"] = (
        overall_information["countRemark"]
        .replace(" 疑似", "，疑似")
        .replace(" 治愈", "，治愈")
        .replace(" 死亡", "，死亡")
        .replace(" ", "")
    )
    # if 'currentConfirmedIncr' in overall_information:
    #     print(overall_information["currentConfirmedIncr"])
    # else:
    #     print("not exist")
    # print(overall_information["quanguoTrendChart"])
    print(
        "现存确诊"
        + str(overall_information["currentConfirmedCount"])
        + "，较昨日+"
        + str(overall_information["currentConfirmedIncr"])
    )
    print(
        "境外输入"
        + str(overall_information["suspectedCount"])
        + "，较昨日+"
        + str(overall_information["suspectedIncr"])
    )
    print(
        "现存无症状"
        + str(overall_information["seriousCount"])
        + "，较昨日+"
        + str(overall_information["seriousIncr"])
    )

    print(
        "累计确诊"
        + str(overall_information["confirmedCount"])
        + "，较昨日+"
        + str(overall_information["confirmedIncr"])
    )
    print(
        "累计死亡"
        + str(overall_information["deadCount"])
        + "，较昨日+"
        + str(overall_information["deadIncr"])
    )
    print(
        "累计治愈"
        + str(overall_information["curedCount"])
        + "，较昨日+"
        + str(overall_information["curedIncr"])
    )
    cursor.execute("truncate table overalldata")

    cursor.execute(
        "insert into overalldata values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        [
            str(overall_information["currentConfirmedCount"]),
            str(overall_information["currentConfirmedIncr"]),
            str(overall_information["suspectedCount"]),
            str(overall_information["suspectedIncr"]),
            str(overall_information["seriousCount"]),
            str(overall_information["seriousIncr"]),
            str(overall_information["confirmedCount"]),
            str(overall_information["confirmedIncr"]),
            str(overall_information["deadCount"]),
            str(overall_information["deadIncr"]),
            str(overall_information["curedCount"]),
            str(overall_information["curedIncr"]),
        ],
    )
    conn.commit()


def national_paser(areaStat):

    # 清空coviddata表
    cursor.execute("truncate table provincedata")
    count = 0
    jsoninfo = json.loads(areaStat.group(0))
    for info in jsoninfo:
        # print(
        #     "省份、地区或直辖市:"
        #     + str(info["provinceName"])
        #     + "   累积确诊:"
        #     + str(info["confirmedCount"])
        # )
        # print("--------------------------------------------------")
        count += 1
        cursor.execute(
            "insert into provincedata(provinceName,content) values(%s,%s)",
            [str(info["provinceName"]), json.dumps(info)],
        )
        conn.commit()
    # cursor.close()

    # print("总计：" + str(count))


def news_paser(news):
    news = json.loads(news.group(0))
    cursor.execute("truncate table news")
    for info in news:
        # print(str(info["pubDate"]))
        # print(str(info["pubDateStr"]))
        # print(str(info["title"])) 
        # print(str(info["summary"]))
        # print(str(info["sourceUrl"]))
        cursor.execute(
            "insert into news values(%s,%s,%s,%s,%s)",
            [
                str(info["pubDate"]),
                str(info["pubDateStr"]),
                str(info["title"]),
                str(info["summary"]),
                str(info["sourceUrl"]),
            ]
        )
        conn.commit()


def abroad_paser(abroad_info):
    countries = json.loads(abroad_info.group(0))
    # print(countries)
    for country in countries:
        try:
            country.pop("id")
            country.pop("tags")
            country.pop("sort")
            country.pop("modifyTime")
            country.pop("createTime")
            country["comment"] = country["comment"].replace(" ", "")
        except KeyError:
            pass
        country.pop("countryType")
        country.pop("provinceId")
        country.pop("cityName")
        # The original provinceShortName are blank string
        country.pop("provinceShortName")
        # Rename the key continents to continentName
        country["continentName"] = country.pop("continents")
        country["countryName"] = country.get("provinceName")
        country["provinceShortName"] = country.get("provinceName")
        # country['continentEnglishName'] = continent_name_map.get(country['continentName'])
        # country['countryEnglishName'] = country_name_map.get(country['countryName'])
        # country['provinceEnglishName'] = country_name_map.get(country['countryName'])
    # for info in countries:
    #     print(info)
    #     print("-----------------------------------------")


if __name__ == "__main__":  # 流程控制
    # 准备数据库连接
    conn = mc.connect(user="root", password="root123456", database="python")
    cursor = conn.cursor()
    # 数据来源丁香园
    url = "https://ncov.dxy.cn/ncovh5/view/pneumonia"
    getData(url)
    # 记录更新时间
    cursor.execute("truncate table updatetime")
    cursor.execute(
            "insert into updatetime values(%s)",
            [time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())],
        )
    conn.commit()
    print()
    # 关闭数据库连接
    cursor.close()
