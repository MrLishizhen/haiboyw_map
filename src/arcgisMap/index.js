import React, { Component } from 'react';
import axios from 'axios';
import esriLoader from 'esri-loader';
import _ from 'lodash';

import schoolPoint from './data/school-point';

import PerformanceInfo from './PerformanceInfo';
import { default as featureLayer } from './FeatureLayer';
import { default as sceneLayer } from './SceneLayer';
import { element } from 'prop-types';

async function generateToken() {
    const url =
        process.env.NODE_ENV === 'production'
            ? 'http://map.cn.gov/RemoteTokenServer?request=getToken&username=cnkwkf&password=cnkwkf12345&clientid=ref.http://bigdata.cn.gov:8070/&expiration=500'
            : `http://map.cn.gov/RemoteTokenServer?request=getToken&username=cnkwkf&password=cnkwkf12345&clientid=ref.${window.location.origin}/&expiration=500`;
    try {
        let txtToken = document.getElementById('txtToken');
        if (!txtToken) {
            txtToken = document.createElement('input');
            txtToken.id = 'txtToken'
            // txtToken.style.display = 'none';
            document.body.append(txtToken)
        }

        const response = await axios.get(url);
        if (response && response.status === 200) {
            const { data } = response;
            document.getElementById('txtToken').value = data;
        }
    } catch (e) {
        console.error('generateToken', e)
    }
}

const
    CAMERA_Z = 27000,
    CAMERA_CENTER = [-7955.226115764595, -2607.4065436997591],
    VIEW_ZOOM = 6.363478077483849,
    VIEW_ZOOM_SPACE = 0.3;

