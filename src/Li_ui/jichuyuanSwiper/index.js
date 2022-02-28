//基础预案 右侧滚动 jichuyuanSwiper_li
import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';
import styles from './index.less'


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
            data: dataQuery,
            hotIndex: 0,
            // data: [
            //
            //     {
            //         name: 'XX路与XX路交口摄像头',
            //         iframeUrl: 'http://47.94.12.253:3307/servere/login',
            //     },
            //     {
            //         name: 'XX路与XX路交口摄像头',
            //         iframeUrl: 'http://47.94.12.253:3307/servere/login',
            //     },
            //     {
            //         name: 'XX路与XX路交口摄像头',
            //         iframeUrl: 'http://47.94.12.253:3307/servere/login',
            //     },
            //     {
            //         name: 'XX路与XX路交口摄像头',
            //         iframeUrl: 'http://47.94.12.253:3307/servere/login',
            //     },
            //     {
            //         name: 'XX路与XX路交口摄像头',
            //         iframeUrl: 'http://47.94.12.253:3307/servere/login',
            //     }
            // ]
        }
    }


    // data = [{riskName: '雾霾黄色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'},{riskName: '雷雨红色预警',pushTheTime: "2021-11-06   13:00:00",pushDepartment: '生态环境局'}]
// ,
    // //绘图
    generateSwiper = () => {
        if (this.swiperRef.current) {

            const swiperProps = {
                observer: true,
                // direction: "vertical",//滑动方向 horizontal水平  vertical垂直
                clickable: true,
                mousewheel: true,
                // autoplay: 5000,
                spaceBetween: 30,
                mousewheelControl: true,
                observeParents: true,
                autoplayDisableOnInteraction: false,
                pagination: ".swiper-pagination",
                paginationClickable: true,
                onSlideChangeStart: (swiper) => {
                    this.setState({
                        hotIndex: swiper.activeIndex
                    })
                }
            };
            this.swiper = new Swiper(this.swiperRef.current, {...swiperProps});

        }
    }


    async componentDidMount() {
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

        if (Array.isArray(this.state.data) && this.state.data.length > 0) {
            await this.generateSwiper();
        }
    }

    handleChange = (value) => {

        this.state.handlers.onClick && this.state.handlers.onClick({deviceId: value});
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery,hotIndex:0}, async () => {

                    if (Array.isArray(this.state.data) && this.state.data.length > 0) {


                        await this.generateSwiper();
                    }
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }



    render() {
        let {data = [], hotIndex = 0} = this.state;
        let datas = [], result = [];

        for (var i = 0; i < data.length; i += 3) {
            datas.push(data.slice(i, i + 3));
        }
        for (let i = 0; i < datas.length; i += 2) {
            result.push(datas.slice(i, i + 2));
        }

        return (

            <div className={styles.webjichu}>

                {
                    data.length > 0 ? <div className='swiper-container' ref={this.swiperRef}
                                           style={{height: '100%',}}>
                        <div className='swiper-wrapper'>
                            {
                                result.map((item, i) => {
                                    return <div className={`${styles.swiper_slide} swiper-slide`}>
                                        {
                                            item.map(child => {
                                                return (
                                                    <div>
                                                        {
                                                            child.map(grandson => {
                                                                return (
                                                                    <div className={styles.swiper_item_box}>
                                                                        <i className={styles.mask}
                                                                           onClick={() => this.handleChange(grandson.deviceId)}></i>
                                                                        <span
                                                                            className={styles.swiper_item_name}>{grandson.name}</span>
                                                                        <div className={styles.swiper_item_iframe}>
                                                                            {

                                                                                i == hotIndex ?
                                                                                    <iframe src={grandson.iframeUrl}
                                                                                            scrolling={'no'}
                                                                                            frameBorder="0"
                                                                                            style={{
                                                                                                width: '100%',
                                                                                                height: '100%'
                                                                                            }}></iframe> : ''
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )


                                            })
                                        }
                                    </div>

                                })
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div> : <div className={styles.emitBox}>
                        <span className={styles.emitImg}></span>
                        <span className={styles.emitText}>暂无数据</span>
                    </div>
                }


            </div>

        )
    }

}