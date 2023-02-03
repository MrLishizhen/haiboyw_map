import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import {isEqual} from "lodash";


export default class Pie_height extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data:[{
            //     widthString:450,
            //     heightString:300,
            //     data:[
            //         { name: '办公楼层', value: 15, itemStyle: { color: '#988bfd' } },
            //         { name: '停车场', value: 25, itemStyle: { color: '#2E4FF7' }},
            //         { name: '1楼大厅', value: 10, itemStyle: { color: '#69CDE7' } },
            //
            //     ],
            //     autoRotate:true,
            //     alpha:30,
            //     distance:5000,
            // }]
        }
    }



    setEcharts = () => {

        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let {data,...rest} = this.state.data[0]||[];
        const getPie3D = (pieData=[], internalDiameterRatio) => {
            let series = [];
            let sumValue = 0;
            let startValue = 0;
            let endValue = 0;
            let legendData = [];
            let k =
                typeof internalDiameterRatio !== 'undefined'
                    ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                    : 1 / 3;

            // 为每一个饼图数据，生成一个 series-surface 配置
            for (let i = 0; i < pieData.length; i++) {
                sumValue += pieData[i].value;

                let seriesItem = {
                    name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
                    type: 'surface',

                    parametric: true,
                    wireframe: {
                        show: false,
                    },
                    pieData: pieData[i],
                    pieStatus: {
                        selected: false,
                        hovered: false,
                        k: k,
                    },
                    labelLine: {
                        show: false,
                    },
                    label: {
                        show: false,
                        // normal: {
                        //   position: "inner",
                        //   formatter: (params) => {
                        //     return params;
                        //   },
                        // },
                    },
                    itemStyle: {
                        opacity: 1,
                    },
                };

                if (typeof pieData[i].itemStyle != 'undefined') {
                    let itemStyle = {};

                    typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
                    typeof pieData[i].itemStyle.opacity != 'undefined'
                        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                        : null;

                    seriesItem.itemStyle = itemStyle;
                }
                series.push(seriesItem);
            }

            // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
            // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
            for (let i = 0; i < series.length; i++) {
                endValue = startValue + series[i].pieData.value;
                // console.log(series[i]);
                series[i].pieData.startRatio = startValue / sumValue;
                series[i].pieData.endRatio = endValue / sumValue;
                series[i].parametricEquation = getParametricEquation(
                    series[i].pieData.startRatio,
                    series[i].pieData.endRatio,
                    false,
                    false,
                    k,
                    series[i].pieData.value
                );

                startValue = endValue;

                legendData.push(series[i].name);
            }

            // 准备待返回的配置项，把准备好的 legendData、series 传入。
            let option = {
                tooltip: {
                    formatter: (params) => {
                        if (params.seriesName !== 'mouseoutSeries') {
                            return `${
                                params.seriesName
                            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                                params.color
                            };"></span>${option.series[params.seriesIndex].pieData.value}`;
                        }
                    },
                },

                labelLine: {
                    show: true,
                },
                label: {
                    show: true,
                },
                legend: {
                    orient: 'vertical',
                    data: legendData,
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                    },
                    itemWidth: 10,
                    itemHeight: 10,
                    icon: 'roundRect',
                    formatter: function (name) {
                        let item = data.filter((item) => item.name == name)[0];
                        return `${item.name}`;
                    },
                    left: 'left',
                    top: 'center',
                },
                xAxis3D: {
                    min: -1.3,
                    max: 1.3,
                },
                yAxis3D: {
                    min: -1.3,
                    max: 1.3,
                },
                zAxis3D: {
                    min: -1.3,
                    max: 1.3,
                },
                grid3D: {
                    show: false,
                    boxHeight: 4,
                    top: '0%',//设置饼图到顶部距离
                    left: '10%',//设置饼图到左侧距离
                    // environment: "#021041",
                    viewControl: {
                        distance: rest.distance || 5000,
                        alpha: rest.alpha||30,
                        beta: 10,
                        autoRotate: rest.autoRotate||false,
                    },
                },
                series: series,
            };
            return option;
        };
// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
        const getParametricEquation = (startRatio, endRatio, isSelected, isHovered, k, height) => {
            // 计算
            let midRatio = (startRatio + endRatio) / 2;

            let startRadian = startRatio * Math.PI * 2;
            let endRadian = endRatio * Math.PI * 2;
            let midRadian = midRatio * Math.PI * 2;

            // 如果只有一个扇形，则不实现选中效果。
            if (startRatio === 0 && endRatio === 1) {
                isSelected = false;
            }

            // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
            k = typeof k !== 'undefined' ? k : 1 / 3;

            // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
            let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
            let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

            // 计算高亮效果的放大比例（未高亮，则比例为 1）
            let hoverRate = isHovered ? 1.05 : 1;

            // 返回曲面参数方程
            return {
                u: {
                    min: -Math.PI,
                    max: Math.PI * 3,
                    step: Math.PI / 32,
                },

                v: {
                    min: 0,
                    max: Math.PI * 2,
                    step: Math.PI / 20,
                },

                x: function (u, v) {
                    if (u < startRadian) {
                        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                y: function (u, v) {
                    if (u < startRadian) {
                        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    if (u > endRadian) {
                        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                    }
                    return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
                },

                z: function (u, v) {
                    if (u < -Math.PI * 0.5) {
                        return Math.sin(u);
                    }
                    if (u > Math.PI * 2.5) {
                        return Math.sin(u);
                    }
                    return Math.sin(v) > 0 ? 1 * height : -1;
                },
            };
        };

        let option = getPie3D(data, 0);
        this.myChart.setOption(option, true);

        this.myChart.resize({width: rest.widthString, height: rest.heightString});
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
                 style={{width: this.state.data[0]?.widthString||400, height: this.state.data[0]?.heightString||300}}></div>
        )
    }

}
