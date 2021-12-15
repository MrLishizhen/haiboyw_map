import React, {Component} from 'react';
import echarts from 'echarts';
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

        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let data = this.state.data;
        //
        // const data = [
        //     {name:'2',value:'40'},{name:'4',value:'45'},{name:'6',value:'50'},{name:'8',value:'55'},{name:'10',value:'50'},{name:'12',value:'40'},{name:'14',value:'45'},{name:'16',value:'40'},{name:'18',value:'38'},{name:'20',value:'45'},{name:'22',value:'50'},{name:'24',value:'60'},{name:'26',value:'70'},{name:'28',value:'45'},{name:'30',value:'30'},
        // ]

        if(!Array.isArray(data)||data.length===0){
            return
        }

        let xData = [];
        let yData = [];
        for(let i=0;i<data.length;i++){
            xData.push(data[i].name);
            yData.push(data[i].value);
        }
        const option = {
            backgroundColor: "rgba(255,255,255,0)",
            grid: {
                left: '2%',
                right: '0%',
                bottom: '0%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                axisLine: { //  改变x轴颜色
                    lineStyle: {
                        color: 'rgba(45, 155, 255, 1)',
                    }
                },
                axisLabel: { //  改变x轴字体颜色和大小
                    textStyle: {
                        color: "#fff",
                        fontSize: 32
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.2)"
                    }
                },
                axisTick:{
                    show:false
                },
                data:xData
            },
            yAxis: {
                axisTick:{
                    show:false
                },
                axisLine: { //  改变y轴颜色
                    show:false
                },
                axisLabel: { //  改变y轴字体颜色和大小
                    //formatter: '{value} m³ ', //  给y轴添加单位
                    textStyle: {
                        color: "#fff",
                        fontSize: 32
                    },
                },
                splitLine: {
                    lineStyle: {
                        width:2,
                        color: "rgba(45, 155, 255, 0.2)"
                    }
                },
            },
            series: [{
                itemStyle: {
                    borderColor: "rgba(132, 194, 255, 0.4)",
                    borderWidth: 6,
                    width:16,

                },
                symbolSize: 16,
                color:'rgba(132, 194, 255, 1)',
                data: yData,
                type: 'scatter'
            }]
        }
        this.myChart.setOption(option, true);


        window.onresize = () => {
            this.myChart.resize();
        }
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
            <div ref={node => this.node = node} style={{width: '1300px', height: '400px'}}></div>
        )
    }

}