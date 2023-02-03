import React, {Component} from 'react';
import * as echarts from 'echarts';
import bg from './img/bg.png'
import {isEqual} from "lodash";
const color = ['#5494FF','#3FFFF5','#36FF84','#FFAC4E','#E7E471']
// pie_li_ywlx
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery,
            // data: [{type: 0,widthString: '100px',text:'50%',fontSize:'15px',amplitude:2,}]
        }
    }
    // //绘图
    setEcharts = () => {
        let {data} = this.state;
        //默认拿第一个
        this.myChart = echarts.init(this.node);
        let option = {
            color:color,
            grid:{
                top:0,
                left:0,
                right:0,
            },
            series: [
                {
                    name: '底层',
                    type: 'pie',
                    radius: ['30%', '48%'],
                    center:['50%','30%'],
                    itemStyle:{
                        opacity:0.5
                    },
                    emphasis: {
                        scale:false,
                    },
                    label:{
                      show:false,
                    },
                    data: data
                },
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['36%', '42%'],
                    center:['50%','30%'],
                    label:{
                        formatter: '{d}%',
                        fontSize:36,
                        color:"#fff",
                        // backgroundColor:'#d0e0fd',
                        // overflow:'break'
                    },
                    labelLine:{
                      length:30
                    },
                    emphasis: {
                        scale:false
                    },
                    data: data
                },
            ]
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
            <div ref={node => this.node = node}
                 style={{width: '650px', height: '758px',background:`url(${bg}) no-repeat center 9%/60%`}}></div>
        )
    }

}
// background:'url('+img+') no-repeat center center/100%',
