import React from 'react';
import classNames from 'classnames';
import './index.css';
import './bootstrap.min.css';

const defaultDataQuery = [
  { index: 0, label: '科技指数', icon: 'star' },
  { index: 1, label: '常规得分', icon: 'thumbs-up', style: { right: 13 }, children: [{ index: 5, label: '基础设施与安全' }, { index: 6, label: '赋能一线' }, { index: 7, label: '两单治理' }, { index: 8, label: '重点工作推动' }, { index: 1, label: '常规得分' }] },
  { index: 2, label: '加减项', icon: 'smartphone', style: { right: 13 }, children: [{ index: 3, label: '当月加分' }, { index: 4, label: '当月减分' }, { index: 2, label: '加减项' }] },
];

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }

  handleChange = (active, tabId) => {
    const { buffEvent = [] } = this.props;

    this.setState({ active });
    if (buffEvent && buffEvent.length > 0) {
      buffEvent.forEach(item => {
        const { method, bindedComponents } = item;
        if (typeof method === 'function') {
          method({ tabId }, bindedComponents);
        }
      });
    }
  }

  render() {
    const { option = {} } = this.props;
    const { clipTile = [] } = option;
    const dataQuery = clipTile[0] && clipTile[0].dataQuery ? clipTile[0].dataQuery : defaultDataQuery;

    return (
      <div className='tab_view'>
        {dataQuery.length > 0 &&
          dataQuery.map((i, index) => {
            let item = i;
            if (typeof i === 'string') {
              try {
                item = JSON.parse(i);
              } catch (e) {
                console.error(e);
              }
            }
            const { children = [] } = item;

            return (
              <div
                key={item.index}
                className={classNames('tab_item_root', { 'dropup': children.length > 0, 'selected': this.state.active === index })}
              >
                <div
                  data-toggle={children.length > 0 ? 'dropdown' : 'button'}
                  style={{ width: '100%', height: '100%', fontSize: 16, padding: '3.5px 0', position: 'relative' }}
                  onClick={children.length > 0 ? null : () => this.handleChange(item.index, index)}
                >
                  {item.icon &&
                    <div>
                      <i className={`fe fe-${item.icon}`} />
                    </div>
                  }
                  <div>
                    {item.label}
                  </div>
                  <div style={{ display: 'inline-block', position: 'absolute', top: 29, ...item.style }}>
                    {children && children.length > 0 &&
                      <i className='fe fe-chevron-down' style={{ marginLeft: 8 }}></i>
                    }
                  </div>
                </div>
                {children.length > 0 &&
                  <div className={classNames('dropdown-menu', 'custom_dropdown_menu')}>
                    {children.map(child => {
                      return (
                        <div key={child.index} className={classNames('dropdown-item', 'custom_dropdown_item', { 'parent': item.index === child.index })} onClick={() => this.handleChange(index, child.index)}>{child.label}</div>
                      );
                    })}
                  </div>
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default Tab;
