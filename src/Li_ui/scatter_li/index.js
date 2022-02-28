//散点图
//事件来源工单数

import React, {Component} from 'react';
import * as echarts from 'echarts';
import {isEqual} from "lodash";

// export default class Scatter extends Component {
export default class Scatter extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data: [{type: 0,widthString: '100px',text:'50%',fontSize:'15px',amplitude:2,}]
        }
    }

    componentDidMount() {
        this.setEcharts()
    }
    format = (num)=>{
        let reg=/\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(reg, '$&,');
    }
    setEcharts = () => {
        let that = this;
        //默认拿第一个
        let data = this.state.data;
        // let data = [
        //     {name: "6月", value: 123},{name: "7月", value: 1234},{name: "8月", value: 123},{name: "9月", value: 123},{name: "10月", value: 123},{name: "11月", value: 123}
        // ];
        if (!Array.isArray(data) || data[0] == '') {
            return;
        }


        this.myChart = echarts.init(this.node);
        let dataset = {
            dimensions: ['name', "value"],
            source: data || []
        }

        function series() {
            const s = []
            for (var i = 0; i < dataset.dimensions.length - 1; i++) {
                const dim = dataset.dimensions[(i + 1)]
                s.push({
                    type: 'scatter',
                    color: 'rgba(114,169,255,0.4)',
                    symbolSize: 40,
                    lineHeight:40,
                    label: {
                        show: true,
                        formatter:(obj)=>{
                            let {value=0} = obj?.data;
                            return that.format(value);
                        },
                        fontSize: 20,
                        fontWeight: 600,
                        align: 'center',
                        verticalAlign: 'middle',
                        color: '#fff',

                    },
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(171,212,255,1)'

                        }, {
                            offset: 1,
                            color: 'rgba(114,169,255,0)'
                        }]),
                        borderType: 'solid'
                    },
                    emphasis: {
                        // label: {
                        //     show: true,
                        //     position: 'top'
                        // }
                    },

                })
            }
            return s
        }

        const option = {
            backgroundColor: 'rgba(0,0,0,0)',

            legend: {
                show: false,
            },
            grid: {
                show: true,
                borderColor: "transparent",
                backgroundColor: 'rgba(13,88,166,0.2)',
                left: '2%',
                top: '10%',
                right: '5%',
                bottom: '2%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: '#2D9BFF'

                    }
                },
                axisLabel: {
                    color: "#fff",
                    fontSize: 18
                }
            },
            yAxis: {
                axisLabel: {
                    color: "#fff",
                    fontSize: 18
                },
                splitLine: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(45,155,255,0.2)',
                        type: 'solid'
                    }
                },
                scale: false
            },
            dataset: dataset,
            series: series()
        };


        this.myChart.setOption(option, true);

        // this.myChart.resize({width: data[0]?.widthString, height: data[0]?.widthString});
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const {dataProvider, style} = nextProps;

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
            <div ref={node => this.node = node} style={{width: 547, height: 273}}></div>
        );
    }
}