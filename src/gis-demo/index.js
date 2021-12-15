import React, { Component } from 'react';
import elementResizeDetectorMaker from 'element-resize-detector';
import _ from 'lodash';

import ArcgisMap from './ArcgisMap';
import LbsAmap from './LbsAmap';

const GRIDFLAG = 'GRIDFLAG';
const SHOWNSTATE = 'SHOWNSTATE';
const CAMERAFOCUSE = 'CAMERAFOCUSE';
const erd = elementResizeDetectorMaker();

/**
 * _arcgis_xy_2
 */
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointsData: {},
            scale: 1
        };
        this.resizeEvent = _.debounce(this.onresize.bind(this), 500);
        window.addEventListener(
            'message',
            this.receiveMessage,
            false
        );
    }

    componentDidMount() {
        try {
            const root = document.getElementById('root');
            if (root) {
                erd.listenTo(root, (element) => {
                    this.resizeEvent();
                });
            }
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
        console.log(event.origin,window.origin)

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
                            let { pinType, points, params = {}, state } = msg || {};
                            let pointsData = { ...this.state.pointsData };
                            let marks;
                            if (state === undefined) {
                                state = !pointsData[pinType].state;
                            }
                            let origin =
                                process.env.NODE_ENV === 'production'
                                    ? window.location.origin
                                    : 'http://10.203.2.88:8090';
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
        console.info('dataProvider', dataProvider);
        let code = dataProvider && dataProvider[0] ? dataProvider[0] : '420602';
        const width = dataProvider && dataProvider[1] ? parseInt(dataProvider[1]) : 7680;
        const height = dataProvider && dataProvider[2] ? parseInt(dataProvider[2]) : 2160;
        const zoom = dataProvider && dataProvider[3] ? parseFloat(dataProvider[3]) : undefined;
        const x = dataProvider && dataProvider[4] ? parseFloat(dataProvider[4]) : undefined;
        const y = dataProvider && dataProvider[5] ? parseFloat(dataProvider[5]) : undefined;
        const xzzx = dataProvider && dataProvider[6] ? dataProvider.slice(6) : [];
        let xzzxData = {}, mapType = undefined;

        if (typeof code === 'string' && code.indexOf('_') !== -1) {
            const array = code.split('_');

            if (Array.isArray(array) && array.length > 1) {
                code = array[1];
                mapType = array[0];
            }
        }

        if (Array.isArray(xzzx) && xzzx.length > 0) {
            const { pinType, icon, popup, points = [] } = xzzx[0];

            xzzxData = {
                [pinType]: {
                    'default': false,
                    'pinType': pinType,
                    'messageType': 'clear',
                    'icon': icon,
                    'popup': popup,
                    'flash': false,
                    'params': { 'default': false, 'pinType': pinType, 'messageType': 'clear', 'icon': icon, 'popup': popup, 'flash': false },
                    'points': xzzx,
                    'state': true,
                    'marks': icon
                }
            };
        }

        return (
            <div style={{ width, height, overflow: 'hidden' }}>
                <div style={{ width, height, transform: `scale(${!mapType || mapType === 'arcgis' ? 1 : this.state.scale})` }}>
                    {!mapType || mapType === 'arcgis' ?
                        <ArcgisMap code={`${code}`} zoom={zoom} center={{ x, y }} datas={{ ...this.state.pointsData, ...xzzxData }} /> :
                        <LbsAmap code={`${code}`} zoom={zoom} center={{ x, y }} datas={{ ...this.state.pointsData, ...xzzxData }} mapCenter={this.state.mapCenter} />
                    }
                </div>
            </div>
        );
    }
}