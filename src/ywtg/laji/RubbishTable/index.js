import React from 'react'
import { Table } from 'antd';
import styles from '../index.less'
import da from '../img/da.png'
import dl from '../img/dl.png'

class RubbishTable extends React.Component {

    getMock = () => {

        const { dataProvider } = this.props
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [{click:'居委'}]
        const tableName = data[0].click == '居委'? '居委' : '物业'
        return [
            {
              title: '姓名/编号',
              dataIndex: 'name',
              width: '25%'
            },
            {
              title: tableName,
              dataIndex: 'tp',
              width: '25%',
              // onCell: () => {
              //     return {
              //       style: {
              //         maxWidth: 120,
              //         overflow: 'hidden',
              //         whiteSpace: 'nowrap',
              //         textOverflow:'ellipsis'
              //       }
              //     }
              // }
            },
            {
              title: '状态',
              dataIndex: 'status',
              width: '20%',
              render: (text, record) => {
                  const { status } = record
                  const isTrue = status == '在岗' 
                  return (
                      <span style={isTrue ? {color: '#00FF8F'} : {color : '#666666'}}>
                          {record.status}
                      </span>
                  )
              }
            },
            {
              title: '操作',
              dataIndex: 'option',
              width: '30%',
              render: (text, record) => {
                  const { option } = record 
                  return (
                      <span>
                          {option ? (
                              <img src={dl} />
                          ) : (
                              <img src={da} />
                          )}
                      </span>
                  )
              }
            },
          ];
    }

    render() {

        const { dataProvider } = this.props
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [{click:'居委'}]
        const columns = this.getMock()
    return (
      <div className={styles.rubbishTable1}>
        <Table
            
            // tableLayout='fixed'
            rowKey={(record) => record.id}
            columns={columns} 
            dataSource={data} 
            // locale= {
            //     {emptyText: '9'}
            // }
            rowClassName={styles.rowClassName} 
            pagination={{
                position: 'bottom',
                defaultPageSize: 10,
                pageSize: 10
            }}
        />
      </div>
    );
  }
}

export default RubbishTable