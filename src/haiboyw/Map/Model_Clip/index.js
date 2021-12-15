import React from 'react';
import PieChart from '../chart';
import Mech_Clip from './Mech_Clip';
import Ship_Clip from './Ship_Clip';

/**
 * 各模块调用的组件
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  render () {
    const { level, workType = '' } = this.props;

    const workTypeList = [
      { name: 'W_TTL', component: <PieChart {...this.props} /> },
      { name: 'W_CB', component: <Ship_Clip {...this.props}/> },
      { name: 'W_JX', component: <Mech_Clip {...this.props} arrow={true} percent={true}/> },
      { name: 'W_WJK', component: <Mech_Clip {...this.props} /> },
      { name: 'W_DCL', component: <Mech_Clip {...this.props} percent={true}/> }
    ]
    const workObj = workTypeList.find(item => item.name === workType);
    const content = workObj && workObj.component;
    // 显示图形 除机械监控只有两种状态外（只有高于/level=0）其他模块都是只要有警告就要显示图形（状态3为无警告）
    const levelShow = workType === 'W_JX' ? (level || Number(level)) === 0 : [0, 1, 2].indexOf(Number(level)) !== -1;
    return <div>
      {
        levelShow ? content : null
      }
    </div>
  }
}

export default Index;
