import React,{Component} from 'react';
import * as echarts from 'echarts';

import {isEqual} from "lodash";

export default class Jindu extends Component{

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [0];

        this.state = {
            data: dataQuery,

        }
    }
    // //绘图
    setEcharts=()=>{
        //默认拿第一个
        const num = this.state.data[0];
        this.myChart = echarts.init(this.node);
        const option={
            backgroundColor:"transparent",
            grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: '35%'
            },

            xAxis: {
                show: false,
                type: "value",
                boundaryGap: [0, 0],

            },
            yAxis: [
                {
                    type: "category",
                    data: [""],
                    axisLine: { show: false },
                    axisTick: [
                        {
                            show: false
                        }
                    ]
                }
            ],
            series: [
                {
                    name: "金额",
                    type: "bar",
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            left:10,
                            barBorderRadius: 30,
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                                {
                                    offset: 1,
                                    color: "rgba(48, 140, 255, 1)"
                                },
                                {
                                    offset: 0,
                                    color: "rgba(94, 192, 255, 1)"
                                }
                            ])
                        }
                    },

                    barWidth: 32,
                    data: [num]
                },
                {
                    name: "背景",
                    type: "bar",
                    barWidth: 32,
                    barGap: "-100%",
                    data: [100],
                    zlevel: 2,
                    label: {
                        normal: {
                            formatter: (params) => {
                                var text;
                                text = num+'%'
                                return text;
                            },

                            fontSize:48,
                            color:'#5DBFFF',
                            position: 'right',
                            distance: 10, // 向右偏移位置
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "rgba(48, 140, 255, 0.27)", // 填充色
                            borderColor:'rgba(48, 171, 255, 1)',
                            barBorderRadius: 30,
                            barBorderWidth: 2, // 边框宽度
                        }
                    }
                }
            ]
        }
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
            <div ref={node=>this.node=node} style={{width:'474px',height:'67px'}}></div>
        )
    }

}