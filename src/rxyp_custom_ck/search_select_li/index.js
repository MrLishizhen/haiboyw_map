import React, {Component} from 'react';

import {isEqual} from "lodash";
import {Form, Select} from 'antd';

const { Option } = Select;
import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            defaultValue:undefined
            // data:  [
            //     {
            //         name:'测试123',
            //         value :'测试123',
            //         id:0
            //     },
            //     {
            //         name:'测试1',
            //         value :'测试1',
            //         id:1
            //     },
            //     {
            //         name:'测试2',
            //         value :'测试2',
            //         id:2
            //     }
            // ],

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
    handleChange=(value)=> {
        this.setState({
            defaultValue:value
        })
        let {data} = this.state;
        let hot_data = data.find(u=>u.id==value);
        this.state.handlers.onClick && this.state.handlers.onClick({...hot_data});
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {
                    // let value = this.selectHot(dataQuery);
                    // console.log(value,123)
                    // this.handleChange(value)
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    render() {
        let {data=[],defaultValue} = this.state;
        return (
            <div ref={node => this.node = node} className={styles.box}>
                <div className={styles.divCss}>
                        {
                            <Select
                                allowClear
                                value={defaultValue}
                                className={styles.selectCss}
                                placeholder="案件大类"
                                onChange={this.handleChange}
                                dropdownClassName={styles.dropdown}
                            >
                                {
                                    data && data.length > 0 && data.map((item, index) => {
                                        return <Option key={index} value={item.id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        }
                </div>
            </div>
        )
    }

}
