import React,{Component} from 'react';

// import ModerateRain from './img/中雨.png'//中雨
// import ModerateSnow from './img/中雪.png'//中雪
// import cloudy from './img/多云.png'//多云
// import CloudyAndFog from './img/多云有雾.png'
// import heavyRain from './img/大雨.png'
// import heavySnow from './img/大雪.png'
// import TheWind from './img/大风.png'
// import lightRain from './img/小雨.png'
// import lightSnow from './img/小雪.png'
// import sunny from './img/晴.png'
// import SunnyToCloudy from './img/晴到多云.png'
// import heavyRains from './img/暴雨.png'
// import dustStorms from './img/沙尘暴.png'
// import yin from './img/阴.png'
// import aShower from './img/阵雨.png'
// import sleet from './img/雨夹雪.png'
// import thunderShower from './img/雷阵雨.png'
// import aTornado from './img/龙卷风.png'
// import blizzard from './img/暴雪.png'



import {isEqual} from "lodash";
import {asc} from "echarts/lib/util/number";

export default class HuanLPer extends Component{

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            img:'',
        }
    }
    // //绘图
    setImgUrl=()=>{

        const item = this.state.data[0];
        this.setState({img:require("./img/" + item + ".png")});
    }

    componentDidMount(){
        this.setImgUrl();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { dataProvider, style } = nextProps;
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

                this.setState({ data: dataQuery }, () => {
                    this.setImgUrl();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <div ref={node=>this.node=node} style={{width:100,height:100,backgroundSize:'100% 100%',backgroundImage:'url('+this.state.img+')'}}></div>
        )
    }

}