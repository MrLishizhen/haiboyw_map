import React from 'react';
import styles from './index.less';

/**
 * 可折叠面板
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      expendName: ''
    }
  }

  componentDidMount() {
    const { data = [] } = this.props;
    this.setState({
      data,
      expendName: data && data[0] ? data[0].name : ''
    })
  }

  // 展开
  onExpend = name => {
    // const { expendName = '' } = this.state;
    // let currName = name;
    // if (expendName === name) {
    //   currName = '';
    // }
    // this.setState({
    //   expendName: currName
    // })
  }

  // 修改数据结构
  getDataSet = data => {
    const list = [];
    data.map(item => {
      const isContains = list.filter(ele => ele.name === item.streetname);
      if (isContains && isContains.length) {
        isContains[0].list = [...isContains[0].list, item]
      } else {
        list.push({ name: item.streetname, list: [item] })
      }
    })
    return list;
  }

  render() {
    const { expendName = '' } = this.state;
    const { header, content, data = [], lineStyle = '', getDataSet } = this.props;
    const list = typeof getDataSet === 'function' ? getDataSet(data) : this.getDataSet(data);

    return (
      <div style={{ width: '100%', height: '100%' }} className={styles.collapse_layout}>
        <ul>
          {
            list.map((item, index) => {
              return <li key={index} style={{ borderBottom: lineStyle }}>
                <div onClick={this.onExpend.bind(this, item.name)}>{header(item)}</div>
                {
                  expendName === item.name ? content(item) : null
                }
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default Index;
