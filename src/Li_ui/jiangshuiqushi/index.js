import React, {Component} from 'react';
import * as echarts from 'echarts';

import {isEqual} from "lodash";
const erData = [{"msg":"操作成功","code":200,"data":[{"time":"2021-11-26T14:00:00","weather":"晴","weather_code":"00","tem":"17.7","wind_speed":"2.2","wind_dir":"23.0","wind_power":"2级","wind_dir_txt":"东北","vis":"16200","rain":"0.0","rh":"42.0"},{"time":"2021-11-26T15:00:00","weather":"多云","weather_code":"01","tem":"15.8","wind_speed":"2.25","wind_dir":"24.399994","wind_power":"2级","wind_dir_txt":"东北","vis":"16200","rain":"0.0","rh":"44"},{"time":"2021-11-26T16:00:00","weather":"多云","weather_code":"01","tem":"14.2","wind_speed":"2.03","wind_dir":"28.210007","wind_power":"2级","wind_dir_txt":"东北","vis":"16200","rain":"0.0","rh":"48"},{"time":"2021-11-26T17:00:00","weather":"多云","weather_code":"01","tem":"12.7","wind_speed":"2.07","wind_dir":"22.470001","wind_power":"2级","wind_dir_txt":"北到东北","vis":"16000","rain":"0.0","rh":"52"},{"time":"2021-11-26T18:00:00","weather":"多云","weather_code":"01","tem":"11.0","wind_speed":"2.13","wind_dir":"16.910004","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15800","rain":"0.0","rh":"56"},{"time":"2021-11-26T19:00:00","weather":"多云","weather_code":"01","tem":"9.5","wind_speed":"2.21","wind_dir":"11.770004","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15600","rain":"0.0","rh":"60"},{"time":"2021-11-26T20:00:00","weather":"多云","weather_code":"01","tem":"8.8","wind_speed":"2.0","wind_dir":"4.880005","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15400","rain":"0.0","rh":"65"},{"time":"2021-11-26T21:00:00","weather":"多云","weather_code":"01","tem":"8.2","wind_speed":"1.81","wind_dir":"356.84","wind_power":"2级","wind_dir_txt":"北到西北","vis":"15200","rain":"0.0","rh":"71"},{"time":"2021-11-26T22:00:00","weather":"多云","weather_code":"01","tem":"7.6","wind_speed":"1.68","wind_dir":"346.95","wind_power":"2级","wind_dir_txt":"北到西北","vis":"15000","rain":"0.0","rh":"77"},{"time":"2021-11-26T23:00:00","weather":"多云","weather_code":"01","tem":"7.4","wind_speed":"1.76","wind_dir":"340.43","wind_power":"2级","wind_dir_txt":"北到西北","vis":"14800","rain":"0.0","rh":"79"},{"time":"2021-11-27T00:00:00","weather":"多云","weather_code":"01","tem":"7.2","wind_speed":"1.87","wind_dir":"334.66998","wind_power":"2级","wind_dir_txt":"西北","vis":"14600","rain":"0.0","rh":"81"},{"time":"2021-11-27T01:00:00","weather":"多云","weather_code":"01","tem":"7.1","wind_speed":"1.99","wind_dir":"329.43","wind_power":"2级","wind_dir_txt":"西北","vis":"14400","rain":"0.0","rh":"83"},{"time":"2021-11-27T02:00:00","weather":"多云","weather_code":"01","tem":"6.4","wind_speed":"1.92","wind_dir":"331.28998","wind_power":"2级","wind_dir_txt":"西北","vis":"14400","rain":"0.0","rh":"84"},{"time":"2021-11-27T03:00:00","weather":"晴","weather_code":"00","tem":"6.1","wind_speed":"1.84","wind_dir":"332.88","wind_power":"2级","wind_dir_txt":"西北","vis":"14500","rain":"0.0","rh":"85"},{"time":"2021-11-27T04:00:00","weather":"晴","weather_code":"00","tem":"5.5","wind_speed":"1.78","wind_dir":"335.02002","wind_power":"2级","wind_dir_txt":"西北","vis":"14500","rain":"0.0","rh":"86"},{"time":"2021-11-27T05:00:00","weather":"晴","weather_code":"00","tem":"5.4","wind_speed":"1.89","wind_dir":"332.21002","wind_power":"2级","wind_dir_txt":"西北","vis":"14300","rain":"0.0","rh":"86"},{"time":"2021-11-27T06:00:00","weather":"晴","weather_code":"00","tem":"5.2","wind_speed":"2.0","wind_dir":"329.72","wind_power":"2级","wind_dir_txt":"西北","vis":"14100","rain":"0.0","rh":"88"},{"time":"2021-11-27T07:00:00","weather":"晴","weather_code":"00","tem":"5.1","wind_speed":"2.12","wind_dir":"327.51","wind_power":"2级","wind_dir_txt":"西北","vis":"13900","rain":"0.0","rh":"88"},{"time":"2021-11-27T08:00:00","weather":"多云","weather_code":"01","tem":"7.1","wind_speed":"2.02","wind_dir":"331.91","wind_power":"2级","wind_dir_txt":"西北","vis":"14400","rain":"0.0","rh":"74"},{"time":"2021-11-27T09:00:00","weather":"多云","weather_code":"01","tem":"9.4","wind_speed":"1.92","wind_dir":"336.64","wind_power":"2级","wind_dir_txt":"西北","vis":"14900","rain":"0.0","rh":"65"},{"time":"2021-11-27T10:00:00","weather":"多云","weather_code":"01","tem":"12.0","wind_speed":"1.84","wind_dir":"341.96002","wind_power":"2级","wind_dir_txt":"北到西北","vis":"15400","rain":"0.0","rh":"57"},{"time":"2021-11-27T11:00:00","weather":"多云","weather_code":"01","tem":"13.2","wind_speed":"1.79","wind_dir":"353.27002","wind_power":"2级","wind_dir_txt":"北到西北","vis":"15500","rain":"0.0","rh":"52"},{"time":"2021-11-27T12:00:00","weather":"多云","weather_code":"01","tem":"14.7","wind_speed":"1.81","wind_dir":"4.449997","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15600","rain":"0.0","rh":"48"},{"time":"2021-11-27T13:00:00","weather":"多云","weather_code":"01","tem":"16.0","wind_speed":"1.9","wind_dir":"15.279999","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15700","rain":"0.0","rh":"44"},{"time":"2021-11-27T14:00:00","weather":"多云","weather_code":"01","tem":"14.9","wind_speed":"1.88","wind_dir":"11.970001","wind_power":"2级","wind_dir_txt":"北到东北","vis":"15700","rain":"0.0","rh":"49"}]}]

