import React, {Component} from 'react';
import echarts from 'echarts';
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
        // let data = [
        //     {
        //         name: '古城街办',
        //         value: '1180'
        //     }, {
        //         name: '檀溪街办',
        //         value: '960'
        //     }, {
        //         name: '真武山街道',
        //         value: '250'
        //     }
        //     , {
        //         name: '庞公街道',
        //         value: '760'
        //     }
        //     , {
        //         name: '余家湖街道',
        //         value: '356'
        //     }
        //     , {
        //         name: '隆中街道',
        //         value: '652'
        //     }
        //     , {
        //         name: '尹集乡',
        //         value: '156'
        //     }
        //     , {
        //         name: '卧龙镇',
        //         value: '386'
        //     }, {
        //         name: '欧庙镇',
        //         value: '690'
        //     }
        // ]
        if(!Array.isArray(data)||data.length===0){
            return
        }
        let max = 0;
        let yLabel = []
        let yData = []
        let bgData = []
        data.sort(function(a,b){
            return b.value-a.value;
        })
        for(let i = 0;i<data.length;i++){
            yLabel.push(data[i].name);
            yData.push(data[i].value);
        }

        max = parseInt((data[0].value / 500) + 1) * 500;
        for (let i in yData) {
            bgData.push(max)
        }
        const option = {
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + params[0].value + ' <br/>'
                }
            },
            backgroundColor: 'transparent',
            xAxis: {
                show: false,
                type: 'value',

            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    margin: 15,
                    textStyle: {
                        color: '#fff',
                        fontSize:36,
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: yLabel
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: function (value, index) {
                            console.log(value);
                            if (index===0) {
                                return '#FFBA1E'
                            } else {
                                return '#3FEAF4'
                            }
                        },
                        fontSize: '32'
                    },
                },
                data: yData
            }],
            series: [{
                name: '用电量',
                type: 'bar',
                barGap: '-290%',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        // barBorderRadius: [0,30,30,0],
                        color: '#1EE0FF',
                        shadowBlur: 0,
                        shadowColor: 'rgba(87,220,222,0.7)'
                    },
                },
                barWidth: 4,
                data: yData
            },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: 20,
                    // barGap: '-100%',
                    data: bgData,
                    itemStyle: {
                        normal: {
                            color: 'rgba(30, 166, 255, 0.2)',
                            // barBorderRadius: [],
                        }
                    },
                },
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
            <div ref={node => this.node = node} style={{width: '544px', height: '630px'}}></div>
        )
    }

}