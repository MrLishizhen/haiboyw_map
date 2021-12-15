import React, { Component } from 'react'
import styles from './styles.less';
import classNames from 'classnames/bind';
// import {getDataProvider} from '../../utils/DataUtils';
import { isEqual } from 'lodash'
import left from './assets/left.png';
import right from './assets/right.png';


var cx = classNames.bind(styles);


const CustomButton = props => {
  const {
    active = false,
    onClick,
    title,
    id,
    no,
    style
  } = props;

  const rootClass = cx({
    "button-slider-normal": !active,
    "button-slider-active": active
  })

  return (
    <div className={rootClass} style={{ ...style }} onClick={() => onClick && onClick({ id, no, title })}>
      {!active ? (
        <span className={styles['button-slider-text-normal']}>{title}</span>
        // <span className = {styles['button-slider-no-normal']}>{`No.${no}`}</span>
      ) : (
          <div className={styles['button-slider-text-content']}>
            {/* <span className = {styles['button-slider-no-normal']}>{`No.${no}`}</span>
          <div style = {{height: '80%', width: 1, background: 'rgba(151,151,151,1)'}}></div> */}
            <span className={styles['button-slider-text-normal']}>{title}</span>
          </div>
        )}
    </div>
  )
}

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeId: 0,
      px: 0,
      datalist: [],
      handlers: {}
    }
    this.index = 0;
  }

  componentWillUnmount() {
    this.clearTimer();
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
      const dataSets = this.getDataProvider(nextProps);
      this.setState({
        activeId: 0,
        px: 0,
        datalist: [].concat(dataSets)
      }, () => {

        this.clearTimer();
        this.setAutoPlay();
      })
    }
  }

  componentDidMount() {
    const dataSets = this.getDataProvider(this.props);

    const { buffEvent = [{ type: 'click' }] } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (evt) => {
            const { title, id, no } = evt;
            this.setState({ activeId: id })
            method && method({ id: no, name: title }, bindedComponents)
          }
        }
      }
    }

    this.setState({
      activeId: 0,
      px: 0,
      datalist: [].concat(dataSets),
      handlers: Object.assign({}, eventValue)
    })
    this.setAutoPlay();
  }

  setAutoPlay = () => {
    this.timer = setInterval(() => {
      const index = this.state.activeId;
      var newIndex = index + 1;
      if (newIndex > this.state.datalist.length - 1) {
        newIndex = 0;
        this.setState({ activeId: 0, px: 0 })
      } else {
        if ((newIndex) % 4 === 0) {
          this.handleSwitch('right')
        }
      }
      this.setState({ activeId: newIndex });
      const currentData = this.state.datalist[newIndex];
      this.state.handlers.onClick({ id: newIndex, no: currentData['A'], title: currentData['B'] })
    }, 15 * 1000);
  }

  clearTimer = () => { if (this.timer) clearInterval(this.timer) }

  handleSwitch = props => {
    const w = 2476;
    const px = this.state.px;
    let newpx = 0;
    if (props === 'left') {
      newpx = px + w;
      if (newpx > 0) newpx = 0
    } else {
      newpx = px - w;
      var len = Math.ceil(this.state.datalist.length / 4);
      if (newpx < -w * (len - 1)) newpx = -w * (len - 1);
    }
    this.setState({ px: newpx })
  }

  onMouseOver = () => {
    this.clearTimer();
  }

  onMouseLeave = () => {
    this.setAutoPlay();
  }

  render() {
    return (
      <div className={styles['button-slider-root']} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <div className={styles['button-slider-main']}>
          <div className={styles['button-slider-left']} onClick={() => this.handleSwitch('left')}><img src={left}></img></div>

          <div className={styles['button-slider-mask']}>
            <div className={styles['button-slider-content']} style={{ transform: `translateX(${this.state.px}px)` }}>
              {
                this.state.datalist.map((item, i) => {
                  const active = this.state.activeId === i ? true : false;
                  const x = (519 + 100) * i + 50;
                  const style = {
                    left: `${x}px`,
                    top: '30px'
                  }
                  return (
                    <CustomButton key={i} style={style} id={i} no={item['A']} title={item['B']} active={active} {...this.state.handlers} />
                  )
                })
              }
            </div>
          </div>
          <div className={styles['button-slider-left']} onClick={() => this.handleSwitch('right')}><img src={right}></img></div>
        </div>
      </div>
    )
  }
}
