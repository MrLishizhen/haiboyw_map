import React, {Component} from 'react';
// import styles from './index.less'
import _, {isEqual, result} from "lodash";
import {default as Layers} from './layers';
import {getDataProvider, getDateDistance} from '../../utils/DataUtils'
import {getJobListByType, getToken} from '../../utils/ToolUtils';
import {ImportTypePanel, NormalTypePanel, ControlPanel} from './ControlPanel';

// _chengdu_event_argcismap

import elementResizeDetectorMaker from 'element-resize-detector';


const CODEMAP = {"成都市": "5101","锦江区":"510104","青羊区":"510105","金牛区":"510106","武侯区":"510107","成华区":"510108","高新南区":"510109","天府新区":"510110","龙泉驿区":"510112","青白江区":"510113","新都区":"510114","温江区":"510115","双流区":"510116","郫都区":"510117","新津区":"510118","高新西区":"510119","金堂县":"510121","大邑县":"510129","蒲江县":"510131","都江堰市":"510181","彭州市":"510182","邛崃市":"510183","崇州市":"510184","简阳市":"510185","东部新区":"510186","高新区": "510109"}

const erd = elementResizeDetectorMaker();

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
        this.token = '';
        this.isCreateMap = false;
        this.iscreateToken = false;
        this.pageIndex = 1;
        this.clearMark = false;
    }

    onresize() {
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

    getToken = async () => {
      // getToken
      const params = {'loginType': 'sso', 'password': '', 'userKey': '', 'username': 'sa1'};
      const result = await getToken(`http://${this.eventIp}:${this.eventPort}/userOrg/api/org/login`, {method: 'POST', body: JSON.stringify(params)}, {});
      this.token = result?.data?.token;
    }

    componentWillUnmount() {
      if (this.bridge && this.bridge.Invoke) {
        this.bridge.Invoke({
            'ActionName': 'Clear'
        });
        this.bridge.removeEventListener(this.handleMapClick);
        this.bridge = null;
      }

      if (this.tokenTimer) clearInterval(this.tokenTimer);
  }

    componentDidMount() {
      const root = document.getElementById('root');
      if (root) {
          erd.listenTo(root, (element) => {
              this.resizeEvent();
          });
      }

      this.getDefaultProperty(this.props);

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

      if (this.mapIP && !this.isCreateMap) {
        this.initMap();
      }

      if (this.eventIp && this.eventPort && !this.iscreateToken) {
        this.initToken();
      }
    }

    initToken = () => {
       // auto get Token
       this.getToken();
       this.tokenTimer = setInterval(() => {
         this.getToken();
       }, 1000 * 60 * 20);
       this.iscreateToken = true;
    }

    initMap = () => {

      const queryParams = this.getQueryParams();
      const area = queryParams['area'] || '成都市';
      const code = CODEMAP[area] || '5101';

      this.area = area === '成都市'? null: area;
      const _that = this;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://10.1.50.120/citygis/areamap/CityGis.Bridge.js';
      script.onload = (e) => {
          try{
            this.bridge = new CityGis.Bridge({
                id: this.id,
                url: `http://${this.mapIP}/citygis/areamap/WidgetPages/WidgetGIS.html?maptype=3d&code=${code}&devicetype=lg&themeid=Gis&isFlyScene=false`,
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
                    this.isCreateMap = true;
                    _that.addEventListenerFunc(_that.bridge);
                }
            });
        } catch (e) {
          console.error(e);
      }
    }
    document.head.appendChild(script);

  }

    setMarker = (list, params) => {
      this.removeApoint();
      if (list.length === 0) return;
      const {icon = ''} = params;
      const render = list.map(el => { return {...el, icon: icon} })
      this.bridge.Invoke({
          "ActionName": "ShowData",
          "Parameters": {
              "name": `map_layer`,
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
          width: '20px',
          height: '20px',
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

    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
      // return false;
    }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      this.getDefaultProperty(nextProps);
      

      if (this.mapIP && !this.isCreateMap) {
        this.initMap();
      }

      if (this.eventIp && this.eventPort && !this.iscreateToken) {
        this.initToken();
      }
    }
  }

  getDefaultProperty = props => {
    const dataProvider = getDataProvider(props);
    const info = dataProvider || [];

    try {
      const address = info.find(o => o.name === 'address');
      const icons = info.find(o => o.name === 'icon');
      const map = info.find(o => o.name === 'map');
      const toolbar = info.find(o => o.name === 'toolbar');

      this.mapIP = address['mapIP'];
      this.mapPort = address['mapPort'];
      this.eventIp = address['eventIp'];
      this.eventPort = address['eventPort'];

      this.pointIcons = icons;

      this.mapDefault = map;

      this.toolBar = toolbar;

    } catch (error) {
      console.log(error)
    }
  }

  // 获取工单通用数据
  spreadMarksByType = async (val, rest) => {
    const params = {startTime: '2021-01-12 00:00:00', endTime: '2022-04-12 00:00:00', pageNum: this.pageIndex, pageSize: 999999, ...val};
   
    if (this.area) params['city'] = this.area;

    const result = await getJobListByType(`http://${this.eventIp}:${this.eventPort}/wechatApp/api/wechat/screen/flow/getFlowList`, {method: 'POST', headers: { token: this.token }, body: JSON.stringify(params)});
    const list = result?.data?.rows || [];
    // this.page = result?.data?.page;
    // this.total = result?.data?.total || 0;
    // this.size = result?.data?.size || 0;

    // const totalPage = Math.ceil(this.total / this.size);

    // if (this.pageIndex > 1) this.clearMark = false;
    // if (this.pageIndex < totalPage) {
    //   this.pageIndex ++;
    //   this.spreadMarksByType(val, rest);
    // }
    this.setMarker(list, rest);
  }

  // 获取异常工单数据
  spreadYichangList = async (val, rest) => {
    const params = {startTime: '2021-01-12 00:00:00', endTime: '2022-04-12 00:00:00', pageSize: 999999, ...val}; 
    if (this.area) params['city'] = this.area;
    const result = await getJobListByType(`http://${this.eventIp}:${this.eventPort}/wechatApp/api/wechat/screen/flow/getExceptionFlow`, {method: 'POST', headers: { token: this.token }, body: JSON.stringify(params)});
    const list = result?.data?.rows || [];
    this.setMarker(list, rest);
  }

  handleSelectType = val => {
    const {selected, title} = val;
    if (selected && title) {
      this.clearMark = true;
      this.spreadMarksByType({'$class_1$': title}, {icon: this.pointIcons['default']});
    }
  }

  handleSelectImportType = val => {
    const {selected, title} = val;

    // "$urgency$":"重大"
    // 根据不同类型撒点
    if (selected && title) {
      const [startTime, endTime] = getDateDistance();
      const icon = this.pointIcons[title];
      this.clearMark = true;
      switch (title) {
        case '今日重大工单':
          this.spreadMarksByType({startTime: startTime, endTime: endTime, "$urgency$": "重大"}, {icon: icon})
        break;
        case '滞留工单': 
          this.spreadYichangList({startTime: startTime, endTime: endTime}, {icon: icon})
        break;
        case '超时工单': 
          this.spreadMarksByType({startTime: startTime, endTime: endTime, "isSlaOverTime":"true"}, {icon: icon})
        break;
        case '今日工单': 
          this.spreadMarksByType({startTime: startTime, endTime: endTime}, {icon: icon})
        break;
      
        default:
          break;
      }
    }
  }

  render() {
    const toolbarPos = this.toolBar && {top: this.toolBar['top'], right: this.toolBar['right']}
    return (
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <iframe
          id={this.id}
          className="mapiframe"
          frameBorder="no"
          scrolling="no"
          allowtransparency="true">
        </iframe>
        <div style={{position: 'absolute', ...toolbarPos}}>
          <ControlPanel addr = {[this.eventIp, this.eventPort]} onSelectImportType = {this.handleSelectImportType} onSelectType = {this.handleSelectType}/>
        </div>
      </div>
      
    )
  }
}
