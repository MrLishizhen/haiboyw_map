import React, { Component } from 'react';
import echarts from 'echarts';
import {isEqual} from 'lodash';

// _chengdu_event_gdqs

export default class index extends Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
    }

    componentDidMount() {
        this.initCharts(this.props.dataProvider);
    }

    componentWillReceiveProps(nextProps) {
        console.info(nextProps, this.props, !isEqual(nextProps.dataProvider, this.props.dataProvider));
        if (!isEqual(nextProps.dataProvider, this.props.dataProvider)) {
            this.initCharts(nextProps.dataProvider);
        }
    }

    initCharts(data = []) {
        if (this.node.current) {
            if (!this.myChart) {
                this.myChart = echarts.init(this.node.current);
            }
            let times = [], suoyou = [], shehuisuqiu = [], zhinengfaxian = [], richangxuncha = [], shangjijiaoban = [];
            if (Array.isArray(data)) {
                data.forEach(item => { // 领导批示、社会述求、智能发现、日常巡查
                    times.push(item.time);
                    suoyou.push(item['所有']);
                    shehuisuqiu.push(item['社会诉求']);
                    zhinengfaxian.push(item['智能发现']);
                    richangxuncha.push(item['日常巡查']);
                    shangjijiaoban.push(item['领导批示']);
                });
            }

            this.option = {
                color: ['#36567D', '#63DFAF', '#E8D984', '#C7692E', '#7862AE'],
                grid: {
                    left: '6%',
                    right: '5%',
                    top: '18%',
                    bottom: '10%',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    icon: 'circle',
                    top: '1%',
                    right: '5%',
                    textStyle: {
                        color: '#fff',
                        padding: [4, 0, 0, 0]
                    },
                    selected: {
                        '所有': false
                    }
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 14,
                        margin: 16
                    },
                    boundaryGap: false,
                    data: times
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 16,
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(45, 155, 255, 0.2)'
                        }
                    }
                },
                series: [
                    {
                        type: 'line',
                        showSymbol: false,
                        name: '所有',
                        data: suoyou,
                        lineStyle: {
                            color: 'rgb(59, 94, 137, 1)',
                            width: 0
                        },
                        areaStyle: {
                            opacity: 1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(59, 94, 137, 1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(59, 94, 137, 0)'
                                }
                            ])
                        }
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        name: '领导批示',
                        data: shangjijiaoban
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        name: '社会诉求',
                        data: shehuisuqiu
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        name: '智能发现',
                        data: zhinengfaxian
                    },
                    {
                        type: 'line',
                        showSymbol: false,
                        name: '日常巡查',
                        data: richangxuncha
                    },
                ]
            };

            this.myChart.setOption(this.option, true);
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '100%' }} ref={this.node}></div>
            </div>
        );
    }
}