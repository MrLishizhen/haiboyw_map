import React, {Component} from 'react';
import echarts from 'echarts';

import L from './img/l.png';//良
import Qdwr from './img/qdwr.png';//轻度污染
import Y from './img/y.png';//优
import yzwr from './img/yzwr.png';//严重污染
import zdwr from './img/zdwr.png';//中度污染
import zdwran from './img/zhongduwuran.png';//重度污染
import './index.less'

import {isEqual} from "lodash";



export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            bgimg:'',
            color:'#fff',
            p1:'',
            p2:''
        }
    }



    componentDidMount() {


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

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        const data = (this.state.data.length===0||this.state.data[0]==='')?[] : this.state.data;

        let obj = {}
        if(Array.isArray(data)&&data.length===2){
            switch (data[0]){
                case '优' :{
                    obj={bgimg:Y,color:'#23CC72',p1:'优',p2:data[1]}
                    break;
                }
                case '良' :{
                    obj={bgimg:Y,color:'#23CC72',p1:'良',p2:data[1]}
                    break;
                }
                case '轻度污染' :{
                    obj={bgimg:Qdwr,color:'#FE9837',p1:'轻度',p2:data[1]}
                    break;
                }
                case '严重污染' :{
                    obj={bgimg:yzwr,color:'#B61F7E',p1:'严重',p2:data[1]}
                    break;
                }
                case '中度污染' :{
                    obj={bgimg:zdwr,color:'#F86965',p1:'中度',p2:data[1]}
                    break;
                }

                case '重度污染' :{
                    obj={bgimg:zdwran,color:'#E4387F',p1:'重度',p2:data[1]}
                    break;
                }

            }
        }
        return (
            <div ref={node => this.node = node} style={{display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',width: '484px', height: '484px',background:'url('+obj.bgimg+') no-repeat center center/100% 100%'}}>
                <p style={{fontSize:'64px',color:obj.color}}>{obj.p1}</p>
                <p style={{fontSize:'48px',color:obj.color}}>{obj.p2}</p>
            </div>
        )
    }

}