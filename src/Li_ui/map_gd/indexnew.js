import React, {Component} from "react";
import styles from './index.less'
import {isEqual} from "lodash";

import zd from './img/zd.png';//重大
import yc from './img/yc.png';//异常
import gp from './img/gp.png';//高频
import cs from './img/cs.png';//超时

import zs from './img/zs.png';//遮罩

export default class Map_gd extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        this.id = `visdata_map_${new Date().valueOf()}`
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : []

        this.state = {
            data: dataQuery,
            handlers: {},
            markers:[],//点位图标

            // data: [
            //     {
            //         name: '襄阳市',
            //         lng: '112.121743',
            //         lat: '32.010161',
            //         result:[{"exception":false,"isSlaOverTime":false,"lng":"112.14624178309572","classC":"游散摊贩","questionTitle":"游散摊贩","city":"樊城区","classA":"城市管理","highUseClassC":true,"jiedaodanwei-end":754,"creatDate":"2021-12-27 17:09:56","chuzhidanwei-end":754,"major":false,"flowSource":"巡查上报","flowNo":"20211227101902","flowStatus":"107","addr":"樊城区 解放路 29-5号/","nodeId":"end","lat":"32.03906815003916"},{"exception":false,"isSlaOverTime":false,"lng":"112.128604","classC":"游散摊贩","questionTitle":"游散摊贩","city":"樊城区","classA":"城市管理","highUseClassC":true,"jiedaodanwei-end":724,"creatDate":"2021-12-27 15:16:11","chuzhidanwei-end":724,"major":false,"flowSource":"巡查上报","flowNo":"20211227101799","flowStatus":"107","addr":"/中航大道东社区三组路口（王台路口）","nodeId":"end","lat":"32.015228"},{"exception":false,"isSlaOverTime":false,"lng":"112.128604","classC":"游散摊贩","questionTitle":"游散摊贩","city":"樊城区","classA":"城市管理","highUseClassC":true,"jiedaodanwei-end":724,"creatDate":"2021-12-27 11:22:26","chuzhidanwei-end":724,"major":false,"flowSource":"巡查上报","flowNo":"20211227101688","flowStatus":"107","addr":"/中原西路航天福汇园小区门前","nodeId":"end","lat":"32.015228"},{"exception":false,"isSlaOverTime":false,"lng":"112.0310299353034","classC":"游散摊贩","questionTitle":"游散摊贩","city":"襄城区","classA":"城市管理","highUseClassC":true,"jiedaodanwei-end":1037,"creatDate":"2021-12-27 10:22:01","chuzhidanwei-end":1037,"major":false,"flowSource":"巡查上报","flowNo":"20211227101604","flowStatus":"107","addr":"襄城区 S303 /古隆中游客中心对面公交站台","nodeId":"end","lat":"32.015370442704274"}]
            //     }
            // ]
        }
    }

    setMap = (that) => {
        let data = {};
        if(Array.isArray(that.state.data)){
            data = that.state.data[0]||{};
        }

        let markerData = []
        if(data){
            markerData  = data?.result||[];
        }

        that.map = new AMap.Map(this.id, {
            resizeEnable: true,
            center: [data?.lng || '112.121743', data?.lat || '32.010161'],
            showLabel: false,
            mapStyle: "amap://styles/darkblue",
            zoom: data?.zoom || 10,
            // viewMode: '3D',
        });


        that.map.on("complete", function () {
            // var bounds = that.map.getBounds();
            // that.map.setLimitBounds(bounds);
            log.success("地图加载完成！");

            if (Array.isArray(markerData)&&markerData.length>0&&markerData[0] !== '') {

                that.setMarker(markerData, that)
            }


            // that.ImageLayer = new AMap.ImageLayer({
            //     url: zs,
            //     zIndex: 111,
            //     bounds: new AMap.Bounds(that.map.getBounds().getSouthWest( ), that.map.getBounds().getNorthEast( )),
            // });
            // that.map.add(that.ImageLayer);




            AMap.plugin('AMap.DistrictSearch', () => {
                this.districtSearch = new AMap.DistrictSearch({
                    // 关键字对应的行政区级别，共有5种级别
                    level: 'province',
                    //  是否显示下级行政区级数，1表示返回下一级行政区
                    subdistrict: 1,
                    // 返回行政区边界坐标点
                    showbiz: false,
                    extensions: 'all',
                })

                // 搜索所有省/直辖市信息
                this.districtSearch.search(data.name || '襄阳市', (status, result) => {
                    // 查询成功时，result即为对应的行政区信息
                    that.handlePolygon(result, that);
                    let data = result.districtList[0].districtList;

                    for (let i = 0; i < data.length; i++) {
                        console.log(data[i])
                        let text = new AMap.Text({
                            text:data[i].name,
                            anchor:'center', // 设置文本标记锚点
                            draggable:false,
                            cursor:'pointer',
                            // angle:10,
                            // zIndex:120,
                            style:{
                                // 'padding': '.75rem 1.25rem',
                                // 'margin-bottom': '1rem',
                                // 'border-radius': '.25rem',
                                'background-color': 'rgba(0,0,0,0)',
                                // 'width': '15rem',
                                'border-width': 0,
                                // 'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                                'text-align': 'center',
                                'font-size': '20px',
                                'color': '#fff'
                            },
                            position: [data[i].center.lng,data[i].center.lat]
                        });

                        text.setMap(that.map);
                        this.districtSearch.search(data[i].name, (status, results) => {

                            that.handlePolygon(results, that);
                        })
                    }

                })
            })


            // 创建点覆盖物

        });


    }
    //生成点位
    setMarker = (result, that) => {

        if(that.state.markers.length>0){
            let markers = that.state.markers;
            for(let i = 0;i<markers.length;i++){
                that.map.remove(markers[i]);
            }
        }

        let markers = [];
        if(that.map&&Array.isArray(result)&&result.length>0){
            for (let i = 0; i < result.length; i++) {
                if (result[i].exception) {
                    result[i].icon = yc;
                } else if (result[i].highUseClassC) {
                    result[i].icon = gp;
                } else if (result[i].isSlaOverTime) {
                    result[i].icon = cs;
                } else if (result[i].major) {
                    result[i].icon = zd;
                }
                console.log(result[i].icon)
                let marker = new AMap.Marker({
                    position: new AMap.LngLat(result[i].lng, result[i].lat),
                    icon: new AMap.Icon({
                        // 图标尺寸
                        // achor: 'bottom-center',
                        size: new AMap.Size(88, 88),
                        // 图标的取图地址
                        image: result[i].icon || '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(88, 88),
                        // 图标取图偏移量
                        // imageOffset: new AMap.Pixel(-44, -88),
                    }),
                    anchor:'center',
                    zIndex: 100,
                    // icon: result[i].icon||'//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                    offset: new AMap.Pixel(0,0),
                    title: result[i].questionTitle,
                });
                marker.setExtData({result: result[i]})

                marker.on('click', (e) => {

                    const extData = e.target.getExtData() || {};
                    that.state.handlers.onClick && that.state.handlers.onClick({...extData});
                })
                marker.setMap(that.map);
                markers.push(marker);
            }

            that.setState({markers:[]},()=>{
                that.setState({markers:markers});
            });

        }

    }
    handlePolygon = (result, that) => {
        let name = result.districtList[0].name;
        let bounds = result.districtList[0].boundaries;

        if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                let polygon = new AMap.Polygon({
                    zIndex: 110,
                    map: that.map, // 指定地图对象
                    strokeWeight: name === '襄阳市' ? 8 : 1, // 轮廓线宽度
                    path: bounds[i], //轮廓线的节点坐标数组
                    fillOpacity: 1, //透明度
                    fillColor: name === '襄阳市' ? "" : '#102645', //填充颜色
                    strokeColor: name === '襄阳市' ? '#3c70b9' : '#94C4FB', //线条颜色
                })

                polygon.on('click', (e) => {
                    // 点击绘制的区域时执行其他交互

                })
            }
            // 地图自适应
            // this.map.setFitView()
        }
    }

    componentWillUnmount() {
        if (this.map && this.map.destroy) {
            //地图的销毁
            this.map.destroy();
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

        let that = this;
        window.onLoad = () => {
            this.setMap(that);
        }
        const url = 'https://webapi.amap.com/maps?v=2.0&key=b5f581c98c452239571933c8e405de90&callback=onLoad';
        const jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;

        const jsurl = "https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"
        const jsNode = document.createElement('script');
        jsNode.charset = 'utf-8';
        jsNode.src = jsurl;
        document.head.appendChild(jsapi);
        document.head.appendChild(jsNode)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [80];

                this.setState({data: dataQuery}, () => {

                        setTimeout(()=>{
                            if (this.map&&this.state.data[0]) {
                                this.setMarker(this.state.data[0]?.result || [], this);
                            }
                        },600)
                    // this.map.destroy();
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    render() {
        return (
            <div id={this.id} className={styles.container}
                 style={{width: this.state.data[0]?.width || '100%', height: this.state.data[0]?.height || '100%'}}>

                <div className={'map-mask'}></div>
                {/*<div className={'map-coent-img'}></div>*/}
            </div>
        )
    }
}