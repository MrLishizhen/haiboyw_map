import React, { PureComponent } from 'react';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import { isEqual } from 'lodash';
import styles from './index.less';

export default class Index extends PureComponent {
    constructor(props) {
        super(props);
        const data = this.getDataProvider(props);
        const { gteDate, lteDate } = data[0] || {};
        this.state = {
            start: gteDate ? moment(gteDate, 'YYYY-MM-DD HH:mm:ss') : undefined,
            end: lteDate ? moment(lteDate, 'YYYY-MM-DD HH:mm:ss') : undefined,
        }
    }

    componentDidMount() {
        try {
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

            this.setState({ handlers: Object.assign({}, eventValue) });
        } catch (e) {
            console.error('componentDidMount', e)
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
        if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
            const data = this.getDataProvider(nextProps);
            const { gteDate, lteDate } = data[0] || {};

            this.setState({
                start: gteDate ? moment(gteDate, 'YYYY-MM-DD HH:mm:ss') : undefined,
                end: lteDate ? moment(lteDate, 'YYYY-MM-DD HH:mm:ss') : undefined,
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

    onChange(type, date, dateString) {
        this.setState({ [type]: date }, () => {
            // const { start, end } = this.state;

            // const { handlers } = this.state;

            // handlers && handlers.onClick && handlers.onClick({ start, end });
        });
    }

    onClick = () => {
        const { start, end, handlers } = this.state;

        handlers && handlers.onClick && handlers.onClick({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') });
    }

    render() {
        return (
            <div className={styles.basic_wrapper}>
                <div className={styles.label}>时间选择</div>
                <div className={styles.date_picker}>
                    <DatePicker allowClear={false} value={this.state.start} placeholder='开始时间' style={{ width: 252 }} onChange={this.onChange.bind(this, 'start')} />
                </div>
                <div className={styles.divider}></div>
                <div className={styles.date_picker}>
                    <DatePicker allowClear={false} value={this.state.end} placeholder='结束时间' style={{ width: 252 }} onChange={this.onChange.bind(this, 'end')} />
                </div>
                <div>
                    <Button className={styles.btn} onClick={this.onClick}>搜索</Button>
                </div>
            </div>
        );
    }
}