/*词云*/
import React, {Component} from 'react'
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {isEqual} from "lodash";
export default class Jin extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery,
            firstData: [],//首屏的四个项
            playData: [],//弹窗包裹的内容
        }
    }


    setEcharts = () => {
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let list = this.state.data;

        if (!Array.isArray(list) || list.length === 0 || list[0] === '') {
            return
        }
        const option = {
            // tooltip: {
            //     show: false,
            //     borderColor: '#fe9a8bb3',
            //     borderWidth: 1,
            //     padding: [10, 15, 10, 15],
            //     confine: true,
            //     backgroundColor: 'rgba(255, 255, 255, .9)',
            //     textStyle: {
            //         color: 'hotpink',
            //         lineHeight: 22
            //     },
            //     extraCssText: 'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;'
            // },
            series: [
                {
                    type: 'wordCloud',

                    shape: 'pentagon',

                    left: 'center',
                    top: 'center',
                    width: '100%',
                    height: '100%',
                    right: null,
                    bottom: null,

                    sizeRange: [14, 24],

                    rotationRange: [0, 0],
                    rotationStep: 0,

                    gridSize: 25,

                    drawOutOfBound: false,

                    layoutAnimation: true,

                    textStyle: {
                        fontFamily: 'PingFangSC-Semibold',
                        fontWeight: 600,
                        color: function (params) {

                            if(params.dataIndex<3){
                                return '#fff'
                            }else{
                                return '#B4D1FF'
                            }
                        },
                    },
                    emphasis: {
                        focus: 'none',
                    },

                    // Data is an array. Each array item must have name and value property.
                    data: list,
                },
            ],
        };

        this.myChart.setOption(option, true);

        this.myChart.resize({
            width: this.state.data[0]?.widthString || 490,
            height: this.state.data[0]?.widthString || 240
        });
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
            <div ref={node => this.node = node} style={{width: 490, height: 240}}></div>
        )
    }

}