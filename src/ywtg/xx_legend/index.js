import React, { PureComponent } from 'react';
import { Popover } from 'antd';
import { isEqual } from 'lodash';
import styles from './index.less';

/**
 * 552*480
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            hover: '',
            switchChecked: undefined
        };
        this.ref = React.createRef();
        this.init = true;
    }

    componentDidMount() {
        try {
            const data = this.getDataProvider(this.props);
            const list = [];
            const types = [];
            let title = '';
            let all = false;
            let switchComponent = undefined;

            data.forEach(item => {
                if (item && typeof item === 'string') {
                    types.push(item);
                }
            });

            data.forEach(item => {
                if (item && typeof item === 'object') {
                    if (item.title) {
                        title = item.title;
                        switchComponent = item.switch;
                        // all = item.show === 'all'
                    } else {
                        if (item.type) {
                            if (types && types.length === 0) {
                                list.push(item);
                            } else {
                                const index = types.indexOf(item.type);
                                if (index >= 0) {
                                    list[index] = item;
                                }
                            }
                        }
                    }
                }
            });

            data.forEach(item => {
                if (item && typeof item === 'object') {
                    if (item.popover) {
                        list.forEach(el => {
                            if (el.type === item.popover) {
                                el.popover = item;
                            }
                        })
                    }
                }
            });

            if (types && types.length === 0) {
                list.forEach(item => {
                    if (item.type && !types.includes(item.type)) {
                        types.push(item.type);
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
                        onClick: (record) => {
                            method && method({ ...record }, bindedComponents)
                        }
                    }
                }
            }

            // if (list && list.length > 0) {
            //     this.init = false;
            // }
            this.setState({ data: list, title, switchComponent, switchChecked: switchComponent && list.length > 0 ? true : undefined, active: all ? ['all', ...types] : [], handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.info(nextProps, this.props);
        try {
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                const data = this.getDataProvider(nextProps);
                const list = [];
                const types = [];
                let title = '';
                let all = false;
                let switchComponent = undefined;

                data.forEach(item => {
                    if (item && typeof item === 'string') {
                        types.push(item);
                    }
                });

                data.forEach(item => {
                    if (item.title && this.init) {
                        title = item.title;
                        switchComponent = item.switch;
                        // all = item.show === 'all'
                    } else {
                        if (item.type) {
                            if (types && types.length === 0) {
                                list.push(item);
                            } else {
                                const index = types.indexOf(item.type);
                                if (index >= 0) {
                                    list[index] = item;
                                }
                            }
                        }
                    }
                });

                data.forEach(item => {
                    if (item && typeof item === 'object') {
                        if (item.popover) {
                            list.forEach(el => {
                                if (el.type === item.popover) {
                                    el.popover = item;
                                }
                            })
                        }
                    }
                });

                if (types && types.length === 0) {
                    list.forEach(item => {
                        if (!types.includes(item.type)) {
                            types.push(item.type);
                        }
                    });
                }

                // if (list && list.length > 0) {
                //     this.init = false;
                // }
                this.setState({
                    data: list, title: title ? title : this.state.title,
                    switchComponent: switchComponent ? switchComponent : this.state.switchComponent,
                    switchChecked: this.state.switchChecked === undefined ? true : this.state.switchChecked,
                    active: all ? ['all', ...types] : types.filter(t => this.state.active.includes(t))
                });
            }
            if (nextProps.style && this.props.style && nextProps.style.show === false && this.props.style.show === true) {
                this.setState({ active: [] });
            }
            if (nextProps.style && this.props.style && nextProps.style.show === true && !this.props.style.show) {
                if (this.state.switchChecked === true) {
                    this.setState({ timestamp: new Date().valueOf() })
                }
                // if (this.init) {
                //     this.init = false;
                //     const data = this.getDataProvider(nextProps);
                //     const types = [];

                //     data.forEach(item => {
                //         if (item && typeof item === 'string') {
                //             types.push(item);
                //         }
                //     });

                //     this.setState({ active: [...types] });
                // }
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!isEqual(nextState.active, this.state.active) || !isEqual(nextState.switchChecked, this.state.switchChecked) || !isEqual(nextState.timestamp, this.state.timestamp)) {
                let { switchComponent, switchChecked, data = [], active = [], handlers } = nextState;
                const array = switchComponent ? Object.keys(switchComponent) : [];
                active = switchComponent ?
                    switchChecked === true ?
                        active && active.length > 0 ? active : data.map(item => item.type) :
                        active :
                    active

                if (data.length > 0 && (!switchComponent || switchChecked !== undefined)) {
                    console.info('xx_legend', { active, status: switchChecked ? (array[0] ? switchComponent[array[0]] : 'false') : (array[1] ? switchComponent[array[1]] : 'all') });
                    handlers && handlers.onClick && handlers.onClick({ active, status: switchChecked ? (array[0] ? switchComponent[array[0]] : '') : (array[1] ? switchComponent[array[1]] : '') });
                }
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
        const { title, switchComponent, data = [], active = [], switchChecked } = this.state;
        const array = switchComponent ? Object.keys(switchComponent) : []

        return (
            <div ref={this.ref} style={{ borderRadius: '6px', height: '100%', overflow: 'hidden', display: data && data.length > 0 ? 'block' : 'none', ...this.props.style }}>
                <div className={styles.dt_legend_list_header_wrapper}>
                    {switchComponent &&
                        <div className={styles.switch} style={{ paddingLeft: 27, paddingRight: 0 }}>
                            <div style={switchChecked ? { color: '#FC6969' } : {}} onClick={() => { if (!switchChecked) { this.setState({ switchChecked: true, active: [] }) } }}>{array[0] || '预警'}</div>
                        </div>
                    }
                    <div className={styles.title} style={switchComponent ? { paddingLeft: 0, textAlign: 'center' } : {}}>
                        {title}
                    </div>
                    {switchComponent &&
                        <div className={styles.switch}>
                            {/* <Switch checkedChildren={array[0]} unCheckedChildren={array[1]} checked={switchChecked} onChange={checked => this.setState({ switchChecked: checked, active: [] })} /> */}
                            <div style={!switchChecked ? { color: '#0BC0FE' } : {}} onClick={() => { if (switchChecked) { this.setState({ switchChecked: false, active: [] }) } }}>{array[1] || '全量'}</div>
                        </div>
                    }
                </div>
                <div className={styles.dt_legend_scroll} style={title ? {} : { height: '100%', backgroundColor: '#0E325F' }}>
                    <div className={styles.dt_legend_list_wrapper}>
                        {data.map(item => {
                            const { popover } = item;

                            return (
                                <div className={styles.item}>
                                    {popover ?
                                        <Popover
                                            content={
                                                <div className={styles.popover_item}>
                                                    <div className={styles.title}>
                                                        <span>正在装修户数</span>
                                                        <span>{popover.recycle_size}</span>
                                                    </div>
                                                    <div className={styles.list_wrapper}>
                                                        <div>
                                                            <span>本月物业派单车数</span>
                                                            <span>{popover.property_size}</span>
                                                        </div><div>
                                                            <span>清运完成率</span>
                                                            <span>{popover.property_rate}</span>
                                                        </div><div>
                                                            <span>本月街道派单车数</span>
                                                            <span>{popover.street_size}</span>
                                                        </div><div>
                                                            <span>清运完成率</span>
                                                            <span>{popover.street_rate}</span>
                                                        </div><div>
                                                            <span>本月清运单位接单车数</span>
                                                            <span>{popover.company_size}</span>
                                                        </div><div>
                                                            <span>清运完成率</span>
                                                            <span>{popover.company_rate}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            placement='left' trigger='hover' overlayClassName={styles.popover_wrapper} /*getPopupContainer={() => this.ref.current}*/>
                                            <div>
                                                <div className={active.includes(item.type) ? styles.active : null} onClick={this.onClick.bind(this, item)}>
                                                    <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
                                                    <div className={styles.label}>
                                                        {item.alias || item.type}
                                                        {item.phone && item.phone === 'true' &&
                                                            <div className={[styles.phone_icon, styles.phone_call].join(' ')} />
                                                        }
                                                    </div>
                                                    <div className={styles.cnt}>
                                                        {item.cnt}
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover> :
                                        <div>
                                            <div className={active.includes(item.type) ? styles.active : null} onClick={this.onClick.bind(this, item)}>
                                                <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }} />
                                                <div className={styles.label}>
                                                    {item.alias || item.type}
                                                    {item.phone && item.phone === 'true' &&
                                                        <div className={[styles.phone_icon, styles.phone_call].join(' ')} />
                                                    }
                                                </div>
                                                <div className={styles.cnt}>
                                                    {item.cnt}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}