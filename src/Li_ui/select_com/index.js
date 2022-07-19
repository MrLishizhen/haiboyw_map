import React, {Component} from 'react';
import {isEqual} from "lodash";
import {Select} from 'antd';

const {Option} = Select;
import styles from './index.less'

//select_com_li
// let data = [
//     {name:'卧龙镇',value:'卧龙镇'},{name:'隆中街道',value:'隆中街道'},{name:'古城街道',value:'古城街道'},{name:'真武山街道',value:'真武山街道'},{name:'檀溪街道',value:'檀溪街道'},{name:'庞公街道',value:'庞公街道'},{name:'尹集乡',value:'尹集乡'},{name:'余家湖街道',value:'余家湖街道'},{name:'欧庙镇',value:'欧庙镇'}
// ]
export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data: [
            //     {name:'卧龙镇',value:'卧龙镇'},{name:'隆中街道',value:'隆中街道'},{name:'古城街道',value:'古城街道'},{name:'真武山街道',value:'真武山街道'},{name:'檀溪街道',value:'檀溪街道'},{name:'庞公街道',value:'庞公街道'},{name:'尹集乡',value:'尹集乡'},{name:'余家湖街道',value:'余家湖街道'},{name:'欧庙镇',value:'欧庙镇'}
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

    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

                this.setState({data: dataQuery}, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }


    onChange = (value) => {
        let {data = []} = this.state.data[0] || {};
        let obj = data.find(u => u.value === value);
        console.log(obj)
        this.state.handlers.onClick && this.state.handlers.onClick({type: 'select_dz', ...obj});
    };

    onSearch = (value) => {
        console.log('search:', value);
    };
    // option.children.toLowerCase().includes(input.toLowerCase())
// (input, option) =>
    filterOption = (input, option) => {

        return option.props.children.includes(input)
    }
    notFoundContent = () => {
        return ''
    }

    render() {
        let {data = [], placeholder = ''} = this.state.data[0] || {};
        let hot = data.find(u => u.hot === true) || {};
        let hotArr = []
        if (hot.value) {
            hotArr.push(hot.value)
        }

        return (
            <>
                <div ref={node => this.node = node} className={styles.box}>
                    <div className={styles.inputs} id='select_map_li'>


                        <Select
                            key={[...hotArr]}
                            style={{width: '100%', height: 32}}
                            showSearch
                            defaultValue={[...hotArr]}
                            bordered={false}
                            placeholder={placeholder || '请选择街道'}
                            optionFilterProp="children"
                            notFoundContent={this.notFoundContent}
                            onChange={this.onChange}
                            onSearch={this.onSearch}
                            filterOption={this.filterOption}
                            getPopupContainer={trigger => trigger.parentNode}
                        >
                            {data.map((u, i) => {
                                return <Option key={i} title={u.name} value={u.value}>{u.name}</Option>
                            })}

                        </Select>

                    </div>
                </div>

            </>
        )
    }

}
