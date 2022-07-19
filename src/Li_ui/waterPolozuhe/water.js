//风险预警水球
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
        let data = this.state.data;

        // let data = [
        //     {type: 0,widthString: '400px',text: '暂无风险',color:'',fontSize: '68px',subtitle:'城管事件',subtitleSize:'48px',amplitude: 10}
        // ]
        // let data = [{type: 1,widthString: '94px',text: '2条风险',color:'',fontSize: '18px',subtitle:'天气',subtitleSize:'16px',amplitude: 10}]
        // let data = [{name: '航空航天',money: 84,speed:5}, {name: '电子信息',money: 98,speed:51}, {name: '机械制造',money: 42,speed:15}, {name: '化纤纺织',money: 41,speed:35}]
        if (!Array.isArray(data) || data.length === 0||data[0]==='') {
            return
        }
        let fontColor = '#23cc72';
        let bcColor='#23cc72';
        if (data[0]?.color) {
            fontColor = data[0]?.color;
        } else {
            switch (data[0].jibie) {
                case 0 : {
                    fontColor = '#23cc72'
                    bcColor='#23cc72'
                    break;
                }
                case 1: {
                    fontColor = '#296FE2'
                    bcColor = '#296FE2'
                    break;
                }
                case 2 : {
                    fontColor = '#f8c21c'
                    bcColor='#f8c21c'
                    break;
                }
                case 3 : {
                    fontColor = '#fe9837'
                    bcColor='#fe9837'
                    break;
                }
                case 4 : {
                    fontColor = '#FF9E9E'
                    bcColor='#b53b3e'
                    break;
                }
                // case 4 : {
                //     fontColor = '#e4387f'
                //
                //     break;
                // }
                // case 5 : {
                //     fontColor = '#b61f7e'
                //
                //     break;
                // }
                // case 6: {
                //     fontColor = '#296FE2'
                //
                //     break;
                // }
                // case 7: {
                //     fontColor = '#00FFDE'
                //     break;
                // }
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
                        value: 3,
                        itemStyle: {
                            normal: {
                                color: fontColor,
                                borderWidth: 0,
                                opacity: 0.4,
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
                text: data[0]?.text !==0 ?data[0]?.text + '条风险': '暂无风险',
                left: 'center',
                top: '53%',
                z:15,
                textStyle: {
                    fontSize: data[0]?.fontSize || 32,
                    fontWeight: '600',
                    color: fontColor,
                },
            }],
            //水球图
            series: [{
                type: 'liquidFill',
                radius: '80%',
                z:10,
                center: ['50%', '50%'],
                amplitude: data[0].amplitude || 10,
                data: [0.5, 0.5], // data个数代表波浪数
                color: [fontColor],
                backgroundStyle: {
                    borderWidth: 4,
                    // opacity:0.2,
                    borderColor: fontColor,
                    color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                        offset: 0,
                        color: hexToRgba(fontColor, 0.4)
                    }, {
                        offset: 1,
                        color: hexToRgba(fontColor, 0)
                    }])
                },
                itemStyle:{
                    opacity:0.8,
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: hexToRgba(bcColor, 0.6)
                    },{
                        offset: 0.5,
                        color: hexToRgba(bcColor, 0.4)
                    }, {
                        offset: 1,
                        color: hexToRgba(bcColor, 0.6)
                    }])
                },
                label: {
                    normal: {
                        position: ['50%', '30%'],
                        // opacity: 1,
                        // align:'right',
                        formatter: data[0].subtitle || '',
                        textStyle: {
                            fontSize: data[0].subtitleSize||22,
                            color: '#fff',

                        }
                    },
                    // emphasis: {
                    //     opacity: 0.9
                    // }
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
                    zlevel: 1,
                    silent: true,
                    center: ['50%', '50%'],
                    radius: ['85%', '95%'],
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
                {
                    type: 'pie',
                    zlevel: 0,
                    silent: true,
                    center: ['50%', '50%'],
                    radius: ['70%', '72%'],
                    z: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: hexToRgba(fontColor, 0.8)
                            }, {
                                offset: 0.25,
                                color: hexToRgba(fontColor, 0.0)
                            }, {
                                offset: 0.75,
                                color: hexToRgba(fontColor, 0.0)
                            }, {
                                offset: 1,
                                color: hexToRgba(fontColor, 0.8)
                            }])

                        },
                        // emphasis: {
                        //     label: {
                        //         show: false
                        //     },
                        //     areaColor: 'rgba(255, 255, 255, .1)',
                        // }
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
                    data: [1]
                },


            ]
        }
        this.myChart.setOption(option, true);

        this.myChart.resize({width:this.state.data[0]?.widthString||200, height: this.state.data[0]?.widthString||200});
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
            <div ref={node=>this.node=node}
                 style={{width: this.state.data[0]?.widthString||200, height: this.state.data[0]?.widthString||200}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
