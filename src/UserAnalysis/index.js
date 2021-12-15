import React from 'react';
import Swiper from './Swiper';
import styles from './index.less';
import ActiveSort from './ActiveSort';

const dataList = [
  {
    id: 1, sysname: '太保系统', loginUser: '160.9万', resTime: '580ms', resUnit: '<5s', flow: '850KB', flowUnit: '<800KB', error: '10.5%', 
    errorUnit: '<15%', anr: '15%', anrUnit: '5%', crash: '1.5%', crashUnit: '<16%',
    top1_name: '云南：', top1_time: '3480ms', top1_count: 1,
    top2_name: '云南：', top2_time: '3480ms', top2_count: 1,
    top3_name: '云南：', top3_time: '3480ms', top3_count: 1,
    top4_name: '云南：', top4_time: '3480ms', top4_count: 1,
    top5_name: '云南：', top5_time: '3480ms', top5_count: 1,
    othererror: '40.2%', connectError: '28.9%', outtime: '19.1%', info: '9.8%', ssr: '2%'
  },
  {
    id: 2, sysname: '神行太保系统', loginUser: '160.9万', resTime: '580ms', resUnit: '<5s', flow: '850KB', flowUnit: '<800KB', error: '10.5%', 
    errorUnit: '<15%', anr: '15%', anrUnit: '5%', crash: '1.5%', crashUnit: '<16%',
    top1_name: '云南：', top1_time: '3480ms', top1_count: 1,
    top2_name: '云南：', top2_time: '3480ms', top2_count: 1,
    top3_name: '云南：', top3_time: '3480ms', top3_count: 1,
    top4_name: '云南：', top4_time: '3480ms', top4_count: 1,
    top5_name: '云南：', top5_time: '3480ms', top5_count: 1,
    othererror: '40.2%', connectError: '28.9%', outtime: '19.1%', info: '9.8%', ssr: '2%'
  },
  {
    id: 3, sysname: '神行太保系统', loginUser: '160.9万', resTime: '580ms', resUnit: '<5s', flow: '850KB', flowUnit: '<800KB', error: '10.5%', 
    errorUnit: '<15%', anr: '15%', anrUnit: '5%', crash: '1.5%', crashUnit: '<16%',
    top1_name: '云南：', top1_time: '3480ms', top1_count: 1,
    top2_name: '云南：', top2_time: '3480ms', top2_count: 1,
    top3_name: '云南：', top3_time: '3480ms', top3_count: 1,
    top4_name: '云南：', top4_time: '3480ms', top4_count: 1,
    top5_name: '云南：', top5_time: '3480ms', top5_count: 1,
    othererror: '40.2%', connectError: '28.9%', outtime: '19.1%', info: '9.8%', ssr: '2%'
  },
  {
    id: 4, sysname: '神行太保系统', loginUser: '160.9万', resTime: '580ms', resUnit: '<5s', flow: '850KB', flowUnit: '<800KB', error: '10.5%', 
    errorUnit: '<15%', anr: '15%', anrUnit: '5%', crash: '1.5%', crashUnit: '<16%',
    top1_name: '云南：', top1_time: '3480ms', top1_count: 1,
    top2_name: '云南：', top2_time: '3480ms', top2_count: 1,
    top3_name: '云南：', top3_time: '3480ms', top3_count: 1,
    top4_name: '云南：', top4_time: '3480ms', top4_count: 1,
    top5_name: '云南：', top5_time: '3480ms', top5_count: 1,
    othererror: '40.2%', connectError: '28.9%', outtime: '19.1%', info: '9.8%', ssr: '2%'
  },
  {
    id: 5, sysname: '神行太保系统', loginUser: '160.9万', resTime: '580ms', resUnit: '<5s', flow: '850KB', flowUnit: '<800KB', error: '10.5%', 
    errorUnit: '<15%', anr: '15%', anrUnit: '5%', crash: '1.5%', crashUnit: '<16%',
    top1_name: '云南：', top1_time: '3480ms', top1_count: 1,
    top2_name: '云南：', top2_time: '3480ms', top2_count: 1,
    top3_name: '云南：', top3_time: '3480ms', top3_count: 1,
    top4_name: '云南：', top4_time: '3480ms', top4_count: 1,
    top5_name: '云南：', top5_time: '3480ms', top5_count: 1,
    othererror: '40.2%', connectError: '28.9%', outtime: '19.1%', info: '9.8%', ssr: '2%'
  }
]

/**
 * 用户体验分析
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    let list = [...dataList];
    const propsData = this.getDataProvider(this.props);
    if (propsData && propsData.length) {
      list = [...propsData]
    }
    this.setState({
      data: list
    })
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

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const nextPropsData = this.getDataProvider(nextProps);
      this.setState({
        data: nextPropsData
      })
    }
  }

  render() {
    const { data = [] } = this.state;
    
    return <div style={{ width: '100%', height: '100%' }} className={styles.user_analysis}>
      <div style={{ marginLeft: 80 }}><Swiper data={data}/></div>
      <div><ActiveSort /></div>
    </div>
  }
}

export default Index;
