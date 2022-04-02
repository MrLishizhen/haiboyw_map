import React, {Component} from "react";
import * as echarts from 'echarts';
import {isEqual} from "lodash";
import styles from './index_new.less'

import 'swiper/dist/css/swiper.css';
import zx from './img/zx.png'

export default class index extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        let dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // dataQuery=[{name:'东津新区2',count: 12345,ycl:123,wcl:123,zb:58,},{name:'东津新区1',count: 12345,ycl:123,wcl:123,zb:58,},{name:'东津新区',count: 12345,ycl:123,wcl:123,zb:58,},{name: '樊城区',count:12345,ycl: 123,wcl:123,zb: 58},{name: '高新技术产业开发区',count:12345,ycl:123,wcl:123,zb:58},{name:'襄城区',count: 12345,ycl: 123,wcl:123,zb:58},{name:'襄州区',count:12345,ycl:123,wcl:123,zb:58,},{name:'鱼梁洲经济开发区',count: 12345,ycl:123,wcl:123,zb:58,},{name:'保康县',count:12345,ycl:123,wcl:123,zb:58,},{name:'谷城县',count: 12345,ycl:123,wcl:123,zb:58,},{name:'老河口市',count:12345,ycl:123,wcl:123,zb:58}]

        dataQuery.sort((a, b) => b.count - a.count);
        let newData = [];
        for (let i = 0; i < dataQuery.length; i += 3) {
            newData.push(dataQuery.slice(i, i + 3));
        }
        let fIndex = newData.length-1;
        if (dataQuery.length > 9) {
            // newData.unshift(dataQuery.slice(dataQuery.length - (dataQuery.length % 3), dataQuery.length));
            newData.push(...newData.slice(0, 3));
        }
        this.swiperRef = React.createRef();
        this.state = {
            data: dataQuery,
            newData: newData,
            sdIndex:0,
            fIndex:fIndex
        }
    }

    componentDidMount() {
        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })
        this.generateSwiper();
    }

    componentWillUnmount() {
        if (this.setIntervalfunc) {
            clearInterval(this.setIntervalfunc);
            this.setIntervalfunc = null;

        }
    }

    generateSwiper = () => {
        let {data} = this.state;
        if(data.length>9){
            this.setIntervalfunc= setInterval(()=>{

                let {sdIndex,newData} = this.state;
                let index = ++sdIndex;

                this.swiperRef.current.style.transitionDuration= `1s`
                this.setState({
                    sdIndex:index
                },()=>{
                    if(index===newData.length-3){
                        setTimeout(()=>{
                            this.swiperRef.current.style.transitionDuration= `0s`
                            this.swiperRef.current.style.transform=`translateY(0px)`

                            this.setState({
                                sdIndex:0
                            },()=>{

                            })
                        },2000)

                    }

                })
            },6000)
        }
    }
    deepClones = (obj) => {
        //判断是对象还是数组
        var objClone = Array.isArray(obj) ? [] : {};
        //判断obj是一个对象
        if (obj && typeof obj === "object") {
            //遍历obj的key值
            for (let key in obj) {
                //确认拿到的不是obj继承来的属性
                if (obj.hasOwnProperty(key)) {
                    //如果说obj的属性或者方法也是一个对象的话
                    if (obj[key] && typeof obj[key] === "object") {
                        //调用自身，把key值传进去
                        objClone[key] = this.deepClones(obj[key]);
                    } else {
                        //说明仅仅是个属性
                        objClone[key] = obj[key];
                    }
                }
            }
        }
        //return 拷贝后的对象
        return objClone;
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                dataQuery.sort((a, b) => b.count - a.count);
                let newData = [];
                for (let i = 0; i < dataQuery.length; i += 3) {
                    newData.push(dataQuery.slice(i, i + 3));
                }
                let fIndex = newData.length-1;
                if(dataQuery.length>9){
                    newData.push(...newData.slice(0, 3));
                }

                this.setState({
                    data: dataQuery, newData: newData,fIndex:fIndex
                }, () => {
                    if (this.setIntervalfunc) {
                        clearInterval(this.setIntervalfunc);
                        this.setIntervalfunc = null;

                    }
                    this.generateSwiper();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    format = (num) => {
        let reg = /\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(reg, '$&,');
    }
    mouseoveFunc = () => {

        if (this.setIntervalfunc) {

            clearInterval(this.setIntervalfunc);
            this.setIntervalfunc = null;
        }
    }
    mouseoutFunc = () => {

        this.generateSwiper();
    }
    itemClick = (item) => {
        this.state.handlers.onClick && this.state.handlers.onClick({...item})
    }

    render() {
        let getTime = new Date().getTime();
        let { data = [], newData = [],sdIndex=0,fIndex=0} = this.state;
        if (!Array.isArray(data) || data.length === 0 || data[0] === '') {
            return "";
        }

        return (
            <div className={styles.box} onMouseEnter={this.mouseoveFunc} onMouseLeave={this.mouseoutFunc}>
                <div className={styles.container} style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        transition: `transform ${1}s`,
                        transform: `translateY(-${(sdIndex)*160}px)`,
                        // transition: `transform ${6}s`,
                        // transform: `translateY(-${(sdIndex*160)}px)`
                    }}
                         ref={this.swiperRef}
                    >
                        {
                            newData.map((child, index) => {

                                let children = child.map((item, i) => {

                                    return (<div className={'box-item'}
                                                 onClick={() => this.itemClick(item)}

                                                 style={{

                                                     marginRight: child.length == 3 ? 'auto' : '16px'}} key={item}>
                                            <div className={'names'}>
                                                <span className={'name'}>{item?.name || ''}</span>
                                                <span className={'countTitle'}>总计: <i
                                                    className={'count'}>{this.format(item?.count || 0)}</i></span>
                                            </div>
                                            <div className={'box-content'}>
                                                <div className={'yc-box'}>
                                                    <p className={'yc-p'}>
                                                        <i>已处理</i>
                                                        <span>{this.format(item?.ycl || 0)}</span>
                                                    </p>
                                                    <p className={'yc-p wc'}>
                                                        <i className={'wcl-i'}>未处理</i>
                                                        <span>{this.format(item?.wcl || 0)}</span>
                                                    </p>
                                                </div>
                                                <div className={'echarts-box'}>
                                                    <Item dataProvider={[item?.zb || 0]}></Item>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                return (<div className={'swiper-slide'} key={index.toString()} style={{
                                    width: '100%',
                                    height: 160,
                                    display: 'flex',
                                    justifyContent: children.length === 3 ? 'space-between' : 'flex-start',
                                    alignItems: 'flex-start',
                                    background: `url(${index===fIndex ? zx : ''}) no-repeat center 155px/ 90%`
                                }}>
                                    {children}
                                </div>)
                            })
                        }
                    </div>

                </div>

            </div>
        )
    }

}

class Item extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        // var data = [{
        //     type: 1,//0-5 0 为 优  良 轻度 中度 重度 严重
        //     widthString: '100px' , // 宽度,
        //     text: '50%', //显示文本
        //     fontSize: '15px',//文本字号
        //     amplitude: 2, //水波振幅
        //      }]
        this.state = {
            data: dataQuery,
            // data: [{type: 0,widthString: '100px',text:'50%',fontSize:'15px',amplitude:2,}]
        }
    }

    setEcharts = () => {
        //默认拿第一个

        let myChart = echarts.init(this.node);
        let value = this.state.data[0] || 0;
        var option = {
            backgroundColor: 'rgba(0,0,0,0)',
            title: {
                text: '未处理占比',
                top: 3,
                left: '0',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 400,
                }

            },
            grid: {
                top: '15%',
                left: '0',
                right: '0%',
                bottom: '25%',
                // top: 200,
                // bottom: 150,
            },
            xAxis: {
                data: [],
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#beceff',
                        // fontSize: 48,
                    },
                    // margin: 80, //刻度标签与轴线之间的距离。
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
                    show: false,
                },
            },
            series: [
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [50, 24],
                    symbolOffset: [-5, -8],
                    z: 12,
                    data: [
                        {
                            name: '',
                            value: 40,
                            symbolPosition: 'end',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(118,184,255, 0.5)', //圆柱顶部颜色

                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [50, 24],
                    symbolOffset: [-5, 10],
                    z: 12,
                    data: [
                        {
                            name: '',
                            value: 40,

                            itemStyle: {
                                normal: {
                                    color: 'rgba(118,184,255, 1)', //圆柱底部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    // silent: true,
                    barWidth: 50,
                    // "barGap": "-1100%",

                    data: [
                        {
                            name: '',
                            value: 40,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (data) {

                                        return [
                                            '{a|' + value + '}',
                                            '{b|%}'
                                        ].join('')
                                    },
                                    rich: {
                                        a: {
                                            fontSize: '24px'
                                        },
                                        b: {
                                            fontSize: 14,
                                        }
                                    },
                                    position: 'top',
                                    // distance: 4,
                                    textStyle: {
                                        color: '#76E9FF', //柱子对应数值颜色
                                        fontSize: 24,
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        type: 'linear',
                                        global: false,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: 'rgba(118,184,255, 0)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(118,184,255, 1)', //底部渐变颜色
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },

                //往上是内部柱状图
                //往下是外部柱状图

                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [70, 22],
                    symbolOffset: [-5, -10],
                    z: 12,
                    data: [
                        {
                            name: '',
                            value: '100',
                            symbolPosition: 'end',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(118,184,255, 0.1)', //圆柱顶部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [75, 37.5],
                    symbolOffset: [-5, 18],
                    z: 12,
                    data: [
                        {
                            name: '',
                            value: '100',

                            itemStyle: {
                                normal: {
                                    color: 'rgba(118,184,255, .1)', //圆柱底部颜色
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [65, 37.5],
                    symbolOffset: [-5, 28],
                    z: 11,
                    data: [
                        {
                            name: '',
                            value: '100',
                            itemStyle: {
                                normal: {
                                    color: 'transparent',
                                    borderColor: 'rgba(118,184,255, 1)', //底部内圆圈颜色
                                    borderWidth: 30,
                                },
                            },
                        },
                    ],
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    symbolSize: [80, 50],
                    symbolOffset: [-5, 25],
                    z: 10,
                    data: [
                        {
                            name: '关井数',
                            value: '100',

                            itemStyle: {
                                normal: {
                                    color: 'transparent',
                                    borderColor: 'rgba(118,184,255, 1)', //底部外圆圈颜色
                                    borderType: 'dashed',
                                    borderWidth: 2,
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'bar',
                    silent: true,
                    barWidth: 70,
                    barGap: '-120%',
                    data: [
                        {
                            name: '',
                            value: '100',

                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: {
                                        x: 1,
                                        y: 1,
                                        x2: 1,
                                        y2: 0,
                                        type: 'linear',
                                        global: false,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: 'rgba(118,184,255, 0)',
                                            },
                                            {
                                                offset: 0.3,
                                                color: 'rgba(118,184,255, .1)',
                                            },
                                            {
                                                offset: 0.5,
                                                color: 'rgba(118,184,255, .1)',
                                            },
                                            {
                                                offset: 0.8,
                                                color: 'rgba(118,184,255, .1)',
                                            },
                                            {
                                                offset: 1,
                                                color: 'rgba(118,184,255, 0)', //底部渐变颜色
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    ],
                },
            ],
        };

        myChart.setOption(option, true);

        // this.myChart.resize({width: data[0]?.widthString, height: data[0]?.widthString});
    }

    componentDidMount() {
        this.setEcharts();

    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

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


        return (
            <div ref={node => this.node = node} className={'echarts-item'} style={{width: '90px', height: '105px'}}>

            </div>
        )
    }
}
