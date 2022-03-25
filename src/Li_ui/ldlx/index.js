//来电类型


import React,{Component} from 'react';
import * as echarts from 'echarts';

import {isEqual} from "lodash";

export default class Jindu extends Component{

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

        this.state = {
            data: dataQuery,

        }
    }
    // //绘图
    setEcharts=()=>{
        //默认拿第一个
        var xData2 = ["感谢", "建议", "求助", "投诉", "咨询"];
        var data1 = [30, 20, 30, 20, 20];
        this.myChart = echarts.init(this.node);
        const option = {
            backgroundColor: 'transparent',
            grid: {
                left: 100,
                bottom: 100
            },
            xAxis: {
                data: xData2,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                    margin: 20, //刻度标签与轴线之间的距离。
                },

            },
            yAxis: {
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                }
            },
            series: [

                //数据的柱状图
                {
                    name: '',
                    type: 'bar',
                    barWidth: 16,
                    barGap: '-100%',
                    itemStyle: { //lenged文本
                        opacity: 1, //这个是 透明度
                        color: function(params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 193, 255, 1)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(0, 193, 255, 0.3)' // 100% 处的颜色
                            }], false)
                        }
                    },

                    data: data1
                },


                //阴影的顶部
                {
                    name: "", //头部
                    type: "pictorialBar",
                    symbolSize: [45, 25],
                    symbolOffset: [-7, -10],
                    z: 12,
                    symbolPosition: "end",
                    itemStyle: {
                        color: 'rgba(0, 193, 255, 0.3)',
                        opacity: 1,
                    },
                    data: [100, 100, 100, 100, 100]
                },
                //后面的背景
                {
                    name: '2019',
                    type: 'bar',
                    barWidth: 45,
                    barGap: '-190%',
                    z: 0,
                    itemStyle: {
                        color: function(params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 193, 255, 0.1)' // 0% 处的颜色
                            },{
                                offset: 0.5,
                                color: 'rgba(0, 193, 255, 0.2)'
                            }, {
                                offset: 1,
                                color: 'rgba(0, 193, 255, 0.1)' // 100% 处的颜色
                            }], false)
                        }
                        // opacity: .7,
                    },

                    data: [100, 100, 100, 100, 100]
                }


            ]
        };
        this.myChart.setOption(option, true);
    }

    componentDidMount(){
        this.setEcharts();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { dataProvider, style } = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

                this.setState({ data: dataQuery }, () => {
                    this.setEcharts();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <div ref={node=>this.node=node} style={{width:'854px',height:'67px'}}></div>
        )
    }

}