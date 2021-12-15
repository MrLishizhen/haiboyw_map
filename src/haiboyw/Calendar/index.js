import moment from 'moment';
import { DatePicker, InputNumber } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import stylesss from './index.less';

const icon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDYwICg4ODEwMykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+aWNvbi3ml6XljoY8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0i5ZCe5ZCQ6YePIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5ZCe5ZCQ6YePLeWNleS4queggeWktCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0NTcuMDAwMDAwLCAtMTAwLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0MzcuMDAwMDAwLCA5MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJpY29uLeaXpeWOhiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjAuMDAwMDAwLCAxMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjIuNSwzIEwyOC41LDMgQzI4Ljg5NzgyNDcsMyAyOS4yNzkzNTU2LDMuMTU4MDM1MjYgMjkuNTYwNjYwMiwzLjQzOTMzOTgzIEMyOS44NDE5NjQ3LDMuNzIwNjQ0NCAzMCw0LjEwMjE3NTI3IDMwLDQuNSBMMzAsMjguNSBDMzAsMjkuMzI4NDI3MSAyOS4zMjg0MjcxLDMwIDI4LjUsMzAgTDEuNSwzMCBDMC42NzE1NzI4NzUsMzAgMCwyOS4zMjg0MjcxIDAsMjguNSBMMCw0LjUgQzAsMy42NzE1NzI4OCAwLjY3MTU3Mjg3NSwzIDEuNSwzIEw3LjUsMyBMNy41LDAgTDEwLjUsMCBMMTAuNSwzIEwxOS41LDMgTDE5LjUsMCBMMjIuNSwwIEwyMi41LDMgWiBNMTkuNSw2IEwxMC41LDYgTDEwLjUsOSBMNy41LDkgTDcuNSw2IEwzLDYgTDMsMTIgTDI3LDEyIEwyNyw2IEwyMi41LDYgTDIyLjUsOSBMMTkuNSw5IEwxOS41LDYgWiBNMjcsMTUgTDMsMTUgTDMsMjcgTDI3LDI3IEwyNywxNSBaIE02LDE5LjUgTDksMTkuNSBMOSwyMi41IEw2LDIyLjUgTDYsMTkuNSBaIE0xMiwxOS41IEwyNCwxOS41IEwyNCwyMi41IEwxMiwyMi41IEwxMiwxOS41IFoiIGlkPSLlvaLnirYiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

// 日历控件
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: moment(),
      handlers: {},
      opacity: 0.5,
      day: 0,
      scale: 1,
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
    const { buffEvent = [{ type: 'click' }] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          handleDateChange: (date) => {
            const formateDate = date.format('YYYY-MM-DD');
            method && method({ value: formateDate || '' }, bindedComponents)
          }
        }
      }
    }
    this.changeWindow();
    this.setState({ handlers: { ...eventValue } });
    this.state.handlers.handleDateChange && this.state.handlers.handleDateChange(moment());
  }

  // 切换日期
  handleDateChange = date => {
    this.setState({ date: date });
    this.state.handlers.handleDateChange && this.state.handlers.handleDateChange(date);
  }

  handlePanelChange = (date, mode) => {
    this.setState({ date: date });
    this.state.handlers.handleDateChange && this.state.handlers.handleDateChange(date);
  }

  handleChangeDay = (mode) => {
    if (mode === 'minus') {
      let d = this.state.day - 1;
      if (d <= 0) d = 0
      this.setState({ day: d })
    }

    if (mode === 'plus') {
      this.setState({ day: this.state.day + 1 })
    }
  }

  extraFooter = props => {
    return (
      <div className={stylesss.extra_foot_root}>
        天数阀值
        <div style={{ width: '8px' }}></div>
        <div
          className={stylesss.extra_foot_button}
          onClick={() => this.handleChangeDay('minus')}
        >
          {"＜"}
        </div>
        <div>
          <InputNumber
            style={{ width: '30px' }}
            value={this.state.day}
            min={0}
            onChange={(evt) => this.setState({ value: evt.target.value })}
          ></InputNumber>
        </div>
        <div className={stylesss.extra_foot_button}
          onClick={() => this.handleChangeDay('plus')}
        >
          {"＞"}
        </div>
      </div>
    )
  }

  // 不可用日期
  disabledDate = current => {
    return current && current > moment().endOf('day');
  }

  render() {
    const { cal_width, cal_height } = this.state;
    const popupStyle = { maxWidth: 440, minWidth: 240, width: cal_width, height: cal_height };

    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }} ref={node => this.node = node}>
        <div style={{ paddingTop: '15px' }}>
          <DatePicker
            locale={locale}
            size='large'
            className={stylesss['haiboyw_datapicker']}
            popupStyle={{ ...popupStyle }}
            dropdownClassName={stylesss['haiboyw_datapicker_dropdown']}
            showToday={false}
            style={{ background: 'transparent', width: '1px', border: 'transparent', outline: 'none', marginTop: '38px', fontSize: 20 }}
            open={this.state.open}
            suffixIcon={null}
            border={false}
            getCalendarContainer={trigger => {
              return trigger.parentNode
            }}
            onOpenChange={(open) => {
              this.setState({ open: open })
            }}
            disabledDate={this.disabledDate}
            dateRender={(current, today) => {
              let style = {};
              const date = this.state.date;
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
            onChange={(date) => this.handleDateChange(date)}
            onPanelChange={(date, mode) => this.handlePanelChange(date, mode)}
            renderExtraFooter={() => this.extraFooter()}
          />
        </div>
        <div
          style={{ position: 'absolute', top: 0 }}
          onClick={() => this.setState({ open: true, opacity: 1 })}>
          <img style={{ cursor: 'pointer' }} src={icon} />
        </div>
      </div>
    )
  }
}

export default Index;
