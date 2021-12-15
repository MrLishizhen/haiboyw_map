import React from 'react';
import { isEqual } from 'lodash';
import VDSwiper from "../../common/VDSwiper";
import styles from './index.less';

const datalist = [{"id":1,"name":"学    校","value":"0","pintype":"XX","type":"学校","popup":"click2","icon":"/fastdfs/group1/M00/00/35/wKgJx19zC8yAd-2MAAAa_XQQneA515.png","status":"1"},{"id":2,"name":"在建工地","value":"0","pintype":"ZJGD","type":"在建工地","popup":"click2","icon":"/fastdfs/group1/M00/00/16/wKgJx18iq7WAOLclAAAHSpStIHc914.png","status":"1"}]

const SHOWNSTATE = "SHOWNSTATE";
const GRIDFLAG = "GRIDFLAG";

/**
 * 地图撒点-底部点击
 * _cnyw_cqzy
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeList: [],
      activeId: 0,
      handlers: ''
    }
  }

  componentDidMount() {
    try {
      const data = this.getDataProvider(this.props);
      // const data = [...datalist]
      const items = [];
      const list = [];

      data.forEach(item=>{
        if(item){
          if(item.pintype){
            items.push(item);
          }else {
            list.push(item)
          }
        }
      });
      const newData = this.changeDataFormat(items);

      // 绑定事件
      const { buffEvent = [{type: 'click'}] } = this.props;
      let eventValue = {};
      for (let i = 0; i < buffEvent.length; i++) {
        const eventObj = buffEvent[i];
        const { type, method, bindedComponents } = eventObj;
        if (type === 'click') {
          eventValue = {
            onClick: (record) => {
              method && method({ ...record }, bindedComponents)
            }
          }
        }
      }

      this.setState({
        data: newData,
        list,
        activeId: 0,
        handlers: Object.assign({}, eventValue)
      });
    } catch(e) {
      console.error(e);
    }
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
      const data = this.getDataProvider(nextProps);
      const items = [];
      const list = [];

      data.forEach(item=>{
        if(item){
          if(item.pintype){
            items.push(item);
          }else {
            list.push(item)
          }
        }
      });
      const newData = this.changeDataFormat(items);

      this.setState({
        data:newData,
        list
      });
    }
  }

  // 改变数据格式
  changeDataFormat = data => {
    let arr = [];
    const list = [];
    data.map((item, index) => {
      if (index !== 0 && index % 6 === 0) {
        list.push({ id: index, list: arr });
        arr = [];
      }
      arr.push(item);
      if (arr.length && index === (data.length - 1)) {
        list.push({ id: index, list: arr });
      }
    })
    return list;
  }

  // 点击Point
  onClickPoint = record => {
    const { activeList = [], list: dList = [], handlers } = this.state;
    const name = activeList.find(item => item === record.name);
    let list = [...activeList];
    const points = dList.filter(item => item.type === record.type);

    if (name) {
      this.postData({ pinType: record.pintype, icon: record.icon, popup: record.popup }, [], false);
      list = list.filter(item => item !== name);
    } else {
      this.postData({ pinType: record.pintype, icon: record.icon, popup: record.popup }, points, true);
      list.push(record.name);
    }

    this.setState({
      activeList: list
    });
    handlers.onClick && handlers.onClick(record);
  }

  postData = ({ pinType, popup, icon }, points = [], state) => {
    let posted = {
      type: SHOWNSTATE,
      flag: GRIDFLAG,
      pinType,
      points,
      params: { 'default': false, 'pinType': pinType, 'messageType': 'clear', icon, popup }
    };
    if (state) {
      posted.state = state;
    }
    try {
      console.info('POST', JSON.stringify(posted));
      window.postMessage(posted, '*');
    } catch (e) {
      console.error(e)
    }
  }

  // 上一页
  onPrevClick = () => {
    const { activeId = 0 } = this.state;
    this.setState({
      activeId: activeId - 1
    })
  }

  // 下一页
  onNextClick = () => {
    const { activeId = 0 } = this.state;
    this.setState({
      activeId: activeId + 1
    })
  }

  // 获取active
  getActiveStyle = record => {
    const { activeList = [] } = this.state;
    const active = activeList.find(ele => ele === record.name);
    const active_style = active ? styles.activePoint : '';
    return active_style || ''
  }

  render () {
    const { data = [], activeList = [], activeId = 0 } = this.state;
    const content = data => {
      const newList = data.list || [];
      return <div style = {{
          width: 786, height: 732, paddingLeft: '60px'}}>
        {
          newList && Array.isArray(newList) && newList.map((item, index) => {
            const active = activeList.find(ele => ele === item.name);
            const active_style = active ? styles.card_normal + ' ' + styles.activePoint : styles.card_normal;
            return <div key={index} className={active_style} onClick={this.onClickPoint.bind(this, item)}>
              <div style = {{display: 'flex', flexWrap: 'nowrap', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '100%', padding:'10% 0'}}>
                <div className={styles.title} title = {item.name}>{item.name}</div>
                <div className={styles.value}>{item.value}</div>
              </div>
             
            </div>
          })
        }
      </div>
    }

    return (
      <div style = {{ height: '100%', width: '100%' }} className={styles.list_layout}>
        {/* {
          activeId ? <div className={styles.prevImg} onClick={this.onPrevClick}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAABgklEQVQ4T53Uyy4EQRTG8f+pniEsrJBhaSHxMjYEsbETdI8FHkFsiLhNmP0sjBCv4D3sEZctYabrSLdOX2Z6LqaXX6p+qT516gj9fscvMwyxilfaj7dEmfRlHD2NM2x2gTXKpelwTyrrjQSLRxwXq9sIRbzSWAiksu5IvNiWEQGhxpfd/wOSrDPSCqheYOWWgizEQJAZ5yofyQMoXmP85QygVNieemtH/gkENc4iAwBZZEAgQapP4zQdF7UewTWEBdM6OEuZLKpBa28JldcS1t9CZAMwqJxi9R6jS5ns279kb/o9rzmF85d5RA5BZ4EHCmadhp1ryzYmHzt1d/okm6BBR52A3qMsI5LKRi/xxj7yTxKkZ88TCC4ibrhI5IIf/4aCBFCSffmVvF9KrjiBPFTBmHOsU4fGCiJJlgNl+2RAqL1jB4Dy384/oc6vOA8yekdTFzM14rPafZ6kIVCghtWD6CY9oqz3ZEugMkSTrSXrjcR9JDuZGRtCf1l/SAB1mfa/dXgY8Kbp8s8AAAAASUVORK5CYII=" />
          </div> : null
        } */}
        <VDSwiper
          style={{ width: '100%', height: '100%', padding: 0 }}
          data={data}
          content={record => content(record)}
          options={{
            // paginationType: 'fraction',
            loop: true,
            direction: 'horizontal',
            pagination: '',
            watchOverflow: true, // 当只有一个slide，swiper无效
            observer: true,  // 更新数据
            observeParents: true,
            mousewheelControl: true,
            // grabCursor : true, // cursor
          }}
          navigation={false}
          pagination={''}
        />
        {/* {
          (activeId !== data.length - 1) ? <div className={styles.nextImg} onClick={this.onNextClick}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAABkElEQVQ4T6XUz27TQBDH8e+sU1C40kpJ7n0PXqECEQ65t1VDqSp6QX0E/imxacSNS9VU7fMgcYBbsdKeciiiiXfQGpxkY7tEiU/Wz+vPzo7sEcL4mDtOOax9J7uKssnD/I3Qja+AL/y273jduEmXFGX3ImE8RBlhpMOvJEqhouxeJIo/orRQBWO6KVQ1x7ksq7IAE6JBDZvsINKeQGO9xOgzL8uqLERc2Pm5gbDnvWSDPoxeLALJBF4BmiIrVOQjS0J5ZB5y3RYTQnKOlWbaoyyrJBHbjZtixEFvr9Z5GOwi+gqwqPawco6RLS8zwadyxEG9wSZj+xl4AvIN1SPWzNf5rBwJh4/hdhf0AERRPUHog2x5WWkl7ijVYA/VdvoJqEaMtc+D4LmXKRH79et8JRlg7UtEHBDC2hkmaTKb/QPcHj6yBOAjSwJTZAXgLxL9qMGjbe+8FbnAytOyHsz/yEIYfwBaKeia6Bpm5E0u269fl80lhwyBEardFHCLi7KFZqzq+xSYnbGz2X9m7MrT/g8MoWEeJGEFvAAAAABJRU5ErkJggg==" />
          </div> : null
        } */}
      </div>
    )
  }
}

export default Index;
