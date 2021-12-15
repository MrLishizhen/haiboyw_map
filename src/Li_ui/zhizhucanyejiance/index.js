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
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let data = this.state.data;
        // let data = [{name: '航空航天',money: 84,speed:5}, {name: '电子信息',money: 98,speed:51}, {name: '机械制造',money: 42,speed:15}, {name: '化纤纺织',money: 41,speed:35}]
        if(!Array.isArray(data)||data.length===0){
            return
        }
        let max = 0;
        let yLabel = []
        let data1 = []
        let bgData = []
        let speedData = []
        for(let i = 0;i<data.length;i++){
            yLabel.push(data[i].name);
            data1.push(data[i].money);
            speedData.push(data[i].speed);
            if(data[i].money>max){
                max = data[i].money;
            }
        }

        max = parseInt((max / 50) + 1) * 50;
        for (let i in data1) {
            bgData.push(max)
        }

        const option = {
            title:{
                show:true,
                text:'支柱产业监测',
                textStyle:{
                    color:"#fff",
                    fontSize:48,
                    fontWeight:500
                }
            },
            backgroundColor: 'transparent',
            grid: {
                left: '10%',
                bottom: '10%',
                top: '20%',
            },
            // color:['red',"#34FFEF"],
            legend: {
                show: true,
                top: 16,
                right: 0,
                textStyle: {
                    color: '#fff',
                    fontSize: 32,

                },
            },
            xAxis: {
                data:yLabel,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        widht: 2,
                        color: '#2D9BFF',
                    },
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                    padding: [0, 0, 0, 20],
                    // align:'center',
                    margin: 20, //刻度标签与轴线之间的距离。
                },
            },
            yAxis: [
                {
                    name: '亿元',
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 32,
                        align: 'right',
                        padding: [20, 0],
                    },
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
                {
                    type: 'value',
                    name: '%',
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 32,
                        align: 'left',
                        padding: [20, 0],
                    },
                    position: 'right',
                    axisLine: {
                        show:false,
                        lineStyle: {
                            color: '#cdd5e2',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        // formatter: '{value} %', //右侧Y轴文字显示
                        textStyle: {
                            color: '#fff',
                            fontSize: 32,
                        },
                    },
                },
            ],
            series: [
                //数据的柱状图
                {
                    name: '产业产值',
                    type: 'bar',
                    yAxisIndex: 0,
                    // barGap: '-70%',
                    barWidth: 16,
                    color:'rgba(0, 193, 255, 1)',
                    z: 16,
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
                    symbolSize: [60, 25],
                    symbolOffset: [-10, -10],
                    z: 12,
                    symbolPosition: 'end',
                    itemStyle: {
                        color: 'rgba(0, 193, 255, 0.3)',
                        opacity: 0.59,
                    },
                    data: bgData,
                },
                {
                    name: '增速',
                    type: 'line',
                    // symbolOffset:[8,0],
                    z: 20,

                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示
                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 16, //标记的大小
                    itemStyle: {
                        normal: {
                            color: '#34FFEF',
                            borderColor: '#fff', //圆点透明 边框
                            borderWidth: 6,
                        },
                    },
                    lineStyle: {
                        width: 4,
                        color: '#34FFEF',
                    },

                    data: speedData,
                },
                //后面的背景
                {
                    name: '',
                    type: 'bar',
                    barWidth: 60,
                    barGap: '-240%',
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
                                        color: 'rgba(0, 193, 255, 0.2)',
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

                    data: bgData,
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
            <div ref={node => this.node = node} style={{width: '1104px', height: '831px'}}></div>
        )
    }

}