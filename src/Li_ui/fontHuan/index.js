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
        // let data = [
        //     90
        // ]
        if (!Array.isArray(data) || data.length === 0) {
            return
        }
        const option = {

            title: [{
                text: data[0]||0 + '%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize: '48',
                    color: 'rgba(0, 255, 86, 1)',
                    fontFamily: 'DINAlternate-Bold, DINAlternate',
                    foontWeight: '600',
                },
            }],
            backgroundColor: 'transparent',
            polar: {
                radius: ['85%', '90%'],
                center: ['50%', '50%'],
            },
            angleAxis: {
                max: 100,
                show: false,
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            series: [{
                name: '',
                type: 'bar',
                z: 5,
                // radius: ['85%', '90%'],
                barWidth: 6,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(0, 255, 131, .1)',
                },
                label: {
                    show: false,
                },
                data: [data[0]],
                coordinateSystem: 'polar',
                color: 'rgba(0, 255, 131, 1)'


            },

                {
                    name: '123',
                    type: 'pie',
                    z: 0,
                    startAngle: 80,
                    radius: ['75%', '100%'],
                    hoverAnimation: false,
                    center: ['50%', '50%'],
                    label: {
                        show: false,
                    },
                    itemStyle: {

                        normal: {

                            color: 'rgba(0, 255, 131, .3)'
                        },
                    },
                    data: [100],
                }
            ],

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
            <div ref={node => this.node = node} style={{width: '150px', height: '150px'}}></div>
        )
    }

}