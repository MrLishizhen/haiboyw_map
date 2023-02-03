import React, { Component } from 'react';
import { getDataProvider } from '../../../utils/DataUtils'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { func } from 'prop-types';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);



//suqiuaxis

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

    }

    componentDidMount() {
        try {
            let data = getDataProvider(this.props);
            let dataname = [];
            let datavalue = [];
            let datapercent = [];
            data && data.length>0 && data.map((item)=>{
                dataname.push(item.type)
                datavalue.push(item.count)
                datapercent.push(item.percentage)
            })
            // console.log(dataname,'data')
            var chartDom = document.getElementById('suqiu');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    itemStyle:{
                        background:'red'
                    },
                    textStyle:{
                        fontSize:48,
                        color:'#FFF'
                    },
                    backgroundColor:'rgba(30,30,30,0.4)',
                    borderColor:'rgba(255,255,255,0)',
                    formatter:function(params){
                        console.log(params,params[0].dataIndex,'ff')
                               return params[0].axisValue + ":" + '<br/>' +  datapercent[params[0].dataIndex] + "%"
                                
                            }
                },
                legend: {
                    show:false
                },
                grid: {
                    left: '20%',
                    right: '14%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    show:false,
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    nameLocation:'start',
                    inverse:true,
                    axisLine:{
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel:{
                        fontSize:36,
                        color:'#FFF',
                        // textAlign:'left'
                        inside:true,
                        padding: [0,0, 0, -180]
                    },
                    data: dataname
                },
                series: [
                    {
                        name: '2012',
                        type: 'bar',
                        data: datavalue,
                        barWidth:40,
                        label: {
                            show: true,
                            position:'right',
                            // offset:[120,0],
                            fontSize:48,
                            color:'rgba(63, 255, 245, 1)',
                            // formatter:datavalue
                            // formatter:function(params){
                            //    return datapercent[params.dataIndex] + "%" + '     '+ params.value
                            //     // console.log(params,params.dataIndex,'ff')
                            // }
                          },
                        itemStyle: {
                            normal: {
                                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，分别表示右,下,左,上。例如（0，0，0，1）表示从正上开始向下渐变；如果是（1，0，0，0），则是从正右开始向左渐变。
                                // 相当于在图形包围盒中的百分比，如果最后一个参数传 true，则该四个值是绝对的像素位置
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0, color: 'rgba(79, 165, 241, 0.3)'                   //指0%处的颜色
                                }, {
                                    offset: 1, color: 'rgba(79, 241, 232, 0)'                 //指100%处的颜色
                                }], false)
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);



        }
        catch (e) {
            console.log(e)
        }
    }


    componentWillReceiveProps(nextProps) {
        try {
            let data = getDataProvider(nextProps);
            let dataname = [];
            let datavalue = [];
            let datapercent = [];
            data && data.length>0 && data.map((item)=>{
                dataname.push(item.type)
                datavalue.push(item.count)
                datapercent.push(item.percentage)
            })
            // console.log(dataname,'data')
            var chartDom = document.getElementById('suqiu');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    itemStyle:{
                        background:'red'
                    },
                    textStyle:{
                        fontSize:48,
                        color:'#FFF'
                    },
                    backgroundColor:'rgba(30,30,30,0.4)',
                    borderColor:'rgba(255,255,255,0)',
                    formatter:function(params){
                        console.log(params,params[0].dataIndex,'ff')
                               return params[0].axisValue + ":" + '<br/>' +  datapercent[params[0].dataIndex] + "%"
                                
                            }
                },
                legend: {
                    show:false
                },
                grid: {
                    left: '20%',
                    right: '14%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    show:false,
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    nameLocation:'start',
                    inverse:true,
                    axisLine:{
                        show:false,
                    },
                    axisTick:{
                        show:false,
                    },
                    axisLabel:{
                        fontSize:36,
                        color:'#FFF',
                        // textAlign:'left'
                        inside:true,
                        padding: [0,0, 0, -180]
                    },
                    data: dataname
                },
                series: [
                    {
                        name: '2012',
                        type: 'bar',
                        data: datavalue,
                        barWidth:40,
                        label: {
                            show: true,
                            position:'right',
                            // offset:[120,0],
                            fontSize:48,
                            color:'rgba(63, 255, 245, 1)',
                            // formatter:datavalue
                            // formatter:function(params){
                            //    return datapercent[params.dataIndex] + "%" + '     '+ params.value
                            //     // console.log(params,params.dataIndex,'ff')
                            // }
                          },
                        itemStyle: {
                            normal: {
                                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，分别表示右,下,左,上。例如（0，0，0，1）表示从正上开始向下渐变；如果是（1，0，0，0），则是从正右开始向左渐变。
                                // 相当于在图形包围盒中的百分比，如果最后一个参数传 true，则该四个值是绝对的像素位置
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0, color: 'rgba(79, 165, 241, 0.3)'                   //指0%处的颜色
                                }, {
                                    offset: 1, color: 'rgba(79, 241, 232, 0)'                 //指100%处的颜色
                                }], false)
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);



        }
        catch (e) {
            console.log(e)
        }
           
    }




    render() {
        return (
            <div id="suqiu" style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0)' }}></div>
        )
    }
}
export default Index;