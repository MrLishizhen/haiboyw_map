import React from 'react';
import { Icon, Input, Select } from 'antd';
import _ from 'lodash';
import styles from './index.less';

const { Search } = Input;
const { Option } = Select;

const options = [
  // { "name": "全部", "value": "all" },
  // { "name": "子类", "value": "subclass" },
  // { "name": "管理要点", "value": "point" },
  // { "name": "责任单位", "value": "zrdepartment" },
  // { "name": "管理依据", "value": "basis" },
  // { "name": "处置时限", "value": "cztime" }
  { "name": "全部", "value": "all" },
  { "name": "单位名称", "value": "单位名称" },
  { "name": "信用代码", "value": "信用代码" },
  { "name": "业务范围", "value": "业务范围" },
  { "name": "住所地址", "value": "住所地址" }
];

/**
 * 下拉搜索框
 * _cnyw_search_input
 *
 * @class Index
 * @extends {React.Component}
 */
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handlers: '',
      searchValue: '',
      options: [],
      selectValue: ''
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { dataProvider = [], buffEvent = [{ type: 'click' }], style = {} } = this.props;
    let eventValue = {};

    for (let i = 0; i < buffEvent.length; i++) {
      const eventObj = buffEvent[i];
      const { type, method, bindedComponents } = eventObj;
      if (type === 'click') {
        eventValue = {
          onClick: (record) => {
            method && method({ ...record }, bindedComponents)
          }
        }
      }
    }
    this.setState({
      options: dataProvider && dataProvider.length > 0 ? [...dataProvider] : options,
      selectValue: dataProvider && dataProvider.length > 0 ? dataProvider[0].value : options[0].value,
      handlers: Object.assign({}, eventValue),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dataProvider = [] } = nextProps;

    if (!_.isEqual(dataProvider, this.props.dataProvider)) {
      this.setState({
        options: dataProvider && dataProvider.length > 0 ? [...dataProvider] : options,
        selectValue: dataProvider && dataProvider.length > 0 ? dataProvider[0].value : options[0].value
      });
    }
  }

  // 搜索
  onSearchValue = (selectValue, value) => {
    const { handlers } = this.state;

    handlers.onClick && handlers.onClick({ [selectValue]: value });
  }

  render() {
    const { selectValue, searchValue, options = [] } = this.state;

    return (
      <div ref={this.ref} style={{ width: '100%', height: '100%', position: 'relative' }} className={styles.search_drop_wrapper}>
        <Input
          addonBefore={
            <Select
              size='large'
              style={{ width: '100%' }}
              value={selectValue}
              getPopupContainer={() => this.ref.current}
              onChange={(value) => { this.setState({ selectValue: value }); this.onSearchValue(value, searchValue) }}
            >
              {options && options.map(item => {
                return <Option key={item.value} value={item.value}>{item.name}</Option>
              })}
            </Select>
          }
          addonAfter={< Icon type='search' onClick={() => this.onSearchValue(selectValue, searchValue)} />}
          placeholder={this.state.placeholder === '' ? '' : '搜索类型'}
          size='large'
          onFocus={e => this.setState({ placeholder: '' })}
          onBlur={e => this.setState({ placeholder: '搜索类型' })}
          onChange={e => this.setState({ searchValue: e.target.value })}
          onPressEnter={e => this.onSearchValue(selectValue, e.target.value)}
        />
      </div >
    )
  }
}

export default Index;
