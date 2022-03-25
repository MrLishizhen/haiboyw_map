//事件枢纽全市近一周事件同比，全市近一周事件环比
import {Component} from 'react';
import moment from "moment";
import {isEqual} from "lodash";
import * as echarts from 'echarts';

export default class ColumnarArea extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery
        }
    }
    //十六进制转rgba颜色
    colorRgb(str, opacity) {
        var sColor = str.toLowerCase();
        if (sColor) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "rgba(" + sColorChange.join(",") + "," + opacity + ")";
        } else {
            return sColor;
        }
    };

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

    componentDidMount() {
        this.setEcharts()
    }

    setEcharts = () => {
        let {data=[]} = this.state;

        let {myData='',lineColor='#FFE172',barColor='#1F86A9',width='',height=''} = data[0]||'';

        if(!Array.isArray(myData)||myData==='')return;
        let xData=[],lineData=[],barData=[];
        for(let i = 0;i<myData.length;i++){
            xData.push(myData[i].name);
            barData.push(myData[i].barValue);
            lineData.push(myData[i].lineValue);
        }
        data = [
            {name:'东津',barValue:40,lineValue:30},{name:'樊城',barValue:60,lineValue:58},{name:'高新',barValue:55,lineValue:45},{name:'襄城',barValue:30,lineValue:25},{name:'襄州',barValue:45,lineValue:38},,{name:'鱼梁洲',barValue:45,lineValue:38},{name:'保康',barValue:45,lineValue:38},{name:'谷城',barValue:45,lineValue:38},{name:'老河口',barValue:45,lineValue:38}
        ]
        // myData = {
        //     xData:['东津', '樊城', '高新', '襄城', '襄州', '鱼梁洲', '保康', '谷城', '老河口', '天下', '帝王', '为我'],
        //     lineData:[30, 58, 45, 25, 38, 67, 19, 58, 14],
        //     linColor:'#FFE172',
        //     barData:[40, 60, 55, 30, 45, 70, 25, 65, 20],
        //     width:'',
        //     height:'',
        // }



        this.myCharts = echarts.init(this.node);
        const options = {

            xAxis: {
                data: xData||[],
                axisLine: {
                    show: false,
                    // color:'#2D9BFF'
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    interval: 0,
                    color: '#fff',
                    fontSize: 14,
                    rotate: 45,
                }
            },
            yAxis: {
                max: 100,
                axisLine: {
                    show: false,

                },
                //网格线
                splitLine: {
                    lineStyle: {
                        color: '#2D9BFF',
                        opacity: 0.2,
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#0D58A6',
                        opacity: 0.2,
                    }
                },
                axisTick: {},
                axisLabel: {
                    color: '#fff',
                    fontSize: 20
                }
            },
            // tooltip: {},
            grid: {
                left: '10%',
                top: '5%',
                right: '5%',
                bottom: '20%',
            },
            series: [
                {
                    data: lineData||[],
                    type: 'line',
                    areaStyle: {},
                    symbol: 'none',
                    z: 1,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: this.colorRgb(lineColor||'', 0.4) // 0% 处的颜色
                        }, {
                            offset: 1, color: this.colorRgb(lineColor||'', 0)  // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    lineStyle: {
                        width: 0,
                    },


                },
                {
                    data: barData||[],
                    type: 'bar',
                    z: 0,
                    color:barColor||'',
                    barWidth: 12,

                },
            ]
        }

        this.myCharts.setOption(options, true);
        this.myCharts.resize({width: myData.width||'457px', height:myData.height||'217px'});


    }

    render() {
        return (
            <div ref={e => this.node = e} style={{width: '457px', height: '217px'}}></div>
        )
    }
}