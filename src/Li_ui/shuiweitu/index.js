import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
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
        // let data = this.state.data;
        // let data = [{
        //     type:0,
        //     widthString:'150px',
        //
        // }]
        let data = [{
            type: 0,//0-5 0 为 优  良 轻度 中度 重度 严重 6重要水质达标率 7湿度
            widthString: '400px' , // 宽度,
            text: '50%', //显示文本
            color:'',//传入颜色 必须是#000000格式
            fontSize: '48px',//文本字号
            mainTitle:'湿度',
            mainTitleSize:'48px',//主标题字号
            subtitle:'良',
            subtitleSize:'36px',
            amplitude: 10, //水波振幅
             }]
        // let data = [{type: 0,widthString: '400px',text: '50%',color:'',fontSize: '48px',mainTitle:'湿度',mainTitleSize:'48px',subtitle:'良',subtitleSize:'36px',amplitude: 10,}]
        // let data = [{name: '航空航天',money: 84,speed:5}, {name: '电子信息',money: 98,speed:51}, {name: '机械制造',money: 42,speed:15}, {name: '化纤纺织',money: 41,speed:35}]
        if (!Array.isArray(data) || data.length === 0) {
            return
        }
        let fontColor = '#23cc72';
        if(data[0]?.color){
            fontColor=data[0]?.color;
        }else{
            switch (data[0].type) {
                case 0 : {
                    fontColor = '#23cc72'
                    break;
                }
                case 1 : {
                    fontColor = '#f8c21c'

                    break;
                }
                case 2 : {
                    fontColor = '#fe9837'

                    break;
                }
                case 3 : {
                    fontColor = '#f86965'

                    break;
                }
                case 4 : {
                    fontColor = '#e4387f'

                    break;
                }
                case 5 : {
                    fontColor = '#b61f7e'

                    break;
                }
                case 6:{
                    fontColor = '#296FE2'

                    break;
                }
                case 7:{
                    fontColor = '#00FFDE'
                    break;
                }
            }
        }


        function hexToRgba(hex, opacity) {
            return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
        }


        function Pie() {
            let dataArr = [];
            for (var i = 0; i < 150; i++) {
                if (i % 2 === 0) {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 25,
                        itemStyle: {
                            normal: {
                                color: fontColor,
                                borderWidth: 0,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    })
                } else {
                    dataArr.push({
                        name: (i + 1).toString(),
                        value: 10,
                        itemStyle: {
                            normal: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0,
                                borderColor: "rgba(0,0,0,0)"
                            }
                        }
                    })
                }
            }
            return dataArr
        }

        const option = {
            backgroundColor: 'rgba(0,0,0,0)',
            title: [{
                text: data[0]?.mainTitle||'',
                left:'center',
                top:'5%',
                textStyle: {
                    // fontWeight: 'normal',
                    fontSize: data[0]?.mainTitleSize||48,
                    fontWeight: '500',
                    color: '#fff'
                }
            },{
                text: data[0]?.subtitle||'',
                left: 'center',
                top: '60%',
                textStyle: {
                    fontSize: data[0]?.subtitleSize||36,
                    fontWeight: '500',
                    color: '#fff',
                },
            }],
            series: [{
                type: 'liquidFill',
                radius: '50%',
                center: ['50%', '60%'],
                amplitude: data[0].amplitude || 10,
                data: [0.5, 0.5], // data个数代表波浪数
                color: [fontColor],
                backgroundStyle: {
                    borderWidth: 2,
                    // opacity:0.2,
                    borderColor: fontColor,
                    color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                        offset: 0,
                        color: hexToRgba(fontColor,0.4)
                    }, {
                        offset: 1,
                        color: hexToRgba(fontColor,0)
                    }])
                },
                // itemStyle:{
                //     opacity:0.4
                // },
                label: {
                    normal: {
                        position: ['50%', '30%'],
                        // align:'right',
                        formatter: data[0].text || '',
                        textStyle: {
                            fontSize: data[0].fontSize,
                            color: "#fff",
                        }
                    }
                },
                outline: {
                    show: false,

                }
            },
                // ,
                // {
                //     "type": "pie",
                //     "center": ["50%", "50%"],
                //     "radius": ["80%", "98%"],
                //     "hoverAnimation": false,
                //
                //     "data": [{
                //         "name": "",
                //         "value": 500,
                //         labelLine: {
                //             show: false
                //         },
                //         itemStyle: {
                //             color: color,
                //             opacity: 0.5
                //         },
                //         emphasis: {
                //             labelLine: {
                //                 show: false
                //             },
                //             itemStyle: {
                //                 color: color
                //             },
                //         }
                //     },
                //
                //     ]
                // },
                {
                    type: 'pie',
                    zlevel: 0,
                    silent: true,
                    center: ['50%', '60%'],
                    radius: ['65%', '70%'],
                    z: 10,
                    itemStyle: {
                        normal: {
                            areaColor: 'rgba(137, 137, 137, .3)',
                            borderColor: '#888',
                        },
                        emphasis: {
                            label: {
                                show: false
                            },
                            areaColor: 'rgba(255, 255, 255, .1)',
                        }
                    },
                    label: {
                        normal: {
                            show: false
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: Pie()
                },
                // {
                //     name: '',
                //     type: 'gauge',
                //     radius: '100%', // 和占比环重合
                //     center: ['50%', '50%'],
                //     startAngle: -180,
                //     endAngle: 179.9999,
                //     splitNumber: 90, // 分成20个小分隔
                //     hoverAnimation: true,
                //     z: 10,
                //     axisTick: {
                //         show: false
                //     },
                //     splitLine: {
                //         length: 10,
                //         lineStyle: {
                //             width: 4,
                //             color: fontColor
                //         }
                //     },
                //     axisLabel: {
                //         show: false
                //     },
                //     pointer: {
                //         show: false
                //     },
                //     axisLine: {
                //         lineStyle: {
                //             opacity: 0
                //         }
                //     },
                //     detail: {
                //         show: false
                //     },
                //     data: [
                //         {
                //             value: 0,
                //             name: ''
                //         }
                //     ]
                // }


            ]
        }
        this.myChart.setOption(option, true);

        this.myChart.resize({width: data[0]?.widthString, height: data[0]?.widthString});
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
                 style={{width: this.state.data[0]?.widthString, height: this.state.data[0]?.widthString}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',