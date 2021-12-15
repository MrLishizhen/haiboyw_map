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

        var xData = function() {
            var data = [];
            for (var i = 2; i < 8; i++) {
                data.push(i + "月");
            }
            return data;
        }();

        const option = {
            backgroundColor: "rgba(255,255,255,0)",

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
                "data": [10,11,12,13,14,15,16],
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
                "name": "女",
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
                "data": [
                    709,
                    1917,
                    2455,
                    2610,
                    1719,
                    1433
                ],
            },

                {
                    z:1,
                    "name": "男",
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
                    "data": [
                        327,
                        1776,
                        507,
                        1200,
                        800,
                        482
                    ]
                },

                {
                    type: 'custom',
                    renderItem: function(param,api){
                        console.log(param);
                        console.log(api);
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
                    data: [[0,0,QT],[0,0,QT],[0,0,QT],[0,0,QT],[0,0,QT],[0,0,QT],[0,0,QT]],
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
                    yAxisIndex: 0,
                    z: 1000
                }
            ]
        }

        this.myChart.setOption(option, true);


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
            <div ref={node => this.node = node} style={{width: '1091px', height: '560px'}}></div>
        )
    }

}