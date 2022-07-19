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
let mapYear = '';
const mapLngLat = {
    "谷城县": {"x": 111.38529285782161, "y": 32.166956427202024, "z": 0},
    "宜城市": {"x": 112.44877541576764, "y": 31.7176382061526, "z": 0},
    "保康县": {"x": 111.16092276566292, "y": 31.776401294340083, "z": 0},
    "高新区": {x: 112.19334420005562, y: 32.09253394875392, z: 0},
    "老河口市": {"x": 111.68655959195245, "y": 32.46616328445361, "z": 0},
    "枣阳市": {"x": 112.76782149717631, "y": 32.198104134618355, "z": 0},
    "南漳县": {"x": 111.68003222153799, "y": 31.58943232207793, "z": 0},
    "东津新区": {"x": 112.24021615325992, "y": 32.02181975519594, "z": 0},
    "襄城区": {"x": 111.95223313320426, "y": 32.000596135553174, "z": 0},
    "襄州区": {"x": 112.16555655402475, "y": 32.30507102077833, "z": 0},
    "鱼梁洲经济开发区": {"x": 112.1925443346082, "y": 32.052664506372295, "z": 0},
    "樊城区": {x: 111.890352619864, y: 32.125870201093235, z: 0}
}
// const mapdata = [{
//     "count": 3907,
//     "wcl": 12,
//     "ycl": 47,
//     "name": "谷城县",
// }, {
//     "count": 2898,
//     "wcl": 20,
//     "ycl": 13,
//     "name": "宜城市",
// }, {
//
//     "count": 1292,
//     "wcl": 9,
//     "ycl": 18,
//     "name": "保康县",
//     "zb": "33%"
// }, {
//     "count": 12946,
//     "wcl": 50,
//     "ycl": 107,
//     "name": "高新区",
//     "zb": "32%"
// }, {
//     "count": 2914,
//     "wcl": 29,
//     "ycl": 24,
//     "name": "老河口市",
//     "zb": "55%"
// }, {
//     "count": 12892,
//     "wcl": 53,
//     "ycl": 176,
//     "name": "枣阳市",
//     "zb": "23%"
// }, {
//     "count": 2936,
//     "wcl": 91,
//     "ycl": 220,
//     "name": "南漳县",
//     "zb": "29%"
// }, {
//     "count": 2503,
//     "wcl": 10,
//     "ycl": 3,
//     "name": "东津新区",
//     "zb": "77%"
// }, {
//     "count": 22928,
//     "wcl": 50,
//     "ycl": 199,
//     "name": "襄城区",
//     "zb": "20%"
// }, {
//     "count": 7219,
//     "wcl": 121,
//     "ycl": 60,
//     "name": "襄州区",
//     "zb": "67%"
// }, {
//     "count": 246,
//     "wcl": 1,
//     "ycl": 3,
//     "name": "鱼梁洲经济开发区",
//     "zb": "25%"
// }, {
//     "count": 23838,
//     "wcl": 113,
//     "ycl": 145,
//     "name": "樊城区",
//     "zb": "44%"
// }]

