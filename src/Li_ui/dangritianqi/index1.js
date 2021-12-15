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
import rawData from './data'

const erData = [{
    "msg": "操作成功",
    "code": 200,
    "data": [{
        "time": "2021-10-20T16:00:00",
        "weather": "暴雪",
        "weather_code": "07",
        "tem": "10.2",
        "wind_speed": "2.6",
        "wind_dir": "7.0",
        "wind_power": "2级",
        "wind_dir_txt": "北到东北",
        "vis": "10300",
        "rain": "0.1",
        "rh": "95.0"
    }, {
        "time": "2021-10-20T18:00:00",
        "weather": "小雨",
        "weather_code": "07",
        "tem": "11.1",
        "wind_speed": "1.53",
        "wind_dir": "338.96002",
        "wind_power": "0级",
        "wind_dir_txt": "北到西北",
        "vis": "11500",
        "rain": "0.6",
        "rh": "95"
    }, {
        "time": "2021-10-20T19:00:00",
        "weather": "小雨",
        "weather_code": "07",
        "tem": "10.7",
        "wind_speed": "1.46",
        "wind_dir": "324.78",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "12700",
        "rain": "1.1",
        "rh": "98"
    }, {
        "time": "2021-10-20T20:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "10.0",
        "wind_speed": "1.5",
        "wind_dir": "319.85",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "12300",
        "rain": "0.0",
        "rh": "97"
    }, {
        "time": "2021-10-20T21:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "9.3",
        "wind_speed": "1.56",
        "wind_dir": "314.74",
        "wind_power": "0级",
        "wind_dir_txt": "西北",
        "vis": "11900",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-20T22:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.8",
        "wind_speed": "1.63",
        "wind_dir": "310.53",
        "wind_power": "2级",
        "wind_dir_txt": "西北",
        "vis": "11500",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-20T23:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.4",
        "wind_speed": "1.6",
        "wind_dir": "320.06",
        "wind_power": "0级",
        "wind_dir_txt": "西北",
        "vis": "11500",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-21T00:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.3",
        "wind_speed": "1.63",
        "wind_dir": "329.34",
        "wind_power": "2级",
        "wind_dir_txt": "西北",
        "vis": "11600",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-21T01:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.1",
        "wind_speed": "1.69",
        "wind_dir": "338.45",
        "wind_power": "2级",
        "wind_dir_txt": "北到西北",
        "vis": "11600",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-21T02:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.2",
        "wind_speed": "1.69",
        "wind_dir": "335.11",
        "wind_power": "2级",
        "wind_dir_txt": "西北",
        "vis": "12200",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-21T03:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.2",
        "wind_speed": "1.68",
        "wind_dir": "331.61",
        "wind_power": "2级",
        "wind_dir_txt": "西北",
        "vis": "12800",
        "rain": "0.0",
        "rh": "100"
    }, {
        "time": "2021-10-21T04:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.3",
        "wind_speed": "1.69",
        "wind_dir": "328.28",
        "wind_power": "2级",
        "wind_dir_txt": "西北",
        "vis": "13400",
        "rain": "0.0",
        "rh": "98"
    }, {
        "time": "2021-10-21T05:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "8.9",
        "wind_speed": "1.49",
        "wind_dir": "317.97998",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "13800",
        "rain": "0.0",
        "rh": "95"
    }, {
        "time": "2021-10-21T06:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "9.4",
        "wind_speed": "1.37",
        "wind_dir": "305.2",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "14100",
        "rain": "0.0",
        "rh": "93"
    }, {
        "time": "2021-10-21T07:00:00",
        "weather": "多云",
        "weather_code": "01",
        "tem": "10.0",
        "wind_speed": "1.31",
        "wind_dir": "290.5",
        "wind_power": "1级",
        "wind_dir_txt": "西到西北",
        "vis": "14500",
        "rain": "0.0",
        "rh": "91"
    }, {
        "time": "2021-10-21T08:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "11.6",
        "wind_speed": "1.21",
        "wind_dir": "293.39",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "15500",
        "rain": "0.0",
        "rh": "84"
    }, {
        "time": "2021-10-21T09:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "13.7",
        "wind_speed": "1.1",
        "wind_dir": "297.03",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "16400",
        "rain": "0.0",
        "rh": "75"
    }, {
        "time": "2021-10-21T10:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "15.8",
        "wind_speed": "1.0",
        "wind_dir": "301.16",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "17400",
        "rain": "0.0",
        "rh": "67"
    }, {
        "time": "2021-10-21T11:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "17.0",
        "wind_speed": "1.47",
        "wind_dir": "328.9",
        "wind_power": "1级",
        "wind_dir_txt": "西北",
        "vis": "17700",
        "rain": "0.0",
        "rh": "61"
    }, {
        "time": "2021-10-21T12:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "18.4",
        "wind_speed": "2.11",
        "wind_dir": "342.08002",
        "wind_power": "2级",
        "wind_dir_txt": "北到西北",
        "vis": "17900",
        "rain": "0.0",
        "rh": "55"
    }, {
        "time": "2021-10-21T13:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "19.6",
        "wind_speed": "2.8",
        "wind_dir": "348.69",
        "wind_power": "2级",
        "wind_dir_txt": "北到西北",
        "vis": "18200",
        "rain": "0.0",
        "rh": "50"
    }, {
        "time": "2021-10-21T14:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "18.8",
        "wind_speed": "2.39",
        "wind_dir": "358.32",
        "wind_power": "2级",
        "wind_dir_txt": "北到西北",
        "vis": "18100",
        "rain": "0.0",
        "rh": "53"
    }, {
        "time": "2021-10-21T15:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "18.4",
        "wind_speed": "2.06",
        "wind_dir": "11.75",
        "wind_power": "2级",
        "wind_dir_txt": "北到东北",
        "vis": "18000",
        "rain": "0.0",
        "rh": "56"
    }, {
        "time": "2021-10-21T16:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "17.6",
        "wind_speed": "1.89",
        "wind_dir": "28.470001",
        "wind_power": "2级",
        "wind_dir_txt": "东北",
        "vis": "17900",
        "rain": "0.0",
        "rh": "60"
    }, {
        "time": "2021-10-21T17:00:00",
        "weather": "晴",
        "weather_code": "00",
        "tem": "15.7",
        "wind_speed": "1.93",
        "wind_dir": "39.539993",
        "wind_power": "2级",
        "wind_dir_txt": "东北",
        "vis": "17700",
        "rain": "0.0",
        "rh": "66"
    }]
}]

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

        let erDatas = this.state.data[0];
        // let erDatas = erData[0];
        console.log(erDatas);
        // console.log(erDatas?.code, typeof erDatas?.code)
        if (erDatas?.code && erDatas.code === 200) {
            // console.log(123)
            erDatas = erDatas.data;
        } else {
            // console.log(456)
            return;
        }
        if (erDatas.length === 0 || (erDatas.length === 1 && erDatas[0] === '')) {
            return;
        }
        let now = new Date();
        let getDate = now.getDate();
        const xArr = [];
        let initarr = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
        // if (new Date(erDatas[0].time).getDate() === 0 || initarr.indexOf(new Date(erDatas[0].time).getHours()) === -1) {
        //     xArr.push(new Date(erDatas[0].time).getHours());
        // }
        for (let i = 0; i < erDatas.length; i++) {


            // if (new Date(erDatas[i].time).getDate() !== getDate) {
            //     erDatas.splice(i, 1);
            //     -- i;
            // } else {
             if (new Date(erDatas[i].time).getDate() === getDate && new Date(erDatas[i].time).getHours()===0) {
                erDatas[i].time ='今天'

            }else if(new Date(erDatas[i].time).getDate() !== getDate && new Date(erDatas[i].time).getHours()===0){
                erDatas[i].time ='明天'

            }
            if (initarr.indexOf(new Date(erDatas[i].time).getHours()) === -1&&i!==0&&(erDatas[i].time!=='今天'&&erDatas[i].time!=='明天')) {
                erDatas.splice(i, 1);
                --i;
            }
            // }
        }

        // console.log(erDatas, 122);
        erDatas= erDatas.splice(0,12);
        this.myChart = echarts.init(this.node);
        const data = erDatas.map(function (entry) {
            if(entry.time!=='今天'&&entry.time!=='明天'){
                entry.getHours = new Date(entry.time).getHours();
            }else{
                entry.getHours =entry.time;
            }


            return [entry.getHours.toString(),//时间
                entry.tem,//温度
                entry.rh,//湿度
                entry.wind_dir_txt,//风向
                entry.weather,//天气
                entry.rain//降水
            ];
        });

        const weatherData = erDatas.map(function (entry) {
            // console.log(entry)
            if(entry.time!=='今天'&&entry.time!=='明天'){

                // console.log('李')
                entry.getHours = new Date(entry.time).getHours();
            }else{
                // console.log('世')
                entry.getHours =entry.time;
            }
            // entry.getHours = new Date(entry.time).getHours();
            xArr.push(entry.getHours);
            let weatherIcon = '';
            switch (entry.weather) {
                case '多云': {
                    weatherIcon = Yin
                    break;
                }
                case '晴' : {
                    weatherIcon = QT

                    break;
                }
                case '冰雹' :{

                    weatherIcon = Bbao

                    break;
                }
                case '大暴雨' :{

                    weatherIcon = dabaoyu

                    break;
                }
                case '大风' :{

                    weatherIcon = dafeng

                    break;
                }
                case '大雪' :{

                    weatherIcon = daxue
                    break;
                }
                case '大雨' :{

                    weatherIcon = dayu
                    break;
                }
                case '多云' :{

                    weatherIcon = duoyun
                    break;
                }
                case '多云转雪' :{

                    weatherIcon = duoyunzhuanxue
                    break;
                }
                case '风' :{

                    weatherIcon = feng
                    break;
                }
                case '雷阵雨' :{

                    weatherIcon = leizhenyu
                    break;
                }
                case '雾' :{

                    weatherIcon = wu
                    break;
                }
                case '雾霾' :{

                    weatherIcon =  wumai
                    break;
                }
                case '霾' :{

                    weatherIcon =  wumai
                    break;
                }
                case '小雪' :{

                    weatherIcon = xiaoxue
                    break;
                }
                case '小雨' :{

                    weatherIcon = xiaoyu
                    break;
                }
                case '雨加雪' :{

                    weatherIcon = yujiaxue
                    break;
                }
                case '小雨加雪' :{

                    weatherIcon = xiaoyujiaxue
                    break;
                }
                case '阴转雨' :{

                    weatherIcon = yinzhuanyu
                    break;
                }
                case '中雪' :{

                    weatherIcon = zhongxue
                    break;
                }
                case '中雨' :{

                    weatherIcon = zhongyu
                    break;
                }
                case '暴雪' :{

                    weatherIcon = Bx

                    break;
                }
                case '暴雨' :{

                    weatherIcon = Byu

                    break;
                }
                default : {
                    weatherIcon = ''
                }
            }
            return [
                entry.getHours.toString(),
                0,
                weatherIcon,
                entry.minTemp,
                entry.maxTemp,
                entry.rain,
            ];
        });

        const dims = {
            time: 0,
            tem: 1,
            rh: 2,
            wind_dir_txt: 3,//风向
            weatherIcon: 2,
            minTemp: 3,
            maxTemp: 4,
            weather: 4,
            rain: 5,//雨水量
        };
        const weatherIconSize = 40;

        const renderWeather = function (param, api) {

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
                            image: api.value(dims.weatherIcon),
                            x: -weatherIconSize / 2,
                            y: -weatherIconSize / 2,
                            width: weatherIconSize,
                            height: weatherIconSize
                        },
                        position: [point[0], 110]
                    }
                ]
            };
        };

        const option = {
            legend: {
                right: '16',
                top: 10,
                icon: "rect",
                itemWidth: 16,  // 设置宽度
                // itemGap: 40,
                itemHeight: 16,
                textStyle: {
                    fontSize: 32,
                    color: '#fff',
                    lineHeight: 32,
                },

            },
            title: {
                text: '当日天气预报',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 48,
                    fontWeight: 500,
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 153, 175, 0.5)',

                formatter: function (params) {
                    return [
                        '降水：' + params[0].value[dims.rain],
                        '温度：' + params[0].value[dims.tem] + '℃',
                        '风况：' + params[0].value[dims.wind_dir_txt],
                        '湿度：' + params[0].value[dims.rh] + '%',
                        '天气：' + params[0].value[dims.weather]
                    ].join('<br>');
                },
                padding:10,
                textStyle: { // 提示框浮层的文本样式。
                    fontSize: 24,
                },
            },
            grid: {
                top: 160,
                bottom: 50,
                show: true,
                borderColor: 'transparent',
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
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                data: xArr,

                splitLine: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        // borderColor:'rgba(45, 155, 255, 1)',
                        color: 'rgba(45, 155, 255, 1)',
                        width: 2,//这里是为了突出显示加上的
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: '#fff',
                    fontSize: 32,
                },
                axisTick: {       //y轴刻度线
                    "show": false
                },
            },
            yAxis: [
                {
                    name: 'mm',
                    yAxisIndex: 1,
                    nameTextStyle: {
                        fontSize: 32,
                        align: 'right'
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#FFE172',

                        }
                    },
                    axisTick: {       //y轴刻度线
                        "show": false
                    },

                    splitLine: {
                        "show": true,
                        lineStyle: {
                            color: ['rgba(45, 155, 255, 0.2)'],
                            width: 2,
                            type: 'solid'
                        }
                    }
                    ,
                    axisLabel: {
                        textStyle: {
                            fontSize: '32',//字体大小
                        },
                    },

                },
                {
                    name: '℃',
                    nameTextStyle: {
                        fontSize: 32,
                        align: 'left'
                    },
                    // max: 6,
                    axisTick: {       //y轴刻度线
                        "show": false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#00E6A9'
                        }
                    },
                    splitLine: {
                        show: false,

                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: '32',//字体大小
                        },
                    }
                },
                {
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {show: false},
                    splitLine: {show: false}
                }
            ],

            series: [
                {
                    name: '降水量',
                    type: 'line',
                    smooth: false,
                    // showSymbol: false,
                    emphasis: {
                        // scale: false
                    },
                    symbolSize: 5,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            global: false,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 225, 114, 0.8)'
                                },

                                {
                                    offset: 1,
                                    color: 'rgba(255, 225, 114, 0)'
                                }
                            ]
                        }
                    },
                    lineStyle: {
                        color: 'rgba(255, 225, 114, 1)'
                    },
                    itemStyle: {
                        color: 'rgba(255, 225, 114, 1)'
                    },
                    encode: {
                        x: dims.time,
                        y: dims.rain
                    },
                    data: data,
                    z: 2
                },

                {
                    name: '温度',
                    yAxisIndex: 1,
                    type: 'line',
                    // showSymbol: false,
                    emphasis: {
                        // scale: false
                    },
                    smooth: false,
                    symbolSize: 4,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            global: false,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(0, 230, 169, 0.8)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0, 230, 169, 0)'
                                }
                            ]
                        }
                    },

                    lineStyle: {
                        color: 'rgba(0, 230, 169, 1)'
                    },
                    itemStyle: {
                        color: 'rgba(0, 230, 169, 1)'
                    },
                    encode: {
                        x: dims.time,
                        y: dims.tem,
                    },
                    data: data,
                    z: 1
                },
                {
                    type: 'custom',
                    renderItem: renderWeather,
                    data: weatherData,
                    tooltip: {
                        trigger: 'item',
                        formatter: function (param) {
                            // return (
                            //     param.value[dims.time] +
                            //     ': ' +
                            //     param.value[dims.minTemp] +
                            //     ' - ' +
                            //     param.value[dims.maxTemp] +
                            //     '°'
                            // );
                        }
                    },
                    yAxisIndex: 2,
                    z: 11
                }
            ]
        };

        this.myChart.setOption(option, true);


        window.onresize = () => {
            this.myChart.resize();
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
            <div ref={node => this.node = node} style={{width: '1200px', height: '570px'}}></div>
        )
    }

}