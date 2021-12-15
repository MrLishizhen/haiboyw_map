import React from 'react';
import { Select, Icon } from 'antd';
import _ from 'lodash';
import styles from './index.less';

const { Option } = Select;

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: undefined,
            currencies: []
        };
        this.el = React.createRef();
    }

    componentDidMount() {
        const data = this.getDataProvider(this.props);

        this.setState({
            currencies: data,
            currency: data ? data[0] : undefined
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props, nextProps)) {
            const data = this.getDataProvider(nextProps);

            this.setState({
                currencies: data,
                currency: data ? data[0] : undefined
            });
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

    handleCurrencyChange = (value) => {
        this.setState({ currency: value }, () => {
            this.handleChange();
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

        return parameter;
    }

    render() {
        const { currencies = [] } = this.state;

        return (
            <div className={styles.search_wrapper}>
                <div className={styles.z_custom_select} ref={this.el}>
                    <Select
                        dropdownClassName={styles.z_dropdown}
                        dropdownMatchSelectWidth={false}
                        getPopupContainer={() => { if (this.el.current) return this.el.current }}
                        notFoundContent='暂无数据'
                        placeholder='请选择病种'
                        size='large'
                        style={{ width: '100%' }}
                        suffixIcon={<Icon type='caret-down' style={{ color: '#fff' }} />}
                        value={this.state.currency}
                        onChange={this.handleCurrencyChange.bind(this)}
                    >
                        {Array.isArray(currencies) && currencies.map((item, index) => {
                            return (
                                <Option key={item} value={item}>{item}</Option>
                            );
                        })}
                    </Select>
                </div>
            </div>
        );
    }
}