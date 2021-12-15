import React,{Component} from 'react';
import echarts from 'echarts';
import redImg from './img/red.png';
import blueImg from './img/lan.png';
import orangeImg from './img/cheng.png';
import {isEqual} from "lodash";

export default class HuanLPer extends Component{

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

        this.state = {
            data: dataQuery,
            img:blueImg,
        }
    }
    // //绘图
    setEcharts=()=>{
        //默认拿第一个
        const num = this.state.data[0];
        let ringColorStart = '#00FFDE';
        let ringColorEnd  = '#00BBFF'
        if(num<70){
            this.setState({img:blueImg});
            ringColorStart='#00FFDE'
            ringColorEnd='#00BBFF'
        }else if(num>=70&&num<90){
            this.setState({img:orangeImg});
            ringColorStart='#FFAA00'
            ringColorEnd='#CA6607'

        }else if(num>=90){
            this.setState({img:redImg});
            ringColorStart='#FF4040'
            ringColorEnd='#C11B1B'
        }

        this.myChart = echarts.init(this.node);
        var fontColor = "#fff";
        let noramlSize = 16;
        var datas = {
            value:num ,
            company: "%",
            ringColor: [{
                offset: 0,
                color: ringColorStart // 0% 处的颜色
            }, {
                offset: 1,
                color: ringColorEnd // 100% 处的颜色
            }]
        }
        var option = {
            backgroundColor:"transparent",
            title: {
                text: '{a|' + datas.value + '}{c|%}',
                x: 'center',
                y: 'center',
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 28,
                            color: '#fff',
                            fontWeight:'600',
                        },

                        c: {
                            fontSize: 14,
                            color: '#fff',
                            padding: [5, 0]
                        }
                    }
                }
            },
            color: ['transparent'],
            legend: {
                show: false,
                data: []
            },

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['68%', '82%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: datas.value,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: datas.ringColor
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '',
                    value: 100 - datas.value
                }]
            }]
        };
        this.myChart.setOption(option, true);
    }

    componentDidMount(){
        this.setEcharts();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { dataProvider, style } = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

                this.setState({ data: dataQuery }, () => {
                    this.setEcharts();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <div ref={node=>this.node=node} style={{width:95,height:95,backgroundSize:'100% 100%',backgroundImage:'url('+this.state.img+')'}}></div>
        )
    }

}