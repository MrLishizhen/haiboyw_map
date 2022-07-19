import React, { Component } from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';
import _ from 'lodash';
import s from './index.less'

import ArcgisMap from './ArcgisMap';

const GRIDFLAG = 'GRIDFLAG';
const SHOWNSTATE = 'SHOWNSTATE';
const CAMERAFOCUSE = 'CAMERAFOCUSE';
const erd = elementResizeDetectorMaker();

/**
 * _chengdu_arcgis_map
 */
// 固定图层
const bianjie = {
    'bianjie': {
        'pinType': 'bianjie',
        'params': {
            'type': 'fixed',
            'action': '[{"ActionName":"ShowData","Parameters":{"name":"街道高亮定位","type":"layer"}}]'
        },
        'state': true
    }
}
// 撒点图层
const sadian = {
    'sadian': {
        'pinType': 'sadian',
        'params': { icon: '' },
        'state': true,
        points: [{
            sbbh: '1', // 点位标识，唯一，必填
            name: '点位名称', // 点位名称，必填
            address: '点位地址', // 点位地址，选填
            infotype: '点位类型', // 点位类型，选填
            X: '-4337.41', // 点位坐标：x轴，必填
            Y: '-2863.892', // 点位坐标：y轴，必填
            Z: '0', // 点位坐标：z轴，必填
            popup: 'click2', // 固定值：click2，必填,
            icon: 'data:image/png;base64,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', // 图标地址
            sbzbs: [
                { name: '名称1', value: '值1' },
                { name: '名称2', value: '值2' },
                { name: '名称3', value: '值3' }
            ] // 额外信息，选填
        }]
    }
}

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointsData: {},
            scale: 1,
            handlers: {}
        };
        this.resizeEvent = _.debounce(this.onresize.bind(this), 500);
        window.addEventListener(
            'message',
            this.receiveMessage,
            false
        );
        this.shipindianwei = [];
    }

    componentDidMount() {
        try {
            const root = document.getElementById('root');
            if (root) {
                erd.listenTo(root, (element) => {
                    this.resizeEvent();
                });
            }

            const { buffEvent = [{ type: 'click' }, { type: 'shequClick' }] } = this.props;
            let eventValue = {};
            for (let i = 0; i < buffEvent.length; i++) {
                const eventObj = buffEvent[i];
                const { type, method, bindedComponents } = eventObj;
                if (type === 'click') {
                    eventValue = {
                        onClick: (data) => {
                            method && method({ ...data }, bindedComponents)
                        }
                    }
                } else if (type === 'wanggeClick') {
                    eventValue['onWanggeClick'] = (data) => {
                        method && method(data, bindedComponents)
                    }
                } else if (type === 'shequClick') {
                    eventValue['onShequClick'] = (data) => {
                        method && method(data, bindedComponents)
                    }
                }
            }
            this.setState({
                handlers: Object.assign({}, eventValue)
            });
        } catch (e) {
            console.error(e);
        }
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
                    this.setState({ scale });
                }
            }
        }
    }

    receiveMessage = (event) => {
        console.log(event.origin, window.origin)

        if (
            event.origin === 'http://localhost:7000' ||
            event.origin === window.origin
        ) {
            try {
                const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                if (msg.flag === GRIDFLAG) {
                    console.log('GRID GET MESSAGE', event);
                    switch (msg.type) {
                        case SHOWNSTATE:
                            let { pinType, points = [], params = {}, state } = msg || {};
                            let pointsData = { ...this.state.pointsData };
                            let marks;
                            if (state === undefined) {
                                state = !pointsData[pinType].state;
                            }
                            let origin =
                                process.env.NODE_ENV === 'production'
                                    ? window.location.origin
                                    : 'http://10.1.17.21:8090';
                            if (state && params.exclude) {
                                JSON.parse(params.exclude).forEach((e) => {
                                    if (pointsData[e]) pointsData[e].state = false;
                                });
                            }

                            points.forEach((p, i) => {
                                if (p.sz1) {
                                    let array = [];
                                    let sz = 'sz',
                                        sm = 'szms';
                                    let i = 1;

                                    if (!p.pinType) {
                                        p.pinType = params.pinType;
                                    }
                                    if (!p.popup) {
                                        p.popup = params.popup;
                                    }
                                    if (p.pinType && p.pinType.indexOf('ZJGD') !== -1) {
                                        const keys = Object.keys(p);
                                        for (; i <= keys.length; i++) {
                                            if (p[sm + i]) {
                                                array.push({ value: p[sz + i] || '-', name: p[sm + i] });
                                            }
                                        }
                                    } else {
                                        while (p[sz + i]) {
                                            array.push({ value: p[sz + i], name: p[sm + i] });
                                            p;
                                            i++;
                                        }
                                    }
                                    p['sbzbs'] = JSON.stringify(array);
                                }
                                if (p.gjjlbh) p.sbztms = '报警';
                            });

                            if (params.iconRed) {
                                marks = [
                                    params.icon ? params.icon.startsWith('http') ? params.icon : origin + params.icon : undefined,
                                    params.iconGreen ? params.iconGreen.startsWith('http') ? params.iconGreen : origin + params.iconGreen : undefined,
                                    params.iconRed ? params.iconRed.startsWith('http') ? params.iconRed : origin + params.iconRed : undefined,
                                ];
                            } else if (params.icon) {
                                marks = params.icon.startsWith('http') ? params.icon : origin + params.icon;
                            } else {
                                marks = undefined;
                            }
                            pointsData[pinType] = {
                                ...params,
                                params,
                                points,
                                state: state || false,
                                marks,
                            };

                            this.setState({ pointsData });
                            break;
                        case CAMERAFOCUSE:
                            if (this.map && this.map.cameraFocuse) {
                                let { data } = msg;
                                this.map.cameraFocuse(data);
                            }
                            break;
                        case 'CAMERAROTATE':
                            let { data } = msg;
                            if (data)
                                this.map && this.map.startRotate && this.map.startRotate();
                            else this.map && this.map.startRotate && this.map.endRotate();
                            break;
                        case 'CAMERARESET':
                            this.map && this.map.resetCamera && this.map.resetCamera();
                            break;
                        case 'SHOW_FEATURELAYER':
                            if (msg.pinType === 'road') {
                                const status = this.generateRoadStatus(msg.points);
                                this.setState({ layersData: { ...this.state.layersData, [msg.pinType]: { data: status, state: msg.state } } });
                            }
                            break;
                        case 'CHANGE_CENTER':
                            const { road } = msg;
                            this.setState({ mapCenter: road });
                            break;
                        case 'MAKE_CALL':
                            const { phone } = msg;
                            this.setState({ makeCall: { phone, timestamp: new Date().valueOf() } });
                        case 'POP_UP':
                            this.setState({ popUp: { pinType: msg.pinType, id: msg.id, timestamp: new Date().valueOf() } });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    render() {
        let { dataProvider = [] } = this.props;
        try {
            if (dataProvider && dataProvider.length === 1 && Array.isArray(JSON.parse(dataProvider[0]))) {
                dataProvider = JSON.parse(dataProvider[0]);
            }
        } catch (e) {
            console.error(e)
        }

        let code = dataProvider && dataProvider[0] ? dataProvider[0] : '420602';
        const width = dataProvider && dataProvider[1] ? parseInt(dataProvider[1]) : 7680;
        const height = dataProvider && dataProvider[2] ? parseInt(dataProvider[2]) : 2160;
        const zoom = dataProvider && dataProvider[3] ? parseFloat(dataProvider[3]) : undefined;
        const x = dataProvider && dataProvider[4] ? parseFloat(dataProvider[4]) : undefined;
        const y = dataProvider && dataProvider[5] ? parseFloat(dataProvider[5]) : undefined;
        const xzzx = dataProvider && dataProvider[6] ? dataProvider.slice(6, 8) : [];
        let xzzxData = {}, mapType = undefined;

        const shipindianweishuju = dataProvider && dataProvider[8] ? dataProvider.slice(8) : [];
        if (shipindianweishuju && shipindianweishuju.length > 0) {
            this.shipindianwei = shipindianweishuju;
        }

        // if (Array.isArray(xzzx) && xzzx.length > 0) {
        //     const { pinType, icon, popup, points = [] } = xzzx[0];

        //     xzzxData = {
        //         [pinType]: {
        //             'default': false,
        //             'pinType': pinType,
        //             'messageType': 'clear',
        //             'icon': icon,
        //             'popup': popup,
        //             'flash': false,
        //             'params': { 'default': false, 'pinType': pinType, 'messageType': 'clear', 'icon': icon, 'popup': popup, 'flash': false },
        //             'points': xzzx,
        //             'state': true,
        //             'marks': icon
        //         }
        //     };
        // }

        return (
            <div style={{ width, height, overflow: 'hidden' }}>
                <div style={{ width, height, transform: `scale(${!mapType || mapType === 'arcgis' ? 1 : this.state.scale})` }}>
                    <ArcgisMap
                        code={`${code}`}
                        zoom={zoom}
                        center={{ x, y }}
                        mapCenter={this.state.mapCenter}
                        onVideoClick={this.state.handlers.onClick}
                        onWanggeClick={this.state.handlers.onWanggeClick}
                        onShequClick={this.state.handlers.onShequClick}
                        datas={{ ...this.state.pointsData }} />
                </div>
            </div>
        );
    }
}