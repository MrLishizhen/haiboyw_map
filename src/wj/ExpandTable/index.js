import React, { Component } from 'react';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { getDataProvider } from '../../utils/DataUtils';
import styles from './styles.less';

var cx = classNames.bind(styles);

const iconPlus = (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="长宁区卫生监督应急指挥系统" transform="translate(-973.000000, -352.000000)" fillRule="nonzero">
        <g id="编组-6" transform="translate(421.000000, 336.000000)">
          <g id="plus-circle" transform="translate(552.000000, 16.000000)">
            <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20"></rect>
            <path d="M13.59375,9.375 L10.625,9.375 L10.625,6.40625 C10.625,6.3203125 10.5546875,6.25 10.46875,6.25 L9.53125,6.25 C9.4453125,6.25 9.375,6.3203125 9.375,6.40625 L9.375,9.375 L6.40625,9.375 C6.3203125,9.375 6.25,9.4453125 6.25,9.53125 L6.25,10.46875 C6.25,10.5546875 6.3203125,10.625 6.40625,10.625 L9.375,10.625 L9.375,13.59375 C9.375,13.6796875 9.4453125,13.75 9.53125,13.75 L10.46875,13.75 C10.5546875,13.75 10.625,13.6796875 10.625,13.59375 L10.625,10.625 L13.59375,10.625 C13.6796875,10.625 13.75,10.5546875 13.75,10.46875 L13.75,9.53125 C13.75,9.4453125 13.6796875,9.375 13.59375,9.375 Z" id="路径" fill="#4484EF"></path>
            <path d="M10,1.25 C5.16796875,1.25 1.25,5.16796875 1.25,10 C1.25,14.8320312 5.16796875,18.75 10,18.75 C14.8320312,18.75 18.75,14.8320312 18.75,10 C18.75,5.16796875 14.8320312,1.25 10,1.25 Z M10,17.265625 C5.98828125,17.265625 2.734375,14.0117187 2.734375,10 C2.734375,5.98828125 5.98828125,2.734375 10,2.734375 C14.0117187,2.734375 17.265625,5.98828125 17.265625,10 C17.265625,14.0117187 14.0117187,17.265625 10,17.265625 Z" id="形状" fill="#4484EF"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const iconMinus = (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="长宁区卫生监督应急指挥系统" transform="translate(-973.000000, -225.000000)" fillRule="nonzero">
        <g id="编组-7" transform="translate(421.000000, 212.000000)">
          <g id="minus-circle" transform="translate(552.000000, 13.000000)">
            <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="20" height="20"></rect>
            <path d="M13.59375,9.375 L6.40625,9.375 C6.3203125,9.375 6.25,9.4453125 6.25,9.53125 L6.25,10.46875 C6.25,10.5546875 6.3203125,10.625 6.40625,10.625 L13.59375,10.625 C13.6796875,10.625 13.75,10.5546875 13.75,10.46875 L13.75,9.53125 C13.75,9.4453125 13.6796875,9.375 13.59375,9.375 Z" id="路径" fill="#FFAB00"></path>
            <path d="M10,1.25 C5.16796875,1.25 1.25,5.16796875 1.25,10 C1.25,14.8320312 5.16796875,18.75 10,18.75 C14.8320312,18.75 18.75,14.8320312 18.75,10 C18.75,5.16796875 14.8320312,1.25 10,1.25 Z M10,17.265625 C5.98828125,17.265625 2.734375,14.0117187 2.734375,10 C2.734375,5.98828125 5.98828125,2.734375 10,2.734375 C14.0117187,2.734375 17.265625,5.98828125 17.265625,10 C17.265625,14.0117187 14.0117187,17.265625 10,17.265625 Z" id="形状" fill="#FFAB00"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const dataSample = [
  {
    id: 1,
    name: '新华路街道',
    value: 0
  }, {
    id: 2,
    name: '江苏路街道',
    value: 0
  }, {
    id: 3,
    name: '华阳路街道',
    value: 0
  }, {
    id: 4,
    name: '周家桥街道',
    value: 0
  }, {
    id: 5,
    name: '天山路街道',
    value: 0
  }, {
    id: 6,
    name: '仙霞新村街道',
    value: 0
  }, {
    id: 7,
    name: '虹桥街道',
    value: 0
  }, {
    id: 8,
    name: '程家桥街道',
    value: 0
  }, , {
    id: 9,
    name: '北新泾街道',
    value: 0
  }, {
    id: 10,
    name: '新泾镇',
    value: 0
  }, {
    id: 11,
    name: '虹桥临空园区',
    value: 0
  }/*, {
    parentId: 1,
    name: '公共场所',
    value: 10
  }, {
    parentId: 1,
    name: '生活饮用水',
    value: 10
  }, {
    parentId: 1,
    name: '学校卫生',
    value: 10
  }, {
    parentId: 1,
    name: '集中空调',
    value: 10
  }, {
    parentId: 1,
    name: '医疗机构',
    value: 10
  }, {
    parentId: 1,
    name: '职业卫生',
    value: 10
  }, {
    parentId: 1,
    name: '生物实验室',
    value: 10
  }, {
    parentId: 2,
    name: '公共场所',
    value: 10
  }*/
];

class Item extends Component {
  onClick = () => {
    const { data = {} } = this.props;

    if (typeof this.props.onItemClick === 'function') {
      this.props.onItemClick(data);
    }
  }

  render() {
    const { itemActive = [], data = {}, title } = this.props;

    const classes = cx({
      'card-item-child': true,
      'card-item-title-active': itemActive.includes(data.name)
    });

    return (
      <span className={classes} onClick={this.onClick}>{title}</span>
    );
  }
}

class Card extends Component {
  state = {
    open: false
  }

  handleClick = evt => {
    const { data = {}, list = [] } = this.props;

    if (list.length <= 0) return;
    // this.setState({ open: !this.state.open });
    if (typeof this.props.onCardClick === 'function') {
      this.props.onCardClick(data);
    }
  }

  render() {
    // const { open } = this.state;
    const { cardActive = [], itemActive = [], data = {}, list = [], title = '', onItemClick } = this.props;
    const open = cardActive.includes(data.name);

    const cardClasses = cx({
      'card-item': true,
      'card-item-active': open
    });

    const titleClasses = cx({
      'card-item-title': true,
      'card-item-title-active': open
    });

    return (
      <div className={cardClasses}>
        <div className={styles['card-item-header']} onClick={this.handleClick}>
          <div className={titleClasses}>{title}</div>
          {list && list.length > 0 && <div className={styles['card-item-icon']} >{open ? iconMinus : iconPlus}</div>}
        </div>
        {
          open ? (
            <div className={styles['card-item-content']}>
              {
                list.map((el, i) => {
                  return <Item key={i} data={el} title={`${el['name']}(${el['value']})`} itemActive={itemActive} onItemClick={onItemClick} />
                })
              }
            </div>
          ) : null
        }
      </div>
    )
  }
}

/**
 * _changning_expand_table
 * cn2_ExpandTable
 * 1170*1020
 */
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardActive: [],
      itemActive: {}
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.info('shouldComponentUpdate', nextProps, nextState);
    const { style = {} } = nextProps;
    const { style: oldStyle = {} } = this.props;

    // if ((!_.isEqual(nextState.itemActive, this.state.itemActive) || !_.isEqual(nextState.cardActive, this.state.cardActive)) && style.show === oldStyle.show) {
    //   this.onChange(nextState.cardActive, nextState.itemActive);
    // }
    if (style.show !== oldStyle.show) {
      this.setState({
        cardActive: [],
        itemActive: {}
      });
    }

    return !_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props);
  }

  onChange = (cardActive, itemActive, e) => {
    try {
      const { buffEvent = [] } = this.props;

      if (cardActive && cardActive.length > 0) {
        const data = itemActive[cardActive];

        if (data) {
          console.info('onChange', { type: data, street: cardActive }, buffEvent);
          if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
              const { method, bindedComponents } = item;
              if (typeof method === 'function') {
                method({ type: data, street: cardActive }, bindedComponents);
              }
            });
          }
        }
      } else {
        console.info('onChange', { type: [], street: [] }, buffEvent);
        if (buffEvent && buffEvent.length > 0) {
          buffEvent.forEach(item => {
            const { method, bindedComponents } = item;
            if (typeof method === 'function') {
              method({ type: [], street: [] }, bindedComponents);
            }
          });
        }
      }
    } catch (e) {
      console.error('onChange', e)
    }
  }

  parseData = () => {
    const dataProvider = getDataProvider(this.props);
    const dataList = dataProvider.length == 0 ? dataSample : dataProvider;
    const list = [];
    const street = {};

    dataList.forEach(item => {
      if (item) {
        if (!street[item.id]) {
          street[item.id] = { id: item.id, name: item.name, total: 0, value: 0, children: [] };
        }
        if (item.type) {
          street[item.id].children.push({
            parentId: item.id,
            parentName: item.name,
            name: item.type,
            value: item.value
          });
        }
      }
    });
    Object.keys(street).forEach(key => {
      const { children } = street[key];
      list.push({
        ...street[key],
        value: children && children.length > 0 ? street[key].children.map(child => child.value).reduce((n, m) => { return n + m }) : 0
      })
    });

    return list;
  }

  onCardClick = (data) => {
    console.log('onCardClick', data);
    const { cardActive = [], itemActive = {} } = this.state;
    const { [data.name]: actives = [], ...extra } = itemActive;

    if (cardActive.includes(data.name)) {
      this.setState({ cardActive: [], itemActive: { ...extra, [data.name]: [] } }, () => {
        this.onChange(this.state.cardActive, this.state.itemActive);
      });
    } else {
      this.setState({ cardActive: [data.name], itemActive: { ...extra, [data.name]: [] } }, () => {
        this.onChange(this.state.cardActive, this.state.itemActive);
      });
    }
  }

  onItemClick = (data) => {
    console.log('onItemClick', data);
    const { itemActive = {} } = this.state;
    const { [data.parentName]: actives = [], ...extra } = itemActive;

    if (data && data.value === 0) {
      return;
    }
    if (actives.includes(data.name)) {
      this.setState({ itemActive: { ...extra, [data.parentName]: actives.filter(act => act !== data.name) } }, () => {
        this.onChange(this.state.cardActive, this.state.itemActive);
      });
    } else {
      this.setState({ itemActive: { ...extra, [data.parentName]: [...actives, data.name] } }, () => {
        this.onChange(this.state.cardActive, this.state.itemActive);
      });
    }
  }

  render() {
    const { cardActive = [], itemActive = {} } = this.state;
    const list = this.parseData();

    return (
      <div className={styles['expand-table']}>
        <div className={styles['expand-table-content']}>
          {
            list.map((item, i) => {
              const { id, name, total = 0, value = 0, children = [] } = item;
              return (
                <Card
                  key={id}
                  cardActive={cardActive}
                  itemActive={itemActive[name]}
                  data={{ id, name }}
                  list={children && children.length > 1 ? children : []}
                  title={`${name}   (${total || value})`}
                  onCardClick={this.onCardClick}
                  onItemClick={this.onItemClick}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}
