import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

const CONST_ITEMS = [
    { key: 'cnBorder', icon: 'cnBorder.png', label: '雨量', divStyle: { float: 'left' }, style: { width: 47 * 2, height: 34 * 2 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
    { key: 'buildingReal', icon: 'buildingReal.svg', label: '水位', divStyle: { float: 'left' }, style: { width: 64, height: 72 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
    { key: 'cameraMaptile', icon: 'cameraMaptile.svg', label: '潮位', divStyle: { float: 'right' }, style: { width: 64, height: 64 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` },
    { key: 'CAMERAROTATE', icon: 'CAMERAROTATE.svg', label: '风力', divStyle: { float: 'right' }, style: { width: 68, height: 68 }, command: `{"type":"SHOWNSTATE","flag":"GRIDFLAG","pinType":"*","points":[],"params":{"default":false,"pinType":"*","messageType":"clear"},"state":#}` }
]

/**
 * 1128*148
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            const list = [];
            let state = undefined;

            data.forEach((item, index) => {
                if (item) {
                    if (index === 0) {
                        state = { ...item };
                    } else {
                        list.push(item);
                    }
                }
            });

            this.setState({ ...state, list });
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    componentWillReceiveProps(nextProps) {
        try {
            if (!_.isEqual(nextProps, this.props)) {
                const data = this.getDataProvider(nextProps);
                const list = [];
                let state = undefined;

                data.forEach((item, index) => {
                    if (item) {
                        if (index === 0) {
                            state = { ...item };
                        } else {
                            list.push(item);
                        }
                    }
                });

                this.setState({ ...state, list });
            }
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)) {
                const { list = [] } = nextState;

                CONST_ITEMS.forEach(item => {
                    if (nextState[item.key] !== this.state[item.key]) {
                        let command = item.command.replace(/\*/g, item.key).replace(/#/g, nextState[item.key]);
                        const posted = { ...JSON.parse(command), points: nextState[item.key] ? list.filter(l => l.pintype === item.key) : [] };

                        console.log('POST', JSON.stringify(posted));
                        window.postMessage(posted, '*');
                    }
                })
            }
        } catch (e) {
            console.error('shouldComponentUpdate', e)
        }

        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
    }

    getDataProvider = props => {
        const { dataProvider } = props;

        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    onClick = (key) => {
        const filter = CONST_ITEMS.filter(item => item.key === key);

        if (filter[0]) {
            const state = this.state[key];

            try {
                this.setState({ ...this.state, [key]: !state, [filter[0].exclude]: false });
            } catch (e) {
                console.info(e);
            }
        }
    }

    render() {
        const { hidden = "" } = this.state;
        const length = CONST_ITEMS.filter(item => !hidden || hidden.indexOf(item.key) === -1).length;

        return (
            <div className={styles.ywtg_map_control_basic_wrapper} style={{ width: '100%' }}>
                {CONST_ITEMS.map(item => {
                    if (!hidden || hidden.indexOf(item.key) === -1) {
                        return (
                            <div key={item.key} className={this.state[item.key] ? styles.active : null} style={{ ...item.divStyle }} onClick={this.onClick.bind(this, item.key)}>
                                <div className={[styles.icon, styles[`icon_${item.key}`]].join(' ')} style={{ ...item.style }}></div>
                                <div className={styles.label}>{item.label}</div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}