import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Form, DatePicker, Select, Input, Button, Table, Tooltip, message } from 'antd';
import styles from './index.less'
import moment from 'moment';
const { RangePicker } = DatePicker;
moment.locale('zh-cn');

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { add } from 'lodash';
const { Option } = Select;
// 10.207.204.32:5412 生产
// 10.10.14.222:5525 测试

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      jvweiArr: [], // 居委下拉框数据
      xiaoquArr: [], // 小区下拉框数据
      loudongArr: [], // 楼栋下拉框数据
      dataCount: 0, //数据数量
      dataArr: [], //数据
    };
  }

  componentDidMount() {
    this.getjvweiData();
    // 默认查询最近两天数据
    this.queryRecentlyTwoDay();
  }

  // 查询居委
  getjvweiData = () => {
    axios.post(
      'http://10.207.204.32:5412/vdataservice/getHQ_committee',
      {}
    )
      .then((response) => {
        const { status, data } = response
        if (status == 200) {
          const { result } = data;
          this.setState({ jvweiArr: result });
        }
      })
      .catch((error) => {
        console.error('居委信息查询失败')
      })
  }

  // 根据居委查询小区
  getxiaoquData = (value) => {
    axios.post(
      `http://10.207.204.32:5412/vdataservice/getHQ_residential?committee_name=${value}`,
    )
      .then((response) => {
        const { status, data } = response
        if (status == 200) {
          const { result } = data;
          this.setState({ xiaoquArr: result });
        }
      })
      .catch((error) => {
        console.error('小区信息查询失败')
      })
  }

  // 根据小区查询楼栋
  getloudongData = (value) => {
    axios.post(
      `http://10.207.204.32:5412/vdataservice/getHQ_residential_address?residential_name=${value}`,
    )
      .then((response) => {
        const { status, data } = response
        if (status == 200) {
          const { result } = data;
          this.setState({ loudongArr: result });
        }
      })
      .catch((error) => {
        console.error('楼栋信息查询失败')
      })
  }

  // 居委下拉框
  handleChangejw(value) {
    this.setState({}, () => {
      // 根据居委获得小区下拉列表
      this.getxiaoquData(value);
      this.props.form.setFieldsValue({
        jvzhudizhi: undefined,
        xiaoqu: undefined,
        loudong: undefined
      });
    });
  }

  // 小区下拉框
  handleChangexq(value) {
    this.setState({}, () => {
      // 根据小区获得居住楼栋下拉列表
      this.getloudongData(value);
    });
  }

  // 居住楼栋下拉框
  handleChangeld(value) {
    // console.log(`selected ${value}`);
  }

  // 地址输入框
  handleChangeJzdz() {
    this.props.form.setFieldsValue({
      jvwei: undefined,
      xiaoqu: undefined,
      loudong: undefined,
    });
  }

  // 时间选择框
  onChange(date, dateString) {

  }

  //导出按钮
  exportBtn() {
    const { form } = this.props;
    const jwForm = form.getFieldValue("jvwei");
    const xqForm = form.getFieldValue("xiaoqu");
    const ldForm = form.getFieldValue("loudong");
    const dzForm = form.getFieldValue("jvzhudizhi");
    const rqForm = form.getFieldValue("riqi");
    let startDate = moment(rqForm[0]).format("YYYY-MM-DD");
    let endDate = moment(rqForm[1]).format("YYYY-MM-DD");
    let address = ldForm !== undefined ? ldForm : dzForm;

    if (address !== undefined) {
      window.open(`http://10.207.204.32:5412/vdataservice/downHQ48h5d?address=${address}&endDate=${endDate}&startDate=${startDate}`);
      // axios.get(
      //   `http://10.207.204.32:5412/vdataservice/downHQ48h5d?address=${address}&endDate=${endDate}&startDate=${startDate}`,
      //   {}
      // )
      //   .then((response) => {
      //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
      //       window.navigator.msSaveBlob(response, name);
      //     } else {
      //       const URL = window.URL || window.webkitURL;
      //       const downloadUrl = URL.createObjectURL(response);
      //       const a = document.createElement('a');

      //       if (typeof a.download === 'undefined') {
      //         window.location = downloadUrl;
      //       } else {
      //         a.download = name;
      //         a.href = downloadUrl;
      //         a.style.display = 'none';
      //         document.body.appendChild(a);
      //         a.click();
      //         window.URL.revokeObjectURL(downloadUrl);
      //         document.body.removeChild(a);
      //       }
      //     }
      //   })
      //   .catch((error) => {
      //     console.error('导出失败')
      //   })
    } else {
      window.open(`http://10.207.204.32:5412/vdataservice/downHQ48h5d?endDate=${endDate}&startDate=${startDate}`);
      // if ((jwForm != undefined && address == undefined) || (xqForm != undefined && address == undefined)) {
      //   message.error('请选择地址或填写地址');
      // } else {
      //   axios.get(
      //     `http://10.207.204.32:5412/vdataservice/downHQ48h5d?endDate=${endDate}&startDate=${startDate}`,
      //     {}
      //   )
      //     .then((response) => {
      //       if (typeof window.navigator.msSaveBlob !== 'undefined') {
      //         window.navigator.msSaveBlob(response, name);
      //       } else {
      //         const URL = window.URL || window.webkitURL;
      //         const downloadUrl = URL.createObjectURL(response);
      //         const a = document.createElement('a');

      //         if (typeof a.download === 'undefined') {
      //           window.location = downloadUrl;
      //         } else {
      //           a.download = name;
      //           a.href = downloadUrl;
      //           a.style.display = 'none';
      //           document.body.appendChild(a);
      //           a.click();
      //           window.URL.revokeObjectURL(downloadUrl);
      //           document.body.removeChild(a);
      //         }
      //       }
      //     })
      //     .catch((error) => {
      //       console.error('导出失败')
      //     })
      // }
    }
  }

  // 查询按钮
  queryBtn() {
    const { form } = this.props;
    const jwForm = form.getFieldValue("jvwei");
    const xqForm = form.getFieldValue("xiaoqu");
    const ldForm = form.getFieldValue("loudong");
    const dzForm = form.getFieldValue("jvzhudizhi");
    const rqForm = form.getFieldValue("riqi");
    let startDate = moment(rqForm[0]).format("YYYY-MM-DD");
    let endDate = moment(rqForm[1]).format("YYYY-MM-DD");
    // let startDate = "2022-03-27";
    // let endDate = "2022-04-01";
    let address = ldForm !== undefined ? ldForm : dzForm
    if (address !== undefined) {
      axios.post(
        `http://10.207.204.32:5412/vdataservice/getHQ48h5d?endDate=${endDate}&page=1&size=10&startDate=${startDate}&address=${address}`,
        {}
      )
        .then((response) => {
          const { status, data } = response;
          if (status == 200) {
            const { result } = data;
            this.setState({ dataCount: result.count, dataArr: result.data });
          }
        })
        .catch((error) => {
          console.error('数据查询失败')
        })
    } else {
      if ((jwForm != undefined && address == undefined) || (xqForm != undefined && address == undefined)) {
        message.error('请选择活填写地址');
      } else {
        axios.post(
          `http://10.207.204.32:5412/vdataservice/getHQ48h5d?endDate=${endDate}&page=1&size=10&startDate=${startDate}`,
          {}
        )
          .then((response) => {
            const { status, data } = response;
            if (status == 200) {
              const { result } = data;
              debugger
              this.setState({ dataCount: result.count, dataArr: result.data });
            }
          })
          .catch((error) => {
            console.error('数据查询失败')
          })
      }
    }
  }

  // 初始化时默认查询近两天数据
  queryRecentlyTwoDay = () => {
    let startDate = moment().startOf('day').subtract(1, "day").format("YYYY-MM-DD");
    let endDate = moment().startOf('day').format("YYYY-MM-DD");
    // let startDate = "2022-03-27";
    // let endDate = "2022-04-01";
    axios.post(
      `http://10.207.204.32:5412/vdataservice/getHQ48h5d?endDate=${endDate}&page=1&size=10&startDate=${startDate}`,
      {}
    )
      .then((response) => {
        const { status, data } = response;
        if (status == 200) {
          const { result } = data;
          this.setState({ dataCount: result.count, dataArr: result.data });
        }
      })
      .catch((error) => {
        console.error('数据查询失败')
      })
  }

  // 分页
  onPaginationChange = (current) => {
    const { form } = this.props;
    const ldForm = form.getFieldValue("loudong");
    const dzForm = form.getFieldValue("jvzhudizhi");
    const rqForm = form.getFieldValue("riqi");
    let startDate = moment(rqForm[0]).format("YYYY-MM-DD");
    let endDate = moment(rqForm[1]).format("YYYY-MM-DD");
    // let startDate = "2022-03-27";
    // let endDate = "2022-04-01";
    let address = ldForm !== undefined ? ldForm : dzForm
    if (address !== undefined) {
      axios.post(
        `http://10.207.204.32:5412/vdataservice/getHQ48h5d?endDate=${endDate}&page=${current}&size=10&startDate=${startDate}&address=${address}`,
        {}
      )
        .then((response) => {
          const { status, data } = response;
          if (status == 200) {
            const { result } = data;
            this.setState({ dataCount: result.count, dataArr: result.data });
          }
        })
        .catch((error) => {
          console.error('数据查询失败')
        })
    } else {
      axios.post(
        `http://10.207.204.32:5412/vdataservice/getHQ48h5d?endDate=${endDate}&page=${current}&size=10&startDate=${startDate}`,
        {}
      )
        .then((response) => {
          const { status, data } = response;
          if (status == 200) {
            const { result } = data;
            this.setState({ dataCount: result.count, dataArr: result.data });
          }
        })
        .catch((error) => {
          console.error('数据查询失败')
        })
    }
  }

  render() {
    const { jvweiArr = [], xiaoquArr = [], loudongArr = [], dataArr = [], dataCount = 0 } = this.state;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '居委名称',
        dataIndex: 'JWHHZ',
        width: '15%',
        onCell: () => {
          return {
            style: {
              maxWidth: 170,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { JWHHZ } = record
          return <Tooltip placement="topLeft" title={JWHHZ} overlayClassName={styles.ant_tooltip}>{JWHHZ}</Tooltip>
        }
      },
      {
        title: '居住小区',
        dataIndex: 'XQ',
        width: '15%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { XQ } = record
          return <Tooltip placement="topLeft" title={XQ} overlayClassName={styles.ant_tooltip}>{XQ}</Tooltip>
        }
      },
      {
        title: '居住地址',
        dataIndex: 'JZDZ',
        width: '20%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { JZDZ } = record
          return <Tooltip placement="topLeft" title={JZDZ} overlayClassName={styles.ant_tooltip}>{JZDZ}</Tooltip>
        }
      },
      {
        title: '地址人数',
        dataIndex: 'DZ_SUM',
        width: '11%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { DZ_SUM } = record
          return <Tooltip placement="topLeft" title={DZ_SUM} overlayClassName={styles.ant_tooltip}>{DZ_SUM}</Tooltip>
        }
      },
      {
        title: '48小时采样数',
        dataIndex: 'SUM_48H',
        width: '11%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { SUM_48H } = record
          return <Tooltip placement="topLeft" title={SUM_48H} overlayClassName={styles.ant_tooltip}>{SUM_48H}</Tooltip>
        }
      },
      {
        title: '5天内采样数',
        dataIndex: 'SUM_5DAY',
        width: '11%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { SUM_5DAY } = record
          return <Tooltip placement="topLeft" title={SUM_5DAY} overlayClassName={styles.ant_tooltip}>{SUM_5DAY}</Tooltip>
        }
      },
      {
        title: '数据比对时间',
        dataIndex: 'CNDSJ_TASKID',
        width: '27%',
        onCell: () => {
          return {
            style: {
              maxWidth: 260,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              height: 112
            }
          }
        },
        render: (text, record) => {
          const { CNDSJ_TASKID } = record
          return <Tooltip placement="topLeft" title={CNDSJ_TASKID} overlayClassName={styles.ant_tooltip}>{CNDSJ_TASKID}</Tooltip>
        }
      },
    ];

    return (
      <div className={styles.borderCss}>
        <div className={styles.frame}>
          <div className={styles.selectFrameRow}>
            <Form>
              <div className={styles.divCss}>
                <Form.Item>
                  {getFieldDecorator('jvwei', {
                    // initialValue: undefined
                  })(
                    <Select
                      className={styles.selectCss}
                      placeholder="请选择居委名称"
                      onChange={this.handleChangejw.bind(this)}
                      dropdownClassName={styles.dropdown}
                    >
                      {
                        jvweiArr && jvweiArr.length > 0 && jvweiArr.map((item, index) => {
                          return <Option key={index} value={item.committee_name}>{item.committee_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className={styles.divCss}>
                <Form.Item>
                  {getFieldDecorator('xiaoqu', {
                    // initialValue: undefined
                  })(
                    <Select
                      className={styles.selectCss}
                      placeholder="请选择小区名称"
                      onChange={this.handleChangexq.bind(this)}
                      dropdownClassName={styles.dropdown}
                    >
                      {
                        xiaoquArr && xiaoquArr.length > 0 && xiaoquArr.map((item, index) => {
                          return <Option key={index} value={item.residential_name}>{item.residential_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className={styles.divCss}>
                <Form.Item>
                  {getFieldDecorator('loudong', {
                    // initialValue: undefined
                  })(
                    <Select
                      className={styles.selectCss}
                      placeholder="请选择居住楼栋"
                      onChange={this.handleChangeld}
                      dropdownClassName={styles.dropdown}
                    >
                      {
                        loudongArr && loudongArr.length > 0 && loudongArr.map((item, index) => {
                          return <Option key={index} value={item.address}>{item.address}</Option>
                        })
                      }
                    </Select>
                  )}
                </Form.Item>
              </div>
              <div className={styles.divCss}>
                <Form.Item>
                  {getFieldDecorator('jvzhudizhi', {
                    // initialValue: undefined
                  })(
                    <Input placeholder="请输入居住地址" className={styles.inputCss} onChange={this.handleChangeJzdz.bind(this)} />
                  )}
                </Form.Item>
              </div>
              <div className={styles.riqikuang}>
                <Form.Item>
                  {getFieldDecorator('riqi', {
                    initialValue: [moment().startOf('day').subtract(1, "day"), moment().startOf('day')],
                  })(
                    <RangePicker
                      format="YYYY-MM-DD"
                      placeholder={['开始时间', '结束时间']}
                      onChange={this.onChange.bind(this)}
                      dropdownClassName={styles.date_picker}
                    />
                  )}
                </Form.Item>
              </div>
              <div style={{ height: "100%", width: 160, marginTop: 72, float: "left", marginLeft: 110 }}>
                <Button className={styles.btnCss} onClick={this.queryBtn.bind(this)}>查询</Button>
              </div>
              <div style={{ height: "100%", width: 160, marginTop: 72, float: "left", marginLeft: 20 }}>
                <Button className={styles.btnCss} onClick={this.exportBtn.bind(this)}>导出</Button>
              </div>
            </Form>
          </div>

          <div style={{ height: 1356, position: "relative" }}>
            <div className={styles.rubbishTable3}>
              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={dataArr}
                rowClassName={styles.rowClassName}
                pagination={{
                  total: dataCount,
                  position: 'bottom',
                  defaultPageSize: 10,
                  pageSize: 10,
                  onChange: this.onPaginationChange
                }}
              />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Form.create()(Index);
