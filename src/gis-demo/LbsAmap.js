import React, { Component } from 'react';
import _ from 'lodash';

const FIXED_LAYER_PINTYPE = ['weixing'];

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapReady: false
        };
        this.featureLayers = {};
        this.id = `visdata_map_${new Date().valueOf()}`
    }

    componentDidMount() {

        const { center, zoom } = this.props;

        window.onLoad = () => {
            this.map = new AMap.Map(this.id, {
                // center: [112.045104, 31.93858], // 中心点坐标
                // center: [116.405285, 39.904989], // 北京中心点
                center: [center.x, center.y],
                mapStyle: 'amap://styles/' + 'darkblue',
                resizeEnable: true,
                viewMode: '3D',  // 使用3D视图
                zoom,   // 级别
                // zooms: [4, 18],   // 设置地图级别范围
            });

            this.map.on('complete', () => {
                console.info('地图加载完成！');

                // 设置行政区
                // this.map.setCity('樊城区');
                // 设置中心点坐标
                // this.map.setCenter([112.056434, 31.993337]);

                // this.map.setMapStyle('amap://styles/' + 'darkblue');

                const trafficLayer = new AMap.TileLayer.Traffic({
                    zIndex: 11
                });
                this.map.add(trafficLayer);
                // const roadNetLayer = new AMap.TileLayer.RoadNet({
                //     zIndex: 10
                // });
                // const layerGroup = new AMap.LayerGroup([trafficLayer, roadNetLayer]);
                // layerGroup.setMap(this.map);

                // 绑定交互事件
                this.map.on('click', this.mapClick);
                this.map.on('moveend', this.mapMoveend);
                this.map.on('zoomend', this.mapZoomend);

                this.setState({ mapReady: true });
            });
        }
        const url = 'https://webapi.amap.com/maps?v=1.4.15&key=b5f581c98c452239571933c8e405de90&callback=onLoad';
        const jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }

    componentWillUnmount() {
        if (this.map && this.map.destroy) {
            this.map.destroy();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {

            if (!_.isEqual(nextState.mapReady, this.state.mapReady) ||
                !_.isEqual(nextProps.mapCenter, this.props.mapCenter)
            ) {
                console.info('change center', nextProps.mapCenter, this.props.mapCenter);
                const { type, ...rest } = nextProps.mapCenter || {};

                if (type === 'road') {
                    this.showRoad(rest);
                }
            }
            if (!_.isEqual(nextState.mapReady, this.state.mapReady) ||
                !_.isEqual(nextProps.datas, this.props.datas)
            ) {
                if (nextState.mapReady) {
                    const { datas = {} } = nextProps;
                    console.log('map shouldComponentUpdate data:', nextProps.datas, this.featureLayers);

                    Object.keys(datas).forEach(pinType => {
                        const layerData = datas[pinType];
                        const { state = false } = layerData || {};
                        console.log('map shouldComponentUpdate layer', pinType, this.featureLayers[pinType]);

                        if (this.featureLayers[pinType]) {
                            if (state) {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {

                                }
                            } else {
                                if (Array.isArray(this.featureLayers[pinType])) {
                                    this.featureLayers[pinType].forEach(layer => {
                                        this.map.remove(layer);
                                    });
                                } else {
                                    this.map.remove(this.featureLayers[pinType]);
                                }
                                this.featureLayers[pinType] = null;
                            }
                        } else {
                            if (state) {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {
                                    this.generateFixedLayer(pinType);
                                }
                            }
                        }
                    });
                }
            }

            return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
        } catch (e) {
            console.error('map shouldComponentUpdate error:', e);
        }
    }

    // 创建固定图层
    generateFixedLayer = (pinType) => {
        // 卫星图
        let layer = null;

        if (pinType === 'weixing') {
            layer = new AMap.TileLayer.Satellite();
        }

        if (layer) {
            //批量添加图层
            // map.add([satelliteLayer, roadNetLayer]);
            this.map.add(layer);

            this.featureLayers[pinType] = layer;
        }
    }

    mapClick = (e) => {
        console.info('鼠标点击：', e);
    }

    mapMoveend = () => {
        this.map.getCity((info) => {
            console.info('移动结束当前所在行政区：', info);
        });
        console.info('移动结束当前中心点：', this.map.getCenter());
    }

    mapZoomend = () => {
        console.info('缩放结束当前级别：', this.map.getZoom());
    }

    showRoad = (data) => {

        if (data) {
            const { x, y ,icon} = data;

            if (this.map) {
                if (this.marker) {
                    this.map.remove(this.marker);
                    this.marker = null;
                }

                this.marker = new AMap.Marker({
                    position: [x, y],
                    icon: new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(78, 130),
                        // 图标的取图地址
                        image:icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                        // 图标所用图片大小
                        // imageSize: new AMap.Size(78, 130),
                        // 图标取图偏移量
                        // imageOffset: new AMap.Pixel(-9, -3)
                    })
                });
                this.marker.on('dblclick', this.showRoad.bind(this, undefined));

                this.center = this.map.getCenter();
                this.zoom = this.map.getZoom();

                this.map.panTo([x, y]);
                this.map.setZoom(18);
                this.map.add(this.marker);
            }
        } else {
            this.map.panTo(this.center);
            this.map.setZoom(this.zoom);
            this.map.remove(this.marker);
            this.marker = null;
        }
    }

    render() {
        return (
            <div id={this.id} style={{ width: '100%', height: '100%' }}></div>
        );
    }
}