import React from 'react';
import lowArrow from '../../img/icon-地图-下降告警.svg';
import styles from './index.less';

/**
 * 码头数据图形
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  render () {
    const { value, pie_color, arrow, percent } = this.props;

    const currStyle = arrow ? [styles.curr_circle, styles.mech_circle].join(' ') : [styles.curr_circle, styles.content_center].join(' ');
    const pieStyle = arrow ? {} : { background: pie_color };
    const fontStyle = arrow ? styles.f_20 : styles.f_30;
    return <div className={currStyle} style={{ ...pieStyle }}>
      {
        arrow ? <div className={styles.f_24}><img src={lowArrow} alt="" style={{ height: 28 }}/></div> : null
      }
      <div className={fontStyle}>{value}<span>{ percent ? '%' : null }</span></div>
    </div>
  }
}

export default Index;
