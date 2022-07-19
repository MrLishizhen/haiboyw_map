import React, { Component } from 'react';
import style from './style.css'
import {getDataProvider} from '../../utils/DataUtils';


// _cd_event_title
export default class index extends Component {

  render() {
    const d = getDataProvider(this.props);
    const title1 = d[0] || '事件信息交互枢纽';
    const title2 = d[1] || '成都市';
    return (
      <div className={style.title} style={{}}>{title1}<span style={{fontSize: 20, margin: '0 10px'}}>●</span>{title2}</div>
    )
  }
}
