import React, { Component } from 'react'
import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/legend';
import {getDataProvider, getDateDistance} from '../../utils/DataUtils';
import {getToken, getAreaDis} from '../../utils/ToolUtils';
import { isEqual } from 'lodash';
import nohot from './images/nohot.png'
import hot from './images/hot.png'

// _chengdu_event_lineTrend2

const keys = {
  "0": "total",
  "1": "totalDealed",
  "2": "totalDealedRate"
}

export default class index extends Component {

  state = {
    tabData: [
      {
        name:'周',
        id:0,
        hot:true,
        color:'rgba(0, 230, 169, 1)'
      },
      {
        name:'月',
        id:1,
        hot:false,
        color:'rgba(208, 104, 8, 1)'
      }
    ],
    list: [],
    handlers: {},
    days: 7
  }

  getListByType = (type, list) => {
    return list.map(el => { return {name: el['name'], value: parseFloat(el[type])} });
  }


  getOption = list => {
    const {hotIndex} = this.state;
    return {
      grid: {
        containLabel: true,
        top: 20,
        bottom: 50,
        right: '5%'
      },
      //横轴
      xAxis:{
        axisLabel: {
          color: 'white',
          fontSize: 16,
        //   formatter: (val, index) => val.split('').join('\n')
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#2D9BFF'
          }
        },
        boundaryGap: false,
        data: list.map(el => el.date)
      },
      //纵轴
      yAxis:{
        axisLabel: {
          color: 'white',
          fontSize: 20
        },
        axisTick: {
            show: false
          },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#2D9BFF20'
          }
        }
      },
      series:[{
        name:'1',
        //折线图
        type:'line',
        label: {
          show: hotIndex === 1? false: true,
          color: 'white',
          fontSize: 14
        },
        itemStyle: {
          color: '#FFE172'
        },
        data: list.map((el, j) => {
            return {
                value: el.num,
                label: j === 0? { offset: [14, 0], position: 'bottom'}: {position: 'top'}
            }
        })
      }]
    }
  }

  getOption1 = list => {
      const time = [], zhinengfaxian = [], richangxuncha = [], shehuishuqiu = [], shangjijiaoban = [];
      for (let i = 0; i < list.length; i++) {
          const el = list[i];
          time.push(el['time'] || '');
          zhinengfaxian.push(el['智能发现'] || 0);
          richangxuncha.push(el['日常巡查'] || 0);
          shehuishuqiu.push(el['社会诉求'] || 0);
          shangjijiaoban.push(el['上级交办'] || 0);
      }
    return {
        legend: {
            // data: ['日常巡查', '社会诉求', '上级交办', '智能发现']
            right: 0,
            icon: 'circle',
            textStyle: {
                color: 'white',
                fontSize: 14
            }
          },
      grid: {
        containLabel: true,
        top: 12,
        bottom: 50,
        right: '5%',
        top: '10%'
      },
      //横轴
      xAxis:{
        axisLabel: {
          color: 'white',
          fontSize: 16,
        //   formatter: (val, index) => val.split('').join('\n')
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#2D9BFF'
          }
        },
        boundaryGap: false,
        data: time
      },
      //纵轴
      yAxis:{
        axisLabel: {
          color: 'white',
          fontSize: 20
        },
        axisTick: {
            show: false
          },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#2D9BFF20'
          }
        }
      },
      series:[{
        name:'日常巡查',
        //折线图
        type:'line',
        itemStyle: {
          color: '#5494FF'
        },
        lineStyle: {
            width: 2
        },
        data: richangxuncha
      }, {
        name:'社会诉求',
        //折线图
        type:'line',
        itemStyle: {
          color: '#3FFFF5'
        },
        lineStyle: {
            width: 2
        },
        data: shehuishuqiu
      }, {
        name:'上级交办',
        //折线图
        type:'line',
        itemStyle: {
          color: '#F5A623'
        },
        lineStyle: {
            width: 2
        },
        data: shangjijiaoban
      }, {
        name:'智能发现',
        //折线图
        type:'line',
        itemStyle: {
          color: '#E7E471'
        },
        lineStyle: {
            width: 2
        },
        data: zhinengfaxian
      }]
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
    this.getTypeAreaData();
  }

  getAreaData = async (days = 7) => {

    if (this.token) {
      const queryParams = this.getQueryParams();
      const area = queryParams['area'] || '成都市';

      const [startTime, endTime] = getDateDistance(days);

      const params = {startTime: startTime, endTime: endTime}; 
      params['city'] = area === '成都市'? null: area;
      const result = await getAreaDis(`http://${this.eventIp}/wechatApp/api/wechat/screen/flow/getFlowLine`, {method: 'POST', headers: { token: this.token }, body: JSON.stringify(params)});
      const list = result?.data || [];
      this.setState({list: [...list]})
    }
  }

  getTypeAreaData = async (days = 7) => {
    if (this.token) {
        const queryParams = this.getQueryParams();
        const area = queryParams['area'] || '成都市';
  
        const [startTime, endTime] = getDateDistance(days);
  
        const params = {startTime: startTime, endTime: endTime}; 
        params['city'] = area === '成都市'? null: area;
        const result = await getAreaDis(`http://${this.eventIp}/wechatApp/api/wechat/screen/flow/getFlowtypeBytime`, {method: 'POST', headers: { token: this.token }, body: JSON.stringify(params)});
        const list = result?.data || [];
        this.setState({list1: [...list]})
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

      const days = this.state.hotIndex === 1? 30: 7;
      this.getAreaData(days);
      this.getTypeAreaData(days);
    }, 1000 * 60 * 5);
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
  this.myChart1 = echarts.init(this.node1);
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
            method && method({...data}, bindedComponents);
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
    let days = 7;
    if (hotIndex === 1) days = 30;
    this.setState({
      tabData:[...tabData],
      hotIndex:hotIndex
    })
    this.getAreaData(days);
    this.getTypeAreaData(days);
  }

  render() {
    const {list = [], list1 = []} = this.state;
    if (this.myChart) {
      this.myChart.setOption(this.getOption(list), true);
    }
    if (this.myChart1) {
        this.myChart1.setOption(this.getOption1(list1), true)
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'start',marginBottom:5}}>
          <ul style={{width:120,height:26,display:'flex'}}>
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
        <div style={{width: '100%', height: '100%', display: 'flex'}}>
            <div style={{ width: '50%', height: '100%' }} ref={node => this.node = node}></div>
            <div style={{ width: '50%', height: '100%'}} ref={node1 => this.node1 = node1}></div>
        </div>
       
      </div>
    )
  }
}
