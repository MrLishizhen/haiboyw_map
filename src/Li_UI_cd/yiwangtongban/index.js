import React, {Component} from 'react';
import * as echarts from 'echarts';
import 'echarts-liquidfill'
import {isEqual} from "lodash";

// 打包名 yiwangtongban_li
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,

        }
    }

    setEcharts = () => {
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let data = this.state.data;

        // let data = [{
        //     type: 1,//0-3
        //     widthString: '100px' , // 宽度,
        //     color:'',//传入颜色 必须是#000000格式
        //     color1:'',//圆环开始处颜色
        //     mainTitle:'满意率',
        //     mainTitleSize:'16px',//主标题字号
        //     subtitle:'80%',
        //     subtitleSize:'18px',
        // }]

        // let data = [{type: 1,widthString: '100px' ,color:'',color1:'',mainTitle:'满意率',mainTitleSize:'16px',subtitle:'80%',subtitleSize:'18px'}]
        if (!Array.isArray(data) || data.length === 0) {
            return
        }
        let fontColor = '#2BFF52';
        let fontColor1 = '#99FFAC';
        if(data[0]?.color){
            fontColor=data[0]?.color;
            fontColor1=data[0]?.color1||'#99FFAC';
        }else{
            switch (data[0].type) {
                case 0 : {
                    fontColor = '#2BFF52'
                    fontColor1 = '#99FFAC';
                    break;
                }
                case 1 : {
                    fontColor = '#FFC92B'
                    fontColor1 = '#FFE393';

                    break;
                }
                case 2 : {
                    fontColor = '#2BD2FF'
                    fontColor1 = '#92E8FF';

                    break;
                }
                case 3 : {
                    fontColor = '#2BFFCF'
                    fontColor1 = '#92FFE6';

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
                top:'30%',
                textStyle: {
                    // fontWeight: 'normal',
                    fontSize: data[0]?.mainTitleSize||16,
                    fontWeight: '500',
                    color: '#fff'
                }
            },{
                text: data[0]?.subtitle||'',
                left: 'center',
                top: '50%',
                textStyle: {
                    fontSize: data[0]?.subtitleSize||18,
                    fontWeight: '500',
                    color: fontColor||'#2BFF52',
                },
            }],
            series: [

                {
                    type: 'pie',
                    name:'环',
                    zlevel: 0,
                    silent: true,
                    center: ['50%', '50%'],
                    radius: ['80%', '85%'],
                    // z: 10,
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
                    name: '内层',
                    type: 'pie',
                    radius: ['66%', '67%'],
                    center: ['50%', '50%'],
                    label:{
                        show:false
                    },
                    data: [
                        {
                            value: 100,
                            name: '',
                            itemStyle: {

                                color: fontColor
                            },

                        }
                    ]
                },
                {
                    name: '外层',
                    type: 'pie',
                    radius: ['66%', '70%'],
                    center: ['50%', '50%'],
                    label:{
                        show:false
                    },
                    data: [{
                        value: parseInt(data[0]?.subtitle||0),
                        name: '',
                        itemStyle: {

                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: fontColor||'#2BFF52',
                            }, {
                                offset: 1,
                                color: fontColor1||'#99FFAC'
                            }])
                        },

                    },
                        {
                            value: 100-parseInt(data[0]?.subtitle||0),
                            name: '',
                            itemStyle: {
                                color: "transparent"
                            }
                        }
                    ]
                },



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
