//风险预警列表

import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import bj from './img/bj.png'
import styles from './index.less'
import emit from './img/emit.png'

const DEFAULT_SLIDE_SIZE = 4;
import {isEqual} from "lodash";
// import styles from "../ywtg/weather_forecast/index.less";


export default class HuanLPer extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.swiperRef = React.createRef();
        this.state = {
            data:dataQuery
        }
    }


    // data = [{riskName: '雾霾黄色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'},{riskName: '雷雨红色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'}]
// ,
    // //绘图
    setImgUrl = () => {
        let fontColor = '';
        // this.generateSwiper();

        if (this.state.data.length === 0||!this.state.data[0]) {
           return this.emit();
        } else {
            return this.state.data.map((items, index) => {
                if (items?.riskName?.indexOf('红色') > -1) {
                    fontColor = '#b53b3e'
                } else if (items?.riskName?.indexOf('橙色') > -1) {
                    fontColor = '#fe9837'
                } else if (items?.riskName?.indexOf('黄色') > -1) {
                    fontColor = '#f8c21c'
                } else if (items?.riskName?.indexOf('蓝色') > -1) {
                    fontColor = '#296FE2'
                } else {
                    fontColor = '#23cc72'
                }
                return (
                    <div key={index} className={'swiper-slide'} style={{display: 'flex'}}>
                        <div className={'riskBox'} style={{width: '100%', height: '100%'}}>
                            <h2 style={{color: fontColor}}><span>{items?.riskName}</span></h2>
                            <div className={'riskBox-cont'}>
                                <div className={'risk-left'}>
                                    <span className={'risk-name'}>发布时间：</span>
                                    <span className={'risk-vlue'}>{items?.pushTheTime}</span>
                                </div>
                                <div className={'risk-right'}>
                                    <span className={'risk-name'}>发布单位：</span>
                                    <span className={'risk-vlue'}>{items?.pushDepartment}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })


        }


        // return this.setCarouselItem(imgHtml);
    }
    generateSwiper = () => {
        if (this.swiperRef.current) {
            let loop = true;
            if (this.state.data.length === 1) {
                loop = false;
            }
            const swiperProps = {
                observer: true,
                direction: "vertical",
                clickable: true,
                loop,
                mousewheel: true,
                autoplay: 5000,
                mousewheelControl: true,
                observeParents: true,
                autoplayDisableOnInteraction: false,

            };
            this.swiper = new Swiper(this.swiperRef.current, {...swiperProps});

        }
    }
    emit = () => {
        return (<div className={'emit'}>
            <span className={'emit-img'} style={{'background':`url(${emit}) no-repeat center center/100%`}}></span>
            <span>无更多预警清单</span>
        </div>)
    }

    async componentDidMount() {
        // setTimeout(()=>{
        //     this.setState({
        //        data:[{riskName: '雾霾黄色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'},{riskName: '雷雨红色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'}]
        //
        // })
        // },4000)
        if (Array.isArray(this.state.data) && this.state.data.length > 0) {
            await this.generateSwiper();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, async () => {

                    if (Array.isArray(this.state.data) && this.state.data.length > 0) {
                        await this.generateSwiper();
                    }
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (

            <div style={{width: '100%', height: '100%'}} className={styles.web}>
                <div className='swiper-container' ref={this.swiperRef}
                     style={{height: '100%', background: `url(${bj}) no-repeat center center/100% 100%`}}>
                    <div className='swiper-wrapper'>
                        {
                             this.setImgUrl()
                        }

                    </div>

                </div>

            </div>

        )
    }

}