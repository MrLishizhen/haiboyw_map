import React, { PureComponent, Fragment } from 'react';
import { Timeline, Tooltip, Modal } from 'antd';
import moment from 'moment';
import styles from './index.less';

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pic: ''
    };
  }

  imgClick(data = [], index = 1) {
    let dom = document.createElement('div');
    const scale = 1 / window.devicePixelRatio;
    dom.style = `
        position: fixed;
        top:0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0,0,0,0.6);
        cursor: pointer;
    `;
    ReactDOM.render(<ImgItem current={index} data={data} scale={scale} />, dom);
    dom.onclick = function (e) {
      if (e.target.className && (/*e.target.className === 'img_item' ||*/ e.target.className.indexOf('list_btn') !== -1)) {
        return;
      }
      ReactDOM.unmountComponentAtNode(dom);
      document.body.removeChild(dom);
    }
    document.body.appendChild(dom);
  }

  render() {
    const { detail = {}, logInfo = [] } = this.props;
    const { upPicture = [] } = detail;

    return (
      <Fragment>
        <div className={styles.dialog_wrapper}>
          <div className={styles.dialog_title}>
            {`工单号：${detail.flowNo || ''}`}
          </div>
          <div className={styles.dialog_close} onClick={() => { if (typeof this.props.onDialogEvent === 'function') this.props.onDialogEvent(null) }} />
          <div className={styles.dialog_main}>
            <Info data={detail} style={{ width: 744 }} />
            <div className={styles.divider} style={{ left: 730 }} />
            <Circulation logInfo={logInfo} style={{ width: 541 }} />
            <div className={styles.divider} style={{ left: 1294 }} />
            <div className={styles.image_list_wrapper} style={{ marginLeft: 24 }}>
              <div className={styles.icon_title} style={{ marginBottom: 18 }}>
                <div className={styles.icon}></div>
                <div className={styles.value}>事件图片</div>
              </div>
              <div className={styles.image_list}>
                {upPicture && upPicture.length > 0 ?
                  upPicture.map((item, index) => {
                    return (
                      <div className={styles.image_item} onClick={this.imgClick.bind(this, upPicture, index)}>
                        <img src={item.downloadPath} height='160' style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} />
                      </div>
                    );
                  }) :
                  <Fragment>
                    <div className={styles.image_item_empty} />
                    <div className={styles.image_item_empty} />
                    <div className={styles.image_item_empty} />
                  </Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

class Info extends PureComponent {
  render() {
    const { data = {} } = this.props;

    return (
      <div className={styles.dialog_info} style={{ ...this.props.style }}>
        <div className={styles.double}>
          <div>
            <div className={styles.label}>事件来源</div>
            <div className={styles.value} title={data.flowSource}>{data.flowSource || ''}</div>
          </div>
          <div>
            <div className={styles.label}>发现时间</div>
            <div className={styles.value} title={data.reportDate}>{data.reportDate || ''}</div>
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.label}>发生地址</div>
          <div className={styles.value} title={data.addr}>{data.addr || ''}</div>
        </div>
        <div className={styles.double}>
          <div>
            <div className={styles.label}>事件归属</div>
            <div className={styles.value} title={data.classA}>{data.classA || ''}</div>
          </div>
          <div>
            <div className={styles.label}>事件分类</div>
            <div className={styles.value} title={data.classB}>{data.classB || ''}</div>
          </div>
        </div>
        <div className={styles.double}>
          <div>
            <div className={styles.label}>事件名称</div>
            <div className={styles.value} title={data.classC}>{data.classC || ''}</div>
          </div>
          <div>
            <div className={styles.label}>要点信息</div>
            <div className={styles.value} title={data.classD}>{data.classD || ''}</div>
          </div>
        </div>
        <div className={styles.double}>
          <div>
            <div className={styles.label}>街镇园区</div>
            <div className={styles.value} title={data.street}>{data.street || ''}</div>
          </div>
          <div>
            <div className={styles.label}>紧急程度</div>
            <div className={styles.value} title={data.emergency}>{data.emergency || ''}</div>
          </div>
        </div>
        <div className={styles.double}>
          <div>
            <div className={styles.label}>受理单位</div>
            <div className={styles.value} title={data.jiedaodanwei}>{data.jiedaodanwei || ''}</div>
          </div>
          <div>
            <div className={styles.label}>处置单位</div>
            <div className={styles.value} title={data.chuzhidanwei}>{data.chuzhidanwei || ''}</div>
          </div>
        </div>
        <div className={styles.single}>
          <div className={styles.label}>问题标题</div>
          <div className={styles.value} title={data.questionTitle}>{data.questionTitle || ''}</div>
        </div>
        <div className={styles.single}>
          <div className={styles.label}>问题描述</div>
          <div className={styles.value} title={data.desc}>{data.desc || ''}</div>
        </div>
        <div className={styles.single}>
          <div className={styles.label}>结案时间</div>
          <div className={styles.value} title={data.finishDate}>{data.finishDate || ''}</div>
        </div>
        <div className={styles.single}>
          <div className={styles.label}>结案意见</div>
          <div className={styles.value} title={data.finishRemark}>{data.finishRemark || ''}</div>
        </div>
      </div>
    )
  }
}

class Circulation extends PureComponent {
  render() {
    const { logInfo = [] } = this.props;

    return (
      <div className={styles.dialog_circulation} style={{ ...this.props.style }}>
        <div className={styles.icon_title}>
          <div className={styles.icon}></div>
          <div className={styles.value}>流转记录</div>
        </div>
        {
          logInfo && logInfo.length > 0 ?
            <div className={styles.timeline}>
              <Timeline>
                {logInfo.map((item, index) => {
                  return (
                    <Timeline.Item key={index} dot={null}>
                      <div className={styles.timeline_item}>
                        <div className={styles.date}>{moment(item.createDate, 'YYYY-MM-DD HH:mm:ss').format('MM月DD日')}</div>
                        <div className={styles.info}>
                          <table>
                            <thead>
                              <tr>
                                <th>操作名称</th>
                                <th>当前节点</th>
                                <th>提交时间</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{item.nodeName}</td>
                                <td>{item.nowNodeName}</td>
                                <td>{item.createDate}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className={styles.desc}>
                            {item.operationContent}
                          </div>
                        </div>
                      </div>
                    </Timeline.Item>
                  )
                })}
              </Timeline>
            </div> :
            <div className={styles.empty}>
              暂无记录
            </div>
        }
      </div>
    );
  }
}

class ImgItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.current
    }
  }

  onClick = (e) => { }

  onChange(type, e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const { current } = this.state;
    const { data = [] } = this.props;

    if (type === 'next') {
      if (current < data.length - 1) {
        this.setState({ current: current + 1 })
      }
    } else if (type === 'prev') {
      if (current > 0) {
        this.setState({ current: current - 1 })
      }
    }
  }

  render() {
    const { current } = this.state;
    const { data = [], scale } = this.props;
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `scale(${scale}) translate(-${50 / scale}%, -${50 / scale}%)`,
      cursor: 'pointer'
    };

    return (
      <Fragment>
        <div style={style}>
          {data && data.length > 1 && <div className={[styles.list_btn, styles.prev].join(' ')} onClick={this.onChange.bind(this, 'prev')} />}
          <img className='img_item' src={data[current]?.downloadPath} style={{ maxWidth: '100%',maxHeight:(window.innerHeight-100)||980+'px' }} onClick={this.onClick.bind(this)} />
          {data && data.length > 1 && <div className={[styles.list_btn, styles.next].join(' ')} onClick={this.onChange.bind(this, 'next')} />}
        </div>
      </Fragment>
    );
  }
}
