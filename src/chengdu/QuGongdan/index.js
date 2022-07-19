import React, { Component } from 'react'
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import {getDataProvider, getDateDistance} from '../../utils/DataUtils';
import {getToken, getAreaDis} from '../../utils/ToolUtils';
import { isEqual } from 'lodash';
import nohot from './images/nohot.png'
import hot from './images/hot.png'

// _chengdu_event_quSpread

const keys = {
  "0": "total",
  "1": "totalDealed",
  "2": "totalDealedRate"
}

export default class index extends Component {

  state = {
    tabData: [
      {
        name:'总量',
        id:0,
        hot:true,
        color:'rgba(0, 230, 169, 1)'
      },
      {
        name:'已办结',
        id:1,
        hot:false,
        color:'rgba(208, 104, 8, 1)'
      },
      {
        name:'已办结率',
        id:2,
        hot:false,
        color:'rgba(208, 104, 8, 1)'
      }
    ],
    list: [],
    handlers: {}
  }

  getListByType = (type, list) => {
    return list.map(el => { return {name: el['name'], value: parseFloat(el[type])} });
  }

  getSeries = (sortlist, key, style = {}) => {
    const {hotIndex} = this.state;
    return {
      name:'1',
      //折线图
      type:'bar',
      barWidth: 6,
      label: {
        show: hotIndex === 2 || hotIndex === 1? true: false,
        formatter:  hotIndex === 2?'{c}%': '{c}',
        position: 'top',
        color: 'white',
        fontSize: 14
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#00FFAB'
                },
                {
                  offset: 1,
                  color: '#00FFAB40'
                }
              ])
      },
      data: sortlist.map(el => parseFloat(el[key])),
      ...style
    }
  }

  getOption = list => {
    const {hotIndex = 0} = this.state;
    const id = hotIndex + "";
    const key = keys[id];

    // const l = this.getListByType(key, list);
    const sortlist = list.sort((a, b) => parseFloat(b[key]) - parseFloat(a[key]));

    const series = [];
    if (key === 'total') {
      const bar1 = this.getSeries(sortlist, 'totalDealing', {stack: 'anjian'});
      const bar2 = this.getSeries(sortlist, 'totalDealed', {
        stack: 'anjian', 
        label: {
          show: true, 
          position: 'top', 
          fontSize: 14, 
          color: 'white',
          formatter: param => {
            const {name = ''} = param;
            const o = sortlist.find(o => o.name === name) || {};
            return o.todayTotal || ''
          }
        }, 
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#65B8FF'
                },
                {
                  offset: 1,
                  color: '#65B8FF40'
                }
                ])}});
        series.push(bar1, bar2);
      } else  {
        series.push(this.getSeries(sortlist, key))
    }

    return {
      grid: {
        top: 12,
        bottom: 110,
        right: 0
      },
      //横轴
      xAxis:{
        triggerEvent: true,
        axisLabel: {
          color: 'white',
          fontSize: 16,
          formatter: (val, index) => val.split('').join('\n')
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#2D9BFF'
          }
        },
        data: sortlist.map(el => el.name)
      },
      //纵轴
      yAxis:{
        axisLabel: {
          color: 'white',
          fontSize: 20
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#2D9BFF20'
          }
        },
        max: hotIndex === 2? 100: null
      },
      series:[...series]
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
    const result = await getToken(`http://${this.eventIp}/userOrg/api/org/login`, {method: 'POST', body: JSON.stringify(params)}, {});
    this.token = result?.data?.token;

    this.getAreaData();
  }

  getAreaData = async () => {

    if (this.token) {
      const queryParams = this.getQueryParams();
      const area = queryParams['area'] || '成都市';

      const [startTime, endTime] = getDateDistance(0);

      const params = {startTime: startTime, endTime: endTime}; 
      params['city'] = area === '成都市'? null: area;
      const result = await getAreaDis(`http://${this.eventIp}/wechatApp/api/wechat/screen/flow/areaDis`, {method: 'POST', headers: { token: this.token }, body: JSON.stringify(params)});
      const list = result?.data || [];
      this.setState({list: [...list]})
    }
  }

  initToken = () => {
    // auto get Token
    this.getToken();
    this.tokenTimer = setInterval(() => {
      this.getToken();
    }, 1000 * 60 * 20);
    this.iscreateToken = true;

    this.dataTimer = setInterval(() => {
      this.getAreaData();
    }, 1000 * 60 * 1);
 }

 componentWillReceiveProps(nextProps) {
  if (!isEqual(this.props, nextProps)) {
    const preDataProvider = getDataProvider(this.props);
    const nextDataProvider = getDataProvider(nextProps);

    if (!isEqual(preDataProvider[0], nextDataProvider[0])) {
      if (nextDataProvider[0] && !this.iscreateToken) {
        this.eventIp = nextDataProvider[0]
        this.initToken();
      }
    }
  }
}

componentWillUnmount() {
  if (this.tokenTimer) clearInterval(this.tokenTimer);
  if (this.dataTimer) clearInterval(this.dataTimer);
}

componentDidMount() {

  const preDataProvider = getDataProvider(this.props);
  if (preDataProvider[0] && !this.iscreateToken) {
    this.eventIp = preDataProvider[0];
    this.initToken();
  }

  this.myChart = echarts.init(this.node);
  this.myChart.on('click', params => {
    this.state.handlers.onBarClick && this.state.handlers.onBarClick(params);
  })


  const {buffEvent = [{type: 'click'}, {type: 'barClick'}]} = this.props;
    let eventValue = {};
    for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const {type, method, bindedComponents} = eventObj;
        if (type === 'click') {
            eventValue['onClick'] = (data) => {
              method && method({...data}, bindedComponents)
          }
        }

        if (type === 'barClick') {
          eventValue['onBarClick'] = (data) => {
            let areaName = '';
            const {componentType = '', name = '', value = ''} = data;
            if (componentType === "xAxis") {
                areaName = value;
            } else {
                areaName = name;
            }
            method && method(areaName, bindedComponents);
          }
        }
    }
    this.setState({
        handlers: Object.assign({}, eventValue)
    })

}

  tabClick(id){
    let hotIndex = id;
    let {tabData} = this.state;
    for(let i=0;i<tabData.length;i++){
      tabData[i].hot=false;
      if(tabData[i].id==id){
        tabData[i].hot=true;
        this.state.handlers.onClick && this.state.handlers.onClick(tabData[i]);
      }
    }
    this.setState({
      tabData:[...tabData],
      hotIndex:hotIndex
    })
  }

  render() {
    const {list = []} = this.state;
    if (this.myChart) {
      this.myChart.setOption(this.getOption(list), true);
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'start',marginBottom:5}}>
          <ul style={{width:240,height:26,display:'flex'}}>
            {
              this.state.tabData.map(u=>{
                return (
                    <li key={u.id} onClick={
                      ()=>this.tabClick(u.id)} 
                      style={{width:110,height:26,display:'flex',justifyContent: 'center',cursor: 'pointer',
                      alignItems: 'center',lineHeight:'26px',background:`url(${u.hot ? hot : nohot }) no-repeat center center/100% 100%`}}>
                      <span style={{color:!u.hot?'rgba(93, 157, 248, 0.39)':'#fff',fontSize:18, whiteSpace: 'nowrap'}}>{u.name}</span>
                    </li>
                )
              })
            }
          </ul>
        </div>
        <div style={{ width: '100%', height: '100%' }} ref={node => this.node = node}></div>
      </div>
    )
  }
}
