import React, {Component} from 'react';
import * as echarts from 'echarts';

import {isEqual} from "lodash";

// zhenjierenkou_li
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,

        }
    }

   numFormat=(num)=>{
        num=num.toString().split(".");  // 分隔小数点
        var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
        var res=[];
        for(var i=0,len=arr.length;i<len;i++){
            if(i%3===0&&i!==0){
                res.push(",");   // 添加分隔符
            }
            res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if(num[1]){  // 如果有小数的话添加小数部分
            res=res.join("").concat("."+num[1]);
        }else{
            res=res.join("");
        }
        return res;
    }
    // //绘图
    setEcharts = () => {
        let that =this;

        // this.state.data
        let data =this.state.data;
        // let data = [{name: '中原街道办', value: 4000}, {name: '米公街道办', value: 20000}, {name: '王寨街道办', value: 60000}, {name: '汉江街道办',value: 800000}, {name: '屏襄门街道办', value: 40000}, {name: '屏襄门', value: 60000}, {name: '米公', value: 60000}, {name: '柿铺', value: 50000}, {name: '牛首', value: 50000}, {name: '太平店', value: 5000000}];


        // var data=[{name:"王寨",value:75392},{name:"汉江",value:74514},{name:"牛首镇",value:74166},{name:"屏襄门",value:66354},{name:"太平店镇",value:61614},{name:"清河口",value:46821,},{name:"七里河",value:30176,},{name:"柿铺",value:28413,},{name:"定中门",value:25167,},{name:"紫贞",value:23517}]
        let xData2 = [];
        let data1 = [];
        let maxArr = [];
        let valueMax = 0;

        for (let i = 0; i < data.length; i++) {
            typeof data[i].value === 'string' ? data[i].value = Number(data[i].value):data[i].value=data[i].value;
            xData2.push(data[i].name);
            data1.push(data[i].value);
            if(data[i].value>valueMax){
                valueMax = data[i].value;

            }
        }

        if(valueMax<1){
            for(let i = 0;i<data.length;i++){
                maxArr.push(1);
            }
        }else if(valueMax>1&&valueMax<10){
            for(let i = 0;i<data.length;i++){
                maxArr.push(10);
            }
        }else if(valueMax>10&&valueMax<100){
            for(let i = 0;i<data.length;i++){
                maxArr.push(100);
            }
        }else if(valueMax>100&&valueMax<500){
            for(let i = 0;i<data.length;i++){
                maxArr.push(500);
            }
        }else {
            for(let i = 0;i<data.length;i++){
                maxArr.push(valueMax);
            }
        }

        // console.log(maxArr,xData2,data1)
        this.myChart = echarts.init(this.node);
        const option = {
            backgroundColor: 'rgba(255,255,255,0)',
            grid: {
                top:90,
                left: '10%',
                bottom: 100,
            },
            xAxis: {
                data: xData2,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'rgba(45, 155, 255, 1)',
                        width:2
                    }
                    // borderColor:'rgba(45, 155, 255, 1)'
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                    margin :20, //刻度标签与轴线之间的距离。
                    // align:'right'
                    padding:[0,0,0,-20]
                },
            },
            yAxis: {
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 32,
                    },
                },
            },
            series: [
                //数据的柱状图
                {
                    name: '',
                    type: 'bar',
                    barGap: '-270%',
                    barWidth: 20,
                    itemStyle: {
                        //lenged文本
                        opacity: 1, //这个是 透明度
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 193, 255, 1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 193, 255, 0.3)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        },
                    },
                    "label": {
                        "show": true,
                        "position": "top",
                        "distance": 10,
                        fontSize:32,
                        "color": "#01fff4",
                        formatter:function(value){
                            return that.numFormat(value.value);
                            // console.log(value);
                        }
                    },
                    data: data1,
                },

                //阴影的顶部
                {
                    name: '', //头部
                    type: 'pictorialBar',
                    symbolSize: [80, 25],
                    symbolOffset: [-17, -10],
                    z: 12,
                    symbolPosition: 'end',
                    itemStyle: {
                        color: 'rgba(0, 193, 255, 0.3)',
                        opacity: 0.59,
                    },

                    data: maxArr
                },
                //后面的背景
                {
                    name: '2019',
                    type: 'bar',
                    barWidth: 80,
                    // barGap: '-100%',javascript:;
                    z: 0,
                    itemStyle: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 193, 255, 0.1)', // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.5,
                                        color: 'rgba(0, 193, 255, 0.2)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(0, 193, 255, 0.1)', // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        },
                    },

                    data: maxArr
                },
            ],
        };
        this.myChart.setOption(option, true);
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
            <div ref={node => this.node = node}  style={{width: '100%', height: '100%'}}></div>
        )
    }

}