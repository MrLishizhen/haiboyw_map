import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import Video from './component/Video';
import defaultIcon from './images/vecPinWhite.png';

const CENTER_CONFIG = {
    '4206': { top: 140, left: 400, zoom: 2 },
    // '420602': { top: 140, left: 300 }
    // '420606': { zoom: 19, center: { x: 112.1361064809474, y: 32.045642929733944 } }
};
const FIXED_LAYER_PINTYPE = ['weixing', 'shequ', 'wangge', 'shipin'];
const CODE_ITEM = {
    '420602': {
        'wangge': {
            'name': '襄城区网格'
        },
        'shequ': {
            'name': '襄城区社区_边界'
        },
        'shipin': {
            'name': '城市之眼'
        }
    },
    '420606': {
        'wangge': {
            'name': '樊城区网格'
        },
        'shequ': {
            'name': '樊城区社区_边界'
        },
        'shipin': {
            'name': '城市之眼'
        }
    }
}

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapReady: false
        };
        this.featureLayers = {};
        this.debounceShowVideo = _.debounce(this.showVideo.bind(this), 1500);
        this.id = `visdata_map_${new Date().valueOf()}`;
    }

    componentDidMount() {
        const { code, zoom: pzoom, center: pcenter = {} } = this.props;
        // const script = document.createElement('script');
        console.log(this.props);
        // script.type = 'text/javascript';
        // script.src = 'http://10.203.0.37/citygis/citymap/CityGis.Bridge.js';
        // script.onload = (e) => {
        try {
            // console.info('script load success.', e);

            this.bridge = new CityGis.Bridge({
                id: this.id,
                url: `http://10.203.0.37/citygis/citymap/WidgetPages/WidgetGIS.html?isFlyScene=false&maptype=3d&code=${code}&devicetype=lg&themeid=Gis`,
                onReady: () => {
                    console.info('map init success.', this.bridge);

                    if (this.bridge) {
                        console.info('change center', code, CENTER_CONFIG[code]);
                        const { zoom, center = { ...pcenter }, ...extra } = CENTER_CONFIG[code] || {};

                        if (!_.isEmpty(extra)) {
                            this.bridge.Invoke({
                                'ActionName': 'padding',
                                'Parameters': {
                                    'isUI': false,
                                    ...extra
                                }
                            });
                        }

                        if (zoom || pzoom) {
                            this.bridge.Invoke({
                                'ActionName': 'goToPosition',
                                'Parameters': {
                                    'positon': {
                                        ...center
                                    },
                                    'hasImg': false,
                                    'zoom': pzoom || zoom
                                }
                            });
                        }
                    }
                    this.setState({ mapReady: true })
                    this.addEventListener(this.bridge);
                }
            });
        } catch (e) {
            console.error(e);
        }
        // }
        // document.head.appendChild(script);
    }

    componentWillUnmount() {
        if (this.bridge && this.bridge.Invoke) {
            this.bridge.Invoke({
                'ActionName': 'Clear'
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!_.isEqual(nextState.mapReady, this.state.mapReady) ||
                !_.isEqual(nextProps.datas, this.props.datas)
            ) {
                if (nextState.mapReady) {
                    const { datas: oldDt = {} } = this.props;
                    const { datas = {} } = nextProps;
                    console.log('map shouldComponentUpdate data:', nextProps.datas);

                    Object.keys(datas).forEach(pinType => {
                        const layerData = datas[pinType];
                        const { state = false } = layerData || {};
                        console.log('map shouldComponentUpdate layer', pinType, this.featureLayers[pinType]);

                        if (this.featureLayers[pinType]) {
                            if (state) {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {
                                    this.generateFixedLayer(pinType, true);
                                } else {
                                    const result = this.generateGraphLayer(datas[pinType], true);
                                }
                            } else {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {
                                    this.generateFixedLayer(pinType, false);
                                } else {
                                    this.generateGraphLayer(datas[pinType], false);
                                }
                            }
                        } else {
                            if (state) {
                                if (FIXED_LAYER_PINTYPE.includes(pinType)) {
                                    this.generateFixedLayer(pinType, true);
                                } else {
                                    const result = this.generateGraphLayer(datas[pinType], true);
                                    this.featureLayers[pinType] = result;
                                }
                            } else {
                                this.generateFixedLayer(pinType, false);
                            }
                        }

                        // if (state) {
                        //     if (this.featureLayers[pinType]) {
                        //         // update
                        //         const result = this.generateGraphLayer(datas[pinType], true);
                        //     } else {
                        //         // add
                        //         const result = this.generateGraphLayer(datas[pinType], true);
                        //         this.featureLayers[pinType] = result;
                        //     }
                        // } else {
                        //     if (this.featureLayers[pinType]) {
                        //         // del
                        //         this.generateGraphLayer(datas[pinType], false);
                        //     }
                        // }
                    });
                }
            }

            return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
        } catch (e) {
            console.error('map shouldComponentUpdate error:', e);
        }
    }

    generateFixedLayer = (pinType, visible) => {
        const { code } = this.props;
        let param = null;
        console.info(CODE_ITEM[code][pinType]);

        // 卫星图
        if (pinType === 'weixing') {
            if (visible) {
                param = {
                    'ActionName': 'ChangeMapTheme',
                    'Parameters': {
                        'mapthemeid': 'yaogantheme'
                    }
                };
            } else {
                param = {
                    'ActionName': 'ChangeMapTheme',
                    'Parameters': {
                        'mapthemeid': 'basetheme'
                    }
                };
            }
        }
        // 网格边界
        else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'wangge') {
            param = {
                'ActionName': 'ShowData',
                'Parameters': {
                    'name': pinType,
                    visible,
                    'type': 'layer',
                    'legendVisible': false,
                    'popupEnabled': true,
                    'popupTemplate': {
                        'content': this.createPopupTemplate('BGNAME', '区域名称', 'COMNAME', '街道名称', 'STREETNAME')
                    },
                    'renderer': {
                        type: 'simple',
                        symbol: {
                            type: 'simple-fill',
                            color: [0, 0, 0, 0],
                            style: 'solid',
                            outline: {
                                color: [200, 200, 255, 1],
                                width: 4
                            }
                        },
                    },
                    'data': {
                        'layers': [
                            {
                                'name': CODE_ITEM[code][pinType].name
                            }
                        ]
                    }
                }
            }
        }
        // 社区边界
        else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'shequ') {
            param = {
                'ActionName': 'ShowData',
                'Parameters': {
                    'name': pinType,
                    visible,
                    'type': 'layer',
                    'legendVisible': false,
                    'popupEnabled': true,
                    // 'popupTemplate': {
                    //     'content': this.createPopupTemplate('BGNAME', '社区名称', 'COMNAME', '街道名称', 'STREETNAME')
                    // },
                    // 'renderer': {
                    //     type: 'simple',
                    //     symbol: {
                    //         type: 'simple-fill',
                    //         color: [0, 0, 0, 0],
                    //         style: 'solid',
                    //         outline: {
                    //             color: [200, 255, 200, 1],
                    //             width: 3
                    //         }
                    //     },
                    // },
                    'data': {
                        'layers': [
                            {
                                'name': CODE_ITEM[code][pinType].name
                            }
                        ]
                    }
                }
            }
        }
        // 视频探头
        else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'shipin') {
            // param = {
            //     'ActionName': 'ShowData',
            //     'Parameters': {
            //         'name': pinType,
            //         visible,
            //         'type': 'layer',
            //         'legendVisible': false,
            //         'popupEnabled': false,
            //         // 'popupTemplate': {
            //         //     'content': this.createPopupTemplate(
            //         //         'devicename',
            //         //         '区域名称', 'distname',
            //         //         '街道名称', 'streetname',
            //         //         `
            //         //             <tr>
            //         //                 <td style='min-width: 200px; color: #00c2ff'>设备编号</td>
            //         //                 <td style='text-decoration: underline;' >{deviceid}</td>
            //         //             </tr>
            //         //         `
            //         //     )
            //         // },
            //         'renderer': {
            //             type: 'simple',
            //             symbol: {
            //                 type: 'picture-marker',
            //                 url: `http://10.203.2.88:8090/fastdfs/group1/M00/00/37/CgAAaWFmmaSARl7nAAAYDKJqMEQ554.png`,
            //                 width: '80px',
            //                 height: '80px',
            //             },
            //         },
            //         'data': {
            //             'layers': [
            //                 {
            //                     'name': CODE_ITEM[code][pinType].name
            //                 }
            //             ]
            //         }
            //     }
            // }
            param = {
                'ActionName': 'LayerVisible',
                'Parameters': {
                    'name': '城市之眼',
                    'enabled3d': true,
                    visible

                }
            }
        }

        console.info(param);
        if (param) {
            this.bridge.Invoke(param);
        }
    }

    onClick() {
        console.info('add');
    }

    createPopupTemplate = (nameField, label1, value1, label2, value2, extra) => {
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

    generateGraphLayer = (data, visible) => {
        console.log(data);
        const { pinType, params = {}, points = [] } = data;
        const { icon = '', renderType, heatmapField } = params;
        let icons = [];
        let renderer = undefined;
        let cnt = 0, szms = '';

        const source = points.map(p => {
            const { icon: ic, X, Y, ...rest } = p;

            if (p.icon && !icons.includes(p.icon)) {
                icons.push(p.icon);
            }
            Object.keys(rest).forEach(key => {
                if (key.startsWith('szms')) {
                    const index = key.replace('szms', '');
                    if (rest[`szms${index}`]) {
                        cnt = Math.max(cnt, parseInt(index));
                    }
                    // if (!rest[`sz${index}`]) {
                    //     delete rest[`sz${index}`];
                    //     delete rest[`szms${index}`];
                    // }
                }
            });

            return { icon, x: X, y: Y, ...rest }
        });

        if (cnt > 0) {
            for (let i = 1; i <= cnt; i++) {
                szms += `
                    <tr>
                        <td style='min-width: 200px; color: #00c2ff'>{szms${i}}</td>
                        <td>{sz${i}}</td>
                    </tr>
                `;
            }
        }

        if (this.bridge) {
            if (icons && icons.length > 0) {
                renderer = {
                    type: 'unique-value',
                    field: 'icon',
                    defaultSymbol: this.defaultMarks(icon),
                    uniqueValueInfos: icons.map(i => ({
                        value: i,
                        symbol: this.defaultMarks(i),
                    }))
                };
            } else {
                renderer = {
                    type: 'simple',
                    symbol: this.defaultMarks(icon),
                };
            }

            this.bridge.Invoke({
                'ActionName': 'ShowData',
                'Parameters': {
                    'name': pinType,
                    visible,
                    'data': {
                        'content': source,
                        // 'parsedata': `function(d){return {'名称':d.name, '类型':d.type, '地址':d.address}}`,
                        'parsedata': 'function(d){return d.features}',
                        'parsegeometry': 'function(item){return {x:item.x,y:item.y}}'
                    },
                    // 'popupUrl': 'http://10.203.0.37/citygis/citymap/test/popup/page/index.html?with=363&height=266&fjson=msg',
                    'popupTemplate': {
                        'content': this.createPopupTemplate('name', '类型', 'type', '地址', 'address', szms)
                        // 'content': `
                        //     <div style='
                        //         background-color: rgba(20, 55, 82, 0.8);
                        //         border-radius: 5px;
                        //         color: #fff;
                        //         font-size: 36px;
                        //         line-height: 1.5;
                        //         min-width: 480px;
                        //         max-width: 720px;
                        //     '>
                        //         <div style='
                        //             background: #0f85d5;
                        //             border-radius: 5px 5px 0 0;
                        //             color: #fff;
                        //             font-size: 40px;
                        //             font-weight: bolder;
                        //             line-height: 2;
                        //             padding: 0 48px 0 32px;
                        //             text-align: center;
                        //         '>
                        //             {name}
                        //         </div>
                        //         <div style='padding: 0 32px'>
                        //             <table style='
                        //                 border-collapse: separate;
                        //                 border-spacing: 0px 32px;
                        //                 max-width: 720px;
                        //                 word-break: break-all;
                        //                 word-wrap: break-word;
                        //             '>
                        //                 <tbody>
                        //                     <tr>
                        //                         <td style='min-width: 200px; color: #00c2ff'>类型</td>
                        //                         <td>{type}</td>
                        //                     </tr>
                        //                     <tr>
                        //                         <td style='min-width: 200px; color: #00c2ff'>地址</td>
                        //                         <td>{address}</td>
                        //                     </tr>
                        //                     ${szms}
                        //                 </tbody>
                        //             </table>
                        //         </div>
                        //     </div>
                        // `
                    },
                    'legendVisible': false,
                    'popupEnabled': true,
                    'isLocate': false,
                    'renderer':
                        renderer || {
                            'type': 'simple',
                            'symbol': {
                                'type': 'simple-marker',
                                'size': 90,
                                'color': 'red',
                                'outline': {
                                    'width': 0.5,
                                    'color': 'white'
                                }
                            },
                            // 'maxScale': 500,
                            // 'minScale': 10000
                        }
                }
            });
        }

        return pinType;
    }

    defaultMarks(url) {
        return {
            type: 'picture-marker',
            url: url || `http://10.203.2.88:8090/fastdfs/group1/M00/00/0B/CgAAaWEzNHKACq-SAAAHSpStIHc866.png`,
            width: '90px',
            height: '90px',
        };
    }

    addEventListener = (bridge) => {
        bridge.addEventListener((arg) => {
            const { action, data } = arg;
            console.info(action, data);

            switch (action) {
                case 'mapclick':
                    console.log('点击触发:', data);
                    this.debounceShowVideo(data);
                    break;
            }
        });
    }

    showVideo = (data) => {
        // const { shipin = [] } = data || {};
        const { ['城市之眼']: shipin = [] } = data || {};

        if (shipin && shipin.length > 0 && shipin[0] && this.deviceid !== shipin[0].deviceid) {
            this.deviceid = shipin[0].deviceid;
            const wrapper = document.getElementById('panel_canvas');
            let scale = 0;
            if (wrapper) {
                scale = Math.min(document.body.clientWidth / wrapper.offsetWidth, document.body.clientHeight / wrapper.offsetHeight);
            }
            if (!document.getElementById('video_wrapper')) {
                const dom = document.createElement('div');
                document.body.appendChild(dom);
                dom.id = 'video_wrapper';
                if (scale > 0) {
                    dom.style = `cursor: pointer; position: fixed; top: 0; right: 0; left: 0; height: ${wrapper.offsetHeight * scale}px;  background-color: rgba(0, 0, 0, 0.5); z-index: 1`;
                } else {
                    dom.style = 'cursor: pointer; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1';
                }
                dom.onclick = (e) => {
                    console.info(e);
                    if (e && e.target && e.target.id === 'video_wrapper') {
                        ReactDOM.unmountComponentAtNode(dom);
                        document.body.removeChild(dom);
                        this.deviceid = null;
                    }
                };

                ReactDOM.render(<Video VIDEOID={shipin[0].deviceid} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }} wrapper={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }} video={{ backgroundColor: 'rgba(0,0,0,0)', height: '100%', transform: 'scale(1)' }}> </Video>, dom);
            }
        }
    }

    render() {
        return (
            // <div style={{ width: '100%', height: '100%' }}>
            <iframe
                id={this.id}
                className='mapiframe'
                frameborder='no'
                scrolling='no'
                allowtransparency='true'>
            </iframe>
            // </div>
        );
    }
}