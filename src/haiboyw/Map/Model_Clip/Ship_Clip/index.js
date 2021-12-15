import React from 'react';
import stop_pic_0 from '../../img/stop_0.svg';
import stop_pic_1 from '../../img/stop_1.svg';
import stop_pic_2 from '../../img/stop_2.svg';
import progress_pic_0 from '../../img/progress_0.svg';
import progress_pic_1 from '../../img/progress_1.svg';
import progress_pic_2 from '../../img/progress_2.svg';
import regional_pic_0 from '../../img/regional_0.svg';
import regional_pic_1 from '../../img/regional_1.svg';
import regional_pic_2 from '../../img/regional_2.svg';
import styles from './index.less';

// 图片
const picList = [
    { name: 'stop_pic_0', pic: stop_pic_0 },
    { name: 'stop_pic_1', pic: stop_pic_1 },
    { name: 'stop_pic_2', pic: stop_pic_2 },
    { name: 'progress_pic_0', pic: progress_pic_0 },
    { name: 'progress_pic_1', pic: progress_pic_1 },
    { name: 'progress_pic_2', pic: progress_pic_2 },
    { name: 'regional_pic_0', pic: regional_pic_0 },
    { name: 'regional_pic_1', pic: regional_pic_1 },
    { name: 'regional_pic_2', pic: regional_pic_2 }
  ]
/**
 * 船舶告警
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  // 获取图片
  getPic = name => {
    const obj = picList.find(item => item.name === name);
    return (obj && obj.pic) || stop_pic_0;
  }

  // 获取颜色值
  getColor = num => {
    const index = Number(num);
    const colorList = ["#FF4413", "#FFAB00", "#B19802"];
    return colorList[index] || '#B19802';
  }

  render () {
    const { level, pie_color, shipWarning = {}, stopLevel, progressLevel, regionalLevel } = this.props;
    return <div className={styles.ship_warning}>
      {
        shipWarning.stop ? <div className={styles.warn_block} style={{ background: this.getColor(stopLevel) }}>
          <img src={this.getPic(`stop_pic_${stopLevel}`)} />
          <span className={styles.font_style}>{shipWarning.stop}</span>
        </div> : null
      }
      {
        shipWarning.progress ? <div className={styles.warn_block} style={{ background: this.getColor(progressLevel) }}>
          <img src={this.getPic(`progress_pic_${progressLevel}`)} />
          <span className={styles.font_style}>{shipWarning.progress}</span>
        </div> : null
      }
      {
        shipWarning.regional ? <div className={styles.warn_block} style={{ background: this.getColor(regionalLevel) }}>
          <img src={this.getPic(`regional_pic_${regionalLevel}`)} />
          <span className={styles.font_style}>{shipWarning.regional}</span>
        </div> : null
      }
    </div>
  }
}

export default Index;
