import React, {Component} from 'react';
// import styles from './index.less'
import _, {isEqual} from "lodash";
import {default as Layers} from './layers';
import {getDataProvider} from '../../utils/DataUtils'

import POINTS from './points.json'

const pp = POINTS.features;
// map_arcgis_cd


import elementResizeDetectorMaker from 'element-resize-detector';


const CODEMAP = {"成都市": "5101","锦江区":"510104","青羊区":"510105","金牛区":"510106","武侯区":"510107","成华区":"510108","高新南区":"510109","天府新区":"510110","龙泉驿区":"510112","青白江区":"510113","新都区":"510114","温江区":"510115","双流区":"510116","郫都区":"510117","新津区":"510118","高新西区":"510119","金堂县":"510121","大邑县":"510129","蒲江县":"510131","都江堰市":"510181","彭州市":"510182","邛崃市":"510183","崇州市":"510184","简阳市":"510185","东部新区":"510186","高新区": "510187"}

const erd = elementResizeDetectorMaker();

import zd from './img/zd.png';//重大http://10.203.2.88:8090/fastdfs/20220307/b381a51d01132c5afe1a3b624dc869e3.png
import yc from './img/yc.png';//异常http://10.203.2.88:8090/fastdfs/20220307/26775b83142d84ddf47a4d134ef33241.png
import gp from './img/gp.png';//高频http://10.203.2.88:8090/fastdfs/20220307/d2da00962b0384ddd989c73702657cf5.png
import cs from './img/cs.png';//超时http://10.203.2.88:8090/fastdfs/20220307/06bfd081d55b264c1ccbb02f1ad23c3b.png
export default class Map_arcgis extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.resizeEvent = _.debounce(this.onresize.bind(this), 500);
        this.state = {
            mapReady: false,
            zoom: 8.6,
            center: {},

            data: dataQuery
            // data: dataQuery,
            // data: [
            //     {
            //         name: '襄阳市',
            //         lng: '112.121743',
            //         lat: '32.010161',
            //         result: [{
            //             "exception": false,
            //             "isSlaOverTime": false,
            //             "lng": "112.14624178309572",
            //             "classC": "游散摊贩",
            //             "questionTitle": "游散摊贩",
            //             "city": "樊城区",
            //             "classA": "城市管理",
            //             "highUseClassC": true,
            //             "jiedaodanwei-end": 754,
            //             "creatDate": "2021-12-27 17:09:56",
            //             "chuzhidanwei-end": 754,
            //             "major": false,
            //             "flowSource": "巡查上报",
            //             "flowNo": "20211227101902",
            //             "flowStatus": "107",
            //             "addr": "樊城区 解放路 29-5号/",
            //             "nodeId": "end",
            //             "lat": "32.03906815003916"
            //         }, {
            //             "exception": false,
            //             "isSlaOverTime": false,
            //             "lng": "112.128604",
            //             "classC": "游散摊贩",
            //             "questionTitle": "游散摊贩",
            //             "city": "樊城区",
            //             "classA": "城市管理",
            //             "highUseClassC": true,
            //             "jiedaodanwei-end": 724,
            //             "creatDate": "2021-12-27 15:16:11",
            //             "chuzhidanwei-end": 724,
            //             "major": false,
            //             "flowSource": "巡查上报",
            //             "flowNo": "20211227101799",
            //             "flowStatus": "107",
            //             "addr": "/中航大道东社区三组路口（王台路口）",
            //             "nodeId": "end",
            //             "lat": "32.015228"
            //         }, {
            //             "exception": false,
            //             "isSlaOverTime": false,
            //             "lng": "112.128604",
            //             "classC": "游散摊贩",
            //             "questionTitle": "游散摊贩",
            //             "city": "樊城区",
            //             "classA": "城市管理",
            //             "highUseClassC": true,
            //             "jiedaodanwei-end": 724,
            //             "creatDate": "2021-12-27 11:22:26",
            //             "chuzhidanwei-end": 724,
            //             "major": false,
            //             "flowSource": "巡查上报",
            //             "flowNo": "20211227101688",
            //             "flowStatus": "107",
            //             "addr": "/中原西路航天福汇园小区门前",
            //             "nodeId": "end",
            //             "lat": "32.015228"
            //         }, {
            //             "exception": false,
            //             "isSlaOverTime": false,
            //             "lng": "112.0310299353034",
            //             "classC": "游散摊贩",
            //             "questionTitle": "游散摊贩",
            //             "city": "襄城区",
            //             "classA": "城市管理",
            //             "highUseClassC": false,
            //             "jiedaodanwei-end": 1037,
            //             "creatDate": "2021-12-27 10:22:01",
            //             "chuzhidanwei-end": 1037,
            //             "major": false,
            //             "flowSource": "巡查上报",
            //             "flowNo": "20211227101604",
            //             "flowStatus": "107",
            //             "addr": "襄城区 S303 /古隆中游客中心对面公交站台",
            //             "nodeId": "end",
            //             "lat": "32.015370442704274"
            //         }]
            //     }
            // ]
        };
        this.id = `visdata_map_${new Date().valueOf()}`;
    }

    onresize() {
        console.info('resize');
        const dom = document.getElementById('panel_canvas');
        let scale = 1;

        if (dom && dom.style && dom.style.transform) {
            scale = dom.style.transform.match(/scale\((.*?)\)/g)[0];
            if (scale) {
                scale = scale.replace('scale(', '').replace(')', '');
                scale = 1 / parseFloat(scale) / 1.5;

                if (this.state.scale !== scale) {
                    this.setState({scale});
                }
            }
        }
    }

    getQueryParams = () => {
      let area = '';
      const query = window.location.href.substr(window.location.href.indexOf('?') + 1);
      if (query) {
        const vars = decodeURIComponent(query).split('&');
        for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          if (pair[0] == 'area') { area = pair[1]; }
        }
      }
      return {area}
    }

    componentWillUnmount() {
      if (this.bridge && this.bridge.Invoke) {
          this.bridge.Invoke({
              'ActionName': 'Clear'
          });
          this.bridge.removeEventListener(this.handleMapClick);
          this.bridge = null;
      }
  }

    componentDidMount() {
        const root = document.getElementById('root');
        if (root) {
            erd.listenTo(root, (element) => {
                this.resizeEvent();
            });
        }

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

        const queryParams = this.getQueryParams();
        const area = queryParams['area'] || '成都市';
        const code = CODEMAP[area] || '5101';


        const _that = this;
        this.bridge = new CityGis.Bridge({
            id: this.id,
            url: `http://10.1.17.23/citygis/areamap/WidgetPages/WidgetGIS.html?maptype=3d&code=${code}&devicetype=lg&themeid=Gis&isFlyScene=false`,
            onReady: function () {

                if (_that.bridge) {
                    const {zoom, center, data} = _that.state || {};
                    if (zoom) {
                        _that.bridge.Invoke([
                            {
                                'ActionName': 'goToPosition',
                                'Parameters': {
                                    "legendVisible": false,
                                    // positon: {
                                    //     // ...center
                                    // },
                                    hasImg: false,
                                    'zoom': zoom,
                                }
                            }]);
                    }

                    if (area === '成都市') {
                      _that.bridge.Invoke(Layers.区县边界);
                    } else {
                      _that.bridge.Invoke(Layers.乡镇街道)
                    }

                }

                // _that.setState({mapReady: true}, function () {

                //     if (Array.isArray(_that.state.data) && _that.state.data.length !== 0) {
                //         _that.setMarker()
                //     }
                    

                // })
                _that.spreadMarksByType('major');
                _that.addEventListenerFunc(_that.bridge);
            }
        });
    }

    setMarker = list => {

        let {result = []} = this.state.data[0];

        let render = [];
        if (list.length === 0) return;
        // result.map((u) => {

        //     if (u.exception) {
        //         u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/aa23f92aaee7703ddd75c908e68a7bea.png';
        //     } else if (u.highUseClassC) {//高频
        //         u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/602387c193ecd7f46c188a81ac1714cb.png';
        //     } else if (u.isSlaOverTime) {
        //         u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/d4228f2c818ecfc5fdf274f6ece16cef.png';
        //     } else if (u.major) {//重大
        //         u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/a93a4aa6c6410fc9ac7e3403843d225d.png'
        //     }
        //     if (u.icon && u.lat && u.lng) {
        //         render.push(u);
        //     }

        // })

        render = list.map(el => { return {...el, icon: 'http://10.1.17.21:8090/fastdfs/20220317/aa23f92aaee7703ddd75c908e68a7bea.png'} })

      console.log("render: ", render)
        this.bridge.Invoke({
            "ActionName": "ShowData",
            "Parameters": {
                "name": "map_layer",
                "data": {
                    "content": render,
                    "parsedata": "function(d){return d}",
                    "parsegeometry": "function(item){return {x:Number(item.lng),y:Number(item.lat)}}"
                },
                "legendVisible": false,
                "popupEnabled": false,
                'renderer': {
                    type: 'unique-value',
                    field: 'icon',
                    uniqueValueInfos: render.map((item) => ({
                        value: item.icon,
                        symbol: this.defaultMarks(item.icon)
                      })
                    )
                }
            }
        })
    }

    defaultMarks(url) {
      return {
          type: 'picture-marker',
          url: url || '',
          width: '45px',
          height: '45px',
      };
    }

    addEventListenerFunc = (bridge) => {
      bridge.addEventListener(this.handleMapClick);
    }

    handleMapClick = arg => {
      const {action, data} = arg;
      switch (action) {
        case 'mapclick':
          if (data.map_layer) {
            this.state.handlers.onClick && this.state.handlers.onClick({...data.map_layer[0]});
          }
        break;
      }
    }

    //删除撒点
    removeApoint() {
      this.bridge.Invoke({
        "ActionName": "ShowData",
        "Parameters": {
          "name": "map_layer",
          "mode": "delete"
        }
      })
    }

    componentWillUnmount() {
      if (this.bridge && this.bridge.Invoke) {
        this.bridge.Invoke({
          'ActionName': 'Clear'
        });
      }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   const {dataProvider, style} = nextProps;
    //   console.info('bubble shouldComponentUpdate', nextProps, this.props);
    //   if (!isEqual(dataProvider, this.props.dataProvider)) {
    //       if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
    //           // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
    //       } else {
    //           const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

    //           this.setState({data: dataQuery}, () => {
    //               this.removeApoint();
    //               if (Array.isArray(this.state.data[0]?.result) && this.state.data[0]?.result.length !== 0) {
    //                   this.setMarker();
    //               }

    //           });
    //       }
    //   }
    //   return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);

    // }
    

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const dataProvider = getDataProvider(nextProps);
      const dataSet = dataProvider[0] || {};
      const {type = ''} = dataSet;
      if (type) this.spreadMarksByType(type);
    }
  }

  spreadMarksByType = type => {
    // 根据不同类型撒点
    switch (type) {
     case 'exception': // 异常
       
     break;
     case 'highUseClassC': // 高频
       
     break;
     case 'isSlaOverTime': // 超时
       
     break;
     case 'major': // 重大
      const dd = pp.map(el => { return {lat: el?.geometry.x, lng: el?.geometry.y} });
      // this.setState({data: dd})
      this.setMarker(dd);
     break;
   
     default:
       break;
   }
  }

  render() {
      return (
        <iframe
          id={this.id}
          className="mapiframe"
          frameBorder="no"
          scrolling="no"
          allowtransparency="true">
        </iframe>
      )
  }
}
