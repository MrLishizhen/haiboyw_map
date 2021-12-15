import React from 'react';
import search from '../img/search.png';
import phone from '../img/phone.png';
import right from '../img/right.png';
import styles from './index.less';

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
    const { data } = this.props;

    return (
      <div style={{ height: '100%', width: '100%' }} className={styles.header_layout} onClick={this.onClickSearch} title={data.name ? `点击可查看${data.name}城市运行管理中心` : '长宁区城市运行管理平台'}>
        <div>{data.name}</div>
        <div style={{ lineHeight: '100%' }}>
          {/* <img src={search} alt="#" className={styles.pic} onClick={this.onClickSearch}/>
          <img src={phone} alt="#" className={styles.pic} onClick={this.onClickPhone}/> */}
          <img src={right} alt='#' style={{ width: 56, height: 56 }} />
        </div>
      </div>
    )
  }
}

export default Index;
