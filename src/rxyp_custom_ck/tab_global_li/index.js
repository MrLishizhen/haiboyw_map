import React, {Component} from "react";
import styles from './index.less'
import {isEqual} from "lodash";
//tab_global_li
class Tab_global_li extends Component {

    constructor(props) {
        super(props);
        const {dataProvider = []} = props;
        const dataQuery = Array.isArray(dataProvider) && dataProvider.length > 0 ? dataProvider : [];
        this.state = {
            handlers: null,
            data: dataQuery,
        }
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

    componentDidMount() {
        try {
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
                handlers: Object.assign({}, eventValue),

            })
            const {handlers, date} = this.state
            handlers && handlers.onClick && handlers.onClick({date})

        } catch (error) {
            console.log(e)
        }
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

    clickItem(item) {
        let {data=[]} = this.state;
        let list = this.deepClones(data)
        let index = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].name === item.name) {
                index = i;
                list[i].hot = true;
            } else {
                list[i].hot = false;
            }
        }

        this.setState({
            data: [...list]
        },()=>{
            this.state.handlers.onClick && this.state.handlers.onClick({index:index});
        })
    }

    render() {
        let {data = []} = this.state;
        return (
            <div className={styles.tab_box}>
                <div className={styles.tab}>
                    {
                        data.map((u, i) => {
                            return <div className={`${styles.tab_item} ${u.hot ? styles.hot : ''}`}
                                        onClick={() => this.clickItem(u)} key={i}>
                                <span>{u.name}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Tab_global_li
