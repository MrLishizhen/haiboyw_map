import React, { Component } from 'react';
import _ from 'lodash';
import shexiangtou from './images/shexiangtou.png';

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
        const url = 'https://webapi.amap.com/maps?v=1.4.15&key=b5f581c98c452239571933c8e405de90&callback=onLoad&plugin=AMap.MarkerClusterer';
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
                        console.log("this.featureLayers: ", this.featureLayers)
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
                                    if (pinType === 'shipin') {
                                      //  删除视频撒点
                                      console.log("heeee: remove")
                                      this.map.remove(this.markers);
                                      this.markers = [];
                                      this.cluster.setMap(null);
                                      this.cluster = null;
                                    }
                                    this.map.remove(this.featureLayers[pinType]);
                                }
                                this.featureLayers[pinType] = null;
                            }
                        } else {
                            if (state) {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {
                                    this.generateFixedLayer(pinType);
                                } else {
                                  // 做其他事情
                                  this.generateOtherLayer(pinType);
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

    generateOtherLayer = pinType => {
      if (pinType === 'shipin') {
        this.showShipin();
        this.featureLayers[pinType] = {};
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

    showShipin = () => {
      const data = this.props.shipindata || [];
      const onVideoClick = this.props.onVideoClick;
      var count = data.length;
      var _renderClusterMarker = function (context) {
          var factor = Math.pow(context.count / count, 1 / 18);
          var div = document.createElement('div');
          var Hue = 180 - factor * 180;
          // var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
          var bgColor = '#71e550';
          var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
          var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
          var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
          div.style.backgroundColor = bgColor;
          var size = Math.round(40 + Math.pow(context.count / count, 1 / 5) * 20);
          div.style.width = div.style.height = size + 'px';
          // div.style.border = 'solid 1px ' + borderColor;
          div.style.borderRadius = size / 2 + 'px';
          div.style.boxShadow = '0 0 1px ' + shadowColor;
          div.innerHTML = context.count;
          div.style.lineHeight = size + 'px';
          div.style.color = fontColor;
          div.style.fontSize = '28px';
          div.style.textAlign = 'center';
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
          context.marker.setContent(div)
      };
      

      this.markers = [];
      for (var i = 0; i < data.length; i += 1) {
        const el = data[i];
        const mark = new AMap.Marker({
          icon: "",
          extData: {id: i, ...el},
          position: [el.longitude, el.latitude],
          content: `<div style="background: url(${shexiangtou}) no-repeat; color: white; width: 80px; height: 80px"></div>`,
          label: {content: `<div style = 'font-size: 25px; padding: 10px'>${el.deviceName}</div>`, direction: "bottom"},
          offset: new AMap.Pixel(-15, -15)
      })
        this.markers.push(mark);
        mark.on('click', (e) => {
          const extData = e.target.getExtData() || {};
          onVideoClick && onVideoClick({...extData}) 
        })
      }

      this.cluster = new AMap.MarkerClusterer(this.map, this.markers, {
          gridSize: 160, 
          renderClusterMarker: _renderClusterMarker,
          zoomOnClick: false
        });
              
      this.cluster.on('click', (e, markers) => {
        if (this.map.getZoom() === 18) {
          const currentMarkers = e.markers || [];
          this.openInfo([e.lnglat.lng, e.lnglat.lat], currentMarkers);
        } else {
        }
      })

    }

    openInfo = (pos = [], markers = []) => {
      //构建信息窗体中显示的内容
      const container = document.createElement("div");
      container.style = 'background: #153354; width: 200px; max-height: 130px;height: 130px; border:1px solid #7e7e7e; border-radius: 5px;position: relative; padding: 2px 5px';

      var closeX = document.createElement("div");
      closeX.style = 'width: 20px; height: 20px; border-radius: 50%; background: gray; text-align: center;line-height: 18px; color: white;cursor: pointer;position: absolute;right:5px';
      closeX.innerHTML = 'x'
      closeX.onclick = () => {
        this.map.clearInfoWindow();
      };
      

      var body = document.createElement("div");
      container.appendChild(body);
      body.style = 'max-height: 120px;width: 100%;height:100%;overflow-x: hidden;overflow-x: scroll;position: absolute;top:8px';

      const markersinfo = markers.map((el, i) => {
        const extData = el.getExtData();
        const {deviceName = ''} = extData;
        const child = document.createElement("div");
        child.style = 'padding:5px; color: white; cursor: pointer; display:flex';
        child.onclick = () => { this.clickPoupDeivce(extData) };

        const seriesIndex =  document.createElement("div");
        seriesIndex.style = 'width: 20px; height: 20px; background: #1d9ccd; border-radius: 50%; text-align:center; line-height:20px; margin-right:5px';
        seriesIndex.innerHTML = i + 1;
        child.appendChild(seriesIndex);

        const text = document.createElement("div");
        text.innerHTML = deviceName;
        child.appendChild(text)

        body.appendChild(child);
        // return `<div
        //   style = ><div style = 'width: 20px; height: 20px; background: #1d9ccd; border-radius: 50%; text-align:center; line-height:20px; margin-right:5px'>${i + 1}</div>${deviceName}</div>`;
      })

      container.appendChild(closeX);


      this.infoWindow = new AMap.InfoWindow({
        isCustom: true,
        offset: new AMap.Pixel(0, -25),
        content: container  //使用默认信息窗体框样式，显示信息内容
      });

      this.infoWindow.open(this.map, pos);

    }

    clickPoupDeivce = data => {
      const onVideoClick = this.props.onVideoClick;
      onVideoClick && onVideoClick({...data}) 
    }

    showRoad = (data) => {

        if (data) {
            const { x, y ,icon,iconWidth,iconHeight} = data;

            if (this.map) {
                if (this.marker) {
                    this.map.remove(this.marker);
                    this.marker = null;
                }

                this.marker = new AMap.Marker({
                    position: [x, y],
                    icon: new AMap.Icon({
                        // 图标尺寸
                        size: new AMap.Size(iconWidth||54,iconHeight||91),
                        // 图标的取图地址
                        image:icon || 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
                        // 图标所用图片大小
                        imageSize: new AMap.Size(iconWidth||54,iconHeight||91),
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