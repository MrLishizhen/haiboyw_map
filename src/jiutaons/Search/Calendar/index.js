import moment from 'moment';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import styles from './index.less';

// 日历控件
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cal_width: 440,
      cal_height: 314
    }
    this.node = '';
  }

  // 切换窗口大小，改变日历大小
  changeWindow = () => {
    const canvas_pannel = document.getElementById('panel_canvas');
    const parentNode = canvas_pannel || this.node.parentNode;
    // 阀值日历最大值
    // const thelod = 240; // 0.125, height: 0.16
    // const cal_width = 440; // 0.23, height: 0.29
    const cal_width = parentNode && (parentNode.clientWidth * 0.13);
    const cal_height = parentNode && (parentNode.clientHeight * 0.29);
    this.setState({
      cal_width,
      cal_height
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.changeWindow);
    // const { buffEvent = [{ type: 'click' }] } = this.props;

    // for (let i = 0; i < buffEvent.length; i++) {
    //   const eventObj = buffEvent[i];
    //   const { type, method, bindedComponents } = eventObj;
    //   if (type === 'click') {
    //     eventValue = {
    //       handleDateChange: (date) => {
    //         const formateDate = date.format('YYYY-MM-DD');
    //         method && method({ value: formateDate || '' }, bindedComponents)
    //       }
    //     }
    //   }
    // }
    this.changeWindow();
  }

  // 不可用日期
  disabledDate = current => {
    return current && current > moment().endOf('day');
  }

  render() {
    const { cal_width, cal_height } = this.state;
    const popupStyle = { maxWidth: 440, minWidth: 250, width: cal_width, height: cal_height };

    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={node => this.node = node} className={styles.calendar_wrapper}>
        <DatePicker
          allowClear={false}
          dateRender={(current, today) => {
            let style = {};
            if (moment(current).format('YYYY-MM-DD') === moment(today).format('YYYY-MM-DD')) {
              style = {
                background: '#40A163',
                boxShadow: '0 16px 7px 3px rgba(7,30,69,0.05)',
                color: '#DDEAFF',
                border: 1
              }
            }
            return (
              <div style={style}>
                {current.date()}
              </div>
            );
          }}
          value={this.props.value}
          disabledDate={this.disabledDate}
          dropdownClassName={styles['datapicker_dropdown']}
          getCalendarContainer={trigger => trigger.parentNode}
          locale={locale}
          size='large'
          style={{ width: 250 }}
          placeholder='时间'
          popupStyle={{ ...popupStyle }}
          onChange={(date, dateString) => { if (typeof this.props.handleDateChange === 'function') this.props.handleDateChange(date, dateString) }}
        />
      </div>
    )
  }
}

export default Index;
