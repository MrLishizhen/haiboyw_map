import {Component} from 'react';
// import styles from './index.less'
import _, {isEqual} from "lodash";

import elementResizeDetectorMaker from 'element-resize-detector';
/*
开启县市区
* {
    "ActionName": "LayerVisible",
    "Parameters": [
      {
        "name": "县市区",
        "visible": true
      }
    ]
  }
 开启白模
  {
  "ActionName": "themeLayer",
  "Parameters": {
    "name": "建筑白模",
    "visible": true,
    "popupEnabled": true
  }
}
*
*
* */

const erd = elementResizeDetectorMaker();
const code = '5101'
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


        const _that = this;
        this.bridge = new CityGis.Bridge({
            id: this.id,
            url: `http://10.1.17.23/citygis/areamap/WidgetPages/WidgetGIS.html?maptype=3d&code=${code}&devicetype=lg&themeid=Gis&isflyscene=false`,
            onReady: function () {

                if (_that.bridge) {

                    const {zoom, center, data} = _that.state || {};

                    // if (!_.isEmpty(data)) {

                    //     _that.bridge.Invoke({
                    //         'ActionName': 'padding',
                    //         "Parameters": {
                    //             "isUI": false,
                    //             "left": 0,
                    //             "top": 0,
                    //             "right": 0,
                    //             "bottom": 0
                    //         }
                    //     });
                    // }
                    // if(true){
                    //     _that.bridge.Invoke();
                    // }
                    if (zoom) {
                        _that.bridge.Invoke([
                            //     {
                            //     "ActionName": "LayerVisible",
                            //     "Parameters": [
                            //         {
                            //             "name": "县市区",
                            //             "visible": true,
                            //             "legendVisible": false,
                            //             popupEnabled: false
                            //         }
                            //     ],
                            //
                            // },
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

                }

                _that.setState({mapReady: true}, function () {

                    if (Array.isArray(_that.state.data) && _that.state.data.length !== 0) {
                        _that.setMarker()
                    }
                })
                _that.addEventListenerFunc(_that.bridge);
            }
        });
    }

    setMarker = () => {

        let {result = []} = this.state.data[0];

        // let mapData = mapdata.map(v=>{
        //     v.x = mapLngLat[v.name].x;
        //     v.y = mapLngLat[v.name].y;
        //     return v;
        // })

        let render = [];
        if (result.length === 0) return;
        result.map((u) => {

            if (u.exception) {
                u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/aa23f92aaee7703ddd75c908e68a7bea.png';
            } else if (u.highUseClassC) {//高频
                u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/602387c193ecd7f46c188a81ac1714cb.png';
            } else if (u.isSlaOverTime) {
                u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/d4228f2c818ecfc5fdf274f6ece16cef.png';
            } else if (u.major) {//重大
                u.icon = 'http://10.1.17.21:8090/fastdfs/20220317/a93a4aa6c6410fc9ac7e3403843d225d.png'
            }
            if (u.icon && u.lat && u.lng) {
                render.push(u);
            }

        })


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
                            symbol: this.defaultMarks(item.icon),
                        })
                    ),

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
        bridge.addEventListener((arg) => {
            const {action, data} = arg;
            console.log({action, data})
            switch (action) {
                case 'mapclick':
                    console.log(data)
                    if (data.map_layer) {

                        this.state.handlers.onClick && this.state.handlers.onClick({...data.map_layer[0]});
                    }
                    break;
            }
        });
    }

    //删除撒点
    removeApoint() {
        this.bridge.Invoke({
            "ActionName": "ShowData",
            "Parameters": {
                "name": "car_layer",
                "mode": "delete",
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


    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {
                    this.removeApoint();
                    if (Array.isArray(this.state.data[0]?.result) && this.state.data[0]?.result.length !== 0) {
                        this.setMarker();
                    }

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);

    }

    render() {
        return (
            <iframe

                id={this.id}
                className="mapiframe"
                frameBorder="no"
                scrolling="no"
                allowTransparency="true">
            </iframe>
        )
    }
}
