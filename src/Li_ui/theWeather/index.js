import React, {Component} from 'react';



import QT from './img/qing.png'
import Yin from './img/duoyun.png'
import Bx from './/img/baoxue.png'//暴雪
import Byu from './img/baoyu.png'//暴雨
import Bbao from './img/bingbao.png'//冰雹
import dabaoyu from './img/dabaoyu.png';//大暴雨
import dafeng from './img/dafeng.png';//大风
import daxue from './img/daxue.png'//大雪
import dayu from './img/dayu.png'//大雨
import duoyun from './img/yin.png'//多云
import duoyunzhuanxue from './img/duoyunzhuanxue.png';//多云转雪
import feng from './img/feng.png';//风
import leizhenyu from './img/leizhenyu.png';//雷阵雨
import wu from './img/wu.png'//雾
import wumai from './img/wumai.png'//雾霾
import xiaoxue from './img/xiaoxue.png'//小雪
import xiaoyu from './img/xiaoyu.png'//小雨
import yujiaxue from './img/yujiaxue.png'//雨加雪
import xiaoyujiaxue from './img/yujiaxue.png'//小雨加雪
import yinzhuanyu from './img/yinzhuanyu.png';//阴转雨
import zhongxue from './img/zhongxue.png'//中雪
import zhongyu from './img/zhongyu.png'//中雨
import {isEqual} from "lodash";
// import rawData from './data'
import styles from './index.less'


export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            weatherIcon:'',
            weather:'',
            temperature:''
        }
    }

    // //绘图
    setEcharts = () => {
        //默认拿第一个

        let erDatas = this.state.data[0];
        if(!erDatas){
            return;
        }
        // let erDatas ={
        //     weather:'多云',
        //     temperature:26,
        // }
        let weatherIcon = '';
        switch (erDatas.weather) {
                case '多云': {
                    weatherIcon = Yin
                    break;
                }
                case '晴' : {
                    weatherIcon = QT

                    break;
                }
                case '冰雹' :{

                    weatherIcon = Bbao

                    break;
                }
                case '大暴雨' :{

                    weatherIcon = dabaoyu

                    break;
                }
                case '大风' :{

                    weatherIcon = dafeng

                    break;
                }
                case '大雪' :{

                    weatherIcon = daxue
                    break;
                }
                case '大雨' :{

                    weatherIcon = dayu
                    break;
                }
                case '多云' :{

                    weatherIcon = duoyun
                    break;
                }
                case '多云转雪' :{

                    weatherIcon = duoyunzhuanxue
                    break;
                }
                case '风' :{

                    weatherIcon = feng
                    break;
                }
                case '雷阵雨' :{

                    weatherIcon = leizhenyu
                    break;
                }
                case '雾' :{

                    weatherIcon = wu
                    break;
                }
                case '雾霾' :{

                    weatherIcon =  wumai
                    break;
                }
                case '霾' :{

                    weatherIcon =  wumai
                    break;
                }
                case '小雪' :{

                    weatherIcon = xiaoxue
                    break;
                }
                case '小雨' :{

                    weatherIcon = xiaoyu
                    break;
                }
                case '雨加雪' :{

                    weatherIcon = yujiaxue
                    break;
                }
                case '小雨加雪' :{

                    weatherIcon = xiaoyujiaxue
                    break;
                }
                case '阴转雨' :{

                    weatherIcon = yinzhuanyu
                    break;
                }
                case '中雪' :{

                    weatherIcon = zhongxue
                    break;
                }
                case '中雨' :{

                    weatherIcon = zhongyu
                    break;
                }
                case '暴雪' :{

                    weatherIcon = Bx

                    break;
                }
                case '暴雨' :{

                    weatherIcon = Byu

                    break;
                }
                default : {
                    weatherIcon = ''
                }
            }

        this.setState({
            ...this.state,
            ...erDatas,
            weatherIcon
        })
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
            <div ref={node => this.node = node} className={styles.temperatureBox} style={{ height: '120px'}}>
                <span style={{width:'120px',height:'120px',background:'url('+this.state.weatherIcon+') no-repeat center center/100%'}}></span>
                <span className={'temperature'}>{this.state.temperature}</span>
                <span className={'temperature-right'}>
                    <i className={'temperatureMark'}>℃</i>
                    <i className={'temperatureTitle'}>{this.state.weather}</i>
                </span>
            </div>
        )
    }

}