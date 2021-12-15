import React from 'react';
import { isEqual } from 'lodash';
import pic from './diamond.png';
import styles from './index.less';

const dataList = [{ name: '受理', value: 99, percent: '3.7%' },
                  { name: '处置', value: 385, percent: '14.5%' },
                  { name: '回访', value: 192, percent: '7.2%' },
                  { name: '结案', value: 1349, percent: '90.66%' }]
/**
 * 菱形进度
 * 菱形进度超过12.5%（32.9）,使用points六点,此前3点，总长度263.6
 * 最大值（六个点）12,198 62,198 182,50 174,2 124,2 2,148
 *              23,398 123,398 368,100 350,4 248,4 4,300
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    let data = [...dataList]
    const list = this.getDataProvider(this.props);
    if (list && list.length) {
      data = [...list];
    }
    this.initialState(data);
  }
  
  // 校验dataProvider
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  // 获取节点位置
  getPoints = record => {
    const percent = record && record.percent && Number.parseFloat(record.percent) || 0;

    const num_2 = `${(8*percent + 23).toFixed(2)},398`;
    const last =  `${(23 - 1.52*percent).toFixed(2)},${(398 - 7.84*percent).toFixed(2)}`;
    const num_3 = `${(2.45*percent + 123).toFixed(2)},${(398 - 2.98*percent).toFixed(2)}`;
    const num_4 = `${(2.46*percent + 104).toFixed(2)},${(300 - 2.96*percent).toFixed(2)}`;
    const num_5 = `${(2.44*percent + 4).toFixed(2)},${(300 - 2.96*percent).toFixed(2)}`;

    if (percent === 0) {
      return '23,398 23,398, 23,398';
    } else if (percent <= 12.5) {
      return `23,398 ${num_2} ${last}`;
    } else if (percent === 100) {
      return `23,398 123,398 368,100 350,4 248,4 4,300`;
    }
    return `23,398 123,398 ${num_3} ${num_4} ${num_5} 4,300`;
  }

  // 获取菱形位置
  initialState = data => {
    let obj = {};
    const receive_info = data.find(item => item.name && item.name === '受理');
    const handle_info = data.find(item => item.name && item.name === '处置');
    const back_info = data.find(item => item.name && item.name === '回访');
    const settle_info = data.find(item => item.name && item.name === '结案');
    receive_info.points = this.getPoints(receive_info);
    handle_info.points = this.getPoints(handle_info);
    back_info.points = this.getPoints(back_info);
    settle_info.points = this.getPoints(settle_info);
    obj = { receive_info, handle_info, back_info, settle_info };
    this.setState({
      data: { ...obj }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const nextPropsData = this.getDataProvider(nextProps);
      this.initialState(nextPropsData);
    }
  }

  render () {
    const { data = {} } = this.state;

    return <div className={styles.diamond_layout}>
      <div className={styles.first_dia}>
        <div className={styles.font_top}>{data.receive_info && data.receive_info.value}</div>
        <img src={pic} />
        <svg className={styles.second_svg} fill="rgba(119, 49, 215, 0.8)" xmlns="http://www.w3.org/2000/svg">
          <polygon points={data.receive_info && data.receive_info.points}/>
        </svg>
        <div className={styles.font_btm}>受理</div>
      </div>
      <div className={styles.second_dia}>
        <div className={styles.font_top}>{data.handle_info && data.handle_info.value}</div>
        <img src={pic} />
        <svg className={styles.second_svg} fill="rgba(49, 60, 215, 0.8)" xmlns="http://www.w3.org/2000/svg">
          <polygon points={data.handle_info && data.handle_info.points}/>
        </svg>
        <div className={styles.font_btm}>处置</div>
      </div>
      <div className={styles.third_dia}>
        <div className={styles.font_top}>{data.back_info && data.back_info.value}</div>
        <img src={pic} />
        <svg className={styles.second_svg} fill="rgba(253, 165, 94, 0.8)" xmlns="http://www.w3.org/2000/svg">
          <polygon points={data.back_info && data.back_info.points}/>
        </svg>
        <div className={styles.font_btm}>回访</div>
      </div>
      <div className={styles.fourth_dia}>
        <div className={styles.font_top}>{data.settle_info && data.settle_info.value}</div>
        <img src={pic} />
        <svg className={styles.second_svg} fill="rgba(65, 202, 168, 0.8)" xmlns="http://www.w3.org/2000/svg">
          <polygon points={data.settle_info && data.settle_info.points}/>
        </svg>
        <div className={styles.font_btm}>结案</div>
      </div>
    </div>
  }
}

export default Index;
