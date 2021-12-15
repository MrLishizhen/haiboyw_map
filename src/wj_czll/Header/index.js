import React from 'react';
import styles from './index.less';
import { Select } from 'antd';

import phone from '../img/phone.svg';

const { Option } = Select;

/**
 * 街道网格化管理-头
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.ref = React.createRef();
  }

  // 点击搜索按钮
  onClickSearch = () => {
    const { data, onClick } = this.props;
    onClick(data, "search");
  }

  // 点击电话按钮
  onClickPhone = () => {
    // const { data, onClick } = this.props;
    // onClick(data, "phone");
  }

  render() {
    const { data = {} } = this.props.data || {}
    const { department = [], status, name } = data;

    return (
      <div style={{ height: '100%', width: '100%' }} className={styles.header_layout} ref={this.ref} onClick={this.onClickSearch}>
        <div style={{ width: '100%' }}>
          <div className={styles.first}>
            <div>
              部门：
              {department && department.length > 1 ?
                <Select className={styles.select} size='large' defaultValue={department[0]} getPopupContainer={() => this.ref.current}>
                  {department.map((item, index) => {
                    return <Option key={index} value={item}>{item}</Option>
                  })}
                </Select> :
                department[0] || ''
              }
            </div>
            <div>
              状态：{status === '1' ? '在岗' : '离岗'}
            </div>
          </div>
          <div style={{ textAlign: 'left' }}>
            {/* <div style={{ float: 'left' }}> */}
              姓名：{name}
            {/* </div> */}
            {/* <img src={phone} style={{ width: 40, height: 46 }} /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Index;
