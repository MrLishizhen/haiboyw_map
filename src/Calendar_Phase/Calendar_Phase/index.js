import React from 'react';
import { DatePicker } from 'antd';
import styles from './index.less';
const { RangePicker } = DatePicker;

/**
 * 日历-起止时间
 * _cnyw_date_pick
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handlers: ''
    }
  }

  componentDidMount() {
    const { buffEvent = [{ type: 'click' }], style = {} } = this.props;
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
      handlers: Object.assign({}, eventValue)
    })
  }

  // 更改时间
  onChange = (date, dateString) => {
    const { handlers } = this.state;
    handlers.onClick && handlers.onClick({ dateString });
  }

  render() {
    return <div style={{ width: '100%', height: '100%' }} className={styles.calendar_layout}>
      <RangePicker dropdownClassName={styles.calendar_extra} onChange={this.onChange} popupStyle={{ transform: 'scale(1.5)' }} />
    </div>
  }
}

export default Index;
