import React, {Component} from 'react';
import * as echarts from 'echarts';



import QT from './img/qing.png'
import Yin from './img/duoyun.png'
import Bx from './/img/baoxue.png'//暴雪
import Byu from './img/baoyu.png'//暴雨
import Bbao from './img/bingbao.png'//冰雹
import dabaoyu from './img/dabaoyu.png';//大暴雨
import dafeng from './img/dafeng.png';//大风
import daxue from './img/daxue.png'//大雪
import dayu from './img/dayu.png'//大雨
import duoyun from './img/yin.png'//多云
import duoyunzhuanxue from './img/duoyunzhuanxue.png';//多云转雪
import feng from './img/feng.png';//风
import leizhenyu from './img/leizhenyu.png';//雷阵雨
import wu from './img/wu.png'//雾
import wumai from './img/wumai.png'//雾霾
import xiaoxue from './img/xiaoxue.png'//小雪
import xiaoyu from './img/xiaoyu.png'//小雨
import yujiaxue from './img/yujiaxue.png'//雨加雪
import xiaoyujiaxue from './img/yujiaxue.png'//小雨加雪
import yinzhuanyu from './img/yinzhuanyu.png';//阴转雨
import zhongxue from './img/zhongxue.png'//中雪
import zhongyu from './img/zhongyu.png'//中雨
import {isEqual} from "lodash";
const erData =
    [
        {
            forecast_date: "2021-10-17T00:00:00",
            max_tem: "15.3",
            min_tem: "8.9",
            rain: null,
            weather_day: null,
            weather_day_code: null,
            weather_night: null,
            weather_night_code: null,
            wind_speed: "4.7",
            wind_direction: "999.9",
            wind_power: "3级",
            wind_dir_txt: "-",
            cloud_total: null
        },
        {
            forecast_date: "2021-10-18T08:00:00",
            max_tem: "19.1",
            min_tem: "9.5",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "2.91",
            wind_direction: "172.7",
            wind_power: "2级",
            wind_dir_txt: "南到东南",
            cloud_total: "79.0"
        },
        {
            forecast_date: "2021-10-19T08:00:00",
            max_tem: "16.3",
            min_tem: "10.9",
            rain: "8.0",
            weather_day: "小雨",
            weather_day_code: "07",
            weather_night: "中雨",
            weather_night_code: "08",
            wind_speed: "3.73",
            wind_direction: "164.77",
            wind_power: "3级",
            wind_dir_txt: "南到东南",
            cloud_total: "100.0"
        },
        {
            forecast_date: "2021-10-20T08:00:00",
            max_tem: "11.0",
            min_tem: "7.8",
            rain: "12.7",
            weather_day: "中雨",
            weather_day_code: "08",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "2.02",
            wind_direction: "163.0",
            wind_power: "2级",
            wind_dir_txt: "南到东南",
            cloud_total: "40.0"
        },
        {
            forecast_date: "2021-10-21T08:00:00",
            max_tem: "18.7",
            min_tem: "10.9",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "4.13",
            wind_direction: "26.94",
            wind_power: "3级",
            wind_dir_txt: "东北",
            cloud_total: "50.0"
        },
        {
            forecast_date: "2021-10-22T08:00:00",
            max_tem: "18.0",
            min_tem: "10.2",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "4.45",
            wind_direction: "29.62",
            wind_power: "3级",
            wind_dir_txt: "东北",
            cloud_total: "1.0"
        },
        {
            forecast_date: "2021-10-23T08:00:00",
            max_tem: "18.0",
            min_tem: "10.3",
            rain: "0.0",
            weather_day: "晴",
            weather_day_code: "00",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "4.0",
            wind_direction: "37.27",
            wind_power: "3级",
            wind_dir_txt: "东北",
            cloud_total: "1.0"
        },
        {
            forecast_date: "2021-10-24T08:00:00",
            max_tem: "19.0",
            min_tem: "10.8",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "4.17",
            wind_direction: "358.49",
            wind_power: "3级",
            wind_dir_txt: "北到西北",
            cloud_total: "50.0"
        },
        {
            forecast_date: "2021-10-25T08:00:00",
            max_tem: "18.6",
            min_tem: "12.1",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "多云",
            weather_night_code: "01",
            wind_speed: "3.2",
            wind_direction: "339.7",
            wind_power: "2级",
            wind_dir_txt: "北到西北",
            cloud_total: "25.0"
        },
        {
            forecast_date: "2021-10-26T08:00:00",
            max_tem: "20.5",
            min_tem: "10.9",
            rain: "0.1",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "小雨",
            weather_night_code: "07",
            wind_speed: "1.83",
            wind_direction: "339.19",
            wind_power: "2级",
            wind_dir_txt: "北到西北",
            cloud_total: "0.0"
        },
        {
            forecast_date: "2021-10-27T08:00:00",
            max_tem: "20.7",
            min_tem: "10.9",
            rain: "0.0",
            weather_day: "多云",
            weather_day_code: "01",
            weather_night: "晴",
            weather_night_code: "00",
            wind_speed: null,
            wind_direction: null,
            wind_power: null,
            wind_dir_txt: null,
            cloud_total: "0.0"
        }
    ]

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,

        }
    }

    // //绘图
    setEcharts = () => {
        //默认拿第一个
        let data = this.state.data[0];
        // let data = erData
        // let erDatas = this.state.data[0];
        if(data?.code&&data.code===200){
            data = data.data;
        }else{
            return;
        }

        if(data.length===0||(data.length===1&&data[0]==='')){

        }else{

            if(new Date().getDate()-1===new Date(data[0].forecast_date).getDate()){
                data.splice(0,1);
            }
            const xArr = [];
            const minArr = [],maxArr = [];
            var weatherArr = []


            data.forEach((item)=>{
                if(xArr.length!==7){
                    item.getDate = new Date(item.forecast_date).getDate();
                    xArr.push(item.getDate);
                    minArr.push(item.min_tem);
                    maxArr.push(item.max_tem);
                    switch (item.weather_day){
                        case '多云':{
                            item.weatherIcon = Yin
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '晴' :{
                            item.weatherIcon = QT
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }


                        case '冰雹' :{

                            item.weatherIcon = Bbao
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '大暴雨' :{

                            item.weatherIcon = dabaoyu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '大风' :{

                            item.weatherIcon = dafeng
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '大雪' :{

                            item.weatherIcon = daxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '大雨' :{


                            item.weatherIcon = dayu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '多云' :{

                            item.weatherIcon = duoyun
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '多云转雪' :{


                            item.weatherIcon = duoyunzhuanxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '风' :{

                            item.weatherIcon = feng
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '雷阵雨' :{

                            item.weatherIcon =  leizhenyu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '雾' :{
                            item.weatherIcon = wu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '雾霾' :{
                            item.weatherIcon =wumai
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '霾' :{
                            item.weatherIcon =wumai
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '小雪' :{
                            item.weatherIcon = xiaoxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '小雨' :{
                            item.weatherIcon = xiaoyu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '雨加雪' :{
                            item.weatherIcon =  yujiaxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '小雨加雪' :{
                            item.weatherIcon = xiaoyujiaxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '阴转雨' :{
                            item.weatherIcon = yinzhuanyu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '中雪' :{
                            item.weatherIcon = zhongxue
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])

                            break;
                        }
                        case '中雨' :{
                            item.weatherIcon = zhongyu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        case '暴雪' :{
                            item.weatherIcon = Bx
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])


                            break;
                        }
                        case '暴雨' :{
                            item.weatherIcon = Byu
                            weatherArr.push([item.weather_day,item.weather_night,item.weatherIcon,item.wind_power,item.wind_dir_txt])
                            break;
                        }
                        default : {
                            weatherArr.push([item.weather_day,item.weather_night,'',item.wind_power,item.wind_dir_txt])
                        }
                    }
                }
                }
            )
            this.myChart = echarts.init(this.node);

            const option = {
                backgroundColor: "rgba(255,255,255,0)",
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 153, 175, 0.5)',
                    padding:10,
                    textStyle: { // 提示框浮层的文本样式。
                        fontSize: 24,
                    },
                    formatter: function (param) {

                        return  [
                            '最高温度：' + param[1].value + '℃',
                            '最低温度：' + param[0].value + '℃',

                        ].join('<br>');
                    }
                },
                title: {
                    text: '一周天气预报',
                    left: 'left',
                    textStyle:{
                        color:'#fff',
                        fontSize:48,
                        fontWeight:500,
                    }
                },
                "grid": {
                    // "borderWidth": 0,
                    "top": 170,
                    right:0,
                    left:110,
                    "bottom": 50,
                    textStyle: {
                        color: "#fff"
                    },
                    show: true,
                    borderColor:'transparent',
                    backgroundColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(13, 88, 166, 0.2)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(13, 88, 166, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false

                    }
                },
                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: 'rgba(45, 155, 255, 1)'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        color:'rgba(255,255,255,1)',
                        fontSize:32
                    },
                    "data": xArr,
                }],

                "yAxis": [{
                    name: '℃',
                    nameTextStyle:{
                        fontSize:32,
                        align:'right',
                        color:'#fff'
                    },
                    "type": "value",
                    "splitLine": {
                        "show": true,
                        lineStyle: {
                            color: ['rgba(45, 155, 255, 0.2)'],
                            width: 2,
                            type: 'solid'
                        }
                    },
                    "axisLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,
                        color:'rgba(255,255,255,1)',
                        fontSize:32

                    },
                    "splitArea": {
                        "show": false
                    },

                }],
                "series": [{
                    z:0,
                    "name": "透明的底层",
                    "type": "bar",
                    "stack": "总量",
                    "barMaxWidth": 8,
                    "barGap": "10%",
                    "itemStyle": {
                        "normal": {
                            "color":
                                {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(35, 157, 250, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(35, 157, 250, 0)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                        }
                    },
                    "data": minArr,
                },

                    {
                        z:1,
                        "name": "天气",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(255, 178, 47, 1)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(60, 202, 255, 1)' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                },
                                "barBorderRadius": 4
                            }
                        },
                        "data":  maxArr
                    }, {
                        name:'图标',
                        type: 'custom',
                        renderItem: function(param,api){

                            const arrowSize = 18;
                            const weatherIconSize = 40;
                            const point = api.coord([
                                param.dataIndex
                                // api.value(dims.time) + (3600 * 24 * 1000) / 2,
                                ,
                                0
                            ]);
                            return {
                                type: 'group',
                                children: [
                                    {
                                        type: 'image',
                                        style: {
                                            image:api.value(2) ,
                                            x: -weatherIconSize / 2,
                                            y: -weatherIconSize / 2,
                                            width: weatherIconSize,
                                            height: weatherIconSize
                                        },
                                        position: [point[0], 110]
                                    }
                                ]
                            };
                        },
                        data: weatherArr,
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0, 153, 175, 0.5)',
                            padding:10,
                            textStyle: { // 提示框浮层的文本样式。
                                fontSize: 24,
                            },
                            formatter: function (param) {

                                return  [
                                    '白天：'+ param.value[0],
                                    '夜晚：' + param.value[1],
                                    '风况：'+param.value[4] +'方向',
                                    '风力：'+param.value[3]
                                ].join('<br>');
                            }
                        },
                        yAxisIndex: 0,
                        z: 1000
                    }
                ]
            }

            this.myChart.setOption(option, true);

        }


    }

    componentDidMount() {
        this.setEcharts();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {
                    this.setEcharts();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <div ref={node => this.node = node} style={{width: '1091px', height: '560px'}}></div>
        )
    }

}