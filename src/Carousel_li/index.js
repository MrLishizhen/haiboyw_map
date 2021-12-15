import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.css';


import './index.less'

const DEFAULT_SLIDE_SIZE = 4;
import {isEqual} from "lodash";
import styles from "../ywtg/weather_forecast/index.less";
const dataYs = [
    {name:'冰雹橙色',value:'bb01',},
    {name:'冰雹红色',value:'bb02',},
    {name:'冰雹蓝色',value:'bb03',},
    {name:'冰雹黄色',value:'bb04',},

    {name:'台风橙色',value:'tf01',},
    {name:'台风红色',value:'tf02',},
    {name:'台风蓝色',value:'tf03',},
    {name:'台风黄色',value:'tf04',},

    {name:'大雾橙色',value:'dw01',},
    {name:'大雾红色',value:'dw02',},
    {name:'大雾蓝色',value:'dw03',},
    {name:'大雾黄色',value:'dw04',},

    {name:'大风橙色',value:'df01',},
    {name:'大风红色',value:'df02',},
    {name:'大风蓝色',value:'df03',},
    {name:'大风黄色',value:'df04',},

    {name:'寒潮橙色',value:'hc01',},
    {name:'寒潮红色',value:'hc02',},
    {name:'寒潮蓝色',value:'hc03',},
    {name:'寒潮黄色',value:'hc04',},

    {name:'干旱橙色',value:'gh01',},
    {name:'干旱红色',value:'gh02',},
    {name:'干旱蓝色',value:'gh03',},
    {name:'干旱黄色',value:'gh04',},

    {name:'暴雨橙色',value:'by01',},
    {name:'暴雨红色',value:'by02',},
    {name:'暴雨蓝色',value:'by03',},
    {name:'暴雨黄色',value:'by04',},

    {name:'暴雪橙色',value:'bx01',},
    {name:'暴雪红色',value:'bx02',},
    {name:'暴雪蓝色',value:'bx03',},
    {name:'暴雪黄色',value:'bx04',},

    {name:'沙尘暴橙色',value:'scb01',},
    {name:'沙尘暴红色',value:'scb02',},
    {name:'沙尘暴蓝色',value:'scb03',},
    {name:'沙尘暴黄色',value:'scb04',},

    {name:'道路结冰橙色',value:'dljb01',},
    {name:'道路结冰红色',value:'dljb02',},
    {name:'道路结冰蓝色',value:'dljb03',},
    {name:'道路结冰黄色',value:'dljb04',},

    {name:'雷电橙色',value:'ld01',},
    {name:'雷电红色',value:'ld02',},
    {name:'雷电蓝色',value:'ld03',},
    {name:'雷电黄色',value:'ld04',},

    {name:'霜冻橙色',value:'sd01',},
    {name:'霜冻红色',value:'sd02',},
    {name:'霜冻蓝色',value:'sd03',},
    {name:'霜冻黄色',value:'sd04',},

    {name:'霾橙色',value:'m01',},
    {name:'霾红色',value:'m02',},
    {name:'霾蓝色',value:'m03',},
    {name:'霾黄色',value:'m04',},

    {name:'高温橙色',value:'gw01',},
    {name:'高温红色',value:'gw02',},
    {name:'高温蓝色',value:'gw03',},
    {name:'高温黄色',value:'gw04',},

    {name:'暴雨默认',value:'bm'},
    {name:'大风默认',value:'dm'},
    {name:'雷电默认',value:'lm'},
    {name:'寒潮默认',value:'hm'},

]

export default class HuanLPer extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : ['暴雨默认','大风默认','雷电默认'];
        this.swiperRef = React.createRef();
        this.state = {
            data: dataQuery,
            imgData: [],
        }
    }

    // //绘图
    setImgUrl = () => {

        const {data} = this.state;
        const imgData = [];
        data.forEach((item, i) => {
            if(item===''){

            }else{
                let imgItem = dataYs.find(items=>items.name===item);
                let obj = {};
                if(imgItem!==undefined){
                    obj.url = require("./img/" + imgItem?.value + ".png");
                    imgData.push(obj);
                }else{

                }

            }

        })

        const imgHtml = [];
        for (let i = 0; i < imgData.length / 4; i++) {
            let obj = {};
            obj.childrens = imgData.slice(i * 4, (i + 1) * 4);
            imgHtml.push(obj);
        }

        this.setState({
            imgData: imgHtml,
            // imgData: imgData,
        })
        this.generateSwiper();
        // return this.setCarouselItem(imgHtml);
    }
    generateSwiper = () => {
        if (this.swiperRef.current) {
            const swiperProps = {
                observer: true,
                autoplay: 5000,
                mousewheelControl: true,
                observeParents : false,
                Autoplay:true,

            };
            // if(this.state.imgData.length>0){
            this.swiper = new Swiper(this.swiperRef.current, { ...swiperProps });
            // }

        }
    }
    componentDidMount() {
        this.setImgUrl();


    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : ['暴雨默认','大风默认','雷电默认'];

                this.setState({data: dataQuery,imgData:[]}, () => {
                    this.setImgUrl();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (

            <div style={{ width: '100%', height: '100%' }}>
                <div className='swiper-container' ref={this.swiperRef} style={{ height: '100%' }}>
                    <div className='swiper-wrapper'>


                                    {
                                                this.state.imgData.map((items,index) => {
                                                    let childrenHtml = items.childrens.map((item, i) => {
                                                        return <div className={'car-item'} style={{
                                                            width: '25%',
                                                            boxSizing:'border-box',
                                                            margin:'0 5px',
                                                            height: '100%',
                                                            backgroundSize: '100% 100%',
                                                            backgroundImage: 'url(' + item.url + ')',

                                                        }}></div>
                                                    })
                                                    return <div  key={index} className={'swiper-slide'} style={{display:'flex'}}>
                                                        {childrenHtml}
                                                    </div>
                                                })
                                            }
                                    {/*<div style={{ backgroundImage: `url(${item.url})` }}></div>*/}



                    </div>

                </div>

            </div >
            // <Carousel  autoplaySpeed={5000} dots={false} autoplay>
            //     {
            //         this.state.imgData.map((items) => {
            //             let childrenHtml = items.childrens.map((item, i) => {
            //                 return <div className={'car-item'} style={{
            //                     width: '25%',
            //                     height: '68px',
            //                     backgroundSize: '100% 100%',
            //                     backgroundImage: 'url(' + item.url + ')',
            //                     float: 'left',
            //                 }}></div>
            //             })
            //             return <div>
            //                 {childrenHtml}
            //             </div>
            //         })
            //     }
            // </Carousel>
            // <div ref={node=>this.node=node} style={{width:100,height:100,backgroundSize:'100% 100%',backgroundImage:'url('+this.state.img+')'}}></div>
        )
    }

}