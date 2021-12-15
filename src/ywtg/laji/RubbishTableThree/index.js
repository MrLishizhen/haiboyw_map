import React from 'react'
import { Table, Tooltip } from 'antd';
import styles from '../index.less'

const columns = [
  {
    title: '案件名称',
    dataIndex: 'NAME',
    width: '20%',
    onCell: () => {
      return {
        style: {
          maxWidth: 170,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow:'ellipsis'
        }
      }
  },
  render: (text, record) => {
    const { NAME } = record
    return <Tooltip placement="topLeft" title={NAME}>{NAME}</Tooltip>
  }
  },
  {
    title: '位置',
    dataIndex: 'address',
    width: '30%',
    onCell: () => {
      return {
        style: {
          maxWidth: 260,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow:'ellipsis'
        }
      }
  },
  render: (text, record) => {
    const { address } = record
    return <Tooltip placement="topLeft" title={address}>{address}</Tooltip>
  }
  },
  // {
  //   title: '上报状态',
  //   dataIndex: 'status',
  //   render: (text, record) => {
  //       const { status } = record
  //       const isTrue = status == '已上报' 
  //       return (
  //           <span style={isTrue ? {color: '#00FF7D'} : {color : '#FF5151'}}>
  //               {record.status}
  //           </span>
  //       )
  //   }
  // },
  {
    title: '发生时间',
    dataIndex: 'dt',
    width: '30%',
    onCell: () => {
      return {
        style: {
          maxWidth: 260,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow:'ellipsis'
        }
      }
  },
  render: (text, record) => {
    const { dt } = record
    return <Tooltip placement="topLeft" title={dt}>{dt}</Tooltip>
  }
  },
  {
    title: '案件阶段',
    dataIndex: 'state',
    width: '20%',
  },
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
      <div className={styles.rubbishTable3}>
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