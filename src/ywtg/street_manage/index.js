import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

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
        if (record.popup === 'open') {
            window.open(record.url);
        } else {
            const { handlers } = this.state;

            handlers && handlers.onClick && handlers.onClick(record);
        }
    }

    render() {
        const { title, data = [] } = this.state;

        return (
            <div style={{ backgroundColor: 'rgba(18, 63, 119, 0.8)', height: '100%', padding: '0 40px' }}>
                <div className={styles.ywtg_street_header_wrapper}>
                    <div>
                        {title}
                    </div>
                </div>
                <div className={styles.ywtg_street_item_wrapper}>
                    <div>
                        <div>
                            {data && data.length > 0 && data.map(item => {
                                if (item) {
                                    return (
                                        <div key={item.id} className={[styles.ywtg_street_item, item.desc ? styles.ywtg_street_hover : null].join(' ')} title={item.desc} onClick={this.onClick.bind(this, item)}>{item.name}</div>
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