const DEFAULT_LAYERS = {
    'cnBorder': { function: 'getBorderLayer', init: false },
    'jiedao': { function: 'getStreetLayer', init: false },
    'wangge': { function: 'getGridLayer', init: false },
    'juwei': { function: 'getJuweiLayer', init: false },
    'road': { function: 'getRoadLayer', init: false }
};

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapReady: false,
            layers: {}
        }
        this.sdkurl = 'http://bigdata.cn.gov:9070/arcgis_js_v416_api/arcgis_js_api/library/4.16/dojo/dojo.js';
        this.spatialReferencevalue = { wkid: 102100 };
        // 相机位置是否发生改变
        this.cameraModified = false;
        this.layers = {};
        // window.addEventListener('message', this.receiveMessage, false);
    }

    receiveMessage = (event) => {
        if (
            event && (
                event.origin === 'http://bigdata.cn.gov:8070' ||
                event.origin === 'http://bigdata.cn.gov:8060' ||
                event.origin === 'http://localhost:7001' ||
                event.origin === 'http://localhost:8000'
            )
        ) {
            console.log('receive message', event.origin, event.data)
            try {
                // let msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                // const { flag, type, pinType, points, params, state } = msg || {};
                // const { messageType } = params;

                // if (messageType === 'feature') {
                //     if (state && !this.state.layers[pinType]) {
                //         this.setState({ layers: { ...this.state.layers, [pinType]: { mode: 'add' } } });
                //     } else {
                //         if (this.state.mapReady && this.state.layers[pinType]) {
                //             this.setState({ layers: { ...this.state.layers, [pinType]: { layer: this.state.layers[pinType].layer, mode: 'del' } } });
                //         }
                //     }
                // }
                if (this.layers['road']) {
                    console.info(this.layers['road'].renderer);
                    this.layers['road'].renderer = {
                        type: 'simple', // autocasts as new SimpleRenderer()
                        symbol: {
                            type: 'simple-line', // autocasts as new SimpleLineSymbol()
                            width: 3,
                            color: [200, 200, 100, 1],
                            style: 'solid',
                        },
                    }
                }
            } catch (e) {

            }
        }
    }

    componentDidMount() {
        this.token = generateToken();

        esriLoader
            .loadModules(
                [
                    'esri/Map',
                    'esri/views/MapView',
                    'esri/views/SceneView',
                    'esri/geometry/Extent',
                    'esri/geometry/Point',
                    'esri/identity/IdentityManager',
                    'esri/layers/FeatureLayer',
                    'esri/layers/SceneLayer',
                    'esri/layers/TileLayer',
                    'esri/Graphic',
                    'esri/core/watchUtils',
                    'esri/widgets/ScaleBar'
                ],
                { url: this.sdkurl }
            )
            .then(([
                Map,
                MapView,
                SceneView,
                Extent,
                Point,
                IdentityManager,
                FeatureLayer,
                SceneLayer,
                ArcGISTiledMapServiceLayer,
                Graphic,
                watchUtils,
                ScaleBar
            ]) => {
                this.map = new Map({});

                this.view = new SceneView({
                    container: 'mapDiv',
                    map: this.map,
                    camera: {
                        position: {
                            x: CAMERA_CENTER[0],
                            y: CAMERA_CENTER[1],
                            z: CAMERA_Z,
                            spatialReference: this.spatialReferencevalue
                        },
                        tilt: 0,
                    },
                    zoom: VIEW_ZOOM,
                    center: CAMERA_CENTER,
                    extent: new Extent({
                        type: 'extent',
                        xmax: 2116.0772399670277,
                        xmin: -18203.963400114255,
                        ymax: -16.55708170044818,
                        ymin: -5731.568511723309,
                        spatialReference: this.spatialReferencevalue
                    }),
                    qualityProfile: 'medium', //  high, medium, low
                    viewingMode: 'local',
                    screenSizePerspectiveEnabled: true,
                    highlightOptions: {
                        haloOpacity: 0
                    },
                });

                // var scaleBar = new ScaleBar({
                //     view: this.view
                // });

                // this.view.ui.add(scaleBar, {
                //     position: "bottom-left"
                // });

                // 加载默认图层
                IdentityManager.registerToken({
                    server: 'http://map.cn.gov/OneMapServer/rest/services',
                    token: document.getElementById('txtToken').value
                });
                IdentityManager.on('dialog-create', function () {
                    IdentityManager.dialog.open = true;
                });
                const tiledLayer = new ArcGISTiledMapServiceLayer({
                    url: 'http://10.207.204.19/server/rest/services/BIGANSE2/MapServer'
                });
                this.map.add(tiledLayer);

                Object.keys(DEFAULT_LAYERS).forEach(key => {
                    if (DEFAULT_LAYERS[key] && DEFAULT_LAYERS[key].init && featureLayer[DEFAULT_LAYERS[key].function]) {
                        const layer = featureLayer[DEFAULT_LAYERS[key].function](FeatureLayer, { spatialReferencevalue: this.spatialReferencevaluethis });
                        if (Array.isArray(layer) && layer.length > 0) {
                            layer.forEach(element => {
                                this.map.add(element);
                                element.on('layerview-create', ({ view, layerView }) => {
                                    console.info('layerview-create array', layerView);
                                    layerView.on('click', e => {
                                        console.info('click e',e)
                                    });
                                });
                            });
                        } else {
                            this.map.add(layer);
                            layer.on('layerview-create', ({ view, layerView }) => {
                                console.info('layerview-create single', key, layerView);
                            });
                            if (key === 'road') {
                                layer.when(function () {
                                    console.info('road', layer.relationships);
                                });
                            }
                        }
                    }
                });

                // const buildingBaiMo = sceneLayer.getBuildingBaiMo(SceneLayer, { spatialReferencevalue: this.spatialReferencevaluethis });
                // this.map.add(buildingBaiMo);

                // const buildingJingMo = sceneLayer.getBuildingJingMo(SceneLayer, { spatialReferencevalue: this.spatialReferencevaluethis });
                // buildingJingMo.forEach(element => {
                //     this.map.add(element);
                // });

                const points = schoolPoint.map(point => {
                    const { X: x, Y: y, ...extra } = point;
                    return new Graphic({
                        geometry: {
                            type: 'point',
                            x,
                            y,
                            spatialReference: this.spatialReferencevalue
                        },
                        attributes: { ...extra },
                        // symbol: {
                        //     type: 'simple-marker',
                        //     color: [0, 0, 0],
                        //     outline: {
                        //         width: 2,
                        //         color: [0, 255, 255],
                        //     },
                        //     size: '40px'
                        // },
                        // popupTemplate: {
                        //     title: '{name}',
                        //     content: 'This a {type} located in {address}.'
                        // }
                    });
                });
                const pointLayer = new FeatureLayer({
                    declaredClass: 'custom-pop-up',
                    source: points,
                    objectIdField: 'OBJECTID',
                    //所有显示的属性都需要添加
                    fields: [
                        { name: 'OBJECTID', alias: 'OBJECTID', type: 'oid' },
                        { name: 'sbbh', alias: 'sbbh', type: 'string' },
                        { name: 'name', alias: 'name', type: 'string' },
                        { name: 'type', alias: 'type', type: 'string' },
                        { name: 'address', alias: 'address', type: 'string' },
                        { name: 'pinType', alias: 'pinType', type: 'string' },
                        { name: 'schooltype', alias: 'schooltype', type: 'string' },
                        { name: 'state', alias: 'state', type: 'string' },
                        { name: 'popup', alias: 'popup', type: 'string' },
                        { name: 'sbzbs', alias: 'sbzbs', type: 'string' },
                        { name: 'sbztms', alias: 'sbztms', type: 'string' },
                        { name: 'statePos', alias: 'statePos', type: 'small-integer' },
                        { name: 'infoJSON', alias: 'infoJSON', type: 'string' },
                    ],
                    outFields: ['*'],
                    elevationInfo: { mode: 'relative-to-scene' },
                    renderer: {
                        type: 'simple',
                        symbol: {
                            type: 'simple-marker',
                            color: [0, 0, 0],
                            outline: {
                                width: 2,
                                color: [0, 255, 255],
                            },
                            size: '20px'
                        }
                    },
                    popupTemplate: {
                        title: '{name}',
                        content: 'This a {type} located in {address}.',
                        overwriteActions: true
                    }
                });
                this.map.add(pointLayer);

                // this.view.when(() => {
                //     console.log('map did loaded', this.view.zoom);
                //     // this.max_zoom = this.view.zoom;
                //     // 当拖拽、鼠标滚轮滚动或双击使相机位置发生改变时修改相机状态标识
                //     // ['drag', 'mouse-wheel', 'double-click'].forEach((action) => {
                //     //     this.view.on(action, (event) => {
                //     //         this.cameraModified = true;
                //     //     });
                //     // });
                //     // 当View缩小到一定程度时恢复到初始值
                //     // watchUtils.whenTrue(this.view, 'stationary', () => {
                //     //     if (this.cameraModified) {
                //     //         console.log('camera', this.view.camera, this.view.center, this.view.zoom, this.view.zoom < this.max_zoom - VIEW_ZOOM_SPACE);
                //     //         this.cameraModified = false;

                //     //         if (this.view.zoom < this.max_zoom - VIEW_ZOOM_SPACE) {
                //     //             this.view.zoom = this.max_zoom;
                //     //             this.view.goTo(
                //     //                 new Point({
                //     //                     x: CAMERA_CENTER[0],
                //     //                     y: CAMERA_CENTER[1],
                //     //                     spatialReference: this.spatialReferencevalue,
                //     //                 })
                //     //             );
                //     //         }
                //     //     }
                //     // });

                //     if (!this.state.mapReady) {
                //         this.setState({ mapReady: true, view: this.view });
                //     }
                // })
            });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.mapReady !== this.state.mapReady) {

        }
        return true;
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.receiveMessage);
    }

    render() {
        return (
            <div id='mapDiv' style={{ width: '100%', height: '100%' }}>
                {/* <PerformanceInfo view={this.state.view} /> */}
            </div>
        );
    }
}