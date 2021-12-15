import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom';
import { Table, Tooltip } from 'antd';
import styles from '../index.less';

const CONST_STATUS_COLOR = {
  '待接单': '#BDBDBD',
  '待分派': '#BDBDBD',
  '处置中': '#25ACFF',
  '待核查': '#25ACFF',
  'IOT核查中': '#25ACFF',
  '待审核': '#25ACFF',
  '作废审核': '#00FF8C',
  '已结案': '#00FF8C',
  '结束': '#00FF8C',
  '已取消': '#00FF8C'
};

// const columns = [
//   {
//     title: '案件名称',
//     dataIndex: 'questionTitle',
//     width: '20%',
//     onCell: () => {
//       return {
//         style: {
//           maxWidth: 200,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis'
//         }
//       }
//     },
//     render: (text, record) => {
//       const { questionTitle } = record
//       return <Tooltip overlayClassName={styles.tooltip_wrapper} placement='topLeft' title={<span style={{ fontSize: 36 }}>{questionTitle}</span>}>{questionTitle}</Tooltip>
//     }
//   },
//   {
//     title: '类型',
//     dataIndex: 'type',
//     width: '20%'
//   },
//   {
//     title: '发生时间',
//     dataIndex: 'creatDate',
//     width: '20%',
//     onCell: () => {
//       return {
//         style: {
//           maxWidth: 200,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis'
//         }
//       }
//     },
//     render: (text, record) => {
//       const { creatDate } = record
//       return <Tooltip overlayClassName={styles.tooltip_wrapper} placement='topLeft' title={<span style={{ fontSize: 36 }}>{creatDate}</span>}>{creatDate}</Tooltip>
//     }
//   },
//   {
//     title: '发生位置',
//     dataIndex: 'addr',
//     width: '20%',
//     onCell: () => {
//       return {
//         style: {
//           maxWidth: 200,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis'
//         }
//       }
//     },
//     render: (text, record) => {
//       const { addr } = record
//       return <Tooltip overlayClassName={styles.tooltip_wrapper} placement='topLeft' title={<span style={{ fontSize: 36 }}>{addr}</span>}>{addr}</Tooltip>
//     }
//   },
//   {
//     title: '处置阶段',
//     dataIndex: 'flowStatus',
//     width: '20%',
//     onCell: (record) => {
//       const color = record ? CONST_STATUS_COLOR[record['flowStatus']] : '#fff';

//       return {
//         style: {
//           color
//         }
//       }
//     }
//   },
// ];

// const columns = [
//   {
//     title: '小区名称',
//     dataIndex: 'B',
//     width: '25%',
//     onCell: () => {
//       return {
//         style: {
//           maxWidth: 340,
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           textOverflow: 'ellipsis'
//         }
//       }
//     },
//     render: (text, record) => {
//       const { B } = record
//       return <Tooltip placement='topLeft' title={<span style={{ fontSize: 36 }}>{B}</span>}>{B}</Tooltip>
//     }
//   },
//   {
//     title: '负责人',
//     dataIndex: 'F',
//     width: '25%'
//   },
//   {
//     title: '上报状态',
//     dataIndex: 'state',
//     width: '25%',
//     render: (text, record) => {
//       const { state } = record
//       const color = state ? CONST_STATUS_COLOR[state] : '#fff';

//       return (
//         <span style={{ color }}>
//           {state}
//         </span>
//       )
//     }
//   },
//   {
//     title: 'AI催告状态',
//     dataIndex: 'aiStatus'
//   },
// ];

class RubbishTable extends PureComponent {
  componentDidMount() {
    try {
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

      this.setState({ handlers: Object.assign({}, eventValue) });
    } catch (e) {
      console.error(e);
    }
  }

  onClick = (record) => {
    const { handlers } = this.state;

    handlers && handlers.onClick && handlers.onClick(record);
  }

  imageClick = (data, index) => {
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
    const { dataProvider } = this.props;
    const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0]);
    const data = isHasData ? dataProvider : [];

    const columns = [{
      title: '工单号',
      dataIndex: 'flowNo',
      width: `${100 / 9}%`
    }, {
      title: '创建人',
      dataIndex: 'createUserName',
      width: `${100 / 9}%`
    }, {
      title: '创建时间',
      dataIndex: 'creatDate',
      width: `${100 / 9}%`
    }, {
      title: '街道',
      dataIndex: 'caseStreet',
      width: `${100 / 9}%`
    }, {
      title: '工单分类',
      dataIndex: 'caseType',
      width: `${100 / 9}%`
    }, {
      title: '工单描述',
      dataIndex: 'caseDes',
      width: `${100 / 9}%`
    }, {
      title: '详细地址',
      dataIndex: 'caseAddr',
      width: `${100 / 9}%`
    }, {
      title: '物业/居委',
      dataIndex: 'ywjw',
      width: `${100 / 9}%`,
      render: (text, record) => {
        const { dataType } = record;

        if (dataType === '物业') {
          return record['wuye'];
        } else if (dataType === '居委') {
          return record['juwei'];
        }
      }
    }, {
      title: '图片',
      dataIndex: 'images',
      width: `${100 / 9}%`,
      render: (text, record) => {
        let { casePhoto, caseDonePhoto } = record;
        let images = [];

        try {
          casePhoto = JSON.parse(casePhoto);
          images = [...images, ...casePhoto];
          caseDonePhoto = JSON.parse(caseDonePhoto);
          images = [...images, ...caseDonePhoto];
        } catch (e) {
          console.error(e);
        }

        return (
          <div>
            {Array.isArray(images) && images.map((item, index) => {
              return (
                <div key={item.serverId}>
                  <img className='img_item' src={`http://10.89.7.160:9527/itsmApp${item.downloadPath}`} style={{ marginTop: index !== 0 ? 12 : 0, height: 80 }} onClick={this.imageClick.bind(this, images, index)} />
                </div>
              );
            })}
          </div>
        );
      }
    }];

    return (
      <div className={styles.rubbishTable3}>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={Array.isArray(data) ? data.map((item, index) => ({ ...item, id: index })) : []}
          rowClassName={styles.rowClassName}
          pagination={{
            position: 'bottom',
            defaultPageSize: 6,
            pageSize: 6
          }}
          onRow={record => {
            return {
              onClick: this.onClick.bind(this, record)
            }
          }}
        />
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
    const { data, scale } = this.props;
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
          <img className='img_item' src={`http://10.89.7.160:9527/itsmApp${data[current].downloadPath}`} style={{ maxWidth: '100%' }} onClick={this.onClick.bind(this)} />
          {data && data.length > 1 && <div className={[styles.list_btn, styles.next].join(' ')} onClick={this.onChange.bind(this, 'next')} />}
        </div>
      </Fragment>
    );
  }
}

export default RubbishTable