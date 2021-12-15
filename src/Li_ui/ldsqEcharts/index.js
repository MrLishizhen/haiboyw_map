//两城四区所用的echarts图
import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import {isEqual} from "lodash";

import zz from './img/zz.gif'
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
        }
    }


    /*
    * 优 #23cc72 35,204,114
    * 良 #f8c21c 248,194,28
    * 轻度 #fe9837 254,152,55
    * 中度 #f86965 248,105,101
    * 重度 #e4387f 228,56,127
    * 严重 #b61f7e 182,31,126
    * */
    // //绘图
    setEcharts = () => {
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let value = this.state.data[0];
        // let value = {"name":"医药化工","val":92}
        // let data = [{
        //     type:0,
        //     widthString:'150px',
        //
        // }]
        // if (!Array.isArray(data) || data.length === 0) {
        //     return
        // }
        // var value = 100;
        var option = {
            backgroundColor: 'rgba(0,0,0,0)',
            title:{
                text:value?.name,
                textStyle:{
                    // color:'#65D9FF',
                    color:'#fff',
                    fontWeight:500,
                    fontSize:40,
                },
                left:'center',
                top:'83%'
            },
            grid: {
                // top: 200,
                // bottom: 150,
            },
            // tooltip: {},
            xAxis: {
                data: [],
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                // axisLabel: {
                //     interval: 0,
                //     textStyle: {
                //         color: '#beceff',
                //         fontSize: 48,
                //     },
                //     margin: 80, //刻度标签与轴线之间的距离。
                // },
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
                    show: false,
                },
            },
            series: [
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['36%', 20],
                    symbolOffset: ['0', '-40%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: value?.val,
                            symbolPosition: 'end',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(85,255,238,.3)', //圆柱顶部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['36%', 20],
                    symbolOffset: ['0', '50%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: value?.val,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(85,255,238,.3)', //圆柱底部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    silent: false,
                    barWidth: '26%',
                    // "barGap": "-1100%",

                    data: [
                        {
                            name: '',
                            value: value?.val,
                            label: {
                                normal: {
                                    opacity:1,
                                    show: true,
                                    formatter: '{c}'+'%',
                                    position: 'top',
                                    textStyle: {
                                        color: '#00FFC3', //柱子对应数值颜色
                                        fontSize: 38,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    opacity:0.39,
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: 'linear',
                                        global: false,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: 'rgba(85,255,238,.3)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(85,255,238, 1)', //底部渐变颜色
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    silent: true,
                    barWidth: '45%',
                    barGap: '-174%',
                    data: [
                        {
                            name: '',
                            value: '100',

                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 1,
                                        y: 1,
                                        x2: 1,
                                        y2: 0,
                                        type: 'linear',
                                        global: false,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: 'rgba(0, 255, 136, 0)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0, 255, 136, 0)', //底部渐变颜色
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        };

        this.myChart.setOption(option, true);

        // this.myChart.resize({width: data[0]?.widthString, height: data[0]?.widthString});
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
            <div ref={node => this.node = node}
                 style={{width: '281px', height: '246px',background:`url(${zz}) no-repeat center 59%`}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',