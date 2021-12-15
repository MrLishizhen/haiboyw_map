import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

const CONST_SICK_TYPE = [
    '精神分裂症',
    '双相情感障碍',
    '偏执性精神病',
    '分裂情感性精神障碍',
    '癫痫所致精神障碍',
    '精神发育迟滞伴发精神障碍'
];

/**
 * 248*528
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            active: ''
        };
        this.field = {
            'name': 'name',
            'value': 'value'
        };
    }

    componentDidMount() {
        try {
            const dateProvider = this.getDataProvider(this.props);
            if (dateProvider && dateProvider[0]) {
                const data = dateProvider[0];
                const result = [];

                // Object.keys(data).forEach(sickName => {
                //     result.push({
                //         [this.field.name]: sickName,
                //         [this.field.value]: data[sickName]
                //     });
                // });
                CONST_SICK_TYPE.forEach(sickName => {
                    result.push({
                        [this.field.name]: sickName,
                        [this.field.value]: data[sickName]
                    });
                });

                this.setState({ data: result });
            }
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!isEqual(this.props, nextProps)) {
                const dateProvider = this.getDataProvider(nextProps);

                if (dateProvider && dateProvider[0]) {
                    const data = dateProvider[0];
                    const result = [];

                    // Object.keys(data).forEach(sickName => {
                    //     result.push({
                    //         [this.field.name]: sickName,
                    //         [this.field.value]: data[sickName]
                    //     });
                    // });
                    CONST_SICK_TYPE.forEach(sickName => {
                        result.push({
                            [this.field.name]: sickName,
                            [this.field.value]: data[sickName]
                        });
                    });

                    this.setState({ data: result });
                }
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

    onClick = (data) => {
        const { buffEvent = [] } = this.props;
        this.setState({ active: data[this.field.value] });

        if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
                const { method, bindedComponents } = item;
                if (typeof method === 'function') {
                    method({ data }, bindedComponents);
                }
            });
        }
    }

    render() {
        const { data = [], active } = this.state;

        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                {data && data.map(item => {
                    return (
                        <div className={[styles.item, active === item[this.field.value] ? styles.active : null].join(' ')} onClick={this.onClick.bind(this, item)}>
                            <div className={styles.name}>
                                {item[this.field.name]}
                            </div>
                            <div className={styles.value}>
                                {item[this.field.value]}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}