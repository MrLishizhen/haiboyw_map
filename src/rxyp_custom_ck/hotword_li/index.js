import React, { Component } from 'react';
import { getDataProvider } from '../../utils/DataUtils'
import styles from './index.less'
import * as echarts from 'echarts';
import 'echarts-wordcloud'



//hotword_li
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
        }
    }

    componentDidMount() {
        try {
            setTimeout(()=>{
                this.initChartOption()
            },100)

        } catch (error) {
            console.log(error)
        }
    }

    initChartOption() {
        let data = getDataProvider(this.props) || getDataProvider(nextProps);
        let datacolor = []
        data && data.length>0 && data.map((item)=>{
            datacolor.push(item.color)
        })
        const chartDom = document.getElementById('worldcore');
        if(!this.myChart){
            this.myChart = echarts.init(chartDom);
        }
        this.option;
        // const color = ['red','red', 'yellow','yellow','yellow', 'blue', 'blue', 'blue', 'green','green','green','green']
        this.option = {
            series: [{

                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                type: 'wordCloud',
                // size: ['9%', '99%'],
                //文字大小
                sizeRange: [36, 112],
                // textRotation: [50, 50, 60, 20],
                //文字旋转角度
                rotationRange: [0, 0],
                shape: 'circle',
                gridSize: 36,
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6,

                },
                textStyle: {
                    color: v => (
                        `${datacolor[v.dataIndex]}`
                      ),
               },
                data: data

            }]
        };
        this.option && this.myChart.setOption(this.option,true);
    }



    componentWillReceiveProps(nextProps) {
        try {
            setTimeout(()=>{
                this.initChartOption(nextProps)
            },100)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div id='worldcore' style={{ width: '100%', height: '100%' }}>
            </div>
        )

    }

}
