import React from 'react';
import { TreeSelect, Select, Icon, Button } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import styles from './index.less';
import defaultCurrency from './Data/currencyData';
// import defaultTree from './Data/treeData';

import Calendar from './Calendar';

const { TreeNode } = TreeSelect;
const { Option } = Select;
const levelField = ['A', 'B', 'C', 'D'];
const defaultTree = [];

/**
 * _jiutains_search_bar
 */
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        const { dataProvider = [] } = props;
        const treeList = Array.isArray(dataProvider) && dataProvider.length > 1 ? dataProvider.slice(1) : defaultTree;
        const currencies = defaultCurrency;
        this.state = {
            treeList: this.getRootLevel(treeList, 'A', 'D'),
            currency: currencies[0] && currencies[0].value,
            date: moment().add(-1, 'd')
        };
        this.state.organization = this.state.treeList[0] && this.state.treeList[0].A;
        this.generateParameter();
        this.timestamp = moment().format('YYYY-MM-DD');
        this.el = React.createRef();
        this.tree = React.createRef();
    }

    componentDidMount() {
        this.generateSchedule();
    }

    componentWillUnmount() {
        window.sessionStorage.removeItem('parameter');
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    generateSchedule = (rest, props) => {
        const { dataProvider = [] } = props || this.props;

        if (dataProvider && dataProvider.length > 0) {
            if (dataProvider[0] && typeof dataProvider[0] !== 'object') {
                const interval = parseInt(dataProvider[0] || 10);
                this.timer = setInterval(() => {
                    const now = moment().add(-1, 'd').format('YYYY-MM-DD');
                    if (now === this.timestamp) {
                        this.handleDateChange(moment(this.timestamp, 'YYYY-MM-DD'));
                        this.timestamp = moment().format('YYYY-MM-DD');
                    } else {
                        this.handleChange(rest);
                    }
                }, interval * 1000, interval * 1000);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dataProvider = [] } = nextProps;
        const treeList = Array.isArray(dataProvider) && dataProvider.length > 1 ? dataProvider.slice(1) : defaultTree;

        const origin = Array.isArray(this.props.dataProvider) && this.props.dataProvider.length > 1 ? this.props.dataProvider.slice(1) : [];
        if (!_.isEqual(treeList, origin) && treeList && treeList.length > 0) {
            console.info('select tree componentWillReceiveProps');
            const root = this.getRootLevel(treeList, 'A', 'D');
            this.generateSchedule(false, nextProps);
            this.setState({
                treeList: root,
                organization: root[0] && root[0].A
            });
        }
    }

    getRootLevel = (list, idField, parentIdField) => {
        return list.filter(item => {
            if (item[idField] === item[parentIdField]) {
                return { ...item };
            }
        });
    }

    organizationChange = (value) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({ organization: value }, () => {
            this.handleChange();
            this.generateSchedule();
        });
    }

    handleCurrencyChange = (value) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({ currency: value }, () => {
            this.handleChange();
            this.generateSchedule();
        });
    }

    handleDateChange = (date, dateString) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({ date }, () => {
            this.handleChange();
            this.generateSchedule();
        });
    }

    handleChange = (rest) => {
        const { buffEvent = [] } = this.props;
        const parameter = this.generateParameter();

        if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
                const { method, bindedComponents } = item;
                if (typeof method === 'function') {
                    console.log('search', parameter, bindedComponents);
                    method({ ...parameter, rest }, bindedComponents);
                }
            });
        }
    }

    generateParameter = () => {
        const { organization, date, currency } = this.state;
        const parameter = {};

        if (!_.isNil(organization)) {
            parameter.organization = organization;
        }
        if (!_.isNil(date)) {
            parameter.date = date.format('YYYY-MM-DD');
        }
        if (!_.isNil(currency)) {
            parameter.currency = currency;
        }
        window.sessionStorage.setItem('parameter', JSON.stringify(parameter));

        return parameter;
    }

    reset = () => {
        const { dataProvider = [] } = this.props;
        const treeList = Array.isArray(dataProvider) && dataProvider.length > 1 ? dataProvider.slice(1) : defaultTree;
        const root = this.getRootLevel(treeList, 'A', 'D');
        const currencies = defaultCurrency;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.setState({
            organization: root[0] && root[0].A,
            currency: currencies[0] && currencies[0].value,
            date: moment().add(-1, 'd')
        }, () => {
            this.handleChange(true);
            this.generateSchedule();
        });
    }

    onLoadData = (treeNode) => {
        const { dataProvider = [] } = this.props;
        const treeList = Array.isArray(dataProvider) && dataProvider.length > 1 ? dataProvider.slice(1) : defaultTree;

        return new Promise(resolve => {
            const { level, value } = treeNode.props;
            const children = treeList.filter(item => item['A'] === item[levelField[level - 1 >= 0 ? level - 1 : 0]] && item[levelField[level]] === value && item['A'] !== value);

            const loop = (list, id, appends) => {
                let flag = false;

                return list.map(item => {
                    if (item['A'] === id) {
                        flag = true;
                        return { ...item, children: appends }
                    } else {
                        if (!flag) {
                            if (item.children) {
                                const { children, ...rest } = item;
                                return { ...rest, children: loop(children, id, appends) };
                            }
                        }
                        return { ...item };
                    }
                });
            }

            this.setState({ treeList: loop(this.state.treeList, value, children) });
            resolve();
        });
    }

    renderTree = (list, level) => {
        return list.map(item => {
            const { A: id, E: name, children } = item;

            return (
                <TreeNode value={id} title={name ? name.trim() : name} key={id} isLeaf={level === 0 || (children && children.length === 0)} level={level}>
                    {children && children.length > 0 &&
                        this.renderTree(children, level - 1 >= 0 ? level - 1 : 0)
                    }
                </TreeNode>
            );
        });
    }

    render() {
        const currencies = defaultCurrency;

        return (
            <div className={styles.search_wrapper}>
                <div className={styles.z_custom_select} ref={this.tree}>
                    <TreeSelect
                        dropdownClassName={styles.z_dropdown}
                        dropdownStyle={{ maxHeight: 400, minWidth: 400, overflow: 'auto' }}
                        getPopupContainer={() => { if (this.tree.current) return this.tree.current }}
                        treeNodeFilterProp='title'
                        placeholder='机构'
                        showSearch
                        size='large'
                        style={{ width: 250 }}
                        suffixIcon={<Icon type='caret-down' style={{ color: '#fff' }} />}
                        value={this.state.organization}
                        loadData={this.onLoadData}
                        onChange={this.organizationChange}
                    >
                        {this.renderTree(this.state.treeList, 3)}
                    </TreeSelect>
                </div>
                <div>
                    <Calendar value={this.state.date} handleDateChange={this.handleDateChange} />
                </div>
                <div className={styles.z_custom_select} ref={this.el}>
                    <Select
                        dropdownClassName={styles.z_dropdown}
                        dropdownMatchSelectWidth={false}
                        getPopupContainer={() => { if (this.el.current) return this.el.current }}
                        size='large'
                        style={{ width: 250 }}
                        suffixIcon={<Icon type='caret-down' style={{ color: '#fff' }} />}
                        value={this.state.currency}
                        onChange={this.handleCurrencyChange.bind(this)}
                    >
                        {Array.isArray(currencies) && currencies.map(item => {
                            return (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            );
                        })}
                    </Select>
                </div>
                <div className={styles.z_custom_button}>
                    <Button size='large' type='primary' onClick={this.reset}>重置</Button>
                </div>
            </div>
        );
    }
}