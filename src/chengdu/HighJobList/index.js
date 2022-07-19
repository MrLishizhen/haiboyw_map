import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import styles from './index.less';

import List from './list.js';
import Dialog from './dialog.js';
import CustomSearch from './CustomSearch';
import NumberBar from './NumberBar';
import nohot from './images/nohot.png'
import hot from './images/hot.png'
/**
 * _chengdu_high_eventlist
 */

let ip = '10.1.50.153:9527';

export default class Index extends PureComponent {
  token = '';
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      token:false,
      detail: {
        upPicture: []
      },
      logInfo: [],
      handlers: {},
      searchValue: '',
      total: '',
      hotIndex: 0,
      tabData:[
        {
          name:'批示',
          id:0,
          hot:true,
          color:'rgba(0, 230, 169, 1)'
        },
        {
          name:'重大',
          id:1,
          hot:false,
          color:'rgba(208, 104, 8, 1)'
        },
        {
          name:'超时',
          id:2,
          hot:false,
          color:'rgba(130, 94, 177, 1)'
        }
      ]
    }
  }

  componentDidMount() {
    this.getToken();
    this.timer = setInterval(() => {
      this.getToken();
    }, 1000 * 60 * 20);


    let eventValue = {};

    const { buffEvent = [{type: 'click'}, {type: 'rowClick'}] } = this.props;
    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue['onClick'] = (val) => {
          method && method({...val}, bindedComponents)
        }
      }
      if (type === 'rowClick') {
        eventValue['onRowClick'] = (val) => {
          method && method({...val}, bindedComponents)
        }
      }
    }

    this.setState({
      handlers: Object.assign({}, eventValue)
    });


  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getToken() {
    const params = {
      'loginType': 'sso',
      'password': '',
      'userKey': '',
      'username': 'sa1'
    }
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      // 'http://119.3.53.170:9527/userOrg/api/org/login' :
      `http://${ip}/userOrg/api/org/login`, params)
      .then(({ data: res }) => {
        if (res && res.code === '0000') {
          this.token = res.data.token;
          this.setState({
            token:res.data.toekn,
          })
        }
      });
  }

  onDialogEvent = (val) => {

    this.state.handlers.onRowClick && this.state.handlers.onRowClick(val);
  }

  handleChangeValue = (val) => this.setState({searchValue: val});
  handleJobStatistics = val => {
    const {total} = val;
    this.setState({total: total})
  }

  handleReset = () => this.setState({resetFlag: Math.random()})
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
    const { visible, logInfo, detail,token,tabData=[], hotIndex } = this.state;

    return (
      <div className={styles.basic_wrapper}>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'start',marginBottom:5}}>
          <ul style={{width:240,height:26,display:'flex'}}>
            {
              tabData.map(u=>{
                return (
                    <li key={u.id} onClick={()=>this.tabClick(u.id)} style={{width:80,height:26,display:'flex',justifyContent: 'center',cursor: 'pointer',
                      alignItems: 'center',lineHeight:'26px',background:`url(${u.hot?hot:nohot}) no-repeat center center/100% 100%`}}>
                      <span style={{width:12,height:12,backgroundColor:u.color,marginRight:7,color:'#fff',borderRadius:'50%'}}></span>
                      <span style={{color:!u.hot?'rgba(93, 157, 248, 0.39)':'#fff',fontSize:18}}>{u.name}</span>
                    </li>
                )
              })
            }
          </ul>
        </div>

          <List
              addrIp = {ip}
              token = {this.token}
              eventTypeId = {hotIndex}
              dataProvider={this.props.dataProvider}
              style={this.props.style}
              searchValue = {this.state.searchValue}
              onDialogEvent={this.onDialogEvent}
          />

      </div>
    )
  }
}