function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data:[{"cylinderColor":"#00FFE2","heightString":"267px","widthString":"548px","xData":"[2,4,6,8,10,12,14,16,18,20,22,0]","serveData":"[2,4,2,4,6,2,8,4,5,11,6,5]","ysuffix":"层","maxArr":"[12,12,12,12,12,12,12,12,12,12,12,12]"}]
            // data:[{cylinderColor:"#00FFE2",heightString:"267px",widthString:"502px",xData:"[14,15,16,17,18,19,20]",serveData:"[10,50,60,40,50,80,50]",ysuffix:"层",maxArr:"[100,100,100,100,100,100,100]"}]

            // data:{cylinderColor:"",heightString:"267px",widthString:"502px",xData:['14','15','16','17','18','19','20'],serveData:[10,50,60,40,50,80,50],ysuffix:"层",maxArr:[100,100,100,100,100,100,100]}
            // data:[{cylinderColor:"",heightString:"267px",widthString:"502px",xData:'[14,15,16,17,18,19,20]',serveData:"[10,50,60,40,50,80,50]",ysuffix:"层",maxArr:"[100,100,100,100,100,100,100]"}]
        }
    }

    // //绘图
    setEcharts = () => {
        let that = this;
        // this.state.data
        // let data = this.state.data;
        // let data = erData[0];
        // if (data?.code && data.code === 200) {
        //     // console.log(123)
        //     data = data.data;
        // } else {
        //     // console.log(456)
        //     return;
        // }
        // if (data.length === 0 || (data.length === 1 && data[0] === '')) {
        //     return;
        // }
        //
        // // let  data =[{name: '感谢', value: '40'}, {name: '建议', value: '20'}, {name: '求助', value: '60'}, {name: '投诉',value: '80'}, {name: '咨询', value: '40'}];
        //
        //
        //
        // let now = new Date();
        // let getDate = now.getDate();//当前日期
        // let getHours = now.getHours();//当前时间
        // let index = 0;
        for(let i =0;i<data.length;i++){
            let item = data[i];
            if(new Date(item.time).getHours() === getHours && new Date(item.time).getDate() === getDate){
                index = i;
            }
        }
        // let dataValue = data.slice(index,index+7);
        //


        // let xData = [];
        // let serveData = [];
        // let maxArr = [];
        //
        //
        // for (let i = 0; i < dataValue.length; i++) {
        //     xData.push(new Date(data[i].time).getHours());
        //     // serveData.push(data[i].rain);
        //     serveData.push(20,20,20,20,20);
        //
        //     maxArr.push(100);
        // }
       // #array({cylinderColor:"",heightString:"267px",widthString:"502px",xData:"[14,15,16,17,18,19,20]",serveData:"[10,50,60,40,50,80,50]",ysuffix:"层",maxArr:"[100,100,100,100,100,100,100]"})
        let data = this.state.data[0];
        let xData =[];
        let serveData = [];
        let maxArr =[] ;
        let ysuffix = '';
        let cylinderColor = '';
        if(data!==''){
           xData = (data?.xData!=''&&typeof data?.xData=='string') ? JSON.parse(data?.xData):[];//x轴数据
           serveData = (data?.serveData!=''&&typeof data?.serveData=='string') ?JSON.parse(data?.serveData):[];//y轴数据
           maxArr = (data?.maxArr!=""&&typeof data?.maxArr === 'string')? JSON.parse(data?.maxArr):[];//最大值
           ysuffix = data?.ysuffix||'';
            cylinderColor = data?.cylinderColor||'';
        }else{
            return;
        }



        this.myChart = echarts.init(this.node);
        const option = {
            backgroundColor: 'rgba(255,255,255,0)',
            grid: {
                top:"18%",
                left: "15%",
                bottom: "15%",
                right:'0%'
            },
            xAxis: {
                data: xData,
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
                        fontSize: 16,
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

                    formatter: function (value, index) {
                        return value + ysuffix;
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 16,
                    },
                },
            },
            series: [
                //数据的柱状图
                {
                    name: '',
                    type: 'bar',
                    barGap: '-250%',
                    barWidth: 8,
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
                                        color: hexToRgba(cylinderColor||'#00C1FF',1), // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(cylinderColor||'#00C1FF',.3), // 100% 处的颜色
                                    },
                                ],
                                false
                            );
                        },
                    },

                    data: serveData,
                },

                //阴影的顶部
                {
                    name: '', //头部
                    type: 'pictorialBar',
                    symbolSize: [30, 18],
                    symbolOffset: [-6, -10],
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
                    barWidth: 30,
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
        this.myChart.resize({width: this.state.data?.widthString||'600px', height: this.state.data?.heightString||'400px'});
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
            <div ref={node => this.node = node}   style={{width: this.state.data?.widthString||'600px', height: this.state.data?.heightString||'400px'}}></div>
        )
    }

}