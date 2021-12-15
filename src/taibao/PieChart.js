import React, { Component } from 'react';
import echarts from 'echarts';

export default class PieChart extends Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
    }

    componentDidMount() {
        this.initChart(this.props.data);
    }

    initChart = (data) => {
        if (this.node.current) {
            if (!this.myChart) {
                this.myChart = echarts.init(this.node.current);
            }

            const option = {
                legend: {
                    data: ['效率', '质量', '安全'],
                    show: false
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['60%', '85%'],
                        avoidLabelOverlap: false,
                        // data: [
                        //     { value: 50, name: '效率' },
                        //     { value: 40, name: '质量' },
                        //     { value: 10 },
                        //     { value: 41, name: '安全' },
                        //     { value: 9 },
                        // ],
                        data: data || [],
                        hoverAnimation: false,
                        label: {
                            position: 'outside',
                            color: 'rgba(16, 68, 92, 0.5)',
                            align: 'center',
                            alignTo: 'edge',
                            margin: 0,
                            formatter: (params) => {
                                const { data = {} } = params;
                                const { name, value } = data;

                                if (name === '效率') {
                                    return [`{name|${name}}`, `{value|${value}}`].join('\n')
                                } else if (name === '质量') {
                                    return [`{name|${name}}`, `{value|${value}}`].join('\n')
                                } else if (name === '安全') {
                                    return [`{name|${name}}`, `{value|${value}}`].join('\n')
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                name: { align: 'center', color: 'rgba(16, 68, 92, 0.5)', ...this.props.labelStyle },
                                value: { align: 'center', color: 'rgba(16, 68, 92, 0.5)', ...this.props.labelStyle }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    const { name } = params;

                                    const colorList = [{
                                        c1: '#FFF7A9',
                                        c2: '#FFC25D'
                                    }, {
                                        c1: '#76DD64',
                                        c2: '#A1F288'
                                    }, {
                                        c1: '#A9E3FF',
                                        c2: '#4EBEFC'
                                    }];
                                    let c = null;

                                    if (name === '效率') {
                                        c = colorList[0];
                                    } else if (name === '质量') {
                                        c = colorList[1];
                                    } else if (name === '安全') {
                                        c = colorList[2];
                                    }

                                    if (c) {
                                        return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                            offset: 0,
                                            color: c.c1
                                        }, {
                                            offset: 1,
                                            color: c.c2
                                        }]);
                                    } else {
                                        return '#E8E8E8';
                                    }
                                }
                            }
                        },
                        labelLine: {
                            show: false,
                            length: 0,
                            length2: 0
                        }
                    }
                ]
            };

            this.myChart.setOption(option);
        }
    }

    componentDidUpdate() {
        this.initChart(this.props.data);
    }

    render() {
        const { score } = this.props;

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <div ref={this.node} style={{ width: '100%', height: '100%' }}></div>
                <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, textAlign: 'center', lineHeight: '100px', fontSize: 24, ...this.props.scoreStyle }}>
                    {score}
                </div>
            </div>
        );
    }
}