const erd = elementResizeDetectorMaker();
const code = '4206'
// import zd from './img/zd.png';//重大http://10.203.2.88:8090/fastdfs/20220307/b381a51d01132c5afe1a3b624dc869e3.png
// import yc from './img/yc.png';//异常http://10.203.2.88:8090/fastdfs/20220307/26775b83142d84ddf47a4d134ef33241.png
// import gp from './img/gp.png';//高频http://10.203.2.88:8090/fastdfs/20220307/d2da00962b0384ddd989c73702657cf5.png
// import cs from './img/cs.png';//超时http://10.203.2.88:8090/fastdfs/20220307/06bfd081d55b264c1ccbb02f1ad23c3b.png
export default class Map_arcgis extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.resizeEvent = _.debounce(this.onresize.bind(this), 500);
        this.mapYear='';
        this.state = {
            mapReady: false,
            zoom: 8.6,
            center: {
                "x": 111.93605393844489,"y":31.864383392789897,'z':0
            },

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
            url: `http://10.203.0.37/citygis/citymap/WidgetPages/WidgetGIS.html?isFlyScene=false&maptype=3d&code=${code}&devicetype=lg&themeid=Gis`,
            onReady: function () {

                if (_that.bridge) {

                    const {zoom, center, data} = _that.state || {};

                    // if (!_.isEmpty(data)) {


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
                                    positon: {
                                        ...center
                                    },
                                    hasImg: false,
                                    'zoom': zoom,
                                }
                            }]);
                    }

                }

                _that.setState({mapReady: true}, function () {

                    if (Array.isArray(_that.state.data) && _that.state.data.length !== 0) {
                        _that.bridge.Invoke({
                            "ActionName": "ShowData",
                            "Parameters": {
                                "name": "map_line",
                                "type": "layer",
                                "isLocate": true,
                                "data": {
                                    "layers": {
                                        "name": "县市区",

                                    }
                                },
                                // "isHighlight": true,
                                "legendVisible": false,
                                "popupEnabled": false,
                                "renderer": {
                                    "type": "simple",
                                    "symbol": {
                                        "type": "line-3d",
                                        "symbolLayers": [
                                            {
                                                "type": "line",
                                                "size": 1.5,
                                                "material": {
                                                    "color": "#86CFF"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        });
                        _that.setMarker()
                    }
                })
                _that.addEventListenerFunc(_that.bridge);
            }
        });
    }

    createPopupTemplate_new = (nameField, label1, value1, label2, value2, extra) => {
        return `
            <div style='
                background-color: rgba(20, 55, 82, 0.8);
                border-radius: 5px;
                color: #fff;
                font-size: 36px;
                line-height: 1.5;
                min-width: 480px;
                max-width: 840px;
            '>
                <div style='
                    background: #0f85d5;
                    border-radius: 5px 5px 0 0;
                    color: #fff;
                    font-size: 40px;
                    font-weight: bolder;
                    line-height: 2;
                    padding: 16px 48px 16px 32px;
                    text-align: center;
                '>
                    {${nameField}}
                </div>
                <div style='padding: 0 32px'>
                    <table style='
                        border-collapse: separate;
                        border-spacing: 0px 32px;
                        max-width: 720px;
                        word-break: break-all;
                        word-wrap: break-word;
                    '>
                        <tbody>
                            <tr>
                                <td style='min-width: 200px; color: #00c2ff'>${label1}</td>
                                <td>{${value1}}</td>
                            </tr>
                            <tr>
                                <td style='min-width: 200px; color: #00c2ff'>${label2}</td>
                                <td>{${value2}}</td>
                            </tr>
                            ${extra ? extra : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    setMarker = () => {

        let {result = [], mapdata = []} = this.state.data[0];

        let mapData = mapdata.map(v => {
            v.x = mapLngLat[v.name].x;
            v.y = mapLngLat[v.name].y;
            v.countString = this.format(v.count)
            return v;
        })
        if (mapData.length > 0) {
            this.bridge.Invoke({
                "ActionName": "ShowData",
                "Parameters": {
                    "name": "map_area",
                    "data": {
                        "content": mapData,
                        "parsedata": "function(d){return d}",
                        "parsegeometry": "function(item){return {x:Number(item.x),y:Number(item.y)}}"
                    },
                    "legendVisible": false,
                    "popupEnabled": true,
                    'popupTemplate': {
                        'content': this.createPopupTemplate('ycl', 'wcl', 'zywc', 'zwwc')
                    },
                    "renderer": {
                        "type": "simple",
                        "label": "基础点",
                        "visualVariables": [],
                        "symbol": {
                            "type": "simple-marker",
                            "size": 0,
                            "color": "#94cfff",
                            "outline": {
                                "width": 0.1,
                                "color": "white"
                            },

                        }
                    },
                    "labels": [
                        {
                            "fields": [
                                "#.name",
                                "#.countString",
                            ],
                            "color": [
                                255, 255, 255, 1
                            ],
                            "size": 14,
                        }
                    ]
                }
            })

        }
        // console.log('我之心了', mapData)
        let render = [];

        result.map((u) => {

            if (u.exception) {
                u.icon = 'http://10.203.2.88:8090/fastdfs/20220307/26775b83142d84ddf47a4d134ef33241.png';
            } else if (u.highUseClassC) {
                u.icon = 'http://10.203.2.88:8090/fastdfs/20220307/d2da00962b0384ddd989c73702657cf5.png';
            } else if (u.isSlaOverTime) {
                u.icon = 'http://10.203.2.88:8090/fastdfs/20220307/06bfd081d55b264c1ccbb02f1ad23c3b.png';
            } else if (u.major) {
                u.icon = 'http://10.203.2.88:8090/fastdfs/20220307/b381a51d01132c5afe1a3b624dc869e3.png'
            } else {
                u.icon = 'http://10.203.2.88:8090/fastdfs/20220307/b381a51d01132c5afe1a3b624dc869e3.png'
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

        if (render.length > 0) {


            if (render[0]?.city && render[0].city.indexOf('高新') === -1 && render[0].city.indexOf('鱼梁洲') === -1) {
                this.mapYear = render[0].city + '网格';

                this.bridge.Invoke([{
                    'ActionName': 'goToPosition',
                    'Parameters': {
                        "legendVisible": false,
                        positon: {
                            x: render[0].lng || '',
                            y: render[0].lat || ''
                        },
                        hasImg: false,
                        'zoom': 16,
                    }
                },
                    {
                        'ActionName': 'ShowData',
                        'Parameters': {
                            'name': 'wangge',
                            'visible': true,
                            'type': 'layer',
                            'legendVisible': false,
                            'popupEnabled': false,
                            // 'popupTemplate': {
                            //     'content': this.createPopupTemplate_new('BGNAME', '区域名称', 'COMNAME', '街道名称', 'STREETNAME')
                            // },
                            'renderer': {
                                type: 'simple',
                                symbol: {
                                    type: 'simple-fill',
                                    color: [74, 232, 255, 0.4],
                                    style: 'solid',
                                    outline: {
                                        color: [74, 232, 255, 0.8],
                                        width: 1
                                    }
                                },
                            },
                            'data': {
                                'layers': [
                                    {
                                        // 'name': '老河口市网格'
                                        // 'name': '宜城市网格'
                                        // 'name': '谷城县网格'
                                        'name': render[0].city + '网格'

                                    }
                                ]
                            }
                        }

                    }])
            }

        } else {
            if (this.mapYear !== '') {
                let {center} = this.state;
                this.bridge.Invoke([
                    {
                        'ActionName': 'goToPosition',
                        'Parameters': {
                            "legendVisible": false,
                            positon: {
                               ...center
                            },
                            hasImg: false,
                            'zoom': 8,
                        }
                    }
                    ,{
                        'ActionName': 'ShowData',
                        'Parameters': {
                            'name': 'wangge',
                            'visible': false,
                            'type': 'layer',
                            'legendVisible': false,
                            'popupEnabled': false,
                            // 'popupTemplate': {
                            //     'content': this.createPopupTemplate_new('BGNAME', '区域名称', 'COMNAME', '街道名称', 'STREETNAME')
                            // },
                            'renderer': {
                                type: 'simple',
                                symbol: {
                                    type: 'simple-fill',
                                    color: [74, 232, 255, 0.4],
                                    style: 'solid',
                                    outline: {
                                        color: [74, 232, 255, 0.8],
                                        width: 1
                                    }
                                },
                            },
                            'data': {
                                'layers': [
                                    {
                                        // 'name': '老河口市网格'
                                        // 'name': '宜城市网格'
                                        // 'name': '谷城县网格'
                                        'name': this.mapYear
                                    }
                                ]
                            }
                        }

                    }])
                this.mapYear = '';

            }

        }
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
            switch (action) {
                case 'mapclick':
                    console.log(data)
                    if (data.map_layer) {

                        this.state.handlers.onClick && this.state.handlers.onClick({...data.map_layer[0]});
                    } else if (data.wangge) {
                        this.state.handlers.onClick && this.state.handlers.onClick({...data.wangge[0]});
                    }
                    break;
            }
        });
    }

    format = (num) => {
        let reg = /\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(reg, '$&,');
    }
    createPopupTemplate = (ywc, wwc, zywc, zwwc) => {

        return `  
                <div  style="width:240px;height:137px;color:#94cfff;background:url(http://10.203.2.88:8090/fastdfs/20220316/c9d66de288bc1b422bc271cd8a43260a.png) no-repeat center center/100% 100%;font-size:16px;font-weight: 600;">
                    <div style="width:100%;height:50%;">
                        <div style="display:flex;">
                            <span style="box-sizing:content-box;padding-left:10px;padding-top:16px;color:#fff;width:60%;text-align: right;background:url(http://10.203.2.88:8090/fastdfs/20220321/a8a7024336c55ed925aa849a72e402c6.jpg) no-repeat 26px 16px;height:24px;">历史已处理</span>
                            <span style="box-sizing:content-box;padding-top:16px;padding-left:13px;color:#3BFEB2;width:40%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{${this.format(zywc)}}</span>
                        </div>
                        <div style="font-size:14px;color:#59FFDE;font-weight: 400;">
                            <span style="box-sizing:content-box;padding-left:60px;">已处理</span>
                            <span>{${this.format(ywc)}}</span>
                        </div>
                    </div>
                    <div style="width:100%;height:50%;">
                        <div style="display:flex;">
                            <span style="box-sizing:content-box;padding-left:10px;padding-top:16px;color:#fff;width:60%;text-align: right;background:url(http://10.203.2.88:8090/fastdfs/20220321/c4757be50d5f61224fb858c5d68845e6.jpg) no-repeat 26px 16px;height:24px;">历史未处理</span>
                            <span style="box-sizing:content-box;padding-top:16px;padding-left:13px;color:#76B8FF;width:40%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{${this.format(zwwc)}}</span>
                        </div>
                        <div style="font-size:14px;color:#7AC3FF;font-weight: 400;">
                            <span  style="box-sizing:content-box;padding-left:60px;">未处理</span>
                            <span>{${this.format(wwc)}}</span>
                        </div>
                    </div>
                </div>`
    }

    //删除撒点
    removeApoint() {
        this.bridge.Invoke({
            "ActionName": "ShowData",
            "Parameters": {
                "name": "car_layer",
                "mode": "delete",

            },
            "legendVisible": false,
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

                this.setState({
                    data: dataQuery
                }, () => {
                    this.removeApoint();
                    this.setMarker();
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