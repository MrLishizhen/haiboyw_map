import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Calendar } from 'antd';
import styles from './index.less'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { Select } from 'antd';
const { Option } = Select;

moment.locale('zh-cn');

// const dateFormat = 'YYYY-MM';
//year-month-double



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
            show: true,
            date: '08',
            value: undefined,
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
                        onClick: (data) => {
                            method && method({ ...data }, bindedComponents)
                        }
                    }
                }
            }
            this.setState({
                handlers: Object.assign({}, eventValue),

            })

        } catch (error) {
            console.log(e)
        }
    }

    onChange = (moment) => {
        setTimeout(() => {
            this.setState({
                show: true
            })
            const { handlers, show } = this.state
            handlers && handlers.onClick && handlers.onClick({ moment, show })
            console.log(moment.format('YYYY'), show, '1')
        }, 10)


    }

    onChangemonth = (moment) => {
        setTimeout(() => {
            this.setState({
                show: false,
                // month:moment
            })
            const { handlers, show } = this.state
            handlers && handlers.onClick && handlers.onClick({ moment, show })
            console.log(moment.format('MM'), show, '2')
        }, 10)

    }

    handleChange = (value) => {
        console.log(value)
    }
    


    // onSelect = (moment) => {
    //     const { handlers } = this.state
    //     handlers && handlers.onClick && handlers.onClick({ moment })
    //     console.log(moment,'3')
    //   }



    render() {
        const { dataProvider } = this.props;
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [];
        // console.log(data,'da')
        return (
            <div className={styles.yearmonth}>
                <div className={styles.year}><Calendar locale={zh_CN} defaultValue={moment(data, 'YYYY')} fullscreen={false} onChange={this.onChange} /></div>
                {/* <div className={this.state.show ? styles.month : styles.month_color} ><Calendar locale={zh_CN} fullscreen={false} onChange={this.onChangemonth} /></div> */}
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
        )
    }

}

