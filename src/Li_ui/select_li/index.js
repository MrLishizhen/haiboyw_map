import React, {Component} from 'react';

import {isEqual} from "lodash";
import { Select } from 'antd';

const { Option } = Select;
import styles from './index.less'

export default class Jindu extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
            // data:  [
            //     {
            //         name:'测试123',
            //         value :'测试123',
            //         hot:true,
            //         disabled:false,
            //     },
            //     {
            //         name:'测试1',
            //         value :'测试1',
            //         hot:false,
            //         disabled:false,
            //     },
            //     {
            //         name:'测试2',
            //         value :'测试2',
            //         hot:false,
            //         disabled:false,
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

        this.state.handlers.onClick && this.state.handlers.onClick({value});
    }
    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;
        console.info('bubble shouldComponentUpdate', nextProps, this.props);
        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                this.selectHot(dataQuery);
                this.setState({data: dataQuery}, () => {

                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    selectHot = (data)=>{

        for(let i = 0; i<data.length;i++){
            if(data[i]?.hot){
                return data[i].value;
            }
            if(i===data.length-1){
                return data[0].value;
            }
        }
    }
    render() {
        let {data=[]} = this.state;
        let hot = this.selectHot(data);
        let {width=181,height=32} = this.props;
        return (
            <div ref={node => this.node = node} className={styles.box}>
                {
                    Array.isArray(data)?<Select  defaultValue={hot} style={{ width: width,height:height,color:'#fff',fontSize:18,fontWeight:600 }} onChange={this.handleChange}>
                        {
                            data.map((item,i)=>{
                                let {name,value,...rest} = item;
                                return (  <Option value={value} props = {rest}>{name}</Option>)
                            })
                        }
                    </Select>:''
                }
            </div>
        )
    }

}