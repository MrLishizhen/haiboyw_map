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
            // data:['优',27],
            color:'#23CC72',
        }
    }

    // //绘图
    setEcharts = () => {
        let data = this.state.data;
        let color = '';
        if(data.length===2){
            switch (data[0]) {
                case '优':{
                    color = '#23CC72';
                    break;
                }
                case '良':{
                    color = '#23CC72';
                    break;
                }
                case '轻度污染':{
                    color = '#FE9837';
                    break;
                }
                case '中度污染':{
                    color = '#F86965';
                    break;
                }
                case '重度污染':{
                    color = '#E4387F';
                    break;
                }
                case '严重污染':{
                    color = '#B61F7E';
                    break;
                }


            }
            this.setState({color:color})
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
        let zhi = this.state.data[1]||'';
        let title = this.state.data[0]||'';
        return (
            <div ref={node => this.node = node} style={{width:'100%',height:'100%'}}>
                <p style={{textAlign:'center',fontSize:'64px',margin:0,padding:0,color:this.state.color}}>{zhi}</p>
                <p style={{textAlign:'center',fontSize:'40px',margin:0,padding:0,color:this.state.color}}>{title}</p>
            </div>
        )
    }

}