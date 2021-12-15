import React, { PureComponent } from 'react';
import echarts from 'echarts';
import _ from 'lodash';
import styles from './index.less';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.ref = React.createRef();
    }

    componentDidMount() {
        try {
            const { dataProvider = [] } = this.props;
            const list = dataProvider?.filter(dp => dp && dp.type !== 'style');

            this.initChart(list);
            if (this.chart) {
                this.chart.resize()
            }
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            if (!_.isEqual(this.props.dataProvider, prevProps.dataProvider)) {
                const { dataProvider = [] } = this.props;
                const list = dataProvider?.filter(dp => dp && dp.type !== 'style');

                this.initChart(list);
                if (this.chart) {
                    this.chart.resize()
                }
            }
        } catch (e) {
            console.error('componentDidUpdate', e)
        }
    }

    initChart(list) {
        if (this.ref.current) {
            if (!this.chart) {
                this.chart = echarts.init(this.ref.current);
            }

            this.option = {
                grid: {
                    top: '5%',
                    bottom: '4%',
                    left: '25%'
                },
                legend: {
                    show: false
                },
                xAxis: {
                    max: 'dataMax',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        fontSize: 36,
                        color: '#fff',
                        padding: [0, 24, 0, 0],
                        formatter: (value) => {
                            return value && value.length > 6 ? value.substring(0, 6) + '...' : value;
                        }
                    },
                    inverse: true,
                    data: list.map(item => item.type),
                },
                series: [{
                    name: 'size',
                    type: 'bar',
                    barWidth: '35%',
                    // barCategoryGap: '30%',
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(0, 181, 255, 0)'
                    }, {
                        offset: 1,
                        color: 'rgba(0, 181, 255, 1)'
                    }]),
                    label: {
                        show: true,
                        position: 'right',
                        fontSize: 36,
                        color: '#00fffa',
                        padding: [0, 0, 0, 24]
                    },
                    data: list.map(item => item.size),
                }]
            };

            this.chart.setOption(this.option);
        }
    }

    render() {
        const { dataProvider = [] } = this.props;
        const style = dataProvider?.filter(dp => dp && dp.type === 'style')[0] || {};
        const list = dataProvider?.filter(dp => dp && dp.type !== 'style') || [];
        const { width, height } = style;

        return (
            <div style={{ width, height, overflow: 'hidden' }}>
                <div style={{ width: width + 20, height, overflowX: 'hidden', overflowY: 'auto' }}>
                    <div ref={this.ref} style={{ height: list.length ? list.length * 90 : 400, width }}></div>
                </div>
            </div>
        );
    }
}