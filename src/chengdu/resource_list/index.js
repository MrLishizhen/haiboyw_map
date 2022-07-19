import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import styles from './index.less';

// _ywtg_resource_list
/**
 * 492*86
 * 492*1094
 */
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            hover: '',
            open: false
        };
    }

    componentDidMount() {
        console.info('componentDidMount', this.props);
        try {
            const data = this.getDataProvider(this.props);
            let open = false;
            let title = '';
            const list = [];
            const active = [];

            data.forEach(item => {
                if (item) {
                    if (typeof item === 'string') {
                        open = item === 'true';
                    } else if (typeof item === 'object') {
                        if (item && item.title) {
                            open = item.open === 'true';
                            title = item.title;
                        } else {
                            if (item && !item.parentName) {
                                list.push(item);
                            }
                            if (item.checked === 'true') {
                                active.push(item.pintype);
                            }
                        }
                    }
                }
            });

            data.forEach(item => {
                if (typeof item === 'object') {
                    if (item && item.parentName) {
                        list.forEach(l => {
                            if (item && l.pintype === item.parentName) {
                                if (!l.children) {
                                    l.children = [];
                                }
                                l.children.push(item);
                            }
                        });
                    }
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

            this.setState({ open, title, data: list, active, handlers: Object.assign({}, eventValue) });

            if (this.props?.style?.active) {
                setTimeout(() => {
                    this.onClick(this.props?.style?.data);
                }, 1000)
            }
        } catch (e) {
            console.error('componentDidMount', e);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.info('componentWillReceiveProps', nextProps, this.props);
        try {
            if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
                const data = this.getDataProvider(nextProps);
                let open = false;
                let title = '';
                const list = [];
                const active = [];

                data.forEach(item => {
                    if (item) {
                        if (typeof item === 'string') {
                            open = item === 'true';
                        } else if (typeof item === 'object') {
                            if (item.title) {
                                open = item.open === 'true';
                                title = item.title;
                            } else {
                                if (!item.parentName) {
                                    list.push(item);
                                }
                                if (item.checked === 'true') {
                                    active.push(item.pintype);
                                }
                            }
                        }
                    }
                });

                data.forEach(item => {
                    if (typeof item === 'object') {
                        if (item && item.parentName) {
                            list.forEach(l => {
                                if (l.pintype === item.parentName) {
                                    if (!l.children) {
                                        l.children = [];
                                    }
                                    l.children.push(item);
                                }
                            });
                        }
                    }
                });

                this.setState({ open, title, data: list, active });
            } else if (!isEqual(this.props.style, nextProps.style)) {
                const { active, data = {} } = nextProps.style || {};

                if (active) {
                    this.onClick(data);
                }
            }
        } catch (e) {
            console.error('componentWillReceiveProps', e);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        try {
            if (!isEqual(nextState.active, this.state.active)) {
                const { data = [], active = [], handlers } = nextState;
                const list = [];

                active.forEach(key => {
                    const filter = data.filter(d => d.pintype === key);
                    if (filter[0]) {
                        // list.push(filter[0].type);
                        list.push(filter[0]);
                    }
                });

                list.forEach(l => {
                    if (l.children) {
                        const filter = l.children.filter(child => active.includes(`${l.pintype}_${child.pintype}`));
                        if (filter[0]) {
                            list.push(filter[0]);
                        }
                    }
                });
                console.info(list.map(l => l.type));
                handlers && handlers.onClick && handlers.onClick({ data: list.map(l => l.type) });
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

    onClick = (data, child, e) => {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        const { active = [] } = this.state;

        // if (active.includes(data.pintype)) {
        //     this.setState({ active: active.filter(a => a !== data.pintype) });
        // } else {
        //     this.setState({ active: [...active, data.pintype] });
        // }
        if (child) {
            if (active.includes(child.pintype)) {
                this.setState({ active: [data.pintype] });
            } else {
                this.setState({ active: [data.pintype, `${data.pintype}_${child.pintype}`] });
            }
        } else {
            if (active.includes(data.pintype)) {
                this.setState({ active: [] });
            } else {
                this.setState({ active: [data.pintype] });
            }
        }
    }

    onMouseEnter = (data) => {
        const { hover = '' } = this.state;

        if (hover !== data.pintype) {
            this.setState({ hover: data.pintype });
        }
    }

    onMouseLeave = (data) => {
        const { hover = '' } = this.state;

        if (hover === data.pintype) {
            this.setState({ hover: '' });
        }
    }

    render() {
        const { data = [], active = [], hover, open, title } = this.state;

        return (
            <div style={title ? {} : { backgroundColor: 'rgba(18, 63, 119, 0.8)', width: '100%', height: '100%' }}>
                {title &&
                    <div className={[styles.ywtg_resource_list_header_wrapper, open ? styles.open : null].join(' ')} onClick={(e) => { e.stopPropagation(); this.setState({ open: !open }); }}>
                        <div className={styles.title}>
                            {title || '城区资源'}
                        </div>
                        <div className={styles.cnt}>
                            {data && data.length > 0 ? data.length : 0} 类
                        </div>
                    </div>
                }
                <div className={[title ? styles.ywtg_resource_list_content_wrapper : null, open || !title ? styles.open : null].join(' ')}>
                    <div style={{ width: title ? 540 : '100%', height: '100%', overflowY: 'auto' }}>
                        <div style={title ? { width: 492 } : {}}>
                            {data && data.length > 0 && data.map((item, index) => {
                                const { children = [] } = item || {};
                                return (
                                    <div
                                        id={`_ftfx_jsdw_list_${item.pintype}`}
                                        key={index}
                                        className={title ? styles.ywtg_resource_list_item : styles.ywtg_resource_list_item_no_title}
                                        onClick={this.onClick.bind(this, item, undefined)}
                                        onMouseEnter={this.onMouseEnter.bind(this, item)}
                                        onMouseLeave={this.onMouseLeave.bind(this, item)}
                                    >
                                        <div className={styles.icon} style={{ backgroundImage: `url(${item.icon})` }}></div>
                                        <div className={styles.content} style={active.includes(item.pintype) ? { backgroundColor: `rgba(${item.color}, 0.2)`, borderColor: `rgba(${item.color}, 1)` } : hover === item.pintype ? { backgroundColor: `rgba(${item.color}, 0.2)` } : {}}>
                                            <div style={{ marginLeft: 74 }}>
                                                <div className={styles.name}>{item.name}</div>
                                                <div className={styles.value} style={item.color ? { color: `rgba(${item.color}, 1)` } : {}}>{item.value}</div>
                                            </div>
                                        </div>
                                        {item.children && item.children.length > 0 &&
                                            <div className={[styles.arrow, active.includes(item.pintype) ? styles.open : undefined].join(' ')} />
                                        }
                                        {children.length > 0 &&
                                            <div className={styles.children_list_wrapper} style={children.length === 0 || !active.includes(item.pintype) ? { height: 0 } : { height: 5 * 68 + 100 }}>
                                                <div style={{ paddingTop: 100, height: 5 * 68 + 100, overflow: 'hidden' }}>
                                                    <div style={{ width: 480, height: 5 * 68, overflowX: 'hidden', overflowY: 'auto' }}>
                                                        <div style={{ width: 452, height: children.length * 68 }}>
                                                            {children.map((child, index) => {
                                                                return (
                                                                    <div key={index} style={{ marginLeft: 50 }} onClick={this.onClick.bind(this, item, child)}>
                                                                        <div className={[styles.list_item, active.includes(`${item.pintype}_${child.pintype}`) ? styles.active : undefined].join(' ')}>
                                                                            {child.type}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
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
            </div >
        );
    }
}