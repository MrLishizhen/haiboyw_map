import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import styles from './index.less';

import List from './list.js';
import Dialog from './dialog.js';

/**
 * _xy_event_info_list
 */
export default class Index extends PureComponent {
  token = '';
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      detail: {
        upPicture: []
      },
      logInfo: [],
    }
  }

  componentDidMount() {
    this.getToken();
    this.timer = setInterval(() => {
      this.getToken();
    }, 1000 * 60 * 20);
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
      'username': 'visData'
    }
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      // 'http://119.3.53.170:9527/userOrg/api/org/login' :
      'http://10.203.4.224:9527/userOrg/api/org/login', params)
      .then(({ data: res }) => {
        if (res && res.code === '0000') {
          this.token = res.data.token;
        }
      });
  }

  onDialogEvent = (val) => {
    if (val) {
      this.setState({
        visible: true,
      });
    } else {
      this.setState({
        visible: false,
        detail: {
          upPicture: []
        },
        logInfo: [],
      });
      return;
    }
    this.getDatail(val);
    this.getLogInfo(val);
  }

  getLogInfo(val) {
    const params = new FormData();
    params.append('flowNo', val)
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      //   'http://119.3.53.170:9527/userOrg/api/org/login' :
      'http://10.203.4.224:9527/itsmApp/visData/getFlowLogVis', params, {
      headers: {
        token: this.token
      }
    }).then(({ data: res }) => {
      if (res && res.code === '0000') {
        const { data = {} } = res;
        const { datas } = data;
        if (!datas && !datas instanceof 'object') {
          return;
        }
        this.setState({
          logInfo: datas.rows
        });
      }
    });
  }

  getDatail(val) {
    const params = new FormData();
    params.append('flowNo', val)
    axios.post(
      // window.origin === 'http://localhost:8080' ?
      //   'http://119.3.53.170:9527/userOrg/api/org/login' :
      'http://10.203.4.224:9527/itsmApp/visData/getFlowInfoVis', params, {
      headers: {
        checkToken: 'no'
      }
    }).then(({ data: res }) => {
      if (res && res.code === '0000') {
        const { data } = res;
        if (!data && !data.length) {
          return;
        }
        const detail = {
          flowSource: '', //事件来源
          reportDate: '', //发现时间
          addr: '', //发生地址
          classA: '', //事件归属
          classB: '', //事件分类
          classC: '', //事件名称
          classD: '', //要点信息
          street: '', //街镇园区
          village: '', //管理单元
          jiedaodanwei: '',//受理单位
          chuzhidanwei: '', //处置单位
          questionTitle: '', //问题标题
          desc: '', //问题描述
          finishDate: '', //结案时间
          finishRemark: '', //结案意见
          upPicture: [], //图片
          upPictureAfter: [], //处理后图片
          emergency: '' //紧急程度
        };
        data.forEach(item => {
          if (detail[item.dataKey] !== undefined) {
            if (item.dataKey === 'upPicture' || item.dataKey === 'upPictureAfter') {
              detail.upPicture = [...detail.upPicture, ...JSON.parse(item.dataName)];
            } else {
              detail[item.dataKey] = item.dataName;
            }
          }
        });
        detail.flowNo = val;
        //拼接图片url
        if (detail.upPicture instanceof Array) {
          detail.upPicture = detail.upPicture.map(item => {
            item.downloadPath = `http://10.203.4.224:9527/itsmApp${item.downloadPath}`;
            return item;
          })
        }
        this.setState({
          detail: detail
        })
      }
    });
  }

  render() {
    const { visible, logInfo, detail } = this.state;

    return (
      <div className={styles.basic_wrapper}>
        <List
          dataProvider={this.props.dataProvider}
          style={this.props.style}
          onDialogEvent={this.onDialogEvent}
        />
        <Modal
          closable={false}
          destroyOnClose={true}
          footer={null}
          visible={visible}
          width={1721}
          wrapClassName={styles.modal_wrapper}
          getContainer={() => {
            const dom = document.getElementById('panel_canvas');
            if (dom) {
              return dom;
            }
            return document.body;
          }}
          onCancel={() => this.onDialogEvent(null)}
        >
          <Dialog
            display={visible}
            logInfo={logInfo}
            detail={detail}
            onDialogEvent={this.onDialogEvent.bind(this)}
          />
        </Modal>
      </div>
    )
  }
}
