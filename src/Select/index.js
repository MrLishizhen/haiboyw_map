import React from 'react';
import { Select, Icon } from 'antd';
import _ from 'lodash';
import styles from './index.less'

const { Option } = Select;
const defaultDataQuery = [
    { value: '1', label: '总公司' },
    { value: '2', label: '分公司' }
]

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        const { dataProvider = [] } = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;
        this.state = {
            value: dataQuery[0].value
        };
        this.el = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        const { dataProvider = [] } = nextProps;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

        const origin = Array.isArray(this.props.dataProvider) && this.props.dataProvider.length > 0 ? this.props.dataProvider : [];

        if (!_.isEqual(dataQuery, origin) && dataQuery && dataQuery.length > 0) {
            // this.setState({ value: dataQuery[0].value });
            this.handleChange(dataQuery[0].value, dataQuery[0].name);
        }
    }

    handleChange = (value, option) => {
        const { buffEvent = [] } = this.props;
        let name = '';
        if (typeof option === 'object') {
            const { props } = option;
            name = props.nameref;
        } else if (typeof option === 'string') {
            name = option;
        }

        this.setState({ value });
        if (buffEvent && buffEvent.length > 0) {
            buffEvent.forEach(item => {
                const { method, bindedComponents } = item;
                if (typeof method === 'function') {
                    console.log('select', { value, name });
                    method({ value, name }, bindedComponents);
                }
            });
        }
    }

    render() {
        const { dataProvider = [] } = this.props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : defaultDataQuery;

        return (
            <div className={styles.z_custom_select} ref={this.el}>
                <Select
                    dropdownClassName={styles.z_dropdown}
                    dropdownMatchSelectWidth={false}
                    getPopupContainer={() => { if (this.el.current) return this.el.current }}
                    size='large'
                    style={{ width: '100%' }}
                    suffixIcon={<Icon type='caret-down' style={{ color: '#fff' }} />}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                >
                    {dataQuery.map(item => {
                        return <Option key={item.value} value={item.value} nameref={item.label}>{item.label}</Option>
                    })}
                </Select>
            </div>
        );
    }
}