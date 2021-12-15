import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import {isEqual} from "lodash";


export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // var data = [{
        //     type: 1,//0-5 0 为 优  良 轻度 中度 重度 严重
        //     widthString: '100px' , // 宽度,
        //     text: '50%', //显示文本
        //     fontSize: '15px',//文本字号
        //     amplitude: 2, //水波振幅
        //      }]
        this.state = {
            data: dataQuery,
            // data: [{type: 0,widthString: '100px',text:'50%',fontSize:'15px',amplitude:2,}]
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
        let value = this.state.data[0]||40;
        // let data = [{
        //     type:0,
        //     widthString:'150px',
        //
        // }]
        // let data = [{name: '航空航天',money: 84,speed:5}, {name: '电子信息',money: 98,speed:51}, {name: '机械制造',money: 42,speed:15}, {name: '化纤纺织',money: 41,speed:35}]
        // if (!Array.isArray(data) || data.length === 0) {
        //     return
        // }
        // var value = 100;
        var option = {
            backgroundColor: 'rgba(0,0,0,0)',

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
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#beceff',
                        fontSize: 48,
                    },
                    margin: 80, //刻度标签与轴线之间的距离。
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
                    show: false,
                },
            },
            series: [
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['38%', 15],
                    symbolOffset: ['-11%', '-40%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: value,

                            symbolPosition: 'end',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 255, 136, 0.5)', //圆柱顶部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['38%', 15],
                    symbolOffset: ['-10.2%', '40%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: value,

                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 255, 136, 1)', //圆柱底部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    // silent: true,
                    barWidth: '32%',
                    // "barGap": "-1100%",

                    data: [
                        {
                            name: '关井数',
                            value: value,
                            label: {

                                normal: {
                                    show: true,
                                    formatter: '{c}'+'%',
                                    position: 'top',
                                    // distance: 4,
                                    textStyle: {
                                        color: 'rgba(0, 255, 136, 1)', //柱子对应数值颜色
                                        fontSize: 20,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
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
                                                color: 'rgba(0, 255, 136, 0)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(0, 255, 136, 1)', //底部渐变颜色
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },

                //往上是内部柱状图
                //往下是外部柱状图

                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['53%', '20%'],
                    symbolOffset: ['-5.8%', '-100%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: '100',

                            symbolPosition: 'end',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 255, 136, 0.1)', //圆柱顶部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',//下方内圈浅色
                    type: 'pictorialBar',
                    symbolSize: ['80%', '30%'],
                    symbolOffset: ['3%', '50%'],
                    z: 12,
                    data: [
                        {
                            name: '关井数',
                            value: '100',

                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 255, 136, .1)', //圆柱底部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['80%', '30%'],
                    symbolOffset: ['-2%', '58%'],
                    z: 11,
                    data: [
                        {
                            name: '关井数',
                            value: '100',

                            itemStyle: {
                                normal: {
                                    color: 'transparent',
                                    borderColor: 'rgba(0, 255, 136, 1)', //底部内圆圈颜色
                                    borderWidth: 30,
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: ['100%', '40%'],
                    symbolOffset: ['-3%', '50%'],
                    z: 10,
                    data: [
                        {
                            name: '关井数',
                            value: '100',

                            itemStyle: {
                                normal: {
                                    color: 'transparent',
                                    borderColor: 'rgba(0, 255, 136, 1)', //底部外圆圈颜色
                                    borderType: 'dashed',
                                    borderWidth: 2,
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    silent: true,
                    barWidth: '45%',
                    barGap: '-120%',
                    data: [
                        {
                            name: '关井数',
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
                                                offset: 0.3,
                                                color: 'rgba(0, 255, 136, .1)',
                                            },
                                            {
                                                offset: 0.5,
                                                color: 'rgba(0, 255, 136, .1)',
                                            },
                                            {
                                                offset: 0.8,
                                                color: 'rgba(0, 255, 136, .1)',
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
                 style={{width: '217px', height: '281px'}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',