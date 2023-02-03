import React, { Component } from 'react';
import { ReactDOM } from 'react';
import { Calendar } from 'antd';
import styles from './index.less'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {isEqual} from "lodash";

moment.locale('zh-cn');

const dateFormat = 'YYYY-MM-DD';
//cn_year_month_choose_ck



export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handlers: '',
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
                handlers: Object.assign({}, eventValue)
            })
        } catch (error) {
            console.log(e)
        }
    }

    onChange = (moment) => {
        const { handlers } = this.state
        handlers && handlers.onClick && handlers.onClick({moment})
        // console.log(moment.format('YYYY-MM'))
    }
    // onPanelChange = (value, mode) => {
    //     const { handlers } = this.state
    //     handlers && handlers.onClick && handlers.onClick({ value, mode })
    //     // console.log(value, mode,'312')
    //   }


    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery});
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    render() {
        const { dataProvider } = this.props;
        const isHasData = dataProvider && Array.isArray(dataProvider) && dataProvider.length > 0 && Boolean(dataProvider[0])
        const data = isHasData ? dataProvider : [];
        return (
            <div className={styles.yearmonth}>
                {
                    Array.isArray(data)&&data[0]?<Calendar getPopupContainer={triggerNode=>triggerNode.parentNode} defaultValue={moment(data, 'YYYY-MM')} locale={zh_CN}  fullscreen={false} onChange={this.onChange} /> :''
                }
            </div>
        )
    }

}

