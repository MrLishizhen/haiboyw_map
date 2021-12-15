import React, {Component} from 'react';
import * as echarts from 'echarts';

import {isEqual} from "lodash";


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
        // this.state.data
        let data = this.state.data;
             // [{name: '感谢', value: '40'}, {name: '建议', value: '20'}, {name: '求助', value: '60'}, {name: '投诉',value: '80'}, {name: '咨询', value: '40'}];



        let xData2 = [];
        let data1 = [];
        let maxArr = [];
        let valueMax = 0;

        for (let i = 0; i < data.length; i++) {
            xData2.push(data[i].name);
            data1.push(data[i].value);
            if(data[i].value>valueMax){
                valueMax = data[i].value;
            }
        }

        if(valueMax<1){
            for(let i = 0;i<data.length;i++){
                maxArr.push(1);
            }
        }else if(valueMax>1&&valueMax<10){
            for(let i = 0;i<data.length;i++){
                maxArr.push(10);
            }
        }else if(valueMax>10&&valueMax<100){
            for(let i = 0;i<data.length;i++){
                maxArr.push(100);
            }
        }else if(valueMax>100&&valueMax<500){
            for(let i = 0;i<data.length;i++){
                maxArr.push(500);
            }
        }else {
            for(let i = 0;i<data.length;i++){
                maxArr.push(valueMax);
            }
        }
        this.myChart = echarts.init(this.node);
        const option = {
            backgroundColor: 'rgba(255,255,255,0)',
            grid: {
                top:90,
                left: 100,
                bottom: 100,
            },
            xAxis: {
                data: xData2,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'rgba(45, 155, 255, 1)',
                        width:2
                    }
                    // borderColor:'rgba(45, 155, 255, 1)'
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                    margin :20, //刻度标签与轴线之间的距离。
                    // align:'right'
                    padding:[0,0,0,-20]
                },
            },
            yAxis: {
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                },
            },
            series: [
                //数据的柱状图
                {
                    name: '',
                    type: 'bar',
                    barGap: '-200%',
                    barWidth: 16,
                    itemStyle: {
                        //lenged文本
                        opacity: 1, //这个是 透明度
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 193, 255, 1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 193, 255, 0.3)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        },
                    },

                    data: data1,
                },

                //阴影的顶部
                {
                    name: '', //头部
                    type: 'pictorialBar',
                    symbolSize: [48, 25],
                    symbolOffset: [-8, -10],
                    z: 12,
                    symbolPosition: 'end',
                    itemStyle: {
                        color: 'rgba(0, 193, 255, 0.3)',
                        opacity: 0.59,
                    },
                    data: maxArr
                },
                //后面的背景
                {
                    name: '2019',
                    type: 'bar',
                    barWidth: 48,
                    // barGap: '-100%',javascript:;
                    z: 0,
                    itemStyle: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 193, 255, 0.1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(0, 193, 255, 0.2)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 193, 255, 0.1)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        },
                    },

                    data: maxArr
                },
            ],
        };
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
            <div ref={node => this.node = node}  style={{width: '838px', height: '445px'}}></div>
        )
    }

}