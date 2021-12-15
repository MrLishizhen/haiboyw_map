import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

/**
 * 492*400
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            hover: '',
        };
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            const list = [];
            const types = [];

            data.forEach(item => {
                if (item && typeof item === 'string') {
                    types.push(item);
                }
            });

            data.forEach(item => {
                if (item && typeof item === 'object') {
                    const index = types.indexOf(item.type);
                    list[index] = item;
                }
            });

            const { buffEvent = [{ type: 'click' }] } = this.props;

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

            this.setState({ data: list, active: [], handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.info(nextProps);
        try {
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                const data = this.getDataProvider(nextProps);
                const list = [];
                const types = [];

                data.forEach(item => {
                    if (item && typeof item === 'string') {
                        types.push(item);
                    }
                });

                data.forEach(item => {
                    if (item && typeof item === 'object') {
                        const index = types.indexOf(item.type);
                        list[index] = item;
                    }
                });

                this.setState({ data: list, active: [] });
            }
            if (nextProps.style && this.props.style && !nextProps.style.show && this.props.style.show) {
                this.setState({ active: [] });
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!isEqual(nextState.active, this.state.active)) {
                const { active = [], handlers } = nextState;

                handlers && handlers.onClick && handlers.onClick({ active });
            }
        } catch (e) {
            console.error('shouldComponentUpdate', e);
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
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
        const { active = [] } = this.state;

        if (active.includes(data.type)) {
            this.setState({ active: active.filter(a => a !== data.type) });
        } else {
            this.setState({ active: [...active, data.type] });
        }
    }

    render() {
        const { data = [], active = [] } = this.state;

        return (
            <div style={{ borderRadius: '6px', height: '100%', overflow: 'hidden' }}>
                <div className={styles.dt_legend_list_header_wrapper}>
                    <div className={styles.title}>
                        加装电梯
                    </div>
                </div>
                <div className={styles.dt_legend_scroll}>
                    <div className={styles.dt_legend_list_wrapper}>
                        {data.map(item => {
                            return (
                                <div className={styles.item}>
                                    <div>
                                        <div className={active.includes(item.type) ? styles.active : null} onClick={this.onClick.bind(this, item)}>
                                            <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
                                            <div className={styles.label}>
                                                {item.alias || item.type}
                                            </div>
                                            <div className={styles.cnt}>
                                                {item.cnt}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}