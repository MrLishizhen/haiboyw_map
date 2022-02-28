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
        let that = this;
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let data = this.state.data;
        // let data = [
        //     {
        //         name: '古城街办',
        //         value: '1180'
        //     }, {
        //         name: '檀溪街办',
        //         value: '960'
        //     }, {
        //         name: '真武山街道',
        //         value: '250'
        //     }
        //     , {
        //         name: '庞公街道',
        //         value: '760'
        //     }
        //     , {
        //         name: '余家湖街道',
        //         value: '356'
        //     }
        //     , {
        //         name: '隆中街道',
        //         value: '652'
        //     }
        //     , {
        //         name: '尹集乡',
        //         value: '156'
        //     }
        //     , {
        //         name: '卧龙镇',
        //         value: '386'
        //     }, {
        //         name: '欧庙镇',
        //         value: '690'
        //     }
        // ]
        // let data = [
        //     {name: '柿铺街办',value: '1180'}, {name: '定中门街办',value: '960'}, {name: '王寨街办',value: '250'}, {name: '中原街办',value: '760'}, {name: '米公街办',value: '356'},{name: '清河口街办',value: '652'}, {name: '汉江街办',value: '156'}, {name: '屏襄门街办', value: '386'}, {name: '太平店镇',value: '690'}, {name: '牛首镇',value: '690'}
        // ]
        if(!Array.isArray(data)||data.length===0){
            return
        }
        let max = 0;
        let yLabel = []
        let yData = []
        let bgData = []
        data.sort(function(a,b){
            return b.value-a.value;
        })
        for(let i = 0;i<data.length;i++){
            yLabel.push(data[i].name);
            yData.push(data[i].value);
        }

        max = parseInt((data[0].value / 500) + 1) * 500;
        for (let i in yData) {
            bgData.push(max)
        }
        const option = {
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                top: '0%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + '<br/>' +
                        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                        params[0].seriesName + ' : ' + params[0].value + ' <br/>'
                }
            },
            backgroundColor: 'transparent',
            xAxis: {
                show: false,
                type: 'value',
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    interval:0,
                    show: true,
                    margin: 15,
                    textStyle: {
                        color: '#fff',
                        fontSize:32,
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: yLabel
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    formatter:function(value){
                        return that.numFormat(value);
                    },
                    interval:0,
                    textStyle: {
                        color: function (value, index) {

                            if (index===0) {
                                return '#FFBA1E'
                            } else {
                                return '#3FEAF4'
                            }
                        },
                        fontSize: '32'
                    },
                },
                data: yData
            }],
            series: [{
                name: '用气量',
                type: 'bar',
                barGap: '-290%',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        // barBorderRadius: [0,30,30,0],
                        color:function(value){

                            if(value.dataIndex===0){
                                return  '#FFBA1E';
                            }else{
                                return  '#1EE0FF';
                            }
                        },
                        shadowBlur: 0,
                        shadowColor: 'rgba(87,220,222,0.7)'
                    },
                },
                barWidth: 4,
                data: yData
            },
                {
                    name: '背景',
                    type: 'bar',
                    barWidth: 20,
                    // barGap: '-100%',
                    data: bgData,
                    itemStyle: {
                        normal: {
                            color: 'rgba(30, 166, 255, 0.2)',
                            // barBorderRadius: [],
                        }
                    },
                },
            ]
        };
        this.myChart.setOption(option, true);


        window.onresize = () => {
            this.myChart.resize();
        }
    }

    componentDidMount() {
        this.setEcharts();

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
            <div ref={node => this.node = node} style={{width: '560px', height: '450px'}}></div>
        )
    }

}