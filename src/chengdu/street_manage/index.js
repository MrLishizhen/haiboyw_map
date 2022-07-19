import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

// import data from './data';

// _chengdu_street_list
/**
 * 428*1142
 */



export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: ' '
        };
    }

    getQueryVariable(variable, address) {
      try {
        const addr = decodeURIComponent(address? address: window.location.href);        
        let query = addr.substr(addr.indexOf('?') + 1)
        if (query) {
          const vars = decodeURIComponent(query).split('&');
          for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (pair[0] == variable) { return pair[1]; }
          }
          return (false);
        }
      } catch (e) {
        console.error(e)
      }
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            let title = ' ';
            const list = [];


            if (Array.isArray(data) && data.length > 0) {
                data.forEach(item => {
                    if (typeof item === 'string') {
                        title = item;
                    } else if (typeof item === 'object') {
                        list.push(item)
                    }
                });
            }

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

            this.setState({ title, data: list, handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }

        const urls =  window.location.href;
        const vars = urls.split('redirectUrl');
        const redirectUrl = (vars[1] || '').replace('=', '');
       
        this.token = this.getQueryVariable('accessToken', redirectUrl);
        this.userId = this.getQueryVariable('userId', redirectUrl);
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const data = this.getDataProvider(nextProps);
                let title = ' ';
                const list = [];


                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(item => {
                        if (typeof item === 'string') {
                            title = item;
                        } else if (typeof item === 'object') {
                            list.push(item)
                        }
                    });
                }

                this.setState({ title, data: list });
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    onClick = (record) => {
        if (record.url) {
            if (record.popup === 'open') {
              const {url} = record;
              let newUlr;
              const extraParams = this.token && this.userId? `accessToken=${this.token}&userId=${this.userId}`: '';
              if ( url.indexOf('?') >= 0 ) {
                newUlr = url + `&` + extraParams;
              } else {
                newUlr = url + "?" + extraParams;
              }
              // const url = this.token && this.userId? `${record.url}?token=${this.token}&userId=${this.userId}`: record.url;
              window.open(newUlr);
            } else {
                const { handlers } = this.state;

                handlers && handlers.onClick && handlers.onClick(record);
            }
        }
    }

    render() {
        const { title, data = [] } = this.state;

        return (
            // <div style={{ backgroundColor: 'rgba(18, 63, 119, 0.8)', height: '100%', padding: '0 40px' }}>
            <div style={{ backgroundColor: 'rgba(2, 28, 48, 0.8)', height: '100%', padding: '0 40px' }}>
                {title &&
                    <div className={styles.ywtg_street_header_wrapper}>
                        <div>
                            {title}
                        </div>
                    </div>
                }
                <div className={styles.ywtg_street_item_wrapper}>
                    <div>
                        <div>
                            {data && data.length > 0 && data.map(item => {
                                if (item) {
                                    return (
                                        <div key={item.id} className={[styles.ywtg_street_item, item.desc ? styles.ywtg_street_hover : null, item.url ? null : styles.disbaled].join(' ')} title={item.url ? item.desc : undefined} onClick={this.onClick.bind(this, item)}>{item.name}</div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}