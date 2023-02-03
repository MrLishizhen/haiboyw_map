import React, {Component} from 'react'
import styles from './index.less'
import {Popover, Button} from 'antd';
import {isEqual} from "lodash";
export default class Com extends Component {
    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];

        this.state = {
            data: dataQuery,
        }
    }
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
    li_click(u){
        let {data} = this.state;
        let list = this.deepClones(data)
        for(let i=0;i<list.length;i++){
            if(list[i].name===u.name){
                list[i].hot = !list[i].hot;
            }
        }
        this.setState({
            data:[...list]
        },()=>{
            let {data} = this.state;
            let names = data.filter(u=>u.hot);
            this.state.handlers.onClick && this.state.handlers.onClick({ names});
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
                    // let value = this.selectHot(dataQuery);
                    // console.log(value,123)
                    // this.handleChange(value)
                });
            }
        }

        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }
    render() {
        let {data = []} = this.state;
        const ul = <ul className={styles.ul_box}>
            {
                data.map(u => {
                    return <li onClick={()=>this.li_click(u)} className={`${styles.ul_li} ${u.hot?styles.hot:''}`}>{u.name}</li>
                })
            }
        </ul>;

        return (
            <div class={styles.box}>
                <Popover content={ul}
                         // visible={true}
                         // getPopupContainer={(trigger) => trigger.parentNode}
                         trigger="hover">
                    <div className={styles.button_box}></div>
                </Popover>

            </div>
        )
    }
}
