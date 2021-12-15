import React from 'react';
import Pie from './Pie';
import styles from './index.less';

/**
 * 用户活跃度排名
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  render () {
    return <div style={{ height: '100%' }} className={styles.content_layout}>
      <div className={styles.top_lay}>
        <div className={styles.left_layout}>
          <h1>神行太保系统</h1>
          <div className={styles.day_active}>历史最高日活跃用户数：<span>25.36万人</span></div>
          <div className={styles.middle}>
            <div className={styles.day_level}>
              <div className={styles.day_user}>当天活跃用户数</div>
              <div className={styles.day_count}>160.9<span>万</span></div>
            </div>
            <div className={styles.day_30}>
              <div>
                <span className={styles.font_64}>30天日均活跃：</span>
                <div className={styles.block_flex}>
                  <div className={styles.font_120}>5.23<span>万</span></div>
                  <div className={styles.triangle}></div>
                  <div className={[styles._font_64, styles.color_red].join(' ')} style={{ display: 'inline-block', marginLeft: 20 }}>2.32%</div>
                </div>
              </div>
              <div style={{ marginTop: 30 }}>
                <span className={styles.font_64}>30天日均活跃：</span>
                <div className={styles.block_flex}>
                  <div className={styles.font_120}>5.23<span>万</span></div>
                  <div className={styles.triangle}></div>
                  <div className={[styles._font_64, styles.color_red].join(' ')} style={{ display: 'inline-block', marginLeft: 20 }}>2.32%</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.current_count}>
            <div className={styles.currday_count}>
              <div className={[styles._font_64, styles.color_blue].join(' ')}>当天功能点击总次数：</div>
              <div className={styles.margin_top45}>
                <div className={styles.font_80} style={{ display: 'inline-block' }}>7万次</div>
                {/* <div className={styles.triangle} style={{ display: 'inline' }}></div>
                <div className={[styles._font_64, styles.color_red].join(' ')} style={{ display: 'inline-block', marginLeft: 20 }}>2.32%</div> */}
              </div>
            </div>
            <div className={styles.currday_count}>
              <div className={[styles._font_64, styles.color_blue].join(' ')}>人均点击次数：</div>
              <div className={styles.margin_top45}>
                <div className={styles.font_80} style={{ display: 'inline-block' }}>7万次</div>
                {/* <div className={styles.triangle} style={{ display: 'inline' }}></div>
                <div className={[styles._font_64, styles.color_red].join(' ')} style={{ display: 'inline-block', marginLeft: 20 }}>2.32%</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right_layout}>
          <div className={styles.right_content}>
            <div className={styles.content_midd}>
              <Pie />
            </div>
            <div className={styles.top3}>
              <div className={styles.line}></div>
              <div>最近7日 TOP3 功能：</div>
              <ul>
                <li>已核列表：<span>65.3 万次</span></li>
                <li>产品列表：<span>65.3 万次</span></li>
                <li>缓存更新：<span>65.3 万次</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Index;
