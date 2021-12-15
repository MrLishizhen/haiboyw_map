import React from 'react'
import { Table, Tooltip } from 'antd';
import styles from '../index.less'

const columns = [
  {
    title: '小区名称',
    dataIndex: 'B',
    width: '40%',
    onCell: () => {
      return {
        style: {
          maxWidth: 340,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      }
    },
    render: (text, record) => {
      const { B } = record
      return <Tooltip placement="topLeft" title={B}>{B}</Tooltip>
    }
  },
  {
    title: '负责人',
    dataIndex: 'F',
    width: '20%'
  },
  {
    title: '上报状态',
    dataIndex: 'state',
    render: (text, record) => {
      const { state } = record
      const isTrue = state == '已结案'
      return (
        <span style={isTrue ? { color: '#00FF7D' } : { color: '#FF5151' }}>
          {state}
        </span>
      )
    }
  },
  // {
  //   title: '上报状态',
  //   dataIndex: 'dt',
  //   width: '40%',
  //   onCell: () => {
  //     return {
  //       style: {
  //         maxWidth: 340,
  //         overflow: 'hidden',
  //         whiteSpace: 'nowrap',
  //         textOverflow:'ellipsis'
  //       }
  //     }
  // },
  // render: (text, record) => {
  //   const { dt } = record
  //   return <Tooltip placement="topLeft" title={dt}>{dt}</Tooltip>
  // }
  // },
];

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

class RubbishTable extends React.Component {
  render() {
    const { dataProvider } = this.props
    const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
    const data = isHasData ? dataProvider : []

    return (
      <div className={styles.rubbishTable2}>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={data}
          rowClassName={styles.rowClassName}
          pagination={{
            position: 'bottom',
            defaultPageSize: 8,
            pageSize: 8
          }}
        />
      </div>
    );
  }
}

export default RubbishTable