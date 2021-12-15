import React, {Component} from 'react';
import echarts from 'echarts';


import QT from './img/qing.png'
import Yin from './img/yin.png'

import {isEqual} from "lodash";
import rawData from './data'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

        this.state = {
            data: dataQuery,

        }
    }

    // //绘图
    setEcharts = () => {
        //默认拿第一个
        this.myChart = echarts.init(this.node);

        const weatherIcons = {
            Sunny: QT,
            Cloudy: Yin
        };
        const data = rawData.data.map(function (entry) {

            return [entry.time, entry.windSpeed, entry.R, entry.waveHeight, entry.weather, entry.mm];
        });

        const weatherData = rawData.forecast.map(function (entry) {
            return [
                entry.localDate,
                0,
                weatherIcons[entry.skyIcon],
                entry.minTemp,
                entry.maxTemp,
                entry.mm,
            ];
        });

        const dims = {
            time: 0,
            windSpeed: 1,
            R: 2,
            waveHeight: 3,
            weatherIcon: 2,
            minTemp: 3,
            maxTemp: 4,
            weather: 4,
            mm: 5,
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
                itemGap: 40,
                itemHeight: 16,
                textStyle: {
                    fontSize: 32,
                    color: '#fff',
                    lineHeight: 32,

                },

            },
            // backgroundColor: {
            //
            //     type: 'linear',
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: [{
            //         offset: 0, color: 'rgba(13, 88, 166, 0.2)' // 0% 处的颜色
            //     }, {
            //         offset: 1, color: 'rgba(13, 88, 166, 0)' // 100% 处的颜色
            //     }],
            //     global: false // 缺省为 false
            //
            // },
            title: {
                text: '当日天气预报',
                left: 'left',
                textStyle: {
                    color: '#fff',
                    fontSize: 48,
                    fontWeight:500,
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 153, 175, 0.5)',
                formatter: function (params) {
                    return [
                        '降水：' + params[0].value[dims.mm],
                        '温度：' + params[0].value[dims.windSpeed] + '℃',
                        '风况：' + params[0].value[dims.R],
                        '天气：' + params[0].value[dims.weather]
                    ].join('<br>');
                }
            },
            grid: {
                top: 160,
                bottom: 50,
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
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                data: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'],
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
                maxInterval: 2,
            },
            yAxis: [
                {
                    name: 'mm',
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
                    yAxisIndex: 1,
                    smooth: false,
                    // showSymbol: false,
                    emphasis: {
                        scale: false
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
                        y: dims.waveHeight
                    },
                    data: data,
                    z: 2
                },

                {
                    name: '天气',
                    type: 'line',
                    // showSymbol: false,
                    emphasis: {
                        // scale: false
                    },
                    smooth: false,
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
                        color: 'rgba(0, 230, 169, 1)    '
                    },
                    itemStyle: {
                        color: 'rgba(0, 230, 169, 1)'
                    },
                    encode: {
                        x: dims.time,
                        y: dims.mm
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
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

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