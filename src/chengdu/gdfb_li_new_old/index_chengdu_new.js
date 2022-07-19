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
        // dataQuery=[{name:'X1X1酒店',count: 18880,glrs:12345,address: '樊城区XX街道XX路123号',tel: 15912345678},{name:'X2X酒店',count: 180,glrs:123,address: '樊城区XX街道XX路123号',tel: 15912345678},{name:'X3X酒店',count: 180,glrs:123,address: '樊城区XX街道XX路123号',tel: 15912345678},{name:'X4X酒店',count: 180,glrs:123,address: '樊城区XX街道XX路123号',tel: 15912345678},{name:'X5X酒店',count: 180,glrs:123,address: '樊城区XX街道XX路123号',tel: 15912345678}]

        let newData =this.checkArr(dataQuery);

        let fIndex = newData.length-1;
        if (dataQuery.length > 3) {
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
    checkArr(data) {
        const list = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i]) {
                list.push(data[i])
            }
        }
        return list;
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
        },()=>{
            if(this.state.newData.length>0){
                this.state.handlers.onClick && this.state.handlers.onClick({...this.state.newData[0]})
            }
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
        let {newData} = this.state;
        if(newData.length>3){
            this.setIntervalfunc= setInterval(()=>{

                let {sdIndex} = this.state;
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

                let newData =this.checkArr(dataQuery)

                let fIndex = newData.length-1;


                this.setState({
                    data: dataQuery, newData: newData,fIndex:fIndex
                }, () => {
                    if (this.setIntervalfunc) {
                        clearInterval(this.setIntervalfunc);
                        this.setIntervalfunc = null;

                    }
                    if(this.state.newData.length>0){
                        this.state.handlers.onClick && this.state.handlers.onClick({...this.state.newData[0]})
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
        // console.log(item.name);
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
                        transform: `translateY(-${(sdIndex)*95}px)`,
                        // transition: `transform ${6}s`,
                        // transform: `translateY(-${(sdIndex*160)}px)`
                    }}
                         ref={this.swiperRef}
                    >
                        {
                            newData.map((child, index) => {

                                return (<div className={'swiper-slide'} key={index.toString()} style={{
                                    width: '100%',
                                    // height: 96,
                                    // display: 'flex',
                                    // justifyContent: children.length === 3 ? 'space-between' : 'flex-start',
                                    // alignItems: 'flex-start',
                                    // background: `url(${index===fIndex ? zx : ''}) no-repeat center 155px/ 90%`
                                }}>
                                    {
                                        <div className={'box-item'}
                                             onClick={() => this.itemClick(child)}

                                             style={{

                                                 marginRight: child.length == 3 ? 'auto' : '16px'}} key={index}>
                                            <div className={'names'}>
                                                <div style={{width:201,height:33,display:'inline-block'}}><span className={'name'}>{child?.name || ''}</span></div>
                                                {/* <span className={'countTitle'}>总计: <i
                                                    className={'count'}>{this.format(item?.count || 0)}</i></span> */}
                                                <div style={{width:150,height:33,display:'inline-block'}}><span className={'countTitle'}>床位 <i style={{color:'#AEFFEE'}}
                                                    className={'count'}>{this.format(child?.count || 0)}</i></span></div>
                                                <div style={{width:150,height:33,display:'inline-block'}}><span className={'countTitle'}>隔离人数 <i style={{color:'#AEFFEE'}}
                                                    className={'count'}>{this.format(child?.glrs || 0)}</i></span></div>
                                            </div>

                                            <div className={'box-content1'}>
                                                <span className={'countTitle1'}>地址&emsp;<i className={'count'}>{child?.address||''}</i></span>
                                                <span className={'countTitle1'}>联系人电话&emsp;<i className={'count'}>{child?.tel||''}</i></span>
                                            </div>

                                        </div>
                                    }
                                </div>)
                            })
                        }
                    </div>

                </div>

            </div>
        )
    }

}
