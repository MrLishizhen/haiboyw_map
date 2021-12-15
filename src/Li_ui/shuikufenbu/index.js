import React, {Component} from 'react';
import * as echarts from 'echarts';

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
        let datas = this.state.data;
        // let datas = [{name: '大中型',value: 5,region:'卧龙镇'},{name: '小一型',value: 1,region:'卧龙镇'},{name: '小二型',value: 1,region:'卧龙镇'}]

        if(!Array.isArray(datas)||!datas[0]){
            return;
        }

        let init=['大中型','小一型','小二型'];
        let data = [];
        let max = 0;
        let name = datas[0]?.region;
        for(let i = 0; i<init.length;i++){
            let obj = datas?.find(item=>item.name ===init[i]);
            max += obj.value;
            data.push(obj);
        }

        var img =
            'data:image/png;base64,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';

        let color2 = ['rgba(23, 253, 253, 1)', 'rgba(23, 253, 169, 1)', 'rgba(15, 188, 254, 1)'];
        let color1 = ['rgba(23, 253, 253, 0.4)', 'rgba(23, 253, 169, 0.4)', 'rgba(15, 188, 254, 0.4)'];
        let baseData1 = [];
        let baseData2 = [];
        for (var i = 0; i < data.length; i++) {
            baseData1.push(
                {
                    value: data[i].value,
                    name: data[i].name,
                    itemStyle: {
                        normal: {
                            color: color1[i],
                            borderWidth:4,
                            borderType:'solid',
                            borderColor:'rgba(23,51,83,1)'

                        },
                    },
                },

            );
        }
        for (var i = 0; i < data.length; i++) {
            baseData2.push(
                {
                    value: data[i].value,
                    name: data[i].name,
                    itemStyle: {
                        normal: {
                            color: color2[i],
                            borderWidth:4,
                            borderType:'solid',
                            borderColor:'rgba(23,51,83,1)'
                        },
                    },
                }
            );
        }

        let option = {
            backgroundColor: 'rgba(0,0,0,0)',
            title: {
                text: (max==0?0:max) + '个',
                top:'center',
                left:'30%',
                textAlign:'center',

                textStyle: {
                    color: 'rgba(101, 255, 187, 1)',
                    fontSize: 76,
                    fontWeight:500,
                },
                subtext: name,
                subtextStyle: {
                    color: '#fff',
                    fontSize: 36,
                    fontWeight:500,

                },
            },
            legend: {
                right: 40,
                top: '30%',
                orient: 'vertical',  //垂直显示
                y: 'center',    //延Y轴居中
                x: '65%', //居右显示
                selectedMode: false,
                itemWidth: 0,
                color: '#fff',
                itemStyle:{
                    borderWidth:0
                },
                textStyle: {

                    rich: {

                        a: {
                            fontSize: 36,
                            color: '#fff',
                            width: 120,
                        },
                        b0: {
                            fontSize: 36,
                            color: color2[0],
                            padding:[20,0,10,0],
                            lineHeight:36,

                        },
                        b1: {
                            fontSize: 36,
                            color: color2[1],
                            padding:[20,0,10,0],
                            lineHeight:36,

                        },
                        b2: {
                            fontSize: 36,
                            color: color2[2],
                            padding:[20,0,10,0],
                            lineHeight:36,

                        },
                    },
                },
                formatter: function (value) {
                    let obj = {};
                    let index = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name == value) {
                            obj = data[i];
                            index = i;
                        }
                    }
                    return ['{a|' + obj.name + '}', `{b${index}|` + obj.value + '}'];
                    //  return setF(value)
                },
            },
            graphic: {
                elements: [
                    {
                        name: '中间图片',
                        type: 'image',
                        z: 3,
                        style: {
                            image: img,
                            width: 164,
                            height: 164,
                        },
                        left: '16%',
                        top: 'center',
                        // position: 'center center'
                    },
                ],
            },
            series: [
                {
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['68%', '52%'],
                    center: ['30%', '50%'],
                    tooltip: {
                        show: false,
                    },
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                    data: baseData1,
                },
                {
                    type: 'pie',
                    hoverAnimation: false,
                    color: color2,
                    radius: ['80%', '72%'],
                    center: ['30%', '50%'],
                    tooltip: {
                        show: false,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    data: baseData2,
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
                 style={{width: '598px', height: '400px'}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',