import React, { Component } from 'react';
import { getDataProvider } from '../../utils/DataUtils'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent
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
    DataZoomComponent,
    CanvasRenderer
]);


//heighthappenaxis


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
            // let datapercent = [];
            data && data.length>0 && data.map((item)=>{
                dataname.push(item.name)
                datavalue.push(item.value)
                // datapercent.push(item.percent)
            })
            var chartDom = document.getElementById('suqiuaxis');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    show:false,
                },
                legend: {
                    show:false
                },
                grid: {
                    top:'3%',
                    left: '3%',
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
                        fontSize:40,
                        color:'#FFF',
                        // inside:true
                    },
                    data: dataname
                },
                dataZoom: [
                    //Y轴滑动条
                     {
                         type: 'inside', //滑动条
                        //  show: true,      //开启
                         yAxisIndex: [0],
                         left: '73%',  //滑动条位置
                         startValue:0,
                         endValue:5,
                         zoomLock:true
                    },
                    //y轴内置滑动
                     {
                         type: 'inside',  //内置滑动，随鼠标滚轮展示
                         yAxisIndex: [0],
                         startValue:0,
                         endValue:5,
                         zoomLock:true
 　　　　　　　　　　　　} ],
                series: [
                    {
                        name: '2012',
                        type: 'bar',
                        data: datavalue,
                        barWidth:24,
                        label: {
                            show: true,
                            position:'right',
                            // offset:[120,0],
                            fontSize:40,
                            color:'rgba(63, 255, 245, 1)',
                          },
                        itemStyle: {
                            normal: {
                                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，分别表示右,下,左,上。例如（0，0，0，1）表示从正上开始向下渐变；如果是（1，0，0，0），则是从正右开始向左渐变。
                                // 相当于在图形包围盒中的百分比，如果最后一个参数传 true，则该四个值是绝对的像素位置
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0, color: 'rgba(87, 202, 207, 1)'                   //指0%处的颜色
                                }, {
                                    offset: 1, color: 'rgba(87, 151, 207, 1)'                 //指100%处的颜色
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
            // let datapercent = [];
            data && data.length>0 && data.map((item)=>{
                dataname.push(item.name)
                datavalue.push(item.value)
                // datapercent.push(item.percent)
            })
            var chartDom = document.getElementById('suqiuaxis');
            var myChart = echarts.init(chartDom);
            var option;

            option = {
                tooltip: {
                    show:false,
                },
                legend: {
                    show:false
                },
                grid: {
                    top:'3%',
                    left: '3%',
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
                        fontSize:40,
                        color:'#FFF',
                        // inside:true
                    },
                    data: dataname
                },
                dataZoom: [
                    //Y轴滑动条
                     {
                         type: 'inside', //滑动条
                        //  show: true,      //开启
                         yAxisIndex: [0],
                         left: '73%',  //滑动条位置
                         startValue:0,
                         endValue:5,
                         zoomLock:true
                    },
                    //y轴内置滑动
                     {
                         type: 'inside',  //内置滑动，随鼠标滚轮展示
                         yAxisIndex: [0],
                         startValue:0,
                         endValue:5,
                         zoomLock:true
 　　　　　　　　　　　　} ],
                series: [
                    {
                        name: '2012',
                        type: 'bar',
                        data: datavalue,
                        barWidth:24,
                        label: {
                            show: true,
                            position:'right',
                            // offset:[120,0],
                            fontSize:40,
                            color:'rgba(63, 255, 245, 1)',
                          },
                        itemStyle: {
                            normal: {
                                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，分别表示右,下,左,上。例如（0，0，0，1）表示从正上开始向下渐变；如果是（1，0，0，0），则是从正右开始向左渐变。
                                // 相当于在图形包围盒中的百分比，如果最后一个参数传 true，则该四个值是绝对的像素位置
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0, color: 'rgba(87, 202, 207, 1)'                   //指0%处的颜色
                                }, {
                                    offset: 1, color: 'rgba(87, 151, 207, 1)'                 //指100%处的颜色
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
                <div id="suqiuaxis" style={{ width: '100%', height: '100%',background: 'rgba(0,0,0,0)' }}></div>
        )
    }
}
export default Index;
