import React from 'react';
import { isEqual } from 'lodash';
import VDCollapse from '../common/VDCollapse';
import Content from './Content';
import Header from './Header';

const datalist = []

/**
 * 卫监处置力量
 * wj_czll
 * 451*787
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      handlers: ''
    }
  }

  componentDidMount() {
    let list = [...datalist];
    const data = this.getDataProvider(this.props);
    const { numHits = 0, messages = [] } = data && data.length > 0 ? data[0] || {} : {};
    list = messages;

    // 绑定事件
    const { buffEvent = [{ type: 'click' }] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (record, type) => {
            method && method({ ...record, type }, bindedComponents)
          }
        }
      }
    }
    this.setState({
      data: list,
      handlers: Object.assign({}, eventValue)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props, nextProps)) {
      const data = this.getDataProvider(nextProps);
      const { numHits = 0, messages = [] } = data && data.length > 0 ? data[0] || {} : {};
      const list = messages;

      this.setState({
        data: list
      })
    }
  }

  // 校验数据集
  getDataProvider = props => {
    const { dataProvider } = props;
    if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== "") {
      return [...dataProvider]
    } else {
      return [];
    }
  }

  // 点击电话/搜索
  onClickHandlers = (record, type) => {
    const { handlers } = this.state;

    if (type === "phone" && record.name === "区政府") {
      handlers.onClick && handlers.onClick(record, type);
    }
    if (type === "search") {
      handlers.onClick && handlers.onClick(record, type);
    }
  }

  render() {
    const { data = [] } = this.state;

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <VDCollapse
          data={data}
          getDataSet={data => data}
          header={record => <Header data={record} onClick={(ele, type) => this.onClickHandlers.bind(this, ele, type)()} />}
          lineStyle={'2px solid #82B1FF'}
        />
      </div>
    )
  }
}

export default Index;
