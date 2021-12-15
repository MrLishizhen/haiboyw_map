import React from 'react';
import styles from './index.less';

/**
 * 街道网格化管理-内容
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { data = {} } = this.props;
    const { list = [] } = data;
    return (
      <div style={{ height: '100%', width: '100%' }} className={styles.content_layout}>
        {/* <div>
          <div>指挥长：{list[0] && list[0].commander}</div>
          <div>{list[0].c_phone}</div>
        </div>
        <div>
          <div>值班长：{list[0] && list[0].duty}</div>
          <div>{list[0].d_phone}</div>
        </div> */}
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {/* <tbody>
            {list[0] && list[0].commander &&
              <tr>
                <td>指挥长：</td>
                <td>{list[0] && list[0].commander}</td>
                <td>{list[0].c_phone}</td>
              </tr>
            }
            {list[0] && list[0].duty &&
              <tr>
                <td>值班长：</td>
                <td>{list[0] && list[0].duty}</td>
                <td>{list[0].d_phone}</td>
              </tr>
            }
          </tbody> */}
          <tbody>
            <tr>
              {/* <td style={{ width: '50%' }}>指挥长：</td> */}
              <td colSpan={2}><div style={{ fontWeight: 'bolder', fontSize: 46 }}>当日值班长</div></td>
            </tr>
            <tr>
              {/* <td>{list[0] && list[0].commander} {list[0].c_phone}</td>
              <td>{list[0] && list[0].duty} {list[0].d_phone}</td> */}
              <td style={{ fontWeight: 'bolder', fontSize: 46, textAlign: 'left' }}>{list[0] && list[0].commander}</td>
              <td style={{ fontWeight: 'bolder', fontSize: 46 }}>{list[0].c_phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Index;
