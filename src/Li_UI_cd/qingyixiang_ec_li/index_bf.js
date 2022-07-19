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

            // data:[{
            //     name:['商务商贸','建筑交通业','高新技术业','制造业','文化、体育、娱乐','其他(居民服务、卫生、教育等)'],
            //     enterpriseCount:[150,110,90,50,40,20],//企业数量
            //     moneyCount:[120,140,80,70,60,50],//总贷款金额
            // }]

            // data:[{name:['商务商贸','建筑交通业','高新技术业','制造业','文化、体育、娱乐','其他(居民服务、卫生、教育等)'],enterpriseCount:[150,110,90,50,40,20],moneyCount:[120,140,80,70,60,50],//总贷款金额}]
        }
    }

    setEcharts = () => {
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let datas = this.state.data[0]||{};



        const colorList = ["#374BB3", "#3FFFF5", "#36B1FF", "#4ACE6E", "#E5B545", '#E7E471'];
        const bgColor = 'rgba(0,0,0,0)';
        let names = datas.name||[];
        let data1 = datas.enterpriseCount||[];
        let data2 = datas.moneyCount||[];

        let enterpriseTotal = 0;
        let moneyTotal = 0;
        for (let i = 0; i < data1.length; i++) {
            enterpriseTotal += data1[i];
        }
        for (let i = 0; i < data2.length; i++) {
            moneyTotal += data2[i];
        }
        let series = [];
        for(let i = 0;i<names.length;i++){
            series.push({
                type: 'bar',
                name: names[i],
                data: [(data2[i]/moneyTotal)*500,(data1[i]/enterpriseTotal)*500],
                stack: 'income',
                barWidth: 24,
                itemStyle: {

                }
            })
        }

        let option = {
            grid: {

                left:0,
                right:0,
                top:'20px',
                bottom:'110px'
            },

            tooltip: {
                width:264,
                // height:220,
                margin:0,
                padding:0,
                borderWidth:0,
                fontSize:28,
                backgroundColor: '#fff',
                formatter: function (params, ticket, callback) {
                    var tlData = 0;
                    // switch (params.seriesName) {
                    //
                    //     default:
                    //     // code
                    // }
                    if(params.dataIndex===1){
                        return `<div style="padding:16px;background-image: linear-gradient(rgba(104, 164, 255, 0.9),rgba(32, 73, 136, 0.9),
rgba(19, 39, 84, 0.9));display:flex;flex-direction: column;justify-content: center;align-content: center;font-size:20px;"><div style="color:#fff;margin-bottom: 8px">${
                            params.seriesName
                        }</div>
                        <span style='color:#88CDFF;margin-bottom: 8px'>企业数量 <span style="color:rgba(155, 255, 249, 1)">${ data1[params.seriesIndex]} </span></span>
                    
                        <span style='color:#88CDFF'>企业占比 <span style="color:rgba(155, 255, 249, 1)">${(Number((data1[params.seriesIndex]/enterpriseTotal*100).toString().match(/^\d+(?:\.\d{0,2})?/)))}%</span></span>
                    </div>`
                    }else if(params.dataIndex===0){
                        return `<div style="padding:16px;background-image: linear-gradient(rgba(104, 164, 255, 0.9),rgba(32, 73, 136, 0.9),
rgba(19, 39, 84, 0.9));display:flex;flex-direction: column;justify-content: center;align-content: center;font-size:20px;"><div style="color:#fff;margin-bottom: 8px">${
                            params.seriesName
                        }</div>
                        <span style='color:#88CDFF;margin-bottom: 8px'>贷款金额 <span style="color:rgba(155, 255, 249, 1)">${ data2[params.seriesIndex]}</span> </span>
                    
                        <span style='color:#88CDFF'>金额占比 <span style="color:rgba(155, 255, 249, 1)">${(Number((data2[params.seriesIndex]/moneyTotal*100).toString().match(/^\d+(?:\.\d{0,2})?/)))}%</span></span>
                    </div>`
                    }
                    console.log(params)


                }
            },
            xAxis: {
                data: [],
                type: 'value',
                // max: 1000,
                show: false,
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                show: false,

                axisTick: {
                    show: false
                }
            },
            color: colorList,
            backgroundColor: bgColor,
            series: series||[]
        }
        this.myChart.setOption(option, true);

        // this.myChart.resize({width: data[0]?.widthString, height: data[0]?.widthString});
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
                 style={{width: 400, height: 286}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
