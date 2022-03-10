import {Component} from "react";
import {isEqual} from "lodash";
import {DatePicker} from 'antd';
import moment from "moment";
import styles from './index.less'

import locale from 'antd/es/date-picker/locale/zh_CN';

export default class TimeDx extends Component {

    constructor(props) {
        super(props);

        const data = this.getDataProvider(props);
        const {time, show} = data[0] || {};
        this.state = {
            time: time ? moment(time, 'YYYY-MM-DD HH:mm:ss') : undefined,
            show: show || false
        }
    }

    getDataProvider = props => {
        const {dataProvider} = props;
        if (dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && dataProvider[0] !== '') {
            return [...dataProvider]
        } else {
            return [];
        }
    }

    componentDidMount() {

        const {buffEvent = [{type: 'click'}]} = this.props;
        let eventValue = {};
        for (let i = 0; i < buffEvent.length; i++) {
            const eventObj = buffEvent[i];
            const {type, method, bindedComponents} = eventObj;
            if (type === 'click') {
                eventValue = {
                    onClick: (data) => {
                        method && method({...data}, bindedComponents)
                    }
                }
            }
        }
        this.setState({
            handlers: Object.assign({}, eventValue)
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', this.props.dataProvider, nextProps.dataProvider);
        if (!isEqual(this.props.dataProvider, nextProps.dataProvider)) {
            const data = this.getDataProvider(nextProps);
            const {time, show} = data[0] || {};

            this.setState({
                time: time ? moment(time, 'YYYY-MM-DD HH:mm:ss') : undefined,
                show: show || false
            });
        }
    }

    timeIconClick = () => {
        let {show} = this.state;
        this.setState({
            show: !show
        })

    }

    onChange = (date, dateString) => {
        console.log(dateString)
        this.setState({
            time: dateString ? moment(dateString, 'YYYY-MM-DD HH:mm:ss') : undefined
        });
        this.state.handlers.onClick && this.state.handlers.onClick({time: dateString});
    }

    render() {

        const {time, show} = this.state;

        return (
            <div className={styles.time_box} style={{width:60}}>
                <span className={styles.i_cont} onClick={this.timeIconClick}></span>
                <div className={styles.time_tc} style={{zIndex:show?12:-1}}>
                    <div className={styles.time} style={{width:show?160:0}}>
                        <DatePicker locale={locale} value={time} bordered={false} allowClear={false}
                                    onChange={this.onChange}></DatePicker>
                    </div>

                    <span className={styles.i_cont}
                          onClick={this.timeIconClick}></span>
                </div>
            </div>
        )
    }
}