import React, { Component } from 'react';
import _ from 'lodash';

const CENTER_CONFIG = {
  '4206': { top: 140, left: 400, zoom: 2 },
  // '420602': { top: 140, left: 300 }
  // '420606': { zoom: 19, center: { x: 112.1361064809474, y: 32.045642929733944 } }
};
const FIXED_LAYER_PINTYPE = ['weixing', 'shequ', 'wangge', 'shipin', 'bianjie', 'xiangzhenjiedao', 'traffic', 'baimo', "*"];
const CODE_ITEM = {
  '510104': { 'wangge': { 'name': '锦江区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510105': { 'wangge': { 'name': '青羊区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510106': { 'wangge': { 'name': '金牛区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510107': { 'wangge': { 'name': '武侯区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510108': { 'wangge': { 'name': '成华区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510109': { 'wangge': { 'name': '高新南区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510110': { 'wangge': { 'name': '天府新区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510112': { 'wangge': { 'name': '龙泉驿区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510113': { 'wangge': { 'name': '青白江区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510114': { 'wangge': { 'name': '新都区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510115': { 'wangge': { 'name': '温江区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510116': { 'wangge': { 'name': '双流区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510117': { 'wangge': { 'name': '郫都区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510119': { 'wangge': { 'name': '高新西区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510118': { 'wangge': { 'name': '新津区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510121': { 'wangge': { 'name': '金堂县网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510129': { 'wangge': { 'name': '大邑县网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510131': { 'wangge': { 'name': '蒲江县网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510181': { 'wangge': { 'name': '都江堰市网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510182': { 'wangge': { 'name': '彭州市网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510183': { 'wangge': { 'name': '邛崃市网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510184': { 'wangge': { 'name': '崇州市网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510185': { 'wangge': { 'name': '简阳市网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510186': { 'wangge': { 'name': '东部新区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } },
  '510187': { 'wangge': { 'name': '高新新区网格' }, 'shequ': { 'name': '社区村' }, 'shipin': { 'name': '视频监控' }, 'xiangzhenjiedao': { 'name': '乡镇边界' }, 'traffic': { 'name': '交通' }, 'baimo': { 'name': '白模' } }
}

const appHostName = window.location.hostname;
const appHostPort = window.location.port;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapReady: false
    };
    this.featureLayers = {};
    this.debounceShowVideo = _.debounce(this.showVideo.bind(this), 500);
    this.id = `visdata_map_${new Date().valueOf()}`;
  }

  componentDidMount() {
    const { code, zoom: pzoom, center: pcenter = {} } = this.props;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://10.1.50.120/citygis/areamap/CityGis.Bridge.js';
    script.onload = (e) => {
      try {
        // console.info('script load success.', e);

        this.bridge = new CityGis.Bridge({
          id: this.id,
          url: `http://10.1.50.120/citygis/areamap/WidgetPages/WidgetGIS.html?maptype=3d&code=${code}&devicetype=lg&themeid=Gis&isFlyScene=false`,
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
    }
    document.head.appendChild(script);
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
          const { datas: oldDt = {} } = this.props;
          const { datas = {} } = nextProps;
          // console.log('map shouldComponentUpdate data:', nextProps.datas);

          Object.keys(datas).forEach(pinType => {
            const layerData = datas[pinType];
            const { params = {}, state = false } = layerData || {};
            // console.log('map shouldComponentUpdate layer', pinType, this.featureLayers[pinType]);

            if (this.featureLayers[pinType]) {
              if (state) {
                if (FIXED_LAYER_PINTYPE.includes(pinType) || params?.type === 'fixed') {
                  this.generateFixedLayer(pinType, true, layerData);
                } else {
                  const result = this.generateGraphLayer(datas[pinType], true);
                }
              } else {
                if (FIXED_LAYER_PINTYPE.includes(pinType) || params?.type === 'fixed') {
                  this.generateFixedLayer(pinType, false, layerData);
                } else {
                  this.generateGraphLayer(datas[pinType], false);
                }
              }
            } else {
              if (state) {
                if (FIXED_LAYER_PINTYPE.includes(pinType) || params?.type === 'fixed') {
                  this.generateFixedLayer(pinType, true, layerData);
                } else {
                  const result = this.generateGraphLayer(datas[pinType], true);
                  this.featureLayers[pinType] = result;
                }
              } else {
                this.generateFixedLayer(pinType, false, layerData);
              }
            }
          });
        }
      }

      // return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
      return false;
    } catch (e) {
      console.error('map shouldComponentUpdate error:', e);
    }
  }


  generateFixedLayer = (pinType, visible, layerData) => {
    const { code } = this.props;
    let param = null;
    // console.info("pintype: ", CODE_ITEM[code][pinType], visible);

    // 卫星图
    if (pinType === 'weixing') {
      if (visible) {
        param = {
          "ActionName": "ChangeMapTheme",
          "Parameters": {
            "mapthemeid": "yaogantheme"
          }
        }
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
      if (!visible) {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": pinType,
            "mode": "delete"
          }
        }
      } else {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": pinType,
            "type": "layer",
            "data": {
              "layers": {
                "name": "管理网格"
              }
            },
            "renderer": {
              "type": "simple",
              "symbol": {
                "type": "simple-fill",
                "color": [
                  158,
                  201,
                  124,
                  0.2
                ],
                "style": "solid",
                "outline": {
                  "color": "9ec97c",
                  "width": 2
                }
              }
            }
          }
        }
      }
    }
    // 社区边界
    else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'shequ') {
      if (!visible) {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": "社区村",
            "mode": "delete"
          }
        }
      } else {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": "社区村",
            "type": "layer",
            "data": {
              "layers": [
                {
                  "name": "社区村"
                }
              ]
            },
            "legendVisible": false,
            "popupEnabled": true,
            'popupTemplate': {
              'content': this.createPopupTemplate('BGNAME', '社区名称', 'COMNAME', '街道名称', 'STREETNAME')
            },
            "minScale": 120000,
            "maxScale": 8001,
            "renderer": {
              "type": "simple",
              "label": "网格",
              "visualVariables": [],
              "symbol": {
                "type": "simple-fill",
                "color": [
                  151,
                  151,
                  204,
                  0.5
                ],
                "style": "solid",
                "outline": {
                  "color": "#c9dd22",
                  "width": 2
                }
              }
            },
            "labels": [
              {
                "fields": [
                  "#.COMNAME"
                ],
                "color": [
                  255,
                  255,
                  0,
                  0.5
                ],
                "size": 20,
                "minScale": 15000,
                "maxScale": 8001,
                "font": {
                  "family": "fangsong"
                }
              }
            ]
          }
        }
      }
    }
    // 视频探头
    else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'shipin') {
      if (!visible) {
        param = {
          "ActionName": "LayerVisible",
          "Parameters":
          {
            "name": "视频监控",
            "visible": false
          }
        }
      } else {
        param = {
          'ActionName': 'LayerVisible',
          'Parameters': {
            'name': '视频监控',
            'popupEnabled': false,
            visible
          }
        }
      }
    }
    // 乡镇街道
    else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'xiangzhenjiedao') {
      if (!visible) {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": "街道高亮定位",
            "mode": "delete"
          }
        }
      } else {
        param = {
          "ActionName": "ShowData",
          "Parameters": {
            "name": "街道高亮定位",
            "type": "layer",
            "isLocate": true,
            "legendVisible": false,
            visible,
            "data": {
              "layers": {
                "name": "乡镇街道"
              }
            },
            "labels": [
              {
                "fields": [
                  "#.TOWN"
                ],
                "color": [
                  255,
                  255,
                  255,
                  1
                ],
                "size": 40
              }
            ],
            "renderer": {
              "type": "simple",
              "symbol": {
                "type": "line-3d",
                "symbolLayers": [
                  {
                    "type": "line",
                    "size": 4,
                    "material": {
                      "color": "c9dd22"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    } else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'traffic') {
      param = [{
        "ActionName": "LayerVisible",
        "Parameters": [{
          "name": "高速路",
          visible,
          "legendVisible": false,
          "popupEnabled": false
        },
        {
          "name": "快速路",
          visible,
          "legendVisible": false,
          "popupEnabled": false
        },
        {
          "name": "地面道路",
          visible,
          "legendVisible": false,
          "popupEnabled": false
        }]
      }, {
        "ActionName": "ShowData",
        "Parameters": {
          "name": "car_layer1",
          "type": "polyline",
          "data": {
            "url": "http://10.1.50.126:9091/api-center/runApi/getTrafficJamsByNode?nodeName=青羊区",
            "requestOptions": {
              "headers": {
                "appSecret": "a6a9ec1d5768496fbe3420de0fc7ec6d"
              }
            },
            "parsedata": "  function(rdata){ return rdata.data.map(function(r){ var linkl = JSON.parse(r.linkStates);var d = Object.keys(linkl).map(function(i){return {key:i, line:linkl[i]}}); return d.map(function(l){ return { eventId:r.eventid, linkStates:l.key, paths: l.line.split(';').map(function(p){ var nums = p.split(','); return nums.reduce((res, num, i) => {  res[i/2|0].push(Number(num)); return res; }, Array.from({length: Math.ceil(nums.length/2)}, () =>[])) }) } }) }).flat(2); }  ",
            "parsegeometry": "function(item){return {paths:item.paths}}"
          },
          "legendVisible": true,
          "popupEnabled": false,
          visible,
          "renderer": {
            "type": "unique-value",
            "field": "linkStates",
            "defaultLabel": "其他",
            "defaultSymbol": {
              "type": "line-3d",
              "symbolLayers": [{
                "type": "line",
                "size": 4,
                "material": {
                  "color": "green"
                }
              }]
            },
            "uniqueValueInfos": [{
              "value": "1",
              "label": "畅通",
              "symbol": {
                "type": "line-3d",
                "symbolLayers": [{
                  "type": "line",
                  "size": 4,
                  "material": {
                    "color": "green"
                  }
                }]
              }
            },
            {
              "value": "2",
              "label": "缓行",
              "symbol": {
                "type": "line-3d",
                "symbolLayers": [{
                  "type": "line",
                  "size": 4,
                  "material": {
                    "color": "yellow"
                  }
                }]
              }
            },
            {
              "value": "3",
              "label": "拥堵",
              "symbol": {
                "type": "line-3d",
                "symbolLayers": [{
                  "type": "line",
                  "size": 4,
                  "material": {
                    "color": "red"
                  }
                }]
              }
            },
            {
              "value": "4",
              "label": "严重拥堵",
              "symbol": {
                "type": "line-3d",
                "symbolLayers": [{
                  "type": "line",
                  "size": 4,
                  "material": {
                    "color": "red"
                  }
                }]
              }
            }
            ]
          }
        }
      }];
    } else if (CODE_ITEM[code] && CODE_ITEM[code][pinType] && pinType === 'baimo') {
      param = [{
        "ActionName": "themeLayer",
        "Parameters": {
          "name": "建筑白模",
          visible,
          "legendVisible": false,
          "popupEnabled": false
        }
      },
      {
        "ActionName": "ShowData",
        "Parameters": {
          "name": "建筑白模区县过滤",
          "type": "layer",
          visible,
          "legendVisible": false,
          "popupEnabled": false,
          "filterMode": "all",
          "data": {
            "layers": {
              "name": "区县边界",
              "where": `COUTRICT_CODE='${code}'`
            }
          }
        }
      }]
    } else {
      const { params = {} } = layerData || {};
      const actionData = params['action'] || '';
      try {
        param = typeof actionData === 'string' ? JSON.parse(actionData) : actionData;
      } catch (error) {
        param = []
      }
     
      // console.log("actionData: ", JSON.parse(actionData))
      console.log("param: ", param)
      if (Array.isArray(param)) {
        param = param.map(p => {
          if (p.ActionName === 'ShowData') {
            if (visible) {
              return {
                ActionName: p.ActionName,
                Parameters: { ...p.Parameters, visible }
              }
            } else {
              return {
                ActionName: p.ActionName,
                Parameters: {
                  'name': p?.Parameters?.name,
                  'mode': 'delete'
                }
              }
            }
          } else if (p.ActionName === 'LayerVisible') {
            return {
              ActionName: p.ActionName,
              Parameters: { ...p.Parameters, visible }
            }
          } else {
            return {
              ActionName: p.ActionName,
              Parameters: { ...p.Parameters }
            }
          }
        })
      }
    }
    if (param) {
      this.bridge.Invoke(param);
    }
  }

  onClick() {
    console.info('onClick');
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
                <div style='padding:0 32px; height: 400px; overflow:auto'>
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
    // console.log("generateGraphLayer: ", data);
    const { pinType, params = {}, points = [] } = data;
    const { icon = '', renderType, heatmapField } = params;
    let icons = [];
    let renderer = undefined;
    let cnt = 0, szms = '';
    let _source1 = [];

    if (!pinType) {
      return;
    }
    const source = points.map(p => {
      const { icon: ic, X, Y, ...rest } = p;
      const tszms = {};
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


      if (cnt > 0) {
        for (let j = 1; j <= cnt; j++) {
          tszms[rest[`szms${j}`]] = rest[`sz${j}`] || '';
        }
      }

      tszms['x'] = X;
      tszms['y'] = Y;
      tszms['icon'] = ic;

      _source1.push(tszms);
      return { icon: ic, x: X, y: Y, ...rest }
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


      if (!visible) {
        this.bridge.Invoke({
          "ActionName": "ShowData",
          "Parameters": {
            "name": pinType,
            "mode": "delete"
          }
        });
      } else {
        this.bridge.Invoke({
          "ActionName": "ShowData",
          "Parameters": {
            "name": pinType,
            "data": {
              "content": _source1.length <= 0 ? [{}] : _source1,
              "parsedata": "function(d){return d}",
              "parsegeometry": "function(item){return {x:item.x,y:item.y}}"
            },
            // "popupUrl": `http://10.1.50.86/pop.html?width=780&height=580&fjson=msg`,
            "popupUrl": `http://${appHostName}:${appHostPort}/custom/_arcgis_xy_2/popHtml/pop.html?width=780&height=580&fjson=msg`,
            "legendVisible": false,
            "popupEnabled": true,
            visible,
            "renderer": renderer || {
              "type": "simple",
              "symbol": {
                "type": "picture-marker",
                "url": "http://10.1.50.86:8090/fastdfs/group1/M00/00/1E/CgAAaWFMNl-AFkcsAAAQYuolWDE928.png",
                "width": "64px",
                "height": "64px"
              }
            }
          }
        });
      }

    }

    return pinType;
  }

  defaultMarks(url) {
    return {
      type: 'picture-marker',
      url: url || `http://10.203.2.88:8090/fastdfs/group1/M00/00/0B/CgAAaWEzNHKACq-SAAAHSpStIHc866.png`,
      width: '68px',
      height: '68px',
    };
  }

  addEventListener = (bridge) => {
    bridge.addEventListener(this.handleMapClick);
  }

  handleMapClick = args => {
    const { action, data } = args;
    console.info(action, data);

    switch (action) {
      case 'mapclick':
        console.log('点击触发:', data);
        this.debounceShowVideo(data);
        break;
    }
  }

  showVideo = (data) => {
    // const { shipin = [] } = data || {};
    const { ['视频监控']: shipin = [], wangge, '社区村': shequ } = data || {};
    const { onVideoClick, onWanggeClick, onShequClick } = this.props;

    if (shequ && Array.isArray(shequ) && shequ.length > 0) {
      onShequClick && onShequClick([...shequ]);
    }


    if (wangge && Array.isArray(wangge) && wangge.length > 0) {
      //点击网格
      onWanggeClick && onWanggeClick([...wangge])
    }

    if (shipin && shipin.length > 0 && shipin[0] && this.deviceid !== shipin[0].ccid) {
      this.deviceid = shipin[0].ccid;
      onVideoClick && onVideoClick({ deviceId: this.deviceid });

      // const wrapper = document.getElementById('panel_canvas');
      // let scale = 0;
      // if (wrapper) {
      //     scale = Math.min(document.body.clientWidth / wrapper.offsetWidth, document.body.clientHeight / wrapper.offsetHeight);
      // }
      // if (!document.getElementById('video_wrapper')) {
      //     const dom = document.createElement('div');
      //     document.body.appendChild(dom);
      //     dom.id = 'video_wrapper';
      //     if (scale > 0) {
      //         dom.style = `cursor: pointer; position: fixed; top: 0; right: 0; left: 0; height: ${wrapper.offsetHeight * scale}px;  background-color: rgba(0, 0, 0, 0.5); z-index: 1`;
      //     } else {
      //         dom.style = 'cursor: pointer; position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1';
      //     }
      //     dom.onclick = (e) => {
      //         console.info(e);
      //         if (e && e.target && e.target.id === 'video_wrapper') {
      //             ReactDOM.unmountComponentAtNode(dom);
      //             document.body.removeChild(dom);
      //             this.deviceid = null;
      //         }
      //     };

      //     ReactDOM.render(<Video VIDEOID={shipin[0].deviceid} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%' }} wrapper={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }} video={{ backgroundColor: 'rgba(0,0,0,0)', height: '100%', transform: 'scale(1)' }}> </Video>, dom);
      // }
    }
  }

  showRoad = (data) => {
    if (data) {
      const { x, y, ...rest } = data;

      // this.bridge.Invoke({
      //   "ActionName": "goToPosition",
      //   "Parameters": {
      //     "positon": {
      //       "x": x,
      //       "y": y
      //     },
      //     "marker": {
      //       "size": 16,
      //       "color": "red"
      //     },
      //     "zoom": 14,
      //     "isRotation360": false
      //   }
      // });

      const params = [
        {
          "ActionName": "ShowData",
          "Parameters": {
            "name": "拥堵点mark",
            "data": {
              "content": [{ ...data }],
              "parsegeometry": "function(item){return {x:item.x,y:item.y}}"
            },
            // "popupUrl": `http://10.1.50.86:8090/custom/_arcgis_xy_2/popHtml/traffic.html?width=780&height=500&fjson=msg`,
            "popupUrl": `http://${appHostName}:${appHostPort}/custom/_arcgis_xy_2/popHtml/traffic.html?width=1200&height=640&fjson=msg`,
            "legendVisible": false,
            "popupEnabled": true,
            "renderer": {
              "type": "simple",
              "label": "测试",
              "visualVariables": [],
              "symbol": {
                "type": "simple-marker",
                "size": 20,
                "outline": {
                  "color": "#c9dd22",
                  "width": 0
                },
                "color": "rgba(255,0,0,1)"
              }
            }
          }
        },
        {
          "ActionName": "goToPosition",
          "Parameters": {
            "positon": {
              "x": x,
              "y": y
            },
            "marker": {
              "size": 16,
              "color": "red"
            },
            "zoom": 14,
            "isRotation360": false
          }
        }
      ]

      this.bridge.Invoke(params)

      // if (this.map) {
      //     if (this.marker) {
      //         this.map.remove(this.marker);
      //         this.marker = null;
      //     }

      //     this.marker = new AMap.Marker({
      //         position: [x, y],
      //         icon: new AMap.Icon({
      //             // 图标尺寸
      //             size: new AMap.Size(iconWidth||54,iconHeight||91),
      //             // 图标的取图地址
      //             image:icon || 'http://10.1.17.21:8090/fastdfs/20220309/8795c3f9db0e58d82609279358d77d1d.png',
      //             // 图标所用图片大小
      //             imageSize: new AMap.Size(iconWidth||54,iconHeight||91),
      //             // 图标取图偏移量
      //             // imageOffset: new AMap.Pixel(-9, -3)
      //         })
      //     });
      //     this.marker.on('dblclick', this.showRoad.bind(this, undefined));

      //     this.center = this.map.getCenter();
      //     this.zoom = this.map.getZoom();

      //     this.map.panTo([x, y]);
      //     this.map.setZoom(18);
      //     this.map.add(this.marker);
      // }
    } else {
      // this.map.panTo(this.center);
      // this.map.setZoom(this.zoom);
      // this.map.remove(this.marker);
      // this.marker = null;
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