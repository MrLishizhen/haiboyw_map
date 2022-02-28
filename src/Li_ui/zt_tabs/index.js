/*词云*/
import React, {Component} from 'react'
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {isEqual} from "lodash";
import styles from './index.less'

export default class Jin extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            data: dataQuery,
            // data: [
            //     {
            //         id: "d60701cc720d11ec81c800155d01b103",
            //         name: "两节",
            //         hot: true
            //     },
            //     {
            //         id: "e0e0955e720d11ec9d5900155d01b103",
            //         name: "俄罗斯共青城",
            //         hot: false
            //     },
            //     {
            //         id: "ae076d98720e11ec845d00155d01b103",
            //         name: "涉襄疫情",
            //         hot: false
            //     }
            // ]
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
        },()=>{
            let data = this.state.data?.find(item=>item.hot===true);
            if(data&&data.hot){

                this.state.handlers.onClick && this.state.handlers.onClick({id:data.id});
            }
        })

    }


    shouldComponentUpdate(nextProps, nextState) {
        const {dataProvider, style} = nextProps;

        if (!isEqual(dataProvider, this.props.dataProvider)) {
            if (dataProvider && dataProvider.length === 1 && dataProvider[0].series) {
                // colorList = dataProvider[0].series.map(item => item.option.itemStyle.color);
            } else {
                const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
                this.setState({data: dataQuery}, () => {
                    if(Array.isArray(this.state.data)&&this.state.data[0]!==''){
                        let data = this.state.data?.find(item=>item.hot===true);

                        if(data&&data.hot){
                            this.state.handlers.onClick && this.state.handlers.onClick({id:data.id});
                        }
                    }
                });
            }
        }
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    // 深拷贝
    deepClones = (target) => {
        // 定义一个变量
        let result;
        // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === 'object') {
            // 如果是一个数组的话
            if (Array.isArray(target)) {
                result = []; // 将result赋值为一个数组，并且执行遍历
                for (let i in target) {
                    // 递归克隆数组中的每一项
                    result.push(this.deepClones(target[i]))
                }
// 判断如果当前的值是null的话；直接赋值为null
            } else if (target === null) {
                result = null;
                // 判断如果当前的值是一个RegExp对象的话，直接赋值
            } else if (target.constructor === RegExp) {
                result = target;
            } else {
                // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                result = {};
                for (let i in target) {
                    result[i] = this.deepClones(target[i]);
                }
            }
// 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
            result = target;
        }
// 返回最终结果
        return result;
    }
    clickTabs = (id) => {
        const data = [...this.deepClones(this.state.data)];
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                this.state.handlers.onClick && this.state.handlers.onClick({id:data[i].id});
                data[i].hot = true;
            } else {
                data[i].hot = false;
            }

        }

        this.setState({
            data: data,
        }, () => {

        })
    }

    render() {
        const {data = []} = this.state;
        return (
            <div ref={node => this.node = node} className={styles.ztbox} style={{height: 40}}>
                {
                    data.map((item) => {
                        return (<div
                            className={`${styles.tabItem} ${item.hot ? styles.hot : styles.nohot}`} onClick={() => {
                            this.clickTabs(item.id)
                        }}>{item.name}</div>)
                    })
                }
            </div>
        )
    